export default function isMobile(windowWidth: undefined | number): boolean {
	const mobileLimitInPixel = 768;
	if (windowWidth != undefined) {
		return windowWidth <= mobileLimitInPixel;
	} else {
		return false;
	}
}
