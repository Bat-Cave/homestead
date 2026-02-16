export type GardenEntry = {
	slug: string;
	title: string;
	description: string;
	tags: string[];
	filePath: string;
};

export type GardenEntryWithContent = GardenEntry & {
	content: React.ReactNode;
};
