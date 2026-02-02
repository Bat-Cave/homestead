import { cache } from "react";
import { CategorySlug } from "./[category]/categories";
import { allRecipes } from "./content/recipes";
import type { Recipe } from "./content/types";

function getRecipesUncached(category?: CategorySlug): Recipe[] {
	if (category) {
		return allRecipes.filter((recipe) => recipe.category === category);
	}
	return allRecipes;
}

function getRecipeBySlugUncached(slug: string): Recipe | undefined {
	return allRecipes.find((recipe) => recipe.slug === slug);
}

export const getRecipeBySlug = cache(getRecipeBySlugUncached);

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
	appetizers: "custom-bg-1",
	breads: "custom-bg-2 bg-center",
	desserts: "custom-bg-3",
	"drinks-sauces": "custom-bg-4",
	extras: "custom-bg-5",
	"main-dishes": "custom-bg-6",
	"soups-salads": "custom-bg-7 bg-center",
	"veggie-dishes": "custom-bg-8 bg-center",
};
