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
			<p className="text-black/70 dark:text-white/70">
				This website contains recipes from a cookbook I recieved from my mom as
				a gift. My goal is not to replace the cookbook, rather to have a place
				to share and make recipe revisions (when needed). If you don&apos;t need
				any of the features this website offers, please{" "}
				<strong className="font-semibold text-black dark:text-white">
					prioritize the cookbook over this website.
				</strong>
			</p>
			<Link
				href="/recipes"
				className="btn btn-solid flex overflow-hidden group items-center w-max my-8"
			>
				View Recipes{" "}
				<ArrowRight className="size-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
			</Link>
			<p>A message from the cookbook:</p>
			<div className="italic space-y-4 pl-4 border-l-2">
				<h1 className="title font-semibold text-2xl tracking-tighter mt-4 flex items-center gap-2">
					Dear Family and Friends,
				</h1>
				<p>
					the inspiration for this recipe book came after 30 years of trying,
					testing, failing, and mastering. the recipes included are truly the
					favorites of our family. many are requested as birthday dinners or
					mass production for large crowds. what makes these recipes so magical
					is their ability to bring loved-ones together to enjoy great food and
					even better company.
				</p>
				<p>
					one of my favorite scripture stories is of Jesus feeding the thousands
					with five loaves and few fishes. he had compassion for these people
					who had been with him for three days with nothing to eat. He would not
					send them away hungry, so he performed a miracle which allowed them
					all to be fed.
				</p>
				<p>
					we need physical nourishment just as we need spiritual nourishment,
					and Jesus, the Master teacher, was our example of offering both.
				</p>
				<p>
					may you have many happy meals together with your family and friends!
				</p>
				<p>with love,</p>
				<p>mom/leann</p>
				<h2
					id="acknowledgments"
					className="title font-semibold text-2xl tracking-tighter flex items-center gap-2 mt-16"
				>
					Acknowledgments
				</h2>
				<p>
					great recipes do not materialize without time and effort in the
					kitchen. many wonderful people have contributed to the recipes
					included in the book. thank you all for adding deliciousness and
					flavor to our lives!
				</p>
				<ul className="list-disc list-inside">
					<li>Kathryn Hancock (Mimi)</li>
					<li>Grandma Larson</li>
					<li>Faith Jarvis (Aunt Faith)</li>
					<li>Emily Clonts (Aunt Em)</li>
					<li>Aunt Emily Hancock</li>
					<li>Aunt Brenda</li>
					<li>Aunt Karla</li>
					<li>Autn Josie Larson</li>
					<li>Sasha Wiltbank</li>
					<li>Patrice</li>
					<li>Jody Peck</li>
					<li>Rich</li>
					<li>
						a few cooking websites and blogs (their recipes have been tweaked to
						fit our tastes)
					</li>
				</ul>
				<p>
					a special thank you to Allie Hancock for typing recipes and designing
					casserole dish graphics.
				</p>
			</div>
		</section>
	);
}
