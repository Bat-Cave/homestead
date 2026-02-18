import { ReactiveIngredient } from "@/components/ingredients";
import { RecipeTemperature } from "@/components/recipe-temperature";
import { RecipeTime } from "@/components/recipe-time";
import type { Recipe } from "../types";

const slug = "classic-baked-cheesecake";
const servings = 12;
const servingUnits: [string, string] = ["slice", "slices"];

const ingredients: Recipe["ingredients"] = [
	{ name: "graham cracker crumbs", quantity: 1.5, unit: "cup" },
	{ name: "sugar (for crust)", quantity: 2, unit: "tbsp" },
	{ name: "melted butter (5 to 7 tbsp)", quantity: 5, unit: "tbsp" },
	{ name: "full-fat cream cheese, room temperature", quantity: 32, unit: "oz" },
	{ name: "granulated sugar (for filling)", quantity: 1, unit: "cup" },
	{ name: "sour cream", quantity: 1, unit: "cup" },
	{ name: "vanilla extract", quantity: 1, unit: "tsp" },
	{ name: "lemon juice (optional, 2 to 3 tbsp)", quantity: 2, unit: "tbsp" },
	{ name: "large eggs, room temperature", quantity: 3, unit: "" },
];

export const recipe: Recipe = {
	slug,
	title: "Classic Baked Cheesecake",
	publishedAt: "2026-02-18T00:00:00.000Z",
	category: "desserts",
	servings,
	servingUnits,
	ingredients,
	acknowledgments: ["Sugar Spun Run"],
	sourceUrl: "https://sugarspunrun.com/best-cheesecake-recipe/",
	prepTime: 25,
	cookTime: "70",
	steps: [
		<>
			Preheat oven to <RecipeTemperature temperature={325} />.
		</>,
		<>
			Mix{" "}
			<ReactiveIngredient
				slug={slug}
				ingredientIndex={0}
				servings={servings}
				ingredients={ingredients}
			/>
			,{" "}
			<ReactiveIngredient
				slug={slug}
				ingredientIndex={1}
				servings={servings}
				ingredients={ingredients}
			/>
			, and{" "}
			<ReactiveIngredient
				slug={slug}
				ingredientIndex={2}
				servings={servings}
				ingredients={ingredients}
			/>
			. Press into a 9-inch springform pan and bake for{" "}
			<RecipeTime
				time={10}
				step={{ number: "2", name: "Bake crust for 10 minutes." }}
			/>
			.
		</>,
		<>
			Beat{" "}
			<ReactiveIngredient
				slug={slug}
				ingredientIndex={3}
				servings={servings}
				ingredients={ingredients}
			/>{" "}
			and{" "}
			<ReactiveIngredient
				slug={slug}
				ingredientIndex={4}
				servings={servings}
				ingredients={ingredients}
			/>{" "}
			until smooth, then add sour cream, vanilla, and lemon juice.
		</>,
		"Add eggs one at a time and mix until just combined.",
		<>
			Pour filling over cooled crust and bake for{" "}
			<RecipeTime
				time={60}
				step={{ number: "5", name: "Bake cheesecake for about 1 hour." }}
			/>{" "}
			until edges are set and center still jiggles.
		</>,
		<>
			Turn off oven, crack door open, and cool cheesecake in oven for{" "}
			<RecipeTime
				time={60}
				step={{ number: "6", name: "Cool cheesecake in oven for 1 hour." }}
			/>
			.
		</>,
		<>
			Refrigerate for{" "}
			<RecipeTime
				time={undefined}
				step={{ number: "7", name: "Refrigerate for 4 to 6 hours." }}
				range={[240, 360]}
			/>{" "}
			or overnight before serving.
		</>,
	],
};
