import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
	robots: {
		index: false,
		follow: false,
		nocache: true,
	},
};

export default function GardenPage() {
	return (
		<section className="max-w-xl mx-auto w-full">
			<Link href="/" className="flex items-center gap-2 hover:underline mb-4">
				<ArrowLeft aria-hidden="true" />
				<span>
					Back to{" "}
					<span className="font-semibold text-violet-800 dark:text-violet-400">
						Home
					</span>
				</span>
			</Link>
			<h1 className="title font-semibold text-2xl tracking-tighter mt-4 mb-8">
				Garden Categories
			</h1>
			<p>
				I started a garden in some raised beds in the backyard of the house we
				are renting in Tucson. I first started with onions, carrots, and
				cilantro. Then I added some radishes, snap peas, and broccoli. That
				filled out one of the beds. Then my brother and I planeted tomatoes and
				jalepenos in the other raised bed, and some time after that, I added
				watermelon, cantaloupe, beets, more carrots, bell peppers, mint, and
				catnip. We also have an apricot tree!
			</p>

			<p className="my-4">
				I&apos;ve had fun learning new things about gardening and the various
				plants I&apos;ve been growing. I&apos;ve been documenting the garden
				progress through snap chats sent to my family. I&apos;ve made some of
				those videos available as a vlog here.{" "}
			</p>
			<div className="mt-8 flex flex-wrap gap-3">
				<Link href="/garden/guides" className="btn btn-solid">
					Garden Guides
				</Link>
				<Link href="/garden/vlog" className="btn btn-solid-secondary">
					Garden Vlog
				</Link>
			</div>
		</section>
	);
}
