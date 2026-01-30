import { cache } from "react";
import { CategorySlug } from "./[category]/categories";
import { allRecipes } from "./content/recipes";
import type { Recipe } from "./content/types";

function getRecipesUncached(category?: CategorySlug): Recipe[] {
	const filteredRecipes = allRecipes.filter(
		(recipe) => recipe.slug !== "template",
	);
	if (category) {
		return filteredRecipes.filter((recipe) => recipe.category === category);
	}
	return filteredRecipes;
}

export const getRecipes = cache(getRecipesUncached);

export function formatDate(date?: string, includeRelative = false) {
	const currentDate = new Date();
	if (!date?.includes("T")) {
		date = `${date}T00:00:00`;
	}
	const targetDate = new Date(date);

	const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
	const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
	const daysAgo = currentDate.getDate() - targetDate.getDate();

	let formattedDate = "";

	if (yearsAgo > 0) {
		formattedDate = `${yearsAgo}y ago`;
	} else if (monthsAgo > 0) {
		formattedDate = `${monthsAgo}mo ago`;
	} else if (daysAgo > 0) {
		formattedDate = `${daysAgo}d ago`;
	} else {
		formattedDate = "Today";
	}

	const fullDate = targetDate.toLocaleString("en-us", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});

	if (!includeRelative) {
		return fullDate;
	}

	return `${fullDate} (${formattedDate})`;
}

export const categoryBackgrounds: Record<CategorySlug, string> = {
	breads: "custom-bg-1",
	cookies: "custom-bg-2",
	desserts: "custom-bg-3",
	extras: "custom-bg-4",
	"main-dishes": "custom-bg-5",
	"veggie-dishes": "custom-bg-6",
	appetizers: "custom-bg-7",
	"drinks-sauces": "custom-bg-2",
	"soups-salads": "custom-bg-9",
};
