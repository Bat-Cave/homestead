import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Recipe } from "../content/types";
import { categoryBackgrounds, getRecipes } from "../utils";

export const metadata = {
	robots: {
		index: false,
		follow: false,
		nocache: true,
	},
};

export default function AllRecipesPage() {
	const recipes = [...getRecipes()].sort((a, b) =>
		a.title.localeCompare(b.title),
	);

	return (
		<section className="max-w-xl mx-auto w-full">
			<Link
				href="/recipes"
				className="flex items-center gap-2 hover:underline mb-4"
			>
				<ArrowLeft aria-hidden="true" />
				<span>
					Back to{" "}
					<span className="font-semibold text-violet-800 dark:text-violet-400">
						Recipes
					</span>
				</span>
			</Link>
			<h1 className="title font-semibold text-2xl tracking-tighter mt-4 mb-8">
				All Recipes
			</h1>
			<ul className="space-y-3">
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
						<ul className="space-y-2 mt-2">
							{recipes.map((recipe) => (
								<li key={recipe.slug} className="flex flex-col items-start">
									<Link
										key={recipe.slug}
										href={`/recipes/${recipe.category}/${recipe.slug}`}
										className="group flex items-center gap-1"
									>
										<span className="inline-flex size-8 scale-50 rounded-full overflow-hidden items-center justify-center">
											<span
												className={cn(
													"size-full flex",
													categoryBackgrounds[recipe.category],
												)}
											/>
										</span>
										<span className="font-semibold text-lg group-hover:underline shrink-0">
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
