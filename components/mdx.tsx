import { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { type ComponentProps, createElement, type ReactNode } from "react";

// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
// import { Tweet } from 'react-tweet';
// import CopyCode from './copy-code';

function Table({ data }: { data: { headers: string[]; rows: string[][] } }) {
	const headers = data.headers.map((header) => <th key={header}>{header}</th>);
	const rows = data.rows.map((row) => (
		<tr key={JSON.stringify(row)}>
			{row.map((cell) => (
				<td key={cell}>{cell}</td>
			))}
		</tr>
	));

	return (
		<table>
			<thead>
				<tr>{headers}</tr>
			</thead>
			<tbody>{rows}</tbody>
		</table>
	);
}

function CustomLink(props: {
	href?: string;
	className?: string;
	children: ReactNode;
}) {
	const href = props.href;

	if (href?.startsWith("/")) {
		return (
			<Link
				{...props}
				className="underline transition-all decoration-violet-400 dark:decoration-violet-600 underline-offset-2 decoration-[0.1em]"
				href={href}
			/>
		);
	}

	//   if (host.includes('twitter') && pathname.includes('/status/')) {
	//     const splitPath = pathname.split('/');
	//     const tweetId = splitPath[splitPath.length - 1];
	//     return <Tweet id={tweetId} />;
	//   }

	if (href?.startsWith("#")) {
		return (
			<a
				{...props}
				href={href}
				className="underline transition-all decoration-violet-400 dark:decoration-violet-600 underline-offset-2 decoration-[0.1em]"
			>
				{props.children}
			</a>
		);
	}

	return (
		<a
			target="_blank"
			rel="noopener noreferrer"
			className="underline transition-all decoration-violet-400 dark:decoration-violet-600 underline-offset-2 decoration-[0.1em]"
			{...props}
		>
			{props.children}
		</a>
	);
}

function RoundedImage(props: ComponentProps<typeof Image>) {
	return <Image {...props} alt={props.alt} className="rounded-lg" />;
}

function Code({ children, ...props }: { children: string }) {
	return <code {...props}>{children}</code>;
	//   (
	// <div className="relative group">
	//   <CopyCode content={children} className="absolute top-2 right-2" />
	//   <SyntaxHighlighter
	//     language="tsx"
	//     style={vscDarkPlus as Record<string, string>}
	//     {...props}
	//   >
	//     {children}
	//   </SyntaxHighlighter>
	// </div>
	//   );
}

function slugify(str: string) {
	return str
		.toString()
		.toLowerCase()
		.trim() // Remove whitespace from both ends of a string
		.replace(/\s+/g, "-") // Replace spaces with -
		.replace(/&/g, "-and-") // Replace & with 'and'
		.replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
		.replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level: number) {
	function Heading({ children }: { children: string }) {
		const slug = slugify(children);
		return createElement(
			`h${level}`,
			{
				id: slug,
				style: {
					scrollMarginTop: "88px",
				},
			},
			[
				createElement("a", {
					href: `#${slug}`,
					key: `link-${slug}`,
					className: "anchor",
				}),
			],
			children,
		);
	}

	Heading.displayName = `Heading${level}`;

	return Heading;
}

const components: MDXComponents = {
	h1: createHeading(1),
	h2: createHeading(2),
	h3: createHeading(3),
	h4: createHeading(4),
	h5: createHeading(5),
	h6: createHeading(6),
	Image: RoundedImage,
	a: CustomLink,
	code: (props: { className?: string; children: string }) => {
		const className = props.className ?? "";
		if (
			className.includes("language-tsx") ||
			className.includes("language-jsx") ||
			className.includes("language-ts") ||
			className.includes("language-js")
		) {
			return <Code {...props} />;
		}
		return (
			<code
				{...props}
				className="bg-neutral-900/30 text-black dark:text-white dark:bg-neutral-900/60 rounded-sm"
			/>
		);
	},
	Table,
	p: (props) => <div className="mb-4" {...props} />,
	pre: (props) => {
		return <div className="mt-4 mb-8 p-0" {...props} />;
	},
};

export function CustomMDX(props: ComponentProps<typeof MDXRemote>) {
	return (
		<MDXRemote
			{...props}
			options={{
				mdxOptions: {
					// remarkPlugins: [remarkPrism],
				},
			}}
			components={{ ...components, ...(props.components ?? {}) }}
		/>
	);
}
