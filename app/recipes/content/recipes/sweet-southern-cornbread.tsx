import { RecipeTemperature } from "@/components/recipe-temperature";
import { RecipeTime } from "@/components/recipe-time";
import type { Recipe } from "../types";

const slug = "sweet-southern-cornbread";
const servings = 12;
const servingUnits: [string, string] = ["piece", "pieces"];

const ingredients: Recipe["ingredients"] = [
	{ name: "unsalted butter", quantity: 0.5, unit: "cup" },
	{ name: "granulated sugar", quantity: 0.667, unit: "cup" },
	{ name: "eggs", quantity: 2, unit: "" },
	{ name: "buttermilk", quantity: 1, unit: "cup" },
	{
		name: "finely ground cornmeal",
		quantity: 0.5,
		unit: "cup",
		alternatives: ["coarse ground cornmeal", "white cornmeal"],
	},
	{ name: "all-purpose flour", quantity: 1.0625, unit: "cup" },
	{ name: "baking soda", quantity: 0.5, unit: "tsp" },
	{ name: "baking powder", quantity: 0.25, unit: "tsp" },
	{ name: "kosher salt", quantity: 0.5, unit: "tsp" },
];

export const recipe: Recipe = {
	slug,
	title: "Sweet Southern Cornbread",
	publishedAt: "2026-09-12T00:00:00.000Z",
	category: "breads",
	sourceUrl: "https://cheflindseyfarr.com/sweet-southern-cornbread/",
	acknowledgments: ["Lindsey Farr / Chef Lindsey Farr"],
	servings,
	servingUnits,
	ingredients,
	prepTime: 15,
	cookTime: "30-40",
	steps: [
		<span key="preheat-oven">
			Preheat the oven to <RecipeTemperature temperature={375} />. Generously
			butter an 8-inch square baking dish or 8-inch cast iron skillet.
		</span>,
		"Melt the butter in a large skillet or saucepan. Remove from heat and whisk in the sugar, then quickly whisk in the eggs until well blended.",
		"Combine the buttermilk with the baking soda and baking powder, whisk, then whisk into the egg mixture. Do not mix the buttermilk and leavening before starting—the reaction will begin too early and the cornbread will bake flat.",
		"Stir or whisk in the cornmeal, flour, and salt until well blended and few lumps remain.",
		"Pour the batter into the prepared dish and smooth the top.",
		<span key="bake-cornbread">
			Bake for{" "}
			<RecipeTime
				time={undefined}
				step={{
					number: "6",
					name: "Bake until a toothpick inserted in the center comes out clean.",
				}}
				range={[30, 40]}
			/>
			, or until a toothpick inserted in the center comes out clean. Start
			checking at{" "}
			<RecipeTime
				time={25}
				step={{
					number: "6",
					name: "Start checking cornbread for doneness.",
				}}
			/>
			, especially if baking in cast iron. Avoid overbaking—the edges should
			begin to brown and the center should offer some resistance when pressed
			gently.
		</span>,
	],
};
