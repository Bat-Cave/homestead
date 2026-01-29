"use client";

import { Thermometer } from "lucide-react";

// Temperature in F
export const RecipeTemperature = ({ temperature }: { temperature: number }) => {
	return (
		<span className="font-semibold text-amber-800 dark:text-amber-300 after:absolute relative after:inset-x-0 after:-inset-y-px after:bg-amber-300/50 dark:after:bg-amber-800/50 after:rounded-md after:border after:border-amber-400/70 dark:after:border-amber-800/70 after:z-[-1] px-2 inline-flex items-center gap-2 transition-all duration-200 leading-none pt-0.5 pb-px tabular-nums">
			{temperature}°F <Thermometer className="size-3.5 -mt-0.5" />
		</span>
	);
};
