export type DateFormat = `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`;

export type EventType = {
	beginDate: Date;
	beginTime?: string;
	endDate: Date;
	endTime?: string;
	fullDay: boolean;
	location?: string;
	notes?: string;
	option?: boolean;
	title: string;
	url?: string;
	_uuid: string;
};

export type EventArrayType = EventType[];

export type EventModalType = {
	newEvent: boolean;
	newEventPrefill: EventType | undefined;
};

export type CalendarLocalStorageType = {
	eventData: EventArrayType;
};

export type SetValue<T> = React.Dispatch<React.SetStateAction<T>>;

export type CellType = string