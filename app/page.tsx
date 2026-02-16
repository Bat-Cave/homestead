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
				Rico&apos;s Homestead
			</h1>
			<p>
				I&apos;ve been doing a lot of homesteading stuff lately. From working
				out in the garden to learning new recipes, there are things I&apos;m
				learning that I want to keep somewhere I can easily access and update as
				I go. This is that place. If you&apos;ve found it, I hope you find it as
				useful as I do.
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
					href="/garden"
					className="btn btn-solid-secondary flex overflow-hidden group items-center w-max"
				>
					View Garden{" "}
					<ArrowRight className="size-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
				</Link>
			</div>
		</section>
	);
}
