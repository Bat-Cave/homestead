import { RecipeTemperature } from "@/components/recipe-temperature";
import { RecipeTime } from "@/components/recipe-time";
import type { Recipe } from "../types";

const slug = "jalapeno-poppers";
const servings = 10;
const servingUnits: [string, string] = ["serving", "servings"];

const ingredients: Recipe["ingredients"] = [
	{ name: "jalapenos, sliced sideways, seeds removed", quantity: 20, unit: "" },
	{ name: "Jimmy Dean hot Sausage, cooked", quantity: 0.5, unit: "lb" },
	{ name: "cream cheese, softened", quantity: 8, unit: "oz" },
	{ name: "mozzarella cheese, shredded", quantity: 1, unit: "cup" },
	{ name: "parmesan cheese", quantity: 0.25, unit: "cup" },
];

export const recipe: Recipe = {
	slug,
	title: "Jalapeno Poppers",
	publishedAt: "2026-01-26T18:43:01.721776Z",
	category: "appetizers",
	revisedFrom: undefined,
	acknowledgments: ["Aunt Em"],
	servings,
	servingUnits,
	ingredients,
	prepTime: 30,
	cookTime: "40",
	steps: [
		"Mix sausage, cream cheese, and cheeses together in a bowl to make filling.",
		"Spoon filling into jalapeno halves.",
		<>
			Peheat oven to <RecipeTemperature temperature={375} />.
		</>,
		<>
			Bake for{" "}
			<RecipeTime
				time={40}
				step={{ number: "4", name: "Bake for 40 minutes" }}
			/>
			.
		</>,
	],
};
