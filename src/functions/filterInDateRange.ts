import { EventArrayType } from "../types";

function isBetween(x: number, min: number, max: number): boolean {
	return x >= min && x <= max;
}

export default function filterDateOverlap(
	beginRefDate: number,
	endRefDate: number,
	eventArray: EventArrayType
): EventArrayType {
	return eventArray.filter((e) => {
		try {
			const beginDateTime = new Date(e.beginDate).getTime();
			const endDateTime = new Date(e.endDate).getTime();

			// Check if beginRefDate is smaller than endRefDate
			if (beginRefDate > endRefDate) {
				throw new Error("Invalid date range");
			}

			return (
				isBetween(beginDateTime, beginRefDate, endRefDate) ||
				isBetween(beginRefDate, beginDateTime, endDateTime)
			);
		} catch (err) {
			console.log("Error while trying to filter by date overlap: ", err);
			return false;
		}
	});
}
