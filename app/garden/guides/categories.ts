export const categories = [
	{
		name: "Gardening",
		slug: "gardening",
	},
	{
		name: "Kitchen Techniques",
		slug: "kitchen-techniques",
	},
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];
