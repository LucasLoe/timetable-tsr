import useWindowSize from "./useWindowSize";

export default function userDeviceIsMobile(): boolean {
	const { width } = useWindowSize();
	const mobileLimitInPixel = 768;
	if (width != undefined) {
		return width <= mobileLimitInPixel;
	} else {
		return false;
	}
}
