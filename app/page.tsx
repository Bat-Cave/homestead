import { ArrowRight } from "lucide-react";
import Link from "next/link";

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
			<h1 className="title font-semibold text-3xl tracking-tighter mb-4 flex items-center gap-2">
				My Favorite Recipes
			</h1>
			<p>
				This website contains recipes from many sources, but the majority are
				from a cookbook I recieved from my mom as a gift. My goal is not to
				replace the cookbook, rather to have a place to share and make recipe
				revisions (when needed). If you don&apos;t need any of the features this
				website offers, please{" "}
				<Link
					href="/cookbook"
					className="underline font-semibold text-violet-800 dark:text-violet-500 hover:underline"
				>
					prioritize using the cookbook over this website.
				</Link>
			</p>
			<p className="mt-4">
				Another purpose of this website is to create a &quot;menu&quot; for our
				household to help make it easier to decide what to eat.
			</p>
			<div className="flex gap-2 my-8">
				<Link
					href="/recipes"
					className="btn btn-solid flex overflow-hidden group items-center w-max"
				>
					View Recipes{" "}
					<ArrowRight className="size-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
				</Link>
				<Link
					href="/guides"
					className="btn btn-solid-secondary flex overflow-hidden group items-center w-max"
				>
					View Guides{" "}
					<ArrowRight className="size-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
				</Link>
			</div>
		</section>
	);
}
