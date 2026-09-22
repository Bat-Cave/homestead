import Link from "next/link";
import { RecipeTime } from "@/components/recipe-time";
import type { Recipe } from "../types";

const slug = "marry-me-white-bean-skillet";
const servings = 4;
const servingUnits: [string, string] = ["serving", "servings"];

const ingredients: Recipe["ingredients"] = [
	{ name: "potato", quantity: 1, unit: "whole" },
	{
		name: "oil from sun-dried tomatoes",
		quantity: 1,
		unit: "tbsp",
		alternatives: ["olive oil", "vegetable oil"],
	},
	{ name: "yellow onion, diced", quantity: 0.5, unit: "cup" },
	{ name: "garlic, minced", quantity: 1, unit: "tbsp" },
	{ name: "crushed red pepper flakes", quantity: 0.25, unit: "tsp" },
	{
		name: "15.5 oz cans white beans (with liquid)",
		quantity: 2,
		unit: "can",
	},
	{ name: "vegetable broth", quantity: 0.5, unit: "cup" },
	{ name: "sun-dried tomatoes in oil, chopped", quantity: 0.25, unit: "cup" },
	{ name: "salt", quantity: 0.25, unit: "tsp" },
	{ name: "Italian seasoning", quantity: 0.5, unit: "tsp" },
	{
		name: "frozen spinach, thawed and squeezed dry",
		quantity: 0.25,
		unit: "cup",
		alternatives: ["fresh spinach"],
	},
	{ name: "heavy cream", quantity: 0.25, unit: "cup" },
	{ name: "Parmesan cheese, grated", quantity: 0.25, unit: "cup" },
	{ name: "fresh basil, julienned", quantity: 2, unit: "tbsp" },
];

export const recipe: Recipe = {
	slug,
	title: "Marry Me White Bean Skillet",
	publishedAt: "2026-09-09T00:00:00.000Z",
	category: "main-dishes",
	sourceUrl: "https://www.budgetbytes.com/marry-me-white-bean-skillet/",
	acknowledgments: ["Jennie Alley / Budget Bytes"],
	servings,
	servingUnits,
	ingredients,
	prepTime: 10,
	cookTime: "35",
	steps: [
		"Peel the potato and cut it into ~3/4-inch cubes. Add to a pot of salted water, bring to a boil, and cook until tender when pierced with a fork, about 12–15 minutes. Drain and set aside.",
		<span key="saute-aromatics">
			In a medium skillet over medium heat, warm the sun-dried tomato oil. Add the
			onion, garlic, and red pepper flakes. Sauté for{" "}
			<RecipeTime
				time={undefined}
				step={{
					number: "2",
					name: "Sauté onion and garlic until soft and fragrant.",
				}}
				range={[2, 3]}
			/>{" "}
			until the onion is soft and fragrant.
		</span>,
		<span key="simmer-beans">
			Add the white beans (with their liquid), broth, sun-dried tomatoes, salt,
			Italian seasoning, and boiled potatoes. Stir well and simmer for about{" "}
			<RecipeTime
				time={15}
				step={{
					number: "3",
					name: "Simmer beans and seasonings until flavors meld.",
				}}
			/>{" "}
			so the flavors develop and the liquid slightly reduces.
		</span>,
		<span key="finish-creamy">
			Stir in the spinach, heavy cream, Parmesan, and basil. Keep at a gentle
			simmer for about{" "}
			<RecipeTime
				time={5}
				step={{
					number: "4",
					name: "Simmer until creamy and heated through.",
				}}
			/>{" "}
			until creamy and heated through. Avoid boiling after adding the cream—it
			can cause the sauce to separate.
		</span>,
		<span key="serve">
			Spoon into bowls and serve warm. Goes great with{" "}
			<Link href="/recipes/breads/sweet-southern-cornbread">
				Sweet Southern Cornbread
			</Link>
			.
		</span>,
	],
};
