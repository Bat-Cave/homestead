import { RecipeTime } from "@/components/recipe-time";
import type { Recipe } from "../types";

const slug = "cream-of-carrot-soup";
const servings = 4;
const servingUnits: [string, string] = ["serving", "servings"];

const ingredients: Recipe["ingredients"] = [
	{ name: "water", quantity: 2.5, unit: "cup" },
	{
		name: "chicken-flavored bouillon cubes",
		quantity: 2,
		unit: "whole",
	},
	{ name: "beef-flavored bouillon cube", quantity: 1, unit: "whole" },
	{
		name: "large carrots, scraped and thinly sliced",
		quantity: 5,
		unit: "whole",
	},
	{ name: "celery, thinly sliced", quantity: 5, unit: "stalk" },
	{ name: "small potato, peeled and diced", quantity: 1, unit: "whole" },
	{ name: "small onion, chopped", quantity: 1, unit: "whole" },
	{ name: "fresh parsley, chopped", quantity: 1, unit: "tbsp" },
	{ name: "salt", quantity: 0.25, unit: "tsp" },
	{ name: "pepper", quantity: 0.25, unit: "tsp" },
	{ name: "butter", quantity: 3, unit: "tbsp" },
	{ name: "dried whole basil", quantity: 0.25, unit: "tsp" },
	{ name: "dried whole marjoram", quantity: 0.25, unit: "tsp" },
	{ name: "dried whole thyme", quantity: 0.25, unit: "tsp" },
	{ name: "milk", quantity: 2, unit: "cup" },
	{ name: "sour cream", quantity: 0.5, unit: "cup" },
	{ name: "chives, chopped (for garnish)", quantity: 1, unit: "as needed" },
];

export const recipe: Recipe = {
	slug,
	title: "Cream of Carrot Soup",
	publishedAt: "2026-11-03T00:00:00.000Z",
	category: "soups-salads",
	servings,
	servingUnits,
	ingredients,
	prepTime: 20,
	cookTime: "45",
	steps: [
		"In a medium Dutch oven, combine the water, bouillon cubes, carrots, celery, potato, onion, parsley, salt, and pepper.",
		<span key="simmer-vegetables">
			Bring to a boil over medium heat. Reduce heat, cover, and simmer for{" "}
			<RecipeTime
				time={40}
				step={{
					number: "2",
					name: "Simmer until vegetables are tender.",
				}}
			/>{" "}
			or until the vegetables are tender.
		</span>,
		"Transfer the vegetables and cooking liquid to a blender. Blend until smooth.",
		"Add the butter, basil, marjoram, and thyme. Blend again until well combined.",
		"Return the mixture to the Dutch oven and stir in the milk.",
		<span key="thicken-soup">
			Cook over low heat, stirring constantly, for about{" "}
			<RecipeTime
				time={5}
				step={{
					number: "6",
					name: "Cook until the soup thickens.",
				}}
			/>{" "}
			or until the soup thickens.
		</span>,
		"Remove from heat. Stir in the sour cream until evenly mixed.",
		"Serve warm, garnished with a dollop of sour cream and chopped chives.",
	],
};
