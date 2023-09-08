import { CalendarLocalStorageType } from "../types";

export default function removeEventByIdFromArray(
	eventsInLocalStorage: CalendarLocalStorageType,
	id: string
): CalendarLocalStorageType {
	const objIndex = eventsInLocalStorage.eventData.findIndex((e) => e._uuid === id);
	let eventDataCopy = [...eventsInLocalStorage.eventData];

	if (objIndex !== -1) {
		eventDataCopy.splice(objIndex, 1);
	}

	return {
		...eventsInLocalStorage,
		eventData: eventDataCopy,
	};
}
