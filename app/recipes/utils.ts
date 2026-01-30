import fs from "fs";
import path from "path";
import { cache } from "react";
import { CategorySlug } from "./[category]/categories";

interface Metadata {
	title: string;
	publishedAt: string;
	category: CategorySlug;
	servings?: number;
	servingUnits?: [string, string];
	acknowledgments?: string[];
	prepTime?: string;
	cookTime?: string;
}

function parseFrontmatter(fileContent: string) {
	const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
	const match = frontmatterRegex.exec(fileContent);
	const frontMatterBlock = match?.[1] ?? "";
	const content = fileContent.replace(frontmatterRegex, "").trim();
	const frontMatterLines = frontMatterBlock.trim().split("\n");
	const metadata: Metadata = {
		title: "",
		publishedAt: "",
		category: "extras",
		servings: 1,
		servingUnits: ["serving", "servings"],
		acknowledgments: [],
		prepTime: "",
		cookTime: "",
	};

	frontMatterLines.forEach((line) => {
		const [key, ...valueArr] = line.split(": ");
		let value = valueArr.join(": ").trim();
		value = value.replace(/^['"](.*)['"]$/, "$1"); // Remove quotes
		const trimmedKey = key.trim() as keyof Metadata;
		if (!trimmedKey || !value) return;

		// Handle type conversion based on the field type
		if (trimmedKey === "servings") {
			metadata.servings = Number(value);
		} else if (trimmedKey === "servingUnits") {
			metadata.servingUnits = value.split(",").map((item) => item.trim()) as [
				string,
				string,
			];
		} else if (trimmedKey === "category") {
			metadata.category = value as CategorySlug;
		} else if (trimmedKey === "title") {
			metadata.title = value;
		} else if (trimmedKey === "publishedAt") {
			metadata.publishedAt = value;
		} else if (trimmedKey === "acknowledgments") {
			metadata.acknowledgments = value.split(",").map((item) => item.trim());
		} else if (trimmedKey === "prepTime") {
			metadata.prepTime = value;
		} else if (trimmedKey === "cookTime") {
			metadata.cookTime = value;
		}
	});

	return { metadata: metadata as Metadata, content };
}

function getMDXFiles(dir: string) {
	return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
	const rawContent = fs.readFileSync(filePath, "utf-8");
	return parseFrontmatter(rawContent);
}

function getMDXData(dir: string, category?: CategorySlug) {
	let mdxFiles = getMDXFiles(dir);

	if (category) {
		mdxFiles = mdxFiles.filter((file) => {
			const { metadata } = readMDXFile(path.join(dir, file));
			return metadata.category === category;
		});
	}

	return mdxFiles.map((file) => {
		const { metadata, content } = readMDXFile(path.join(dir, file));
		const slug = path.basename(file, path.extname(file));

		return {
			metadata,
			slug,
			content,
		};
	});
}

// Use React.cache() for per-request deduplication (server-cache-react)
const getRecipesUncached = (category?: CategorySlug) => {
	return getMDXData(
		path.join(process.cwd(), "app", "recipes", "content"),
		category,
	);
};

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
