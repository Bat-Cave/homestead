import fs from "node:fs";
import path from "node:path";
import { compileMDX } from "next-mdx-remote/rsc";
import { cache } from "react";
import { type CategorySlug, categories } from "./[category]/categories";
import type { Guide, GuideWithContent } from "./types";

const guidesDirectory = path.join(process.cwd(), "app", "guides", "content");

const validCategories = new Set(categories.map((category) => category.slug));

function getAllGuideFiles(dir: string): string[] {
	if (!fs.existsSync(dir)) return [];
	const entries = fs.readdirSync(dir, { withFileTypes: true });
	return entries.flatMap((entry) => {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			return getAllGuideFiles(fullPath);
		}
		if (entry.isFile() && fullPath.endsWith(".md")) {
			return [fullPath];
		}
		return [];
	});
}

function validateFrontmatter(data: Record<string, unknown>, filePath: string) {
	const requiredFields = ["title", "description", "category", "tags"] as const;
	for (const field of requiredFields) {
		if (!(field in data)) {
			throw new Error(`Missing frontmatter field "${field}" in ${filePath}`);
		}
	}
	if (typeof data.title !== "string") {
		throw new Error(`Frontmatter "title" must be a string in ${filePath}`);
	}
	if (typeof data.description !== "string") {
		throw new Error(
			`Frontmatter "description" must be a string in ${filePath}`,
		);
	}
	if (typeof data.category !== "string") {
		throw new Error(`Frontmatter "category" must be a string in ${filePath}`);
	}
	if (!validCategories.has(data.category as CategorySlug)) {
		throw new Error(
			`Frontmatter "category" must be one of ${[...validCategories].join(
				", ",
			)} in ${filePath}`,
		);
	}
	if (!Array.isArray(data.tags)) {
		throw new Error(`Frontmatter "tags" must be an array in ${filePath}`);
	}
}

function parseFrontmatter(fileContents: string, filePath: string) {
	const lines = fileContents.split(/\r?\n/);
	if (lines[0]?.trim() !== "---") {
		throw new Error(`Missing frontmatter start marker in ${filePath}`);
	}
	const endIndex = lines.findIndex(
		(line, index) => index > 0 && line.trim() === "---",
	);
	if (endIndex === -1) {
		throw new Error(`Missing frontmatter end marker in ${filePath}`);
	}
	const frontmatterLines = lines.slice(1, endIndex);
	const content = lines.slice(endIndex + 1).join("\n");
	const data: Record<string, unknown> = {};

	for (const rawLine of frontmatterLines) {
		const line = rawLine.trim();
		if (!line) continue;
		const [rawKey, ...rest] = line.split(":");
		const key = rawKey?.trim();
		if (!key || rest.length === 0) continue;
		const rawValue = rest.join(":").trim();

		if (rawValue.startsWith("[") && rawValue.endsWith("]")) {
			const inner = rawValue.slice(1, -1).trim();
			if (!inner) {
				data[key] = [];
			} else {
				data[key] = inner
					.split(",")
					.map((item) => item.trim().replace(/^\"|\"$/g, ""));
			}
			continue;
		}

		data[key] = rawValue.replace(/^\"|\"$/g, "");
	}

	return { data, content };
}

function parseGuideFile(filePath: string): Guide {
	const fileContents = fs.readFileSync(filePath, "utf8");
	const { data } = parseFrontmatter(fileContents, filePath);
	validateFrontmatter(data as Record<string, unknown>, filePath);

	const slug = path.basename(filePath, path.extname(filePath));
	return {
		slug,
		category: data.category as CategorySlug,
		title: data.title as string,
		description: data.description as string,
		tags: data.tags as string[],
		filePath,
	};
}

function getGuidesUncached(category?: CategorySlug): Guide[] {
	const files = getAllGuideFiles(guidesDirectory);
	const guides = files.map(parseGuideFile);
	if (category) {
		return guides.filter((guide) => guide.category === category);
	}
	return guides;
}

export const getGuides = cache(getGuidesUncached);

export const categoryBackgrounds: Record<CategorySlug, string> = {
	gardening: "custom-bg-1",
	"kitchen-techniques": "custom-bg-4",
};

async function getGuideBySlugUncached(
	category: CategorySlug,
	slug: string,
): Promise<GuideWithContent | undefined> {
	const guide = getGuidesUncached(category).find((item) => item.slug === slug);

	if (!guide) return undefined;

	const fileContents = fs.readFileSync(guide.filePath, "utf8");
	const { content, data } = parseFrontmatter(fileContents, guide.filePath);
	validateFrontmatter(data as Record<string, unknown>, guide.filePath);

	const { content: compiled } = await compileMDX({ source: content });

	return {
		...guide,
		content: compiled,
	};
}

export const getGuideBySlug = cache(getGuideBySlugUncached);
