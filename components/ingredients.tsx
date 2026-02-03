"use client";

import Fraction from "fraction.js";
import { Equal, Minus, Plus, RotateCcw, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { CSSProperties, useMemo } from "react";
import { unitDefinitions } from "@/app/recipes/content/ingredients";
import { Ingredient } from "@/app/recipes/content/types";
import {
	Menubar,
	MenubarContent,
	MenubarGroup,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarShortcut,
	MenubarTrigger,
} from "@/components/ui/menubar";
import {
	Popover,
	PopoverContent,
	PopoverDescription,
	PopoverHeader,
	PopoverTitle,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
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

	if (!recipeIngredients) return null;

	const updateServingAmount = (amount: number) => {
		if (amount < 1) {
			handleUpdateRecipeServing(1);
		} else {
			handleUpdateRecipeServing(amount);
		}
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
							className={cn(
								"font-semibold transition-colors font-mono bg-linear-to-b from-indigo-500 dark:from-indigo-50 to-indigo-900 dark:to-indigo-400 bg-clip-text text-transparent text-lg",
								internalServings === servings &&
									"from-violet-500 dark:from-violet-50 to-violet-900 dark:to-violet-400",
							)}
						>
							{internalServings}
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
					{/* <span className="flex items-center flex-wrap gap-2">
						<ButtonGroup>
							<Tooltip>
								<TooltipTrigger asChild>
									<button
										className="btn btn-outline hover:z-10 shrink-0 flex items-center justify-center rounded-sm disabled:z-0 z-5"
										onClick={() =>
											updateServingAmount(Math.floor(servings / 2))
										}
										onKeyDown={(e) =>
											handleKeyDown(e, () =>
												updateServingAmount(Math.floor(servings / 2)),
											)
										}
										aria-label="Decrease servings by half the original amount"
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
										<span className="sr-only">
											Decrease servings by half the original amount
										</span>
									</button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Decrease servings by half the original amount</p>
								</TooltipContent>
							</Tooltip>
							<Tooltip>
								<TooltipTrigger asChild>
									<button
										className="btn btn-outline hover:z-10 shrink-0 flex items-center justify-center rounded-sm disabled:z-0 z-5"
										onClick={() => updateServingAmount(internalServings - 1)}
										onKeyDown={(e) =>
											handleKeyDown(e, () =>
												updateServingAmount(internalServings - 1),
											)
										}
										disabled={internalServings <= 1}
										aria-label="Decrease servings"
									>
										<Minus className="size-4" aria-hidden="true" />
										<span className="sr-only">Decrease servings</span>
									</button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Decrease servings</p>
								</TooltipContent>
							</Tooltip>
							<Tooltip>
								<TooltipTrigger asChild>
									<button
										className="btn btn-outline-warning hover:z-10 shrink-0 flex items-center justify-center rounded-sm disabled:z-0 z-5"
										onClick={() => updateServingAmount(servings)}
										onKeyDown={(e) =>
											handleKeyDown(e, () => updateServingAmount(servings))
										}
										disabled={internalServings === servings}
										aria-label="Reset to original servings"
									>
										<RotateCcw className="size-4" aria-hidden="true" />
										<span className="sr-only">Reset to original servings</span>
									</button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Reset to original servings</p>
								</TooltipContent>
							</Tooltip>
							<Tooltip>
								<TooltipTrigger asChild>
									<button
										className="btn btn-outline hover:z-10 shrink-0 flex items-center justify-center rounded-sm disabled:z-0 z-5"
										onClick={() => updateServingAmount(internalServings + 1)}
										onKeyDown={(e) =>
											handleKeyDown(e, () =>
												updateServingAmount(internalServings + 1),
											)
										}
										aria-label="Increase servings"
									>
										<Plus className="size-4" aria-hidden="true" />
										<span className="sr-only">Increase servings</span>
									</button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Increase servings</p>
								</TooltipContent>
							</Tooltip>
							<Tooltip>
								<TooltipTrigger asChild>
									<button
										className="btn btn-outline hover:z-10 shrink-0 flex items-center justify-center rounded-sm disabled:z-0 z-5"
										onClick={() =>
											updateServingAmount(Math.floor(servings * 2))
										}
										onKeyDown={(e) =>
											handleKeyDown(e, () =>
												updateServingAmount(Math.floor(servings * 2)),
											)
										}
										aria-label="Increase servings by double the original amount"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											className="size-4"
										>
											<path
												d="M4 16L10 10"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M10 16L4 10"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M21 18H14C14 15.4281 14.7735 14.5708 16.625 13.7136C18.4765 12.8563 21 11.7144 21 9.43054C21 8.62126 20.7025 7.83598 20.153 7.21873C19.5931 6.59818 18.8323 6.18519 17.9985 6.04908C17.1646 5.91296 16.3083 6.062 15.5733 6.47117C14.8383 6.88096 14.2817 7.52393 14 8.28863"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
										<span className="sr-only">
											Increase servings by double the original amount
										</span>
									</button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Increase servings by double the original amount</p>
								</TooltipContent>
							</Tooltip>
						</ButtonGroup>
						<ButtonGroup>
							<Tooltip>
								<TooltipTrigger asChild>
									<button
										className="btn btn-outline-secondary shrink-0 flex items-center justify-center rounded-sm disabled:z-0 z-10"
										onClick={() => updateUnits("decimal")}
										onKeyDown={(e) =>
											handleKeyDown(e, () => updateUnits("decimal"))
										}
										disabled={units === "decimal"}
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
								</TooltipTrigger>
								<TooltipContent>
									<p>Decimals</p>
								</TooltipContent>
							</Tooltip>
							<Tooltip>
								<TooltipTrigger asChild>
									<button
										className="btn btn-outline-secondary shrink-0 flex items-center justify-center rounded-sm disabled:z-0 z-10"
										onClick={() => updateUnits("fraction")}
										onKeyDown={(e) =>
											handleKeyDown(e, () => updateUnits("fraction"))
										}
										disabled={units === "fraction"}
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
								</TooltipTrigger>
								<TooltipContent>
									<p>Fractions</p>
								</TooltipContent>
							</Tooltip>
						</ButtonGroup>
					</span> */}
					<Menubar className="bg-transparent border-none p-0">
						<MenubarMenu>
							<MenubarTrigger unstyled className="btn btn-outline">
								Serving Sizes
							</MenubarTrigger>
							<MenubarContent
								alignOffset={0}
								align="end"
								className="bg-none bg-transparent backdrop-blur-3xl p-2 btn-outline"
							>
								<div className="mx-auto grid grid-cols-3 gap-8">
									<div className="flex flex-col gap-1 text-3xl font-semibold justify-center w-full col-span-2">
										<p className="font-semibold text-lg mb-4">Serving Sizes</p>
										<AnimatePresence mode="popLayout">
											{internalServings === servings ? (
												<motion.span
													className="text-xs text-violet-100"
													key="original"
													initial={{ opacity: 0, scale: 0.95 }}
													animate={{ opacity: 1, scale: 1 }}
													exit={{ opacity: 0, scale: 0.95 }}
												>
													Original
												</motion.span>
											) : (
												<motion.span
													className="text-xs text-indigo-200"
													key="adjusted"
													initial={{ opacity: 0, scale: 0.95 }}
													animate={{ opacity: 1, scale: 1 }}
													exit={{ opacity: 0, scale: 0.95 }}
												>
													Adjusted
												</motion.span>
											)}
										</AnimatePresence>
										<div className="flex items-center gap-3">
											<TextMorph
												className="font-mono text-5xl"
												characterClassName={cn(
													"font-semibold transition-colors font-mono bg-linear-to-b from-indigo-500 dark:from-indigo-50 to-indigo-900 dark:to-indigo-400 bg-clip-text text-transparent",
													internalServings === servings &&
														"from-violet-500 dark:from-violet-50 to-violet-900 dark:to-violet-400",
												)}
											>
												{internalServings.toString()}
											</TextMorph>
										</div>
										<div className="flex gap-1 mb-2">
											<button
												className="flex justify-center size-6 items-center z-10 gap-0.5 btn btn-outline p-1 text-xs rounded-sm"
												onClick={() =>
													updateServingAmount(internalServings - 1)
												}
												disabled={internalServings === 1}
											>
												<Minus className="size-2" aria-hidden="true" />1
												<span className="sr-only">Decrease servings by 1</span>
											</button>
											<button
												className="flex justify-center size-6 items-center z-10 gap-0.5 btn btn-outline p-1 text-xs rounded-sm"
												onClick={() =>
													updateServingAmount(internalServings + 1)
												}
											>
												<Plus className="size-2" aria-hidden="true" />1
												<span className="sr-only">Increase servings by 1</span>
											</button>
										</div>
										<span className="w-full text-xs opacity-50 max-w-[150px] mb-12">
											Ingredients are multiplied by:
											<TextMorph className="font-mono ml-2">
												{(
													Math.round((internalServings / servings) * 100) / 100
												).toString()}
											</TextMorph>
										</span>
									</div>
									<div className="flex flex-col gap-1">
										<div className="flex flex-col h-full pl-8 py-2">
											<div className="h-full relative">
												<div
													className="relative h-full grid grid-rows-(--rows) grid-cols-1 justify-center"
													style={
														{ "--rows": servings * 2 + 1 } as CSSProperties
													}
												>
													{Array(servings * 2 + 1)
														.fill(false)
														.map((_, i, arr) => {
															return (
																<div
																	key={i}
																	className={cn(
																		"relative pointer-events-none flex h-full justify-center items-center pl-4 text-xs leading-none pr-6",
																	)}
																>
																	<div className="absolute left-0 -translate-x-1/2 top-0 bottom-0 w-px bg-violet-400 -z-1" />
																	{[
																		servings * 2,
																		servings,
																		Math.floor(servings / 2),
																	].includes(arr.length - i) ? (
																		arr.length - i === servings * 2 ? (
																			<span
																				key={`${i}-${arr.length - i}`}
																				className="absolute -right-px top-1/2 -translate-y-1/2 pointer-events-auto"
																			>
																				<button
																					className="btn flex justify-center size-6 items-center z-10 gap-0.5 btn-outline px-1 py-0.5 rounded-sm"
																					onClick={() =>
																						updateServingAmount(servings * 2)
																					}
																				>
																					<svg
																						xmlns="http://www.w3.org/2000/svg"
																						width="24"
																						height="24"
																						viewBox="0 0 24 24"
																						fill="none"
																						className="size-4"
																					>
																						<path
																							d="M4 16L10 10"
																							stroke="currentColor"
																							strokeWidth="2"
																							strokeLinecap="round"
																							strokeLinejoin="round"
																						/>
																						<path
																							d="M10 16L4 10"
																							stroke="currentColor"
																							strokeWidth="2"
																							strokeLinecap="round"
																							strokeLinejoin="round"
																						/>
																						<path
																							d="M21 18H14C14 15.4281 14.7735 14.5708 16.625 13.7136C18.4765 12.8563 21 11.7144 21 9.43054C21 8.62126 20.7025 7.83598 20.153 7.21873C19.5931 6.59818 18.8323 6.18519 17.9985 6.04908C17.1646 5.91296 16.3083 6.062 15.5733 6.47117C14.8383 6.88096 14.2817 7.52393 14 8.28863"
																							stroke="currentColor"
																							strokeWidth="2"
																							strokeLinecap="round"
																							strokeLinejoin="round"
																						/>
																					</svg>
																				</button>
																				<span className="flex absolute right-full h-px w-4 bg-violet-400 top-1/2 -translate-y-1/2"></span>
																				<span className="z-10 flex absolute -left-[17px] top-1/2 -translate-y-1/2 size-3 -translate-x-1/2 rounded-full outline-violet-400 bg-black outline"></span>
																				<span className="flex absolute -left-7 text-xs font-mono -translate-x-full top-1/2 -translate-y-1/2">
																					{servings * 2}
																				</span>
																			</span>
																		) : arr.length - i === servings ? (
																			<span
																				key={`${i}-${arr.length - i}`}
																				className="absolute -right-px top-1/2 -translate-y-1/2 pointer-events-auto"
																			>
																				<button
																					className="btn flex justify-center size-6 items-center z-10 gap-0.5 btn-outline-warning px-1 py-0.5 rounded-sm"
																					onClick={() =>
																						updateServingAmount(servings)
																					}
																					disabled={
																						internalServings === servings
																					}
																				>
																					<RotateCcw
																						className="size-4 translate-y-px"
																						aria-hidden="true"
																					/>
																					<span className="sr-only">
																						Reset servings to original
																					</span>
																				</button>
																				<span className="flex absolute right-full h-px w-4 bg-violet-400 top-1/2 -translate-y-1/2"></span>
																				<span className="z-10 flex absolute -left-[17px] top-1/2 -translate-y-1/2 size-3 -translate-x-1/2 rounded-full outline-violet-400 bg-black outline"></span>
																				<span className="flex absolute -left-7 text-xs font-mono -translate-x-full top-1/2 -translate-y-1/2">
																					{servings}
																				</span>
																			</span>
																		) : (
																			<span
																				key={`${i}-${arr.length - i}`}
																				className="absolute -right-px top-1/2 -translate-y-1/2 pointer-events-auto"
																			>
																				<button
																					className="btn flex justify-center size-6 items-center z-10 gap-0.5 btn-outline px-1 py-0.5 rounded-sm"
																					onClick={() =>
																						updateServingAmount(
																							Math.floor(servings / 2),
																						)
																					}
																				>
																					<svg
																						xmlns="http://www.w3.org/2000/svg"
																						width="24"
																						height="24"
																						viewBox="0 0 24 24"
																						className="size-4"
																						aria-hidden="true"
																					>
																						<title>
																							Fraction-one-half SVG Icon
																						</title>
																						<path
																							fill="currentColor"
																							d="m5.79 21.61l-1.58-1.22l14-18l1.58 1.22zM4 2v2h2v8h2V2zm11 10v2h4v2h-2c-1.1 0-2 .9-2 2v4h6v-2h-4v-2h2c1.11 0 2-.89 2-2v-2a2 2 0 0 0-2-2z"
																						/>
																					</svg>
																				</button>
																				<span className="flex absolute right-full h-px w-4 bg-violet-400 top-1/2 -translate-y-1/2"></span>
																				<span className="z-10 flex absolute -left-[17px] top-1/2 -translate-y-1/2 size-3 -translate-x-1/2 rounded-full outline-violet-400 bg-black outline"></span>
																				<span className="flex absolute -left-7 text-xs font-mono -translate-x-full top-1/2 -translate-y-1/2">
																					{Math.floor(servings / 2)}
																				</span>
																			</span>
																		)
																	) : (
																		<span></span>
																		// <span className="flex h-px w-2 bg-violet-400 absolute left-0 top-1/2 -translate-y-1/2 translate-x-[calc(-50%-.5px)]"></span>
																	)}
																	<AnimatePresence>
																		{arr.length - i ===
																			Math.min(
																				servings * 2 + 1,
																				internalServings,
																			) && (
																			<motion.span
																				layout={
																					prefersReducedMotion ? false : true
																				}
																				layoutId="serving-indicator"
																				className={cn(
																					"size-2.5 rounded-full bg-indigo-400 absolute top-1/2 -translate-x-1/2 -translate-y-1/2 left-0 z-10",
																					internalServings > arr.length - 1
																						? "size-1 -translate-y-2"
																						: "",
																				)}
																			/>
																		)}
																	</AnimatePresence>
																</div>
															);
														})}
												</div>
											</div>
										</div>
									</div>
									{/* <p>{servingUnits[internalServings > 1 ? 1 : 0]}</p> */}
								</div>
							</MenubarContent>
						</MenubarMenu>
						<MenubarMenu>
							<MenubarTrigger unstyled className="btn btn-outline-secondary">
								Units
							</MenubarTrigger>
							<MenubarContent
								alignOffset={0}
								align="end"
								className="bg-none bg-transparent backdrop-blur-3xl p-2 btn-outline-secondary"
							>
								<div className="flex gap-1">
									<button
										className="btn btn-outline-secondary gap-2 shrink-0 flex items-center justify-center rounded-sm disabled:z-0 z-10"
										onClick={() => updateUnits("decimal")}
										onKeyDown={(e) =>
											handleKeyDown(e, () => updateUnits("decimal"))
										}
										disabled={units === "decimal"}
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
										</svg>{" "}
										Decimals
									</button>
									<button
										className="btn btn-outline-secondary gap-2 shrink-0 flex items-center justify-center rounded-sm disabled:z-0 z-10"
										onClick={() => updateUnits("fraction")}
										onKeyDown={(e) =>
											handleKeyDown(e, () => updateUnits("fraction"))
										}
										disabled={units === "fraction"}
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
										Fractions
									</button>
								</div>
							</MenubarContent>
						</MenubarMenu>
					</Menubar>
				</div>
			</div>
			<ul className="space-y-2">
				{recipeIngredients.map(({ name, quantity, unit, alternatives }) => {
					const unitDetails = unitMap.get(unit);
					const adjustedQuantity =
						Math.round(
							Number(quantity * (internalServings / servings)) * 1000,
						) / 1000;
					const baseQuantity = new Fraction(adjustedQuantity).simplify();
					const fraction = baseQuantity.toFraction(true);
					const decimal = baseQuantity.round(3).toString();
					const displayQuantity = units === "decimal" ? decimal : fraction;

					return (
						<li
							key={name}
							className="lowercase list-none text-lg relative flex gap-2"
						>
							<span className="inline-block shrink-0">
								<TextMorph
									characterClassName={cn(
										"font-semibold transition-colors font-mono bg-linear-to-b from-indigo-500 dark:from-indigo-50 to-indigo-900 dark:to-indigo-400 bg-clip-text text-transparent",
										internalServings === servings &&
											"from-violet-500 dark:from-violet-50 to-violet-900 dark:to-violet-400",
									)}
								>
									{displayQuantity}
								</TextMorph>
							</span>{" "}
							<motion.span
								layout={prefersReducedMotion ? false : "position"}
								layoutId={prefersReducedMotion ? undefined : `unit-${name}`}
								className="inline-block"
								transition={
									prefersReducedMotion ? { duration: 0 } : morphTransition
								}
							>
								{adjustedQuantity > 1 ? unitDetails?.plural : unitDetails?.name}{" "}
								{name}{" "}
								{(alternatives?.length ?? 0) > 0 && (
									<Popover>
										<PopoverTrigger className="text-sm underline text-violet-800/70 dark:text-violet-400/70 hover:text-violet-800 dark:hover:text-violet-400">
											alternatives
										</PopoverTrigger>
										<PopoverContent>
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
							<span className="absolute right-full mr-3 flex size-1 bg-black/60 dark:bg-white/60 rounded-full top-3"></span>
						</li>
					);
				})}
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
