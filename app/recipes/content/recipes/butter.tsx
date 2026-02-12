import type { Recipe } from "../types";

const slug = "butter";
const servings = 1;
const servingUnits: [string, string] = ["lb", "lb"];

const ingredients: Recipe["ingredients"] = [
	{ name: "heavy cream (cold, not ultra-pasteurized if possible)", quantity: 1, unit: "qt" },
	{ name: "salt (optional)", quantity: 1, unit: "tsp" },
	{ name: "ice-cold water (for washing)", quantity: 1, unit: "as needed" },
];

export const recipe: Recipe = {
	slug,
	title: "Butter",
	publishedAt: "2026-02-12T18:00:00.000Z",
	category: "extras",
	revisedFrom: undefined,
	acknowledgments: undefined,
	servings,
	servingUnits,
	ingredients,
	prepTime: 15,
	cookTime: undefined,
	steps: [
		"Pour cream into a stand mixer bowl (fill max halfway). Use the whisk attachment and a splash guard or towel.",
		"Start on medium speed. After whipped cream, keep going until it looks grainy and the butter separates from the liquid.",
		"Pour through a fine strainer and save the liquid (real buttermilk).",
		"Return butter to the bowl. Add ice-cold water and press/squeeze to wash out buttermilk. Drain and repeat until water runs mostly clear.",
		"If salting, mix in about 1/2 tsp salt per cup of butter. Stop once smooth and cohesive.",
		"Press into a block, wrap tightly, and refrigerate 1-2 weeks or freeze for several months.",
	],
};
