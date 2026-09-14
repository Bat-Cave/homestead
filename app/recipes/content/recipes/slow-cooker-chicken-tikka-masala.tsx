import { RecipeTime } from "@/components/recipe-time";
import type { Recipe } from "../types";

const slug = "slow-cooker-chicken-tikka-masala";
const servings = 6;
const servingUnits: [string, string] = ["serving", "servings"];

const ingredients: Recipe["ingredients"] = [
	{ name: "garam masala", quantity: 1.5, unit: "tbsp" },
	{ name: "cumin", quantity: 0.5, unit: "tsp" },
	{ name: "turmeric", quantity: 0.5, unit: "tsp" },
	{ name: "smoked paprika", quantity: 0.5, unit: "tsp" },
	{ name: "salt", quantity: 0.5, unit: "tsp" },
	{ name: "cayenne (optional)", quantity: 0.25, unit: "tsp" },
	{ name: "freshly cracked pepper", quantity: 1, unit: "to taste" },
	{
		name: "boneless, skinless chicken thighs",
		quantity: 2,
		unit: "lb",
		alternatives: ["boneless, skinless chicken breast, cubed"],
	},
	{
		name: "cooking oil",
		quantity: 1,
		unit: "tbsp",
		alternatives: ["vegetable oil"],
	},
	{ name: "yellow onion, diced", quantity: 1, unit: "whole" },
	{ name: "garlic, minced", quantity: 3, unit: "clove" },
	{ name: "fresh ginger, grated", quantity: 1, unit: "tbsp" },
	{ name: "15 oz can tomato sauce", quantity: 1, unit: "can" },
	{
		name: "heavy cream",
		quantity: 0.333,
		unit: "cup",
		alternatives: ["full-fat yogurt", "full-fat coconut milk"],
	},
	{ name: "cooked rice", quantity: 4, unit: "cup" },
	{ name: "fresh cilantro", quantity: 0.25, unit: "bunch" },
];

export const recipe: Recipe = {
	slug,
	title: "Slow Cooker Chicken Tikka Masala",
	publishedAt: "2026-09-14T00:00:00.000Z",
	category: "main-dishes",
	sourceUrl: "https://www.budgetbytes.com/slow-cooker-chicken-tikka-masala/",
	acknowledgments: ["Beth Moncel / Budget Bytes"],
	servings,
	servingUnits,
	ingredients,
	prepTime: 15,
	cookTime: "180-360",
	steps: [
		"In a small bowl, combine the garam masala, cumin, turmeric, smoked paprika, salt, cayenne, and freshly cracked pepper. Sprinkle the spice mix over both sides of the chicken thighs, coating them liberally.",
		<span key="sear-chicken">
			Heat the cooking oil in a large skillet over medium-high heat. Once hot,
			add the seasoned chicken and cook for about{" "}
			<RecipeTime
				time={3}
				step={{
					number: "2",
					name: "Sear chicken on the first side.",
				}}
			/>{" "}
			on each side, or until well browned. The chicken does not need to be
			cooked through. Transfer the seared chicken to the slow cooker.
		</span>,
		"Add the diced onion to the skillet and continue to cook until the onions are soft and slightly browned on the edges. Remove the skillet from the heat. Add the onions to the slow cooker, then add ¼ cup water to the skillet and stir to dissolve the browned bits from the bottom. Pour the water into the slow cooker.",
		<span key="slow-cook">
			Add the garlic, ginger, and tomato sauce to the slow cooker with the
			chicken and onion. Briefly stir, cover, and cook on High for{" "}
			<RecipeTime
				time={180}
				step={{
					number: "4",
					name: "Cook on High until chicken is fall-apart tender.",
				}}
			/>{" "}
			or on Low for{" "}
			<RecipeTime
				time={360}
				step={{
					number: "4",
					name: "Cook on Low until chicken is fall-apart tender.",
				}}
			/>
			.
		</span>,
		"Turn the slow cooker off, then add the heavy cream. Stir gently to combine with the tomato sauce. Taste and add salt if needed.",
		"Serve the chicken and sauce over cooked rice and top with fresh cilantro.",
	],
};
