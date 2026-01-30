import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { categoryBackgrounds, getRecipes } from "../utils";
import { CategorySlug, categories } from "./categories";

export const metadata = {
	robots: {
		index: false,
		follow: false,
		nocache: true,
	},
};

// Generate static params at build time for all category pages
export async function generateStaticParams() {
	return categories.map((category) => ({
		category: category.slug,
	}));
}

export default async function RecipeCategoriesPage({
	params,
}: {
	params: Promise<{ category: CategorySlug }>;
}) {
	const { category } = await params;

	const validCategory = categories.find((c) => c.slug === category);

	if (!validCategory) {
		return notFound();
	}
	const recipes = getRecipes(validCategory.slug);

	return (
		<section className="max-w-xl mx-auto w-full">
			<Link
				href={`/recipes`}
				className="flex items-center gap-2 hover:underline"
			>
				<ArrowLeft aria-hidden="true" />
				<span>
					Back to{" "}
					<span className="font-semibold text-violet-800 dark:text-violet-400">
						All Categories
					</span>
				</span>
			</Link>
			<h1 className="title font-semibold text-2xl tracking-tighter mt-4 flex items-center gap-2 mb-8">
				<span className="inline-flex size-8 rounded-full overflow-hidden items-center justify-center">
					<span
						style={{ backgroundSize: "50%" }}
						className={cn(
							"size-full flex bg-center",
							categoryBackgrounds[category],
						)}
					/>
				</span>
				{validCategory.name}
				<Badge className="text-sm bg-violet-800 dark:bg-violet-400 ml-4">
					{recipes.length} recipe{recipes.length === 1 ? "" : "s"}
				</Badge>
			</h1>
			<ul className="space-y-4">
				{[...recipes]
					.sort((a, b) => a.metadata.title.localeCompare(b.metadata.title))
					.map(({ slug, metadata }) => (
						<li key={slug} className="flex flex-col">
							<Link href={`/recipes/${category}/${slug}`} className="group">
								<span className="font-semibold text-lg group-hover:underline">
									{metadata.title}
								</span>
								<span className="text-sm text-neutral-800 dark:text-neutral-300 ml-2">
									{metadata.servings}{" "}
									{
										metadata?.servingUnits?.[
											metadata?.servings && metadata?.servings > 1 ? 1 : 0
										]
									}
									{"  •  "}
									{metadata.prepTime} min prep, {metadata.cookTime} min cook
									{"  •  "}
									<span className="italic font-semibold">
										{metadata.acknowledgments?.join(", ")}
									</span>
								</span>
							</Link>
						</li>
					))}
			</ul>
		</section>
	);
}
