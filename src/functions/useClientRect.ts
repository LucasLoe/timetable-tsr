import { useState, useCallback } from "react";

export default function useClientRect(): [DOMRect | null, (node: HTMLElement | null) => void] {
	const [rect, setRect] = useState<DOMRect | null>(null);

	const ref = useCallback((node: HTMLElement | null) => {
		if (node !== null) {
			setRect(node.getBoundingClientRect());
		}
	}, []);

	return [rect, ref];
}
