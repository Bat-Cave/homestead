import { formatDate } from "@/app/recipes/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Video from "@/components/video";
import { gardenUpdateFiles } from "./garden-update-files";

export default function GardenVlogPage() {
	const sortedGardenUpdateFiles = [...gardenUpdateFiles].sort(
		(a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
	);

	return (
		<section className="max-w-xl mx-auto w-full">
			<h1 className="title font-semibold text-2xl tracking-tighter mt-4 mb-8">
				Garden Vlog
			</h1>
			<div className="space-y-8">
				{sortedGardenUpdateFiles.map((file) => (
					<article key={file.playbackId} className="max-w-[420px] mx-auto">
						<p className="text-sm text-muted-foreground">
							{formatDate(file.timestamp)}
						</p>
						<div>
							<AspectRatio ratio={9 / 16}>
								<Video playbackId={file.playbackId} />
							</AspectRatio>
						</div>
					</article>
				))}
			</div>
		</section>
	);
}
