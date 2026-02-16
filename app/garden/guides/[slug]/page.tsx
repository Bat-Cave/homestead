import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGardenEntries, getGardenEntryBySlug } from "../../utils";

export const metadata = {
	robots: {
		index: false,
		follow: false,
		nocache: true,
	},
};

export async function generateStaticParams() {
	return getGardenEntries().map((entry) => ({
		slug: entry.slug,
	}));
}

export default async function GardenEntryPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const entry = await getGardenEntryBySlug(slug);

	if (!entry) {
		return notFound();
	}

	return (
		<main className="max-w-xl mx-auto w-full">
			<Link href="/garden/guides" className="flex items-center gap-2 hover:underline">
				<ArrowLeft aria-hidden="true" />
				<span>
					Back to{" "}
					<span className="font-semibold text-violet-800 dark:text-violet-400">
						Garden Guides
					</span>
				</span>
			</Link>
			<article className="prose">
				<h1>{entry.title}</h1>
				<p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
					{entry.description}
				</p>
				<div className="mt-6">{entry.content}</div>
			</article>
		</main>
	);
}
