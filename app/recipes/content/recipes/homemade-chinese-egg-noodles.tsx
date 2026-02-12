import type { Recipe } from "../types";

const slug = "chinese-egg-noodles";
const servings = 4;
const servingUnits: [string, string] = ["portion", "portions"];

const ingredients: Recipe["ingredients"] = [
	{ name: "all purpose flour", quantity: 2, unit: "cup" },
	{ name: "salt", quantity: 0.5, unit: "tsp" },
	{ name: "large eggs", quantity: 3, unit: "" },
	{ name: "water", quantity: 1, unit: "tbsp" },
];

export const recipe: Recipe = {
	slug,
	title: "Chinese Egg Noodles",
	publishedAt: "2026-02-12T00:00:00.000Z",
	category: "extras",
	revisedFrom: undefined,
	sourceUrl: "https://thewoksoflife.com/homemade-chinese-egg-noodles/#recipe",
	acknowledgments: [],
	servings,
	servingUnits,
	ingredients,
	prepTime: 15,
	cookTime: "10",
	steps: [
		"Combine the flour and salt in the bowl of a stand mixer. Add the eggs and water, and combine to form a shaggy dough.",
		"Knead with a dough hook for 10 minutes. If kneading by hand, knead for a total of 15 minutes. Cover and rest for 30 minutes.",
		"Divide the dough in half and keep one half covered. Flatten the other half into a thin rectangle about ½–¾ inch thick.",
		"With a pasta roller at the thickest setting, feed the dough through, guiding it straight. Continue running the dough through once at each setting, cutting it in half midway if it gets too long.",
		"When the dough is thin enough to see your hand through it, flour both sides and run it through the noodle cutting setting. Toss noodles in more flour to prevent sticking. Repeat with the other half.",
		"Bring a large pot of water to a boil. Add noodles and stir immediately to prevent clumping. Cook for 60–90 seconds and add to your favorite sauce, soup, or stir-fry.",
		"Storage: if not using all noodles, toss well in flour and freeze in an airtight bag without compressing. Cook from frozen in boiling water without thawing.",
		"Refrigerator storage: it is best to store the dough and roll it fresh. Use the dough within 1 day.",
	],
};
