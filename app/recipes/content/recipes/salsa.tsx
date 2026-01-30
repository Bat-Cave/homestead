import type { Recipe } from "../types";

const ingredients = [
	{ name: "diced tomatoes", quantity: 28, unit: "oz" as const },
	{ name: "jalepeño pepper (remove seeds)", quantity: 1, unit: "whole" as const },
	{ name: "dried onion", quantity: 1, unit: "tbsp" as const },
	{ name: "salt", quantity: 1, unit: "tsp" as const },
	{ name: "cushed red pepper", quantity: 1, unit: "tsp" as const },
	{ name: "oregano", quantity: 0.5, unit: "tsp" as const },
	{ name: "granulated garlic", quantity: 0.5, unit: "tsp" as const },
];

export const recipe: Recipe = {
	slug: "salsa",
	title: "Salsa",
	publishedAt: "2026-01-29T18:43:01.721776Z",
	category: "drinks-sauces",
	acknowledgments: ["Aunt Faith"],
	servings: 10,
	servingUnits: ["serving", "servings"],
	ingredients,
	prepTime: 6,
	steps: ["Blend all ingredients together.", "Refrigerate leftovers."],
};
