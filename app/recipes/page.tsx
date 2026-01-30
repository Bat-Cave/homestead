import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { categories } from "./[category]/categories";
import { categoryBackgrounds, getRecipes } from "./utils";

export const metadata = {
	robots: {
		index: false,
		follow: false,
		nocache: true,
	},
};

export default function RecipesPage() {
	const recipes = getRecipes();

	return (
		<section className="max-w-xl mx-auto w-full">
			<h1 className="title font-semibold text-2xl tracking-tighter mt-4 mb-8">
				Recipe Categories
			</h1>
			<ul className="space-y-4">
				{[...categories]
					.sort((a, b) => a.name.localeCompare(b.name))
					.map((category) => {
						const recipeCount = recipes.filter(
							(recipe) => recipe.category === category.slug,
						).length;
						if (recipeCount === 0) return null;
						return (
							<li key={category.slug}>
								<Link
									href={`/recipes/${category.slug}`}
									className="text-xl font-medium flex items-center gap-4 group"
								>
									<span className="inline-flex size-8 rounded-full overflow-hidden items-center justify-center">
										<span
											style={{ backgroundSize: "50%" }}
											className={cn(
												"size-full flex bg-center",
												categoryBackgrounds[category.slug],
											)}
										/>
									</span>
									<span className="group-hover:underline">
										{category.name}{" "}
									</span>
									<span className="text-sm text-neutral-800 dark:text-neutral-300 ml-2">
										{`${recipeCount} recipe${recipeCount === 1 ? "" : "s"}`}
									</span>
								</Link>
							</li>
						);
					})}
			</ul>
		</section>
	);
}
