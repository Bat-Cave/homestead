import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { formatDate, getRecipes } from "./utils";

export const metadata = {
	robots: {
		index: false,
		follow: false,
		nocache: true,
	},
};

export default function Home() {
	const latestRecipes = [...getRecipes()]
		.sort(
			(a, b) =>
				new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
		)
		.slice(0, 3);

	return (
		<section className="max-w-xl mx-auto w-full">
			<Link href="/" className="flex items-center gap-2 hover:underline">
				<ArrowLeft aria-hidden="true" />
				<span>
					Back to{" "}
					<span className="font-semibold text-violet-800 dark:text-violet-400">
						Home
					</span>
				</span>
			</Link>
			<h1 className="title font-semibold text-2xl tracking-tighter mt-4 mb-8">
				My Favorite Recipes
			</h1>
			<p>
				This website contains recipes from many sources, but the majority are
				from a cookbook I recieved from my mom as a gift. My goal is not to
				replace the cookbook, rather to have a place to share and make recipe
				revisions (when needed) and add other recipes I find. If you don&apos;t
				need any of the features this website offers, please{" "}
				<Link
					href="/cookbook"
					className="underline font-semibold text-violet-800 dark:text-violet-500 hover:underline"
				>
					prioritize using the cookbook over this website.
				</Link>
			</p>
			<section className="mt-10">
				<h2 className="text-2xl font-semibold tracking-tight mb-4">
					Latest recipes
				</h2>
				<ul className="space-y-3">
					{latestRecipes.map((recipe) => (
						<li key={recipe.slug} className="flex items-center gap-2">
							<Link
								href={`/recipes/${recipe.category}/${recipe.slug}`}
								className="group inline-flex items-center gap-2"
							>
								<span className="text-lg font-medium group-hover:underline">
									{recipe.title}
								</span>
							</Link>
							<p className="text-sm text-neutral-700 dark:text-neutral-300">
								{formatDate(recipe.publishedAt)}
							</p>
						</li>
					))}
				</ul>
			</section>
			<div className="mt-8 flex flex-wrap gap-3">
				<Link href="/recipes/categories" className="btn btn-solid">
					View Recipes by Category
				</Link>
				<Link href="/recipes/all" className="btn btn-solid-secondary">
					View All Recipes
				</Link>
			</div>
		</section>
	);
}
