import type { ReactNode } from "react";
import type { CategorySlug } from "../[category]/categories";

export type Ingredient = {
	name: string;
	quantity: number;
	unit: IngredientUnit;
	alternatives?: string[];
};

export type IngredientUnit =
	| "cup"
	| "tbsp"
	| "tsp"
	| "fl oz"
	| "oz"
	| "lb"
	| "g"
	| "kg"
	| "ml"
	| "l"
	| "pt"
	| "qt"
	| "gal"
	| "pinch"
	| "dash"
	| "can"
	| "pkg"
	| "box"
	| "bunch"
	| "clove"
	| "head"
	| "stalk"
	| "slice"
	| "piece"
	| "whole"
	| "half"
	| "quarter"
	| "doz"
	| "handful"
	| "sprig"
	| "leaf"
	| "strip"
	| "unit"
	| "to taste"
	| "as needed"
	| "";

export interface UnitDefinition {
	name: string;
	value: IngredientUnit;
	plural: string;
}

export interface Recipe {
	slug: string;
	title: string;
	publishedAt: string;
	category: CategorySlug;
	servings: number;
	servingUnits: [string, string];
	ingredients: Ingredient[];
	revisedFrom?: string;
	acknowledgments?: string[];
	prepTime?: string | number;
	cookTime?: string;
	steps: ReactNode[];
}
