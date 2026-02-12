import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuideBySlug, getGuides } from "../../utils";
import { type CategorySlug, categories } from "../categories";

export const metadata = {
	robots: {
		index: false,
		follow: false,
		nocache: true,
	},
};

export async function generateStaticParams() {
	return categories.flatMap((category) =>
		getGuides(category.slug).map((guide) => ({
			category: guide.category,
			slug: guide.slug,
		})),
	);
}

export default async function GuidePage({
	params,
}: {
	params: Promise<{ category: CategorySlug; slug: string }>;
}) {
	const { category, slug } = await params;
	const validCategory = categories.find((c) => c.slug === category);

	if (!validCategory) {
		return notFound();
	}

	const guide = await getGuideBySlug(category, slug);

	if (!guide) {
		return notFound();
	}

	return (
		<main className="max-w-xl mx-auto w-full">
			<Link
				href={`/guides/${category}`}
				className="flex items-center gap-2 hover:underline"
			>
				<ArrowLeft aria-hidden="true" />
				<span>
					Back to{" "}
					<span className="font-semibold text-violet-800 dark:text-violet-400">
						{validCategory.name}
					</span>
				</span>
			</Link>
			<article className="prose">
				<h1>{guide.title}</h1>
				<p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
					{guide.description}
				</p>
				<div className="mt-6">{guide.content}</div>
			</article>
		</main>
	);
}
