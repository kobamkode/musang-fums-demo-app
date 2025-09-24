import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };
export const getInitials = (name: string): string => {
	return name
		.split(' ')
		.slice(0, 2)
		.map((word) => word.charAt(0).toUpperCase())
		.join('');
};
export const downloadBlob = (blob: Blob, filename: string) => {
	if (typeof window === 'undefined') {
		console.error('downloadBlob can only be called on the client side');
		return;
	}

	// Create blob URL
	const url = window.URL.createObjectURL(blob);

	// Create temporary anchor element and trigger download
	const a = document.createElement('a');
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();

	// Cleanup
	document.body.removeChild(a);
	window.URL.revokeObjectURL(url);
}

export const downloadFromUrl = async (url: string, filename: string) => {
	if (typeof window === 'undefined') {
		console.error('downloadFromUrl can only be called on the client side');
		return;
	}

	try {
		const response = await fetch(url);
		const blob = await response.blob();
		downloadBlob(blob, filename);
	} catch (error) {
		console.error('Download failed:', error);
	}
};
