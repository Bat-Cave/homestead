"use client";

import { Check, CircleCheck, Timer } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Slider } from "@/components/ui/slider";
import { useTimer } from "@/hooks/useTimer";
import { formatSeconds } from "@/lib/string-utils";
import { cn } from "@/lib/utils";
import { useTimerStore } from "@/stores/timer";
import { TextMorph } from "./text-morph";

// Time in minutes
// RecipeTime takes an amount of time and gives the user the ability to start a timer for that amount of time.
// When clicked, the dialog opens and shows the timer with 3 buttons: Start, Pause, and Reset.
// The user should be able to close the dialog and the timer should continue running. Use a Zustand store to manage the timer state.
export const RecipeTime = ({
	time,
	step,
	range,
}:
	| {
			time: number;
			step: { number: string; name: string };
			range: undefined;
	  }
	| {
			time: undefined;
			step: { number: string; name: string };
			range: [number, number];
	  }) => {
	const initialTime = time ?? (range ? (range[0] + range[1]) / 2 : 0);
	const [internalTime, setInternalTime] = useState(initialTime);
	const [sliderValue, setSliderValue] = useState(initialTime);
	const [completed, setCompleted] = useState(false);
	const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const debouncedSetInternalTime = useCallback((value: number) => {
		if (debounceRef.current) clearTimeout(debounceRef.current);
		debounceRef.current = setTimeout(() => {
			setInternalTime(value);
			debounceRef.current = null;
		}, 200);
	}, []);

	useEffect(
		() => () => {
			if (debounceRef.current) clearTimeout(debounceRef.current);
		},
		[],
	);
	const { addTimer } = useTimerStore();
	const { timeLeft, status, start, pause, reset } = useTimer(
		internalTime * 60 * 1000,
		{
			interval: 100,
			onTimerEnd: () => {
				setCompleted(true);
			},
		},
	);

	const getTimeString = useCallback((time: number, numberOnly = false) => {
		const totalSeconds = Math.floor(time * 60);
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = totalSeconds % 60;
		const parts: string[] = [];
		if (hours > 0) {
			parts.push(
				numberOnly ? `${hours}` : `${hours} hour${hours > 1 ? "s" : ""}`,
			);
		}
		if (minutes > 0) {
			parts.push(
				numberOnly
					? `${minutes}`
					: `${minutes} minute${minutes > 1 ? "s" : ""}`,
			);
		}
		if (seconds > 0) {
			parts.push(
				numberOnly
					? `${seconds}`
					: `${seconds} second${seconds > 1 ? "s" : ""}`,
			);
		}
		return parts.length > 0 ? parts.join(" ") : "0 seconds";
	}, []);

	return (
		<Drawer handleOnly>
			<DrawerTrigger asChild>
				<button
					className={cn(
						"font-semibold text-fuchsia-800 dark:text-fuchsia-300 after:absolute relative after:inset-x-0 after:-inset-y-px after:bg-fuchsia-300/50 dark:after:bg-fuchsia-800/50 after:rounded-md after:border after:border-fuchsia-400/70 dark:after:border-fuchsia-800/70 after:z-[-1] px-2 inline-flex items-center gap-2 active:scale-95 cursor-pointer transition-all duration-200 leading-none py-0.5 tabular-nums",
						completed &&
							"text-green-800 dark:text-green-300 after:bg-green-300/50 dark:after:bg-green-800/50 after:border-green-400/70 dark:after:border-green-800/70",
					)}
				>
					{completed ? (
						<>
							<span>Completed</span>
							<Check className="size-3.5 -mt-0.5" />
						</>
					) : status === "stopped" ? (
						<>
							{range ? (
								<>
									{getTimeString(range[0], true)} - {getTimeString(range[1])}
								</>
							) : (
								getTimeString(internalTime)
							)}{" "}
							<Timer className="size-3.5 -mt-0.5" />
						</>
					) : (
						<>
							<TextMorph
								variants={{
									initial: {
										filter: "blur(5px)",
										opacity: 0,
										scale: 0.9,
									},
									animate: {
										filter: "blur(0px)",
										opacity: 1,
										scale: 1,
									},
									exit: {
										filter: "blur(5px)",
										opacity: 0,
										scale: 0.9,
									},
								}}
								transition={{
									type: "spring",
									bounce: 0,
									duration: 0.5,
								}}
							>
								{formatSeconds(Math.floor(timeLeft / 1000))}
							</TextMorph>{" "}
							<Timer className="size-3.5 animate-pulse -mt-0.5" />
						</>
					)}
				</button>
			</DrawerTrigger>
			<DrawerContent
				className="bg-transparent backdrop-blur-2xl pb-12"
				handleClassName="dark:bg-fuchsia-100"
			>
				<div className="max-w-xl mx-auto px-4">
					<DrawerHeader className="px-0 pb-0">
						<DrawerTitle
							className={cn(
								"text-fuchsia-400/80 dark:text-fuchsia-300/80 text-xl md:text-3xl text-left",
								completed && "text-green-400/80 dark:text-green-300/80 ",
							)}
						>
							Step {step.number}:
						</DrawerTitle>
						<DrawerDescription
							className={cn(
								"text-xl md:text-3xl font-semibold text-left text-white",
								completed && "text-green-400 dark:text-green-300",
							)}
						>
							{step.name}
						</DrawerDescription>
					</DrawerHeader>
					<AnimatePresence>
						{completed && (
							<motion.span
								initial={{ height: 0 }}
								animate={{ height: "auto" }}
								exit={{ height: 0 }}
								transition={{ type: "spring", bounce: 0, duration: 0.6 }}
								className="flex text-green-400 dark:text-green-300 items-center justify-center"
							>
								<CircleCheck className="size-12" />
							</motion.span>
						)}
						{!completed && (
							<motion.div
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: "auto" }}
								exit={{ opacity: 0, height: 0 }}
								transition={{ type: "spring", bounce: 0, duration: 0.6 }}
								className="flex flex-col items-center justify-center text-white"
							>
								<TextMorph
									variants={{
										initial: {
											filter: "blur(5px)",
											opacity: 0,
											scale: 0.9,
										},
										animate: {
											filter: "blur(0px)",
											opacity: 1,
											scale: 1,
										},
										exit: {
											filter: "blur(5px)",
											opacity: 0,
											scale: 0.9,
										},
									}}
									transition={{
										type: "spring",
										bounce: 0,
										duration: 0.5,
									}}
									className={cn(
										"text-6xl md:text-9xl font-bold tabular-nums mt-12",
										status === "paused"
											? "text-amber-200 dark:text-amber-200"
											: "text-white",
									)}
								>
									{formatSeconds(Math.floor(timeLeft / 1000))}
								</TextMorph>
								<AnimatePresence>
									{range && status === "stopped" && (
										<motion.div
											initial={{ opacity: 0, height: 0 }}
											animate={{ opacity: 1, height: "auto" }}
											exit={{ opacity: 0, height: 0 }}
											transition={{ type: "spring", bounce: 0, duration: 0.6 }}
											className="w-full flex flex-col opacity-50"
										>
											<div className="w-full flex justify-between gap-2 my-2">
												<p className="text-2xl font-bold">
													{formatSeconds(range[0] * 60)}
												</p>
												<p className="text-2xl font-bold">
													{formatSeconds(range[1] * 60)}
												</p>
											</div>
											<Slider
												value={[sliderValue]}
												onValueChange={(value) => {
													setSliderValue(value[0]);
													debouncedSetInternalTime(value[0]);
												}}
												onMouseDown={(e) => e.stopPropagation()}
												onMouseMove={(e) => e.stopPropagation()}
												min={range[0]}
												max={range[1]}
												step={1}
												className="w-full mb-8"
											/>
										</motion.div>
									)}
								</AnimatePresence>
								<motion.div className="flex flex-row gap-2 mt-12">
									<button
										className={cn(
											"btn",
											status === "started"
												? "btn-outline-warning"
												: "btn-outline-success",
										)}
										onClick={() => {
											if (status === "started") {
												pause();
											} else {
												start();
											}
										}}
									>
										{status === "started" ? "Pause" : "Start"}
									</button>
									<button
										className="btn btn-outline-destructive"
										onClick={() => {
											reset();
											setSliderValue(initialTime);
											debouncedSetInternalTime(initialTime);
										}}
									>
										Reset
									</button>
								</motion.div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</DrawerContent>
		</Drawer>
	);
};
