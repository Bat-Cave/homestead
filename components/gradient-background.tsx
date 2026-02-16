"use client";

import {
	animate,
	type MotionStyle,
	motion,
	useMotionValue,
	type ValueAnimationTransition,
} from "motion/react";
import { useTheme } from "next-themes";
import { useLayoutEffect, useState } from "react";

const spring: ValueAnimationTransition = {
	type: "spring",
	bounce: 0,
	duration: 0.3,
};

export default function GradientBackground({
	children,
}: {
	children: React.ReactNode;
}) {
	const [canAnimate, setCanAnimate] = useState(false);
	const { resolvedTheme } = useTheme();
	const gradientFrom = useMotionValue("#d4d4d4");
	const gradientTo = useMotionValue("#ddd6fe");
	const textColor = useMotionValue("#000000");

	useLayoutEffect(() => {
		if (!!resolvedTheme && !canAnimate) {
			setCanAnimate(true);
			gradientFrom.set(resolvedTheme === "dark" ? "#171717" : "#d4d4d4");
			gradientTo.set(resolvedTheme === "dark" ? "#2e1065" : "#ddd6fe");
			textColor.set(resolvedTheme === "dark" ? "#ffffff" : "#000000");
		}
	}, [resolvedTheme, canAnimate, gradientFrom, gradientTo, textColor]);

	useLayoutEffect(() => {
		if (canAnimate) {
			void animate(
				gradientFrom,
				resolvedTheme === "dark" ? "#171717" : "#d4d4d4",
				spring,
			);
			void animate(
				gradientTo,
				resolvedTheme === "dark" ? "#2e1065" : "#ddd6fe",
				spring,
			);
			void animate(
				textColor,
				resolvedTheme === "dark" ? "#ffffff" : "#000000",
				spring,
			);
		}
	}, [resolvedTheme, canAnimate, gradientFrom, gradientTo, textColor]);

	return (
		<motion.div
			className="dark:text-white text-black"
			style={
				canAnimate
					? ({
							color: textColor,
						} as MotionStyle)
					: {}
			}
		>
			<motion.div
				style={
					canAnimate
						? ({
								"--tw-gradient-from": gradientFrom,
								"--tw-gradient-to": gradientTo,
								color: textColor,
							} as MotionStyle)
						: {}
				}
				className="fixed w-screen h-screen bg-gradient-to-b  dark:to-violet-950 to-violet-200 from-neutral-300 dark:from-neutral-900"
			/>
			{children}
		</motion.div>
	);
}
