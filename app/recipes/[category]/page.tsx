import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Recipe } from "../content/types";
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
				<span className="text-sm text-neutral-800 dark:text-neutral-300 ml-2 tracking-normal">
					{`${recipes.length} recipe${recipes.length === 1 ? "" : "s"}`}
				</span>
			</h1>
			<ul className="space-y-4">
				{Object.entries(
					[...recipes].reduce(
						(acc, recipe) => {
							const key = recipe.title.charAt(0).toLowerCase();
							if (!acc[key]) {
								acc[key] = [];
							}
							acc[key].push(recipe);
							return acc;
						},
						{} as Record<string, Recipe[]>,
					),
				).map(([key, recipes]) => (
					<li key={key} className="flex flex-col">
						<p className="uppercase font-semibold text-sm tracking-wider">
							{key}
						</p>
						<ul>
							{recipes.map((recipe) => (
								<li key={recipe.slug} className="flex flex-col">
									<Link
										key={recipe.slug}
										href={`/recipes/${category}/${recipe.slug}`}
										className="group"
									>
										<span className="font-semibold text-lg group-hover:underline">
											{recipe.title}
										</span>
										<span className="text-sm text-neutral-800 dark:text-neutral-300 ml-2">
											{recipe.servings}{" "}
											{recipe.servingUnits[recipe.servings > 1 ? 1 : 0]}
											{"  •  "}
											{recipe.prepTime != null && `${recipe.prepTime} min prep`}
											{recipe.prepTime != null &&
												recipe.cookTime != null &&
												", "}
											{recipe.cookTime != null && `${recipe.cookTime} min cook`}
											{recipe.acknowledgments && (
												<>
													&quot; • &quot;
													<span className="italic font-semibold">
														{recipe.acknowledgments?.join(", ")}
													</span>
												</>
											)}
										</span>
									</Link>
								</li>
							))}
						</ul>
					</li>
				))}
			</ul>
		</section>
	);
}
