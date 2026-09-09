import { RecipeTime } from "@/components/recipe-time";
import type { Recipe } from "../types";

const slug = "marry-me-white-bean-skillet";
const servings = 4;
const servingUnits: [string, string] = ["serving", "servings"];

const ingredients: Recipe["ingredients"] = [
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
	{
		name: "boiled potatoes, cut into ~1-inch chunks (optional, 600–800g)",
		quantity: 700,
		unit: "g",
	},
	{
		name: "extra vegetable broth (optional, if using potatoes)",
		quantity: 0.375,
		unit: "cup",
	},
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
	prepTime: 5,
	cookTime: "20",
	steps: [
		"Gather and prep all ingredients. If using potatoes, boil them ahead of time and cut into ~1-inch chunks.",
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
			and Italian seasoning. Optional: add the boiled potatoes with the
			beans—they absorb the tomato/garlic/cream sauce, release a little starch
			to thicken it, and make the dish substantially more filling. If the
			skillet gets too thick during the simmer, add an extra ¼–½ cup broth.
			Stir well and simmer for about{" "}
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
		"Spoon into bowls and serve warm with crusty bread or over rice.",
	],
};
