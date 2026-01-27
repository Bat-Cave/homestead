import { notFound } from "next/navigation";
import { categories } from "./categories";
import { getRecipes } from "../utils";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function RecipeCategoriesPage({
	params,
}: {
	params: Promise<{ category: string }>;
}) {
	const { category } = await params;

	const validCategory = categories.find((c) => c.slug === category);

	if (!validCategory) {
		return notFound();
	}
	const recipes = getRecipes(validCategory.slug);

	console.log({ recipes });

	return (
		<section className="max-w-xl mx-auto w-full">
			<Link
				href={`/recipes`}
				className="flex items-center gap-2 hover:underline"
			>
				<ArrowLeft />
				<span>Back to all categories</span>
			</Link>
			<h1 className="title font-semibold text-2xl tracking-tighter mt-4">
				{validCategory.name}
			</h1>
			<div className="flex justify-between items-center mt-2 mb-8 text-sm">
				{recipes.length} recipe{recipes.length === 1 ? "" : "s"}
			</div>
			<ul>
				{recipes.map((recipe) => (
					<li key={recipe.slug}>
						<Link href={`/recipes/${category}/${recipe.slug}`} className="hover:underline">
							{recipe.metadata.title}
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
}
