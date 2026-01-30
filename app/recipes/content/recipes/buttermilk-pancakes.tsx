import type { Recipe } from "../types";

const slug = "buttermilk-pancakes";
const servings = 4;
const servingUnits: [string, string] = ["serving", "servings"];

const ingredients: Recipe["ingredients"] = [
	{ name: "flour", quantity: 1, unit: "cup" },
	{ name: "quick oats", quantity: 0.25, unit: "cup" },
	{ name: "sugar", quantity: 0.25, unit: "cup" },
	{ name: "baking powder", quantity: 1, unit: "tsp" },
	{ name: "eggs", quantity: 1, unit: "" },
	{ name: "oil", quantity: 3, unit: "tbsp" },
	{ name: "buttermilk", quantity: 1, unit: "cup" },
];

export const recipe: Recipe = {
	slug,
	title: "Buttermilk Pancakes",
	publishedAt: "2026-01-26T18:43:01.721776Z",
	category: "breads",
	revisedFrom: undefined,
	acknowledgments: ["Mom"],
	servings,
	servingUnits,
	ingredients,
	prepTime: 20,
	cookTime: undefined,
	steps: [
		"Mix dry ingredients",
		"Beat egg in bowl, then add oil and buttermilk.",
		"Pour wet ingredients into dry ingredients and stir until smooth. (if too thick, add more buttermilk.)",
	],
};
