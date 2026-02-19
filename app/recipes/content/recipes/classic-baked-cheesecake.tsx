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
	{ name: "brown sugar (for crust)", quantity: 1, unit: "tbsp" },
	{ name: "melted unsalted butter", quantity: 7, unit: "tbsp" },
	{ name: "full-fat cream cheese, room temperature", quantity: 32, unit: "oz" },
	{ name: "granulated sugar (for filling)", quantity: 1, unit: "cup" },
	{ name: "sour cream, room temperature", quantity: 0.6667, unit: "cup" },
	{ name: "vanilla extract", quantity: 1.5, unit: "tsp" },
	{ name: "fine sea salt", quantity: 0.125, unit: "tsp" },
	{ name: "large eggs, room temperature, lightly beaten", quantity: 4, unit: "" },
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
	prepTime: 20,
	cookTime: "75",
	steps: [
		<>
			Preheat oven to <RecipeTemperature temperature={325} />.
		</>,
		<>
			Prepare the crust by combining{" "}
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
			,{" "}
			<ReactiveIngredient
				slug={slug}
				ingredientIndex={3}
				servings={servings}
				ingredients={ingredients}
			/>
			, then use a fork to combine well. Press evenly into the bottom and
			slightly up the sides of a 9-inch springform pan. Set aside.
		</>,
		<>
			In the bowl of a stand mixer (or with an electric mixer), stir{" "}
			<ReactiveIngredient
				slug={slug}
				ingredientIndex={4}
				servings={servings}
				ingredients={ingredients}
			/>{" "}
			and{" "}
			<ReactiveIngredient
				slug={slug}
				ingredientIndex={5}
				servings={servings}
				ingredients={ingredients}
			/>{" "}
			on low speed until smooth and creamy. Scrape sides and bottom of bowl,
			then add{" "}
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
			. Stir on low speed until fully combined.
		</>,
		<>
			Add{" "}
			<ReactiveIngredient
				slug={slug}
				ingredientIndex={9}
				servings={servings}
				ingredients={ingredients}
			/>{" "}
			and stir on low speed until just combined. Scrape sides and bottom of
			bowl to ensure batter is uniform.
		</>,
		<>
			Pour cheesecake batter into prepared springform pan and place on the
			center rack of the oven. To help prevent leaks, place the springform pan
			on a foil-lined cookie sheet. Bake for{" "}
			<RecipeTime
				time={undefined}
				step={{ number: "5", name: "Bake for 50 to 60 minutes." }}
				range={[50, 60]}
			/>{" "}
			until center is mostly set but still slightly jiggly.
		</>,
		<>
			Remove cheesecake from oven and let cool on top of the oven for{" "}
			<RecipeTime
				time={10}
				step={{ number: "6", name: "Cool on top of oven for 10 minutes." }}
			/>
			, then run a knife around the edge to loosen from the pan.
		</>,
		<>
			Let cheesecake cool at room temperature for{" "}
			<RecipeTime
				time={undefined}
				step={{ number: "7", name: "Cool at room temperature for 1 to 2 hours." }}
				range={[60, 120]}
			/>{" "}
			before transferring to refrigerator.
		</>,
		<>
			Chill in refrigerator for at least{" "}
			<RecipeTime
				time={360}
				step={{ number: "8", name: "Refrigerate for at least 6 hours." }}
			/>{" "}
			or overnight before slicing and serving.
		</>,
	],
};
