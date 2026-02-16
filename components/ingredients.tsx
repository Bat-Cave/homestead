"use client";

import Fraction from "fraction.js";
import { X } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
	unitDefinitions,
	unitLessIngredients,
} from "@/app/recipes/content/ingredients";
import type { Ingredient, Recipe } from "@/app/recipes/content/types";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Popover,
	PopoverContent,
	PopoverDescription,
	PopoverHeader,
	PopoverTitle,
	PopoverTrigger,
} from "@/components/ui/popover";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import { useRecipeUnitsStore } from "@/stores/recipe-units";
import { useServingsStore } from "@/stores/servings";
import { morphTransition, TextMorph } from "./text-morph";
import { ButtonGroup } from "./ui/button-group";

export const Ingredients = ({
	slug,
	servings = 1,
	servingUnits = ["serving", "servings"],
	ingredients,
}: {
	slug: string;
	servings: number;
	servingUnits?: [string, string];
	ingredients: Ingredient[];
}) => {
	const { recipeServings, updateRecipeServing } = useServingsStore();
	const { units, updateUnits } = useRecipeUnitsStore();
	const handleUpdateRecipeServing = (srvngs: number) =>
		updateRecipeServing(slug, srvngs);
	const internalServings = recipeServings[slug] ?? servings;
	const recipeIngredients = ingredients;
	const prefersReducedMotion = usePrefersReducedMotion();

	// Build Map for O(1) unit lookups (js-index-maps)
	const unitMap = useMemo(
		() => new Map(unitDefinitions.map((u) => [u.value, u])),
		[],
	);
	const [recipeMap, setRecipeMap] = useState<Map<string, Recipe> | null>(null);
	const hasRecipeReferences = recipeIngredients.some((ingredient) =>
		Boolean(ingredient.recipeSlug),
	);

	useEffect(() => {
		if (!hasRecipeReferences || recipeMap) return;

		let isMounted = true;
		import("@/app/recipes/content/recipes").then((mod) => {
			if (!isMounted) return;
			setRecipeMap(
				new Map(mod.allRecipes.map((recipe) => [recipe.slug, recipe])),
			);
		});

		return () => {
			isMounted = false;
		};
	}, [hasRecipeReferences, recipeMap]);

	if (!recipeIngredients) return null;

	const updateServingAmount = (amount: number) => {
		handleUpdateRecipeServing(Math.round(amount * 100) / 100);
	};

	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLButtonElement>,
		action: () => void,
	) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			action();
		}
	};

	const formatQuantity = (quantity: number) => {
		const baseQuantity = new Fraction(quantity).simplify();
		return units === "decimal"
			? baseQuantity.round(3).toString()
			: baseQuantity.toFraction(true);
	};
	const servingsDisplay = new Fraction(internalServings).simplify();
	const servingsFraction = servingsDisplay.toFraction(true);
	const servingsDecimal = servingsDisplay.round(3).toString();

	return (
		<div>
			<div className="flex items-center gap-2">
				<div className="flex items-center justify-between flex-wrap gap-2 mb-4 w-full">
					<span>
						Makes{" "}
						<motion.span
							layout={prefersReducedMotion ? false : "position"}
							layoutId={
								prefersReducedMotion ? undefined : `servings-${slug}-number`
							}
							transition={
								prefersReducedMotion ? { duration: 0 } : morphTransition
							}
						>
							<TextMorph
								characterClassName={cn(
									"font-semibold transition-colors font-mono bg-linear-to-b from-indigo-500 dark:from-indigo-50 to-indigo-900 dark:to-indigo-400 bg-clip-text text-transparent text-lg",
									internalServings === servings &&
										"from-violet-500 dark:from-violet-50 to-violet-900 dark:to-violet-400",
								)}
							>
								{units === "decimal" ? servingsDecimal : servingsFraction}
							</TextMorph>
						</motion.span>{" "}
						<motion.span
							layout={prefersReducedMotion ? false : "position"}
							layoutId={
								prefersReducedMotion ? undefined : `servings-${slug}-unit`
							}
							transition={
								prefersReducedMotion ? { duration: 0 } : morphTransition
							}
							className="inline-block"
						>
							{internalServings > 1 ? servingUnits[1] : servingUnits[0]}
						</motion.span>
					</span>
					<div className="flex items-center gap-2">
						<ButtonGroup className="relative group">
							<button
								className="relative btn flex justify-center h-7 w-9 items-center z-10 btn-outline px-1 py-0.5 rounded-sm cursor-pointer"
								onClick={() => updateServingAmount(servings * 0.5)}
								aria-label="Increase servings to double the original amount"
							>
								<span className="text-xs">½</span>
								<X className="size-3" />
							</button>

							<button
								className="relative btn flex justify-center h-7 w-9 items-center z-10 btn-outline px-1 py-0.5 rounded-sm cursor-pointer"
								onClick={() => updateServingAmount(servings)}
								aria-label="Increase servings to double the original amount"
							>
								<span className="text-xs">1</span>
								<X className="size-3" />
							</button>

							<button
								className="relative btn flex justify-center h-7 w-9 items-center z-10 btn-outline px-1 py-0.5 rounded-sm cursor-pointer"
								onClick={() => updateServingAmount(servings * 2)}
								aria-label="Increase servings to double the original amount"
							>
								<span className="text-xs">2</span>
								<X className="size-3" />
							</button>
							<div className="absolute inset-0 translate-y-full">
								<div
									className="relative h-full -translate-y-2/5 group-hover:translate-y-0 transition-all duration-500 ease-in-out"
									style={{
										width: `${
											internalServings === servings * 3
												? 100 - 25 / 2
												: internalServings === servings * 2
													? 75 - 25 / 2
													: internalServings === servings
														? 50 - 25 / 2
														: 25 / 2
										}%`,
									}}
								>
									<span className="h-3 w-6 transition-all duration-300 group-hover:w-3 absolute right-0 top-0 translate-y-1/2 translate-x-1/2 rounded-full bg-violet-500 dark:bg-violet-400 flex" />
								</div>
							</div>

							<button
								className="relative btn flex justify-center h-7 w-9 items-center z-10 btn-outline px-1 py-0.5 rounded-sm cursor-pointer"
								onClick={() => updateServingAmount(servings * 3)}
								aria-label="Increase servings to double the original amount"
							>
								<span className="text-xs">3</span>
								<X className="size-3" />
							</button>
						</ButtonGroup>
						<ButtonGroup className="relative group">
							<button
								className="btn-outline-secondary relative btn flex justify-center h-7 w-9 items-center z-10 btn-outline px-1 py-0.5 rounded-sm cursor-pointer"
								onClick={() => updateUnits("decimal")}
								onKeyDown={(e) =>
									handleKeyDown(e, () => updateUnits("decimal"))
								}
								aria-label="Decimal"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="size-4"
									aria-hidden="true"
								>
									<path stroke="none" d="M0 0h24v24H0z" fill="none" />
									<path d="M17 8a2 2 0 0 1 2 2v4a2 2 0 1 1 -4 0v-4a2 2 0 0 1 2 -2" />
									<path d="M10 8a2 2 0 0 1 2 2v4a2 2 0 1 1 -4 0v-4a2 2 0 0 1 2 -2" />
									<path d="M5 16h.01" />
								</svg>
							</button>
							<div className="absolute inset-0 translate-y-full">
								<div
									className="relative h-full -translate-y-2/5 group-hover:translate-y-0 transition-all duration-500 ease-in-out"
									style={{
										width: `${units === "decimal" ? 25 : 75}%`,
									}}
								>
									<span className="h-3 w-6 transition-all duration-300 group-hover:w-3 absolute right-0 top-0 translate-y-1/2 translate-x-1/2 rounded-full bg-fuchsia-500 dark:bg-fuchsia-400 flex" />
								</div>
							</div>
							<button
								className="btn-outline-secondary relative btn flex justify-center h-7 w-9 items-center z-10 btn-outline px-1 py-0.5 rounded-sm cursor-pointer"
								onClick={() => updateUnits("fraction")}
								onKeyDown={(e) =>
									handleKeyDown(e, () => updateUnits("fraction"))
								}
								aria-label="Fraction"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									className="size-4"
									aria-hidden="true"
								>
									<title>Fraction-one-half SVG Icon</title>
									<path
										fill="currentColor"
										d="m5.79 21.61l-1.58-1.22l14-18l1.58 1.22zM4 2v2h2v8h2V2zm11 10v2h4v2h-2c-1.1 0-2 .9-2 2v4h6v-2h-4v-2h2c1.11 0 2-.89 2-2v-2a2 2 0 0 0-2-2z"
									/>
								</svg>
							</button>
						</ButtonGroup>
					</div>
				</div>
			</div>
			<ul className="space-y-2">
				{recipeIngredients.map(
					({ name, quantity, unit, alternatives, recipeSlug }) => {
						const unitDetails = unitMap.get(unit);
						const adjustedQuantity =
							Math.round(
								Number(quantity * (internalServings / servings)) * 1000,
							) / 1000;
						const baseQuantity = new Fraction(adjustedQuantity).simplify();
						const fraction = baseQuantity.toFraction(true);
						const decimal = baseQuantity.round(3).toString();
						const displayQuantity = units === "decimal" ? decimal : fraction;
						const referencedRecipe =
							recipeSlug && recipeMap ? recipeMap.get(recipeSlug) : undefined;
						const unitlessIngredient = unitLessIngredients.some(
							(u) => u.value === unit,
						);

						return (
							<li
								key={name}
								className="lowercase list-none text-lg relative flex gap-2"
							>
								{!unitlessIngredient && (
									<span className="inline-block shrink-0">
										<TextMorph
											characterClassName={cn(
												"font-semibold transition-colors font-mono bg-linear-to-b from-indigo-500 dark:from-indigo-50 to-indigo-900 dark:to-indigo-400 bg-clip-text text-transparent",
												internalServings === servings &&
													"from-violet-500 dark:from-violet-50 to-violet-900 dark:to-violet-400",
											)}
										>
											{displayQuantity}
										</TextMorph>{" "}
									</span>
								)}
								<motion.span
									layout={prefersReducedMotion ? false : "position"}
									layoutId={prefersReducedMotion ? undefined : `unit-${name}`}
									className="inline-block"
									transition={
										prefersReducedMotion ? { duration: 0 } : morphTransition
									}
								>
									{!unitlessIngredient
										? adjustedQuantity > 1
											? unitDetails?.plural
											: unitDetails?.name
										: null}{" "}
									{referencedRecipe ? (
										<Dialog>
											<DialogTrigger asChild>
												<button
													type="button"
													className="underline decoration-1 underline-offset-2 text-violet-800/80 hover:text-violet-900 dark:text-violet-300/80 dark:hover:text-violet-200 transition-colors"
												>
													{name}
												</button>
											</DialogTrigger>
											<DialogContent>
												<DialogHeader>
													<DialogTitle>{referencedRecipe.title}</DialogTitle>
													<DialogDescription>Ingredient list</DialogDescription>
												</DialogHeader>
												<ul className="list-disc list-inside space-y-1">
													{referencedRecipe.ingredients.map((ingredient) => {
														const scaledQuantity =
															ingredient.quantity *
															(internalServings / servings);
														const referencedUnit = unitMap.get(ingredient.unit);
														const displayUnit =
															ingredient.unit === ""
																? ""
																: scaledQuantity > 1
																	? referencedUnit?.plural
																	: referencedUnit?.name;
														const displayQty = formatQuantity(scaledQuantity);

														return (
															<li key={ingredient.name}>
																{displayQty}{" "}
																{displayUnit ? `${displayUnit} ` : ""}
																{ingredient.name}
															</li>
														);
													})}
												</ul>
												<div className="space-y-2">
													<h3 className="text-base font-semibold">Steps</h3>
													<ol className="list-decimal list-inside space-y-1">
														{referencedRecipe.steps.map((step, index) => (
															<li
																key={`${referencedRecipe.slug}-step-${index}`}
															>
																{step}
															</li>
														))}
													</ol>
												</div>
												<div className="flex justify-end">
													<Button asChild>
														<Link
															href={`/recipes/${referencedRecipe.category}/${referencedRecipe.slug}`}
														>
															View full recipe
														</Link>
													</Button>
												</div>
											</DialogContent>
										</Dialog>
									) : (
										name
									)}{" "}
									{(alternatives?.length ?? 0) > 0 && (
										<Popover>
											<PopoverTrigger className="text-sm underline text-violet-800/70 dark:text-violet-400/70 hover:text-violet-800 dark:hover:text-violet-400">
												alternatives
											</PopoverTrigger>
											<PopoverContent className="bg-none bg-transparent backdrop-blur-3xl p-2 btn-outline">
												<PopoverHeader>
													<PopoverTitle>Alternatives</PopoverTitle>
													<PopoverDescription className="sr-only">
														This is a list of alternatives for this ingredient.
													</PopoverDescription>
												</PopoverHeader>
												<ul className="list-disc list-inside mt-4">
													{alternatives?.map((alternative) => (
														<li key={alternative}>{alternative}</li>
													))}
												</ul>
											</PopoverContent>
										</Popover>
									)}
								</motion.span>
								{unitlessIngredient && (
									<span>
										{adjustedQuantity > 1
											? unitDetails?.plural
											: unitDetails?.name}
									</span>
								)}
								<span className="absolute right-full mr-3 flex size-1 bg-black/60 dark:bg-white/60 rounded-full top-3"></span>
							</li>
						);
					},
				)}
			</ul>
		</div>
	);
};

export const ReactiveIngredient = ({
	slug,
	ingredientIndex,
	servings,
	quantity,
	omitName,
	ingredients,
}: {
	slug: string;
	ingredientIndex: number;
	servings: number;
	quantity?: number;
	omitName?: boolean;
	ingredients: Ingredient[];
}) => {
	const { recipeServings } = useServingsStore();
	const { units } = useRecipeUnitsStore();
	const internalServings = recipeServings[slug] ?? servings;
	const ingredient = ingredients[ingredientIndex];

	// Build Map for O(1) unit lookups (js-index-maps)
	const unitMap = useMemo(
		() => new Map(unitDefinitions.map((u) => [u.value, u])),
		[],
	);
	const unitDetails = unitMap.get(ingredient.unit);
	const adjustedQuantity =
		((quantity ?? ingredient.quantity) / ingredient.quantity) *
		ingredient.quantity *
		(internalServings / servings);
	const baseQuantity = new Fraction(adjustedQuantity).simplify();
	const fraction = baseQuantity.toFraction(true);
	const decimal = baseQuantity.round(3).toString();
	const displayQuantity = units === "decimal" ? decimal : fraction;
	const prefersReducedMotion = usePrefersReducedMotion();

	return (
		<span className="lowercase">
			<TextMorph
				characterClassName={cn(
					"lowercase font-semibold bg-linear-to-b from-indigo-500 dark:from-indigo-50 to-indigo-900 dark:to-indigo-400 bg-clip-text text-transparent",
					internalServings === servings &&
						"from-violet-500 dark:from-violet-50 to-violet-900 dark:to-violet-400",
				)}
			>
				{displayQuantity}
			</TextMorph>{" "}
			<motion.span
				layout={prefersReducedMotion ? false : "position"}
				className="inline-block"
				transition={prefersReducedMotion ? { duration: 0 } : morphTransition}
			>
				{adjustedQuantity > 1 ? unitDetails?.plural : unitDetails?.name}{" "}
				{!omitName && ingredient.name}
			</motion.span>
		</span>
	);
};

export const ReactiveServings = ({
	slug,
	servings,
	omitUnit,
	servingUnits,
}: {
	slug: string;
	servings: number;
	omitUnit?: boolean;
	servingUnits?: [string, string];
}) => {
	const { recipeServings } = useServingsStore();
	const internalServings = recipeServings[slug] ?? servings;

	return (
		<span
			className={cn(
				"lowercase font-semibold bg-linear-to-b from-indigo-500 dark:from-indigo-50 to-indigo-900 dark:to-indigo-400 bg-clip-text text-transparent",
				internalServings === servings &&
					"from-violet-500 dark:from-violet-50 to-violet-900 dark:to-violet-400",
			)}
		>
			{internalServings}{" "}
			{omitUnit || !servingUnits
				? ""
				: internalServings > 1
					? servingUnits[1]
					: servingUnits[0]}
		</span>
	);
};

const ServingDot = ({ servings }: { servings: number }) => {
	return (
		<>
			<span className="flex absolute right-full h-px w-4 bg-violet-400 top-1/2 -translate-y-1/2"></span>
			<span className="z-10 flex absolute -left-[13px] top-1/2 -translate-y-1/2 size-3 -translate-x-1/2 rounded-full outline-violet-400 dark:bg-black bg-white outline"></span>
			<span className="flex absolute -left-7 text-xs font-mono -translate-x-full top-1/2 -translate-y-1/2">
				{servings}
			</span>
		</>
	);
};
