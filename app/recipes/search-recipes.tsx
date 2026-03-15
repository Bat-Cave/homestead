"use client";

import { X } from "lucide-react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";
import useMeasure from "react-use-measure";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CategorySlug, categories } from "./categories";
import { Recipe } from "./content/types";
import { categoryBackgrounds } from "./utils";

export default function SearchRecipes({ recipes }: { recipes: Recipe[] }) {
	const searchParams = useSearchParams();
	const search = searchParams.get("search");
	const inputRef = useRef<HTMLInputElement>(null);
	const [ref, bounds] = useMeasure();
	const [selectedCategories, setSelectedCategories] = useState<CategorySlug[]>(
		[],
	);

	const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length === 0) {
			window.history.pushState(null, "", location.pathname);
			window.history.replaceState(null, "", location.pathname);
		} else {
			window.history.pushState(null, "", `?search=${e.target.value}`);
			window.history.replaceState(null, "", `?search=${e.target.value}`);
		}
	}, []);

	const filteredRecipes = useMemo(() => {
		return recipes
			.filter((recipe) => {
				const searchTerm = search?.toLowerCase?.() ?? "";
				return (
					recipe.title.toLowerCase().includes(searchTerm) ||
					recipe.category.toLowerCase().includes(searchTerm)
				);
			})
			.filter((recipe) => {
				if (selectedCategories.length === 0) return true;
				return selectedCategories.includes(recipe.category);
			})
			.sort((a, b) => {
				return a.category.localeCompare(b.category);
			});
	}, [recipes, search, selectedCategories]);

	const groupedRecipes = useMemo(() => {
		return Object.entries(
			[...filteredRecipes].reduce(
				(acc, recipe) => {
					const key = recipe.title.charAt(0).toLowerCase();
					if (!acc[key]) {
						acc[key] = [];
					}
					acc[key].push(recipe);
					return acc;
				},
				{} as Record<string, Recipe[]>,
			),
		).sort((a, b) => a[0].localeCompare(b[0]));
	}, [filteredRecipes]);

	return (
		<MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.3 }}>
			<div className="relative mb-4">
				<Input
					ref={inputRef}
					placeholder="Search recipes"
					className="border-black dark:border-white"
					defaultValue={typeof search === "string" ? search : ""}
					onChange={handleSearch}
				/>
				<AnimatePresence mode="popLayout" initial={false}>
					{(search?.length ?? 0) > 0 && (
						<motion.button
							className="absolute btn-outline-destructive rounded-sm p-1 right-1 top-1/2 -translate-y-1/2"
							onClick={() => {
								handleSearch({
									target: { value: "" },
								} as React.ChangeEvent<HTMLInputElement>);
								if (inputRef.current) {
									inputRef.current.value = "";
								}
							}}
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{
								opacity: 0,
								scale: 0.95,
							}}
							transition={{
								type: "spring",
								bounce: 0,
								duration: 0.3,
							}}
						>
							<X className="size-4" />
						</motion.button>
					)}
				</AnimatePresence>
			</div>
			<div className="relative">
				<div className="flex flex-wrap gap-2">
					{categories.map((category) => (
						<button
							key={category.slug}
							onClick={() =>
								setSelectedCategories((prev) =>
									prev.includes(category.slug)
										? prev.filter((c) => c !== category.slug)
										: [...prev, category.slug],
								)
							}
							className={cn(
								"flex opacity-50 hover:opacity-100 transition-all duration-200 items-center gap-1 btn-outline btn px-2 py-1 leading-none h-max",
								selectedCategories.includes(category.slug) && "opacity-100",
							)}
						>
							<span className="relative size-4 shrink-0 flex items-center justify-center">
								<span className="inline-flex size-8 scale-50 rounded-full overflow-hidden items-center justify-center absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
									<span
										className={cn(
											"size-full flex",
											categoryBackgrounds[category.slug],
										)}
									/>
								</span>
							</span>
							{category.name}
						</button>
					))}
				</div>
				<motion.div
					animate={{ height: bounds.height ?? "auto" }}
					transition={{ type: "spring", bounce: 0, duration: 0.9 }}
				>
					<div ref={ref} className="pt-10">
						<AnimatePresence mode="popLayout" initial={false}>
							{groupedRecipes.map(([key, recipes], index) => (
								<motion.div
									key={key}
									initial={{ opacity: 0, scale: 0.95, y: 10 }}
									animate={{ opacity: 1, scale: 1, y: 0 }}
									exit={{
										opacity: 0,
										scale: 0.95,
										y: 10,
									}}
									layout="position"
									transition={{
										delay: 0.05 * index,
										type: "spring",
										bounce: 0,
										duration: 0.3,
									}}
									className="flex flex-col"
								>
									<p className="uppercase font-semibold text-sm tracking-wider mb-2">
										{key}
									</p>
									<ul className="mb-2">
										<AnimatePresence mode="popLayout" initial={false}>
											{recipes.map((recipe, recipeIndex) => (
												<motion.li
													key={`${key}-${recipe.slug}`}
													id={`${key}-${recipe.slug}`}
													layout="position"
													initial={{ opacity: 0, scale: 0.95, y: 10 }}
													animate={{ opacity: 1, scale: 1, y: 0 }}
													exit={{
														opacity: 0,
														scale: 0.95,
														y: 10,
													}}
													transition={{
														delay: 0.05 * recipeIndex,
														type: "spring",
														bounce: 0,
														duration: 0.3,
													}}
													className="flex flex-col items-start group"
												>
													<Link
														key={recipe.slug}
														href={`/recipes/${recipe.slug}${search ? `?search=${search}` : ""}`}
														className="group flex items-start gap-1 mb-2"
													>
														<span className="inline-flex shrink-0 size-8 scale-50 rounded-full overflow-hidden items-center justify-center">
															<span
																className={cn(
																	"size-full flex",
																	categoryBackgrounds[recipe.category],
																)}
															/>
														</span>
														<span className="font-semibold text-lg group-hover:underline wrap-break-word mt-0.5">
															{recipe.title}
														</span>
														<span className="text-sm text-neutral-800 dark:text-neutral-300 ml-2 sm:inline hidden mt-1.5">
															{recipe.servings}{" "}
															{recipe.servingUnits[recipe.servings > 1 ? 1 : 0]}
															{"  •  "}
															{recipe.prepTime != null &&
																`${recipe.prepTime} min prep`}
															{recipe.prepTime != null &&
																recipe.cookTime != null &&
																", "}
															{recipe.cookTime != null &&
																`${recipe.cookTime} min cook`}
														</span>
													</Link>
												</motion.li>
											))}
										</AnimatePresence>
									</ul>
								</motion.div>
							))}
							{filteredRecipes.length === 0 && (
								<motion.p
									key="no-recipes-found"
									initial={{ opacity: 0, scale: 0.95, y: 10 }}
									animate={{ opacity: 1, scale: 1, y: 0 }}
									exit={{
										opacity: 0,
										scale: 0.95,
										y: 10,
									}}
								>
									No recipes found
								</motion.p>
							)}
						</AnimatePresence>
					</div>
				</motion.div>
			</div>
		</MotionConfig>
	);
}
