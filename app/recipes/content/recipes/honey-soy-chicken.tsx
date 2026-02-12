import Link from "next/link";
import type { Recipe } from "../types";

const slug = "honey-soy-chicken";
const servings = 4;
const servingUnits: [string, string] = ["serving", "servings"];

const ingredients: Recipe["ingredients"] = [
	{
		name: "honey soy sauce",
		quantity: 0.5,
		unit: "cup",
		recipeSlug: "honey-soy-sauce",
	},
	{
		name: "boneless, skinless chicken breast halves, cut into ½-inch strips",
		quantity: 4,
		unit: "piece",
	},
	{
		name: "vegetable oil",
		quantity: 1,
		unit: "tbsp",
		alternatives: ["olive oil"],
	},
];

export const recipe: Recipe = {
	slug,
	title: "Honey Soy Chicken",
	publishedAt: "2026-02-02T00:00:00.000Z",
	category: "main-dishes",
	revisedFrom: undefined,
	sourceUrl: "https://www.mybakingaddiction.com/honey-soy-chicken-and-rice/",
	acknowledgments: undefined,
	servings,
	servingUnits,
	ingredients,
	prepTime: 10,
	cookTime: "12",
	steps: [
		<>
			Make{" "}
			<Link href="/recipes/drinks-sauces/honey-soy-sauce">Honey Soy Sauce</Link>.
		</>,
		"Lightly salt and pepper the chicken strips.",
		"Heat oil in a large skillet over medium heat. Add chicken and brown about 1 minute per side. Pour in the sauce and stir to combine. Simmer uncovered until the sauce thickens and chicken is cooked through, 8–10 minutes.",
		"Serve over rice. Top with sesame seeds and sliced green onion if desired.",
	],
};
