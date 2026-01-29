"use client";

import Fraction from "fraction.js";
import { Minus, Plus, RotateCcw } from "lucide-react";
import { motion } from "motion/react";
import { useMemo } from "react";
import {
	ingredients,
	unitDefinitions,
} from "@/app/recipes/content/ingredients";
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
}: {
	slug: string;
	servings: number;
	servingUnits?: [string, string];
}) => {
	const { recipeServings, updateRecipeServing } = useServingsStore();
	const { units, updateUnits } = useRecipeUnitsStore();
	const handleUpdateRecipeServing = (srvngs: number) =>
		updateRecipeServing(slug, srvngs);
	const internalServings = recipeServings[slug] ?? servings;
	const recipeIngredients = ingredients[slug];
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
						<span
							className={cn(
								"font-semibold font-mono text-yellow-800 dark:text-yellow-400 transition-colors",
								internalServings === servings &&
									"text-violet-800 dark:text-violet-400",
							)}
						>
							{internalServings}
						</span>{" "}
						{internalServings > 1 ? servingUnits[1] : servingUnits[0]}
					</span>
					<span className="flex items-center flex-wrap gap-2">
						<ButtonGroup>
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
					</span>
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
						<li key={name} className="lowercase list-none text-lg relative">
							<span
								className={cn(
									"font-semibold transition-colors font-mono text-yellow-800 dark:text-yellow-400",
									internalServings === servings &&
										"text-violet-800 dark:text-violet-400",
								)}
							>
								<TextMorph>{displayQuantity}</TextMorph>
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
							<span className="absolute right-full mr-3 flex size-1 bg-black dark:bg-white rounded-full top-3"></span>
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
}: {
	slug: string;
	ingredientIndex: number;
	servings: number;
	quantity?: number;
	omitName?: boolean;
}) => {
	const { recipeServings } = useServingsStore();
	const { units } = useRecipeUnitsStore();
	const internalServings = recipeServings[slug] ?? servings;
	const ingredient = ingredients[slug][ingredientIndex];

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
		<span
			className={cn(
				"lowercase font-semibold text-yellow-800 dark:text-yellow-400 transition-colors",
				internalServings === servings && "text-violet-800 dark:text-violet-400",
			)}
		>
			<TextMorph>{displayQuantity}</TextMorph>{" "}
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
				"lowercase font-semibold text-yellow-800 dark:text-yellow-400 transition-colors",
				internalServings === servings && "text-violet-800 dark:text-violet-400",
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
