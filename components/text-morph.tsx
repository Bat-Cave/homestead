"use client";
import {
	AnimatePresence,
	LazyMotion,
	Transition,
	Variants,
	domAnimation,
	m,
} from "motion/react";
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
	initial: {
		filter: "blur(5px)",
		opacity: 0,
		scale: 0.95,
	},
	animate: {
		filter: "blur(0px)",
		opacity: 1,
		scale: 1,
	},
	exit: {
		filter: "blur(5px)",
		opacity: 0,
		scale: 0.95,
	},
};

export const morphTransition: Transition = {
	type: "spring",
	bounce: 0,
	duration: 0.6,
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
		<LazyMotion features={domAnimation}>
			<Component className={cn(className)} aria-label={children} style={style}>
				<AnimatePresence mode="popLayout" initial={false}>
					{characters.map((character) => (
						<m.span
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
						</m.span>
					))}
				</AnimatePresence>
			</Component>
		</LazyMotion>
	);
}
