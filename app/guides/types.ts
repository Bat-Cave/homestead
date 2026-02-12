import type { CategorySlug } from "./[category]/categories";

export type Guide = {
	slug: string;
	category: CategorySlug;
	title: string;
	description: string;
	tags: string[];
	filePath: string;
};

export type GuideWithContent = Guide & {
	content: React.ReactNode;
};
