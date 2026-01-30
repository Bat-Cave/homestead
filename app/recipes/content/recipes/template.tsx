import type { Recipe } from "../types";

const slug = "template";
const servings = 5;
const servingUnits: [string, string] = ["loaf", "loaves"];

const ingredients: Recipe["ingredients"] = [];

export const recipe: Recipe = {
	slug,
	title: "Template",
	publishedAt: "2026-01-26T18:43:01.721776Z",
	category: "extras",
	revisedFrom: "the title of the recipe in the cookbook",
	acknowledgments: ["the names of the people who contributed to the recipe"],
	servings,
	servingUnits,
	ingredients,
	prepTime: 20,
	cookTime: "100-145",
	steps: [],
};
