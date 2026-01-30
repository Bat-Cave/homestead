"use client";

import { Thermometer } from "lucide-react";

// Temperature in F
export const RecipeTemperature = ({ temperature }: { temperature: number }) => {
	return (
		<span className="font-semibold after:absolute relative after:inset-x-0 after:-inset-y-px after:bg-amber-300/50 dark:after:bg-amber-800/50 after:rounded-md after:border after:border-amber-400/70 dark:after:border-amber-800/70 after:z-[-1] px-2 inline-flex items-center gap-2 transition-all duration-200 leading-none pt-0.5 pb-px tabular-nums bg-linear-to-b from-amber-600 dark:from-amber-100 to-amber-900 dark:to-amber-400 bg-clip-text text-transparent">
			{temperature}°F{" "}
			<Thermometer className="size-3.5 -mt-0.5 text-amber-800 dark:text-amber-400" />
		</span>
	);
};
