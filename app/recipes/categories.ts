export const categories = [
	{
		name: "Appetizers",
		slug: "appetizers",
	},
	{
		name: "Drinks/Sauces",
		slug: "drinks-sauces",
	},
	{
		name: "Soups/Salads",
		slug: "soups-salads",
	},
	{
		name: "Veggie Dishes",
		slug: "veggie-dishes",
	},
	{
		name: "Main Dishes",
		slug: "main-dishes",
	},
	{
		name: "Breads",
		slug: "breads",
	},
	{
		name: "Desserts",
		slug: "desserts",
	},
	{
		name: "Extras",
		slug: "extras",
	},
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];
