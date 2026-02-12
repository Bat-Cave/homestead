import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import type { Guide } from "../types";
import { categoryBackgrounds, getGuides } from "../utils";
import { type CategorySlug, categories } from "./categories";

export const metadata = {
	robots: {
		index: false,
		follow: false,
		nocache: true,
	},
};

export async function generateStaticParams() {
	return categories.map((category) => ({
		category: category.slug,
	}));
}

export default async function GuidesCategoryPage({
	params,
}: {
	params: Promise<{ category: CategorySlug }>;
}) {
	const { category } = await params;

	const validCategory = categories.find((c) => c.slug === category);

	if (!validCategory) {
		return notFound();
	}

	const guides = getGuides(validCategory.slug).sort((a, b) =>
		a.title.localeCompare(b.title),
	);

	return (
		<section className="max-w-xl mx-auto w-full">
			<Link href="/guides" className="flex items-center gap-2 hover:underline">
				<ArrowLeft aria-hidden="true" />
				<span>
					Back to{" "}
					<span className="font-semibold text-violet-800 dark:text-violet-400">
						All Categories
					</span>
				</span>
			</Link>
			<h1 className="title font-semibold text-2xl tracking-tighter mt-4 flex items-center gap-2 mb-8">
				<span className="inline-flex size-8 rounded-full overflow-hidden items-center justify-center">
					<span
						className={cn(
							"size-full flex",
							categoryBackgrounds[category],
						)}
					/>
				</span>
				{validCategory.name}
				<span className="text-sm text-neutral-800 dark:text-neutral-300 ml-2 tracking-normal">
					{`${guides.length} guide${guides.length === 1 ? "" : "s"}`}
				</span>
			</h1>
			<ul className="space-y-4">
				{Object.entries(
					[...guides].reduce(
						(acc, guide) => {
							const key = guide.title.charAt(0).toLowerCase();
							if (!acc[key]) {
								acc[key] = [];
							}
							acc[key].push(guide);
							return acc;
						},
						{} as Record<string, Guide[]>,
					),
				).map(([key, guides]) => (
					<li key={key} className="flex flex-col">
						<p className="uppercase font-semibold text-sm tracking-wider">
							{key}
						</p>
						<ul className="space-y-2 mt-2">
							{guides.map((guide) => (
								<li key={guide.slug} className="flex flex-col items-start">
									<Link
										href={`/guides/${category}/${guide.slug}`}
										className="group"
									>
										<span className="font-semibold text-lg group-hover:underline">
											{guide.title}
										</span>
										<span className="text-sm text-neutral-800 dark:text-neutral-300 ml-2">
											{guide.description}
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
