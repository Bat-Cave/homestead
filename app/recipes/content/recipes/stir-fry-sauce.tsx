import type { Recipe } from "../types";

const slug = "stir-fry-sauce";
const servings = 8;
const servingUnits: [string, string] = ["serving", "servings"];

const ingredients: Recipe["ingredients"] = [
	{ name: "soy sauce", quantity: 0.5, unit: "cup" },
	{ name: "chicken stock", quantity: 0.333, unit: "cup" },
	{ name: "sesame oil", quantity: 1, unit: "tsp" },
	{ name: "rice vinegar", quantity: 2, unit: "tsp" },
	{ name: "Worcestershire sauce", quantity: 1, unit: "tsp" },
	{ name: "garlic, minced", quantity: 3, unit: "clove" },
	{ name: "ginger, minced", quantity: 1, unit: "tsp" },
	{ name: "brown sugar", quantity: 2, unit: "tbsp" },
	{ name: "red pepper flakes", quantity: 0.5, unit: "tsp" },
];

export const recipe: Recipe = {
	slug,
	title: "Stir-Fry Sauce",
	publishedAt: "2026-02-12T18:00:00.000Z",
	category: "drinks-sauces",
	revisedFrom: undefined,
	sourceUrl: "https://abeautifulmess.com/stir-fry-sauce/",
	acknowledgments: ["A Beautiful Mess"],
	servings,
	servingUnits,
	ingredients,
	prepTime: 5,
	cookTime: undefined,
	steps: [
		"Combine all ingredients in a small bowl.",
		"Whisk until the sugar dissolves (or shake in a jar with a lid).",
		"Pour over your stir fry while cooking.",
		"Store any unused sauce in an airtight container in the refrigerator for up to 1 week.",
	],
};
