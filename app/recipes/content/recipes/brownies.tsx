import { ReactiveIngredient } from "@/components/ingredients";
import { RecipeTemperature } from "@/components/recipe-temperature";
import { RecipeTime } from "@/components/recipe-time";
import type { Recipe } from "../types";

const slug = "brownies";
const servings = 16;
const servingUnits: [string, string] = ["brownie", "brownies"];

const ingredients: Recipe["ingredients"] = [
	{ name: "unsalted butter", quantity: 10, unit: "tbsp" },
	{ name: "semisweet chocolate, chopped", quantity: 4, unit: "oz" },
	{ name: "granulated sugar", quantity: 1, unit: "cup" },
	{ name: "eggs", quantity: 2, unit: "" },
	{ name: "egg yolk", quantity: 1, unit: "" },
	{ name: "vanilla extract", quantity: 1, unit: "tsp" },
	{ name: "all-purpose flour", quantity: 0.75, unit: "cup" },
	{ name: "unsweetened cocoa powder", quantity: 0.25, unit: "cup" },
	{ name: "salt", quantity: 0.25, unit: "tsp" },
	{ name: "semisweet chocolate chips (optional)", quantity: 1, unit: "cup" },
];

export const recipe: Recipe = {
	slug,
	title: "Brownies",
	publishedAt: "2026-02-18T00:00:00.000Z",
	category: "desserts",
	servings,
	servingUnits,
	ingredients,
	acknowledgments: ["Handle the Heat"],
	sourceUrl: "https://handletheheat.com/best-easy-brownies/",
	prepTime: 15,
	cookTime: "25-30",
	steps: [
		<>
			Preheat oven to <RecipeTemperature temperature={350} />. Line an 8-inch
			square pan.
		</>,
		<>
			Melt{" "}
			<ReactiveIngredient
				slug={slug}
				ingredientIndex={1}
				servings={servings}
				ingredients={ingredients}
			/>{" "}
			and{" "}
			<ReactiveIngredient
				slug={slug}
				ingredientIndex={0}
				servings={servings}
				ingredients={ingredients}
			/>{" "}
			together, then stir in{" "}
			<ReactiveIngredient
				slug={slug}
				ingredientIndex={2}
				servings={servings}
				ingredients={ingredients}
			/>{" "}
			until smooth.
		</>,
		"Cool slightly, then whisk in eggs, egg yolk, and vanilla.",
		<>
			Fold in{" "}
			<ReactiveIngredient
				slug={slug}
				ingredientIndex={6}
				servings={servings}
				ingredients={ingredients}
			/>
			,{" "}
			<ReactiveIngredient
				slug={slug}
				ingredientIndex={7}
				servings={servings}
				ingredients={ingredients}
			/>
			, and{" "}
			<ReactiveIngredient
				slug={slug}
				ingredientIndex={8}
				servings={servings}
				ingredients={ingredients}
			/>
			. Fold in chocolate chips if using.
		</>,
		<>
			Bake for{" "}
			<RecipeTime
				time={undefined}
				step={{ number: "5", name: "Bake for 25 to 30 minutes." }}
				range={[25, 30]}
			/>{" "}
			until moist crumbs form.
		</>,
		"Cool fully before slicing.",
	],
};
