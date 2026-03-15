import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Ingredients } from "@/components/ingredients";
import { RecipeListItem } from "@/components/recipe-list-item";

import { getRecipeBySlug, getRecipes } from "../utils";

export const metadata = {
	robots: {
		index: false,
		follow: false,
		nocache: true,
	},
};

// Generate static params at build time for all recipe pages
export async function generateStaticParams() {
	const allRecipes = getRecipes();
	return allRecipes.map((recipe) => ({
		slug: recipe.slug,
	}));
}

export default async function RecipePage({
	params,
	searchParams,
}: {
	params: Promise<{ slug: string }>;
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const { slug } = await params;
	const searchParamsObject = await searchParams;
	const search = searchParamsObject?.search as string | undefined;
	const hasSearch = (search?.length ?? 0) > 0;
	const recipe = getRecipeBySlug(slug);

	if (!recipe) {
		return notFound();
	}

	return (
		<main className="max-w-xl mx-auto w-full">
			<Link
				href={hasSearch ? `/recipes?search=${search}` : `/recipes`}
				className="flex items-center gap-2 hover:underline"
			>
				<ArrowLeft aria-hidden="true" />
				<span>
					Back to{" "}
					<span className="font-semibold text-violet-800 dark:text-violet-400">
						All Recipes
					</span>
				</span>
			</Link>
			<article className="prose">
				<h1>{recipe.title}</h1>
				{recipe.sourceUrl && (
					<p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
						Source:{" "}
						<a
							href={recipe.sourceUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="underline hover:text-zinc-700 dark:hover:text-zinc-300"
						>
							Original recipe
						</a>
					</p>
				)}
				<h2>Ingredients</h2>
				<Ingredients
					slug={recipe.slug}
					servings={recipe.servings}
					servingUnits={recipe.servingUnits}
					ingredients={recipe.ingredients}
				/>
				<h2>Directions</h2>
				<ol className="list-decimal list-inside pl-10!">
					{recipe.steps.map((step, index) => (
						<RecipeListItem key={`${recipe.slug}-step-${index + 1}`}>
							{step}
						</RecipeListItem>
					))}
				</ol>
			</article>
		</main>
	);
}
