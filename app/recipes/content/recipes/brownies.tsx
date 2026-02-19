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
	{ name: "fine sea salt", quantity: 0.25, unit: "tsp" },
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
			Preheat oven to <RecipeTemperature temperature={350} />. Line a metal
			8-inch square pan with parchment paper.
		</>,
		<>
			In a large microwave-safe bowl, combine{" "}
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
			. Microwave in 30-second bursts, stirring between each burst, until
			melted and smooth. Add{" "}
			<ReactiveIngredient
				slug={slug}
				ingredientIndex={2}
				servings={servings}
				ingredients={ingredients}
			/>{" "}
			to the hot butter mixture and whisk vigorously until combined. Allow to
			cool until just barely warm.
		</>,
		<>
			Add{" "}
			<ReactiveIngredient
				slug={slug}
				ingredientIndex={3}
				servings={servings}
				ingredients={ingredients}
			/>
			,{" "}
			<ReactiveIngredient
				slug={slug}
				ingredientIndex={4}
				servings={servings}
				ingredients={ingredients}
			/>
			, and{" "}
			<ReactiveIngredient
				slug={slug}
				ingredientIndex={5}
				servings={servings}
				ingredients={ingredients}
			/>
			, then whisk for about{" "}
			<RecipeTime
				time={1}
				step={{ number: "3", name: "Whisk eggs and vanilla for 1 minute." }}
			/>{" "}
			until very well combined.
		</>,
		<>
			Use a rubber spatula to stir in{" "}
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
			until just combined. Stir in{" "}
			<ReactiveIngredient
				slug={slug}
				ingredientIndex={9}
				servings={servings}
				ingredients={ingredients}
			/>
			.
		</>,
		<>
			Pour into the prepared pan and smooth out. Bake for{" "}
			<RecipeTime
				time={undefined}
				step={{ number: "5", name: "Bake for 25 to 30 minutes." }}
				range={[25, 30]}
			/>{" "}
			until a toothpick in the center comes out with moist crumbs.
		</>,
		<>
			Let cool in pan for{" "}
			<RecipeTime
				time={30}
				step={{ number: "6", name: "Cool in pan for 30 minutes." }}
			/>{" "}
			before slicing.
		</>,
	],
};
