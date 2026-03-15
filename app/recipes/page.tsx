import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import SearchRecipes from "./search-recipes";
import { getRecipes } from "./utils";

export const metadata = {
	robots: {
		index: false,
		follow: false,
		nocache: true,
	},
};

export default function Home() {
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

			<p className="mb-4">
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
			<SearchRecipes recipes={getRecipes()} />
		</section>
	);
}
