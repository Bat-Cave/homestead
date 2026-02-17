import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/app/recipes/utils";
import Video from "@/components/video";
import { gardenUpdateFiles } from "./garden-update-files";

export default function GardenVlogPage() {
	const sortedGardenUpdateFiles = [...gardenUpdateFiles].sort(
		(a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
	);

	return (
		<section className="max-w-xl mx-auto w-full">
			<Link
				href="/garden"
				className="flex items-center gap-2 hover:underline mb-4"
			>
				<ArrowLeft aria-hidden="true" />
				<span>
					Back to{" "}
					<span className="font-semibold text-violet-800 dark:text-violet-400">
						Garden
					</span>
				</span>
			</Link>
			<h1 className="title font-semibold text-2xl tracking-tighter mt-4 mb-8">
				Garden Vlog
			</h1>
			<div className="space-y-8">
				{sortedGardenUpdateFiles.map((file) => (
					<article key={file.playbackId} className="">
						<p className="text-sm text-muted-foreground">
							{formatDate(file.timestamp)}
						</p>
						<div>
							<Video playbackId={file.playbackId} />
						</div>
					</article>
				))}
			</div>
		</section>
	);
}
