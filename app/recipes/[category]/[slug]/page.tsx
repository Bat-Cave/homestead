import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getRecipes } from "../../utils";
import { CategorySlug, categories } from "../categories";

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

	console.log({ recipe });

	return (
		<section className="max-w-xl mx-auto w-full">
			<Link
				href={`/recipes/${category}`}
				className="flex items-center gap-2 hover:underline"
			>
				<ArrowLeft />
				<span>Back to {validCategory.name}</span>
			</Link>
			<h1 className="title font-semibold text-2xl tracking-tighter mt-4">
				{recipe.metadata.title}
			</h1>
			<div className="flex justify-between items-center mt-2 mb-8 text-sm">
				<p className="text-sm text-neutral-600 dark:text-neutral-400">
					{formatDate(recipe.metadata.publishedAt)}
				</p>
			</div>
			<article className="prose">
				{/* <CustomMDX source={post.content} /> */}
			</article>
		</section>
	);
}
