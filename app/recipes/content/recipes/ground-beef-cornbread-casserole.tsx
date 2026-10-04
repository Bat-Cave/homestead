import { RecipeTemperature } from "@/components/recipe-temperature";
import { RecipeTime } from "@/components/recipe-time";
import type { Recipe } from "../types";

const slug = "ground-beef-cornbread-casserole";
const servings = 4;
const servingUnits: [string, string] = ["serving", "servings"];

const ingredients: Recipe["ingredients"] = [
	{ name: "ground beef", quantity: 1, unit: "lb" },
	{ name: "small yellow onion, chopped", quantity: 1, unit: "cup" },
	{
		name: "garlic, minced",
		quantity: 2,
		unit: "clove",
		alternatives: ["about 1 tsp garlic"],
	},
	{ name: "11 oz can corn kernels, drained", quantity: 1, unit: "can" },
	{
		name: "10.75 oz can condensed tomato soup (undiluted)",
		quantity: 1,
		unit: "can",
	},
	{ name: "water", quantity: 1, unit: "cup" },
	{ name: "chili powder", quantity: 1, unit: "tbsp" },
	{ name: "salt", quantity: 1, unit: "tsp" },
	{ name: "cornmeal", quantity: 0.75, unit: "cup" },
	{ name: "all-purpose flour", quantity: 1, unit: "tbsp" },
	{ name: "baking powder", quantity: 1.5, unit: "tsp" },
	{ name: "kosher salt (for cornbread topping)", quantity: 0.5, unit: "tsp" },
	{ name: "large egg", quantity: 1, unit: "" },
	{ name: "milk", quantity: 0.5, unit: "cup" },
	{ name: "canola oil", quantity: 1, unit: "tbsp" },
	{
		name: "granulated sugar (optional, for a slightly sweet crust)",
		quantity: 1,
		unit: "tsp",
	},
];

export const recipe: Recipe = {
	slug,
	title: "Cornbread Casserole with Ground Beef",
	publishedAt: "2026-10-04T00:00:00.000Z",
	category: "main-dishes",
	sourceUrl:
		"https://www.theseasonedmom.com/ground-beef-casserole-cornbread/",
	acknowledgments: ["Blair Lonergan / The Seasoned Mom"],
	servings,
	servingUnits,
	ingredients,
	prepTime: 30,
	cookTime: "33-40",
	steps: [
		<span key="preheat-oven">
			Preheat the oven to <RecipeTemperature temperature={425} />. Lightly
			grease a 2-quart baking dish and set aside.
		</span>,
		<span key="brown-beef">
			In a large skillet over medium-high heat, cook the ground beef and onion
			until the meat is no longer pink and the onion is translucent, about{" "}
			<RecipeTime
				time={undefined}
				step={{
					number: "2",
					name: "Brown ground beef and onion until cooked through.",
				}}
				range={[7, 10]}
			/>
			. Add the garlic and cook{" "}
			<RecipeTime
				time={0.5}
				step={{
					number: "2",
					name: "Cook garlic until fragrant.",
				}}
			/>{" "}
			longer.
		</span>,
		"Drain the grease from the skillet.",
		"Stir in the corn, tomato soup, water, chili powder, and salt.",
		<span key="simmer-filling">
			Bring to a boil, then reduce the heat and simmer about{" "}
			<RecipeTime
				time={15}
				step={{
					number: "5",
					name: "Simmer filling until thick and glossy.",
				}}
			/>
			, stirring regularly, until the mixture is thick and glossy.
		</span>,
		"Spread the beef mixture in an even layer in the prepared baking dish.",
		"In a medium bowl, stir together the cornmeal, flour, baking powder, salt, egg, milk, canola oil, and sugar (if using) until just combined. Keep the batter thin—it settles into the filling as it bakes.",
		"Spoon the cornbread batter over the beef mixture and spread it to the edges of the dish.",
		<span key="bake-casserole">
			Bake at <RecipeTemperature temperature={425} /> for{" "}
			<RecipeTime
				time={undefined}
				step={{
					number: "9",
					name: "Bake until the cornbread crust is golden and set.",
				}}
				range={[18, 20]}
			/>
			, until golden brown and a toothpick inserted in the center of the crust
			comes out clean.
		</span>,
		<span key="rest">
			Let stand{" "}
			<RecipeTime
				time={undefined}
				step={{
					number: "10",
					name: "Rest casserole before serving.",
				}}
				range={[5, 10]}
			/>{" "}
			so the filling settles before serving. Top with grated cheddar, sour cream,
			cilantro, or sliced green onion if you like.
		</span>,
	],
};
