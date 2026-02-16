import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getGardenEntries } from "../utils";

export default function GardenGuidesPage() {
	const entries = [...getGardenEntries()].sort((a, b) =>
		a.title.localeCompare(b.title),
	);

	return (
		<section className="max-w-xl mx-auto w-full">
			<Link href="/garden" className="flex items-center gap-2 hover:underline">
				<ArrowLeft aria-hidden="true" />
				<span>
					Back to{" "}
					<span className="font-semibold text-violet-800 dark:text-violet-400">
						Garden
					</span>
				</span>
			</Link>
			<h1 className="title font-semibold text-2xl tracking-tighter mt-4 mb-8">
				Garden Guides
			</h1>
			<ul className="space-y-4">
				{entries.map((entry) => (
					<li key={entry.slug}>
						<Link
							href={`/garden/guides/${entry.slug}`}
							className="group inline-flex flex-col items-start"
						>
							<span className="font-semibold text-lg group-hover:underline">
								{entry.title}
							</span>
							<span className="text-sm text-neutral-700 dark:text-neutral-300">
								{entry.description}
							</span>
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
}
