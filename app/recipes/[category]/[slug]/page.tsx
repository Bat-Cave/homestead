import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
	Ingredients,
	ReactiveIngredient,
	ReactiveServings,
} from "@/components/ingredients";
import { CustomMDX } from "@/components/mdx";
import { RecipeListItem } from "@/components/recipe-list-item";
import { RecipeTemperature } from "@/components/recipe-temperature";
import { RecipeTime } from "@/components/recipe-time";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Video from "@/components/video";
import { cn } from "@/lib/utils";
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
		category: recipe.metadata.category,
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
				<CustomMDX
					source={recipe.content}
					components={{
						Ingredients,
						ReactiveIngredient,
						ReactiveServings,
						Video,
						Collapsible,
						CollapsibleTrigger,
						CollapsibleContent,
						RecipeTime,
						RecipeTemperature,
						ol: ({ children, ...props }) => (
							<ol className="list-decimal list-inside pl-10!" {...props}>
								{children.map((child: any, index: number) => {
									if (child.type === "li") {
										return (
											<RecipeListItem key={child.key + index} {...child.props}>
												{child.props.children}
											</RecipeListItem>
										);
									}
									return child;
								})}
							</ol>
						),
					}}
				/>
			</article>
		</main>
	);
}
