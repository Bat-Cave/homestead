"use client";

import { Checkbox } from "./ui/checkbox";

export function RecipeListItem({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<li className="relative">
			<label className="[*:has([data-state='checked'])]:line-through [*:has([data-state='checked'])]:opacity-70">
				<Checkbox className="absolute right-full top-1 mr-2" />
				{children}
			</label>
		</li>
	);
}
