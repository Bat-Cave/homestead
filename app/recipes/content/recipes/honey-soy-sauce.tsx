import type { Recipe } from "../types";

const slug = "honey-soy-sauce";
const servings = 4;
const servingUnits: [string, string] = ["serving", "servings"];

const ingredients: Recipe["ingredients"] = [
	{ name: "brown sugar", quantity: 1, unit: "tbsp" },
	{ name: "honey", quantity: 2, unit: "tbsp" },
	{ name: "soy sauce", quantity: 0.25, unit: "cup" },
	{ name: "fresh ginger, chopped", quantity: 2, unit: "tsp" },
	{ name: "garlic, chopped", quantity: 2, unit: "tsp" },
	{ name: "hot sauce", quantity: 2, unit: "tsp" },
];

export const recipe: Recipe = {
	slug,
	title: "Honey Soy Sauce",
	publishedAt: "2026-02-12T18:00:00.000Z",
	category: "drinks-sauces",
	revisedFrom: undefined,
	sourceUrl: "https://www.mybakingaddiction.com/honey-soy-chicken-and-rice/",
	acknowledgments: ["My Baking Addiction"],
	servings,
	servingUnits,
	ingredients,
	prepTime: 5,
	cookTime: undefined,
	steps: [
		"Whisk all ingredients together until the sugar dissolves.",
		"Use as a quick sauce for chicken, vegetables, or a stir fry.",
	],
};
