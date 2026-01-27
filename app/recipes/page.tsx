import Link from "next/link";
import { categories } from "./[category]/categories";
import { getRecipes } from "./utils";

export default function RecipesPage() {
	const recipes = getRecipes();

	console.log({ recipes });

	return (
		<section className="max-w-xl mx-auto w-full">
			<h1>Recipe Categories</h1>
			<ul>
				{categories.map((category) => {
					const recipeCount = recipes.filter(
						(recipe) => recipe.metadata.category === category.slug,
					).length;
					return (
						<li key={category.slug}>
							<Link href={`/recipes/${category.slug}`}>
								{category.name} ({recipeCount})
							</Link>
						</li>
					);
				})}
			</ul>
		</section>
	);
}
