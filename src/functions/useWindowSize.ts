import { useState, useEffect } from "react";

type WindowSizeType = {
	width: number | undefined;
	height: number | undefined;
};

export default function useWindowSize(): WindowSizeType {
	const [windowSize, setWindowSize] = useState<WindowSizeType>({
		width: undefined,
		height: undefined,
	});
	useEffect(() => {
		function handleResize() {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}
		// Add event listener
		window.addEventListener("resize", handleResize);
		handleResize();
		// cleanup
		return () => window.removeEventListener("resize", handleResize);
	}, []);
	return windowSize;
}
