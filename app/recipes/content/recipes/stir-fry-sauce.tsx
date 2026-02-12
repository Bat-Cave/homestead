import type { Recipe } from "../types";

const slug = "stir-fry-sauce";
const servings = 4;
const servingUnits: [string, string] = ["serving", "servings"];

const ingredients: Recipe["ingredients"] = [
	{ name: "low-sodium soy sauce", quantity: 0.5, unit: "cup" },
	{
		name: "low-sodium vegetable stock",
		quantity: 0.5,
		unit: "cup",
		alternatives: ["water"],
	},
	{ name: "sesame oil", quantity: 1, unit: "tsp" },
	{ name: "rice vinegar", quantity: 0.5, unit: "tbsp" },
	{ name: "garlic, minced", quantity: 2, unit: "clove" },
	{ name: "fresh ginger, grated", quantity: 1.5, unit: "tsp" },
	{ name: "sugar", quantity: 1, unit: "tbsp", alternatives: ["honey"] },
	{ name: "cornstarch", quantity: 1, unit: "tbsp" },
	{ name: "red pepper flakes (optional)", quantity: 1, unit: "pinch" },
];

export const recipe: Recipe = {
	slug,
	title: "Stir-Fry Sauce",
	publishedAt: "2026-02-12T18:00:00.000Z",
	category: "drinks-sauces",
	revisedFrom: undefined,
	sourceUrl: "https://www.forkinthekitchen.com/stir-fry-sauce-recipe/",
	acknowledgments: ["Fork in the Kitchen"],
	servings,
	servingUnits,
	ingredients,
	prepTime: 5,
	cookTime: undefined,
	steps: [
		"Whisk or shake all ingredients together until fully combined.",
		"Use immediately in a stir fry and simmer until thickened.",
		"Store in an airtight container in the refrigerator for up to 1 week.",
	],
};
