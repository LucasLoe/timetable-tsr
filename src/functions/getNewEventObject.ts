import { EventType } from "../types";
import { v4 as uuidv4 } from "uuid";

export default function getNewEventObject(): EventType {
	return {
		title: "",
		beginDate: new Date(),
		beginTime: "08:00",
		endDate: new Date(new Date().setDate(new Date().getDate())),
		endTime: "14:00",
		fullDay: true,
		option: false,
		notes: "",
		url: "",
		location: "",
		_uuid: uuidv4(),
	};
}
