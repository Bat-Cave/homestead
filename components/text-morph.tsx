"use client";
import { AnimatePresence, motion, Transition, Variants } from "motion/react";
import { useId, useMemo } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

export type TextMorphProps = {
	children: string;
	as?: React.ElementType;
	className?: string;
	style?: React.CSSProperties;
	variants?: Variants;
	transition?: Transition;
	characterClassName?: string;
};

const defaultVariants: Variants = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
};

export const morphTransition: Transition = {
	type: "spring",
	stiffness: 280,
	damping: 18,
	mass: 0.3,
};

export function TextMorph({
	children,
	as: Component = "span",
	className,
	style,
	variants,
	transition,
	characterClassName,
}: TextMorphProps) {
	const uniqueId = useId();
	const prefersReducedMotion = usePrefersReducedMotion();

	const characters = useMemo(() => {
		const charCounts: Record<string, number> = {};

		return children.split("").map((char) => {
			const lowerChar = char.toLowerCase();
			charCounts[lowerChar] = (charCounts[lowerChar] || 0) + 1;

			return {
				id: `${uniqueId}-${lowerChar}${charCounts[lowerChar]}`,
				label: char === " " ? "\u00A0" : char,
			};
		});
	}, [children, uniqueId]);

	if (prefersReducedMotion) {
		return (
			<Component className={cn(className)} aria-label={children} style={style}>
				{children}
			</Component>
		);
	}

	return (
		<Component className={cn(className)} aria-label={children} style={style}>
			<AnimatePresence mode="popLayout" initial={false}>
				{characters.map((character) => (
					<motion.span
						key={character.id}
						layoutId={character.id}
						className={cn("inline-block", characterClassName)}
						aria-hidden="true"
						initial="initial"
						animate="animate"
						exit="exit"
						variants={variants || defaultVariants}
						transition={transition || morphTransition}
					>
						{character.label}
					</motion.span>
				))}
			</AnimatePresence>
		</Component>
	);
}
