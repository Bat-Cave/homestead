import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Ingredients } from "@/components/ingredients";
import { RecipeListItem } from "@/components/recipe-list-item";
import { getRecipes } from "../../utils";
import { CategorySlug, categories } from "../categories";

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
		category: recipe.category,
		slug: recipe.slug,
	}));
}

export default async function RecipePage({
	params,
}: {
	params: Promise<{ category: CategorySlug; slug: string }>;
}) {
	const { category, slug } = await params;
	const recipe = getRecipes(category).find((r) => r.slug === slug);

	const validCategory = categories.find((c) => c.slug === category);
	if (!validCategory) {
		return notFound();
	}

	if (!recipe) {
		return notFound();
	}

	return (
		<main className="max-w-xl mx-auto w-full">
			<Link
				href={`/recipes/${category}`}
				className="flex items-center gap-2 hover:underline"
			>
				<ArrowLeft aria-hidden="true" />
				<span>
					Back to{" "}
					<span className="font-semibold text-violet-800 dark:text-violet-400">
						{validCategory.name}
					</span>
				</span>
			</Link>
			<article className="prose">
				<h1>{recipe.title}</h1>
				<h2>Ingredients</h2>
				<Ingredients
					slug={recipe.slug}
					servings={recipe.servings}
					servingUnits={recipe.servingUnits}
				/>
				<h2>Directions</h2>
				<ol className="list-decimal list-inside pl-10!">
					{recipe.steps.map((step, i) => (
						<RecipeListItem key={i}>{step}</RecipeListItem>
					))}
				</ol>
			</article>
		</main>
	);
}
