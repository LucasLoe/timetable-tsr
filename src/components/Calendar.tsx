import CellController from "./CellController";
import { useMemo } from "react";
import filterDateOverlap from "../functions/filterInDateRange";
import getDateEndpoints from "../functions/getDateEndpoints";
import { CalendarLocalStorageType, SetValue, EventType, CellType, EventArrayType } from "../types";
import createJSDateFromYYYYMMDD from "../functions/createJSDateFromYYYY-MM-DD";
import { v4 as uuidv4 } from "uuid";

type CalendarPropType = {
	calenderEventsHook: [CalendarLocalStorageType, SetValue<CalendarLocalStorageType>];
	userDate: Date;
	handleNewEventModal: (e: EventType | undefined) => void;
};

const DayStringHeader = () => {
	const dayStrings = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
	return (
		<div className='box-border grid h-[10%] w-full grid-cols-7 bg-zinc-50'>
			{dayStrings &&
				dayStrings.map((day, i) => {
					return (
						<div key={"daystr" + i} className=' my-auto table-cell pl-2 text-left'>
							{day}
						</div>
					);
				})}
		</div>
	);
};

const SeparationLine = () => {
	return <div className='h-[1px] w-full bg-zinc-300'></div>;
};

export default function Calendar(props: CalendarPropType): JSX.Element {
	const userDate = props.userDate;
	const [events, setEvents] = props.calenderEventsHook;
	const datePrefix = userDate.toISOString().slice(0, 8); //add day in dd to have yyyy-mm-dd
	const [beginOfMonth, endOfMonth] = [
		new Date(userDate.getFullYear(), userDate.getMonth(), 1).getTime(),
		new Date(userDate.getFullYear(), userDate.getMonth() + 1, 0, 23, 59, 59).getTime(),
	];

	const eventsInMonth = filterDateOverlap(beginOfMonth, endOfMonth, events.eventData);

	const getNumberOfDays = (year: number, month: number) => {
		return new Date(year, month, 0).getDate();
	};

	const DateTiles = () =>
		useMemo(() => {
			const firstDayOfMonth = new Date(userDate.getFullYear(), userDate.getMonth(), 1).getDay();
			const lastDayOfMonth = new Date(userDate.getFullYear(), userDate.getMonth() + 1, 0).getDay();
			const tiles: JSX.Element[] = [];

			const addTile = (cellType: CellType, date: Date, activeEvents: EventArrayType = []) => {
				tiles.push(
					<CellController
						key={uuidv4()}
						cellType={cellType}
						date={date}
						calenderEventsHook={[events, setEvents]}
						activeEvents={activeEvents}
						handleNewEventModal={props.handleNewEventModal}
					/>
				);
			};

			const addInactiveTiles = (start: number, end: number) => {
				for (let i = start; i <= end; i++) {
					const dateInYMDFormat = datePrefix + i.toString();
					const validDate = createJSDateFromYYYYMMDD(dateInYMDFormat);
					addTile("inactive", validDate);
				}
			};

			const addCurrentMonthTiles = () => {
				const monthDays = getNumberOfDays(userDate.getFullYear(), userDate.getMonth() + 1);
				for (let i = 1; i <= monthDays; i++) {
					const dateInYMDFormat = datePrefix + i.toString();
					const validDate = createJSDateFromYYYYMMDD(dateInYMDFormat);
					const [bd, ed] = getDateEndpoints(dateInYMDFormat);
					const activeEvents: EventArrayType = filterDateOverlap(bd, ed, eventsInMonth).sort(
						(a, b) =>
							(a?.beginTime ?? 0) > (b?.beginTime ?? 0)
								? 1
								: (a?.beginTime ?? 0) < (b?.beginTime ?? 0)
								? -1
								: 0
					);

					addTile("currentMonth", validDate, activeEvents);
				}
			};

			const addNextMonthTiles = () => {
				const emptyTiles = 7 - lastDayOfMonth;
				for (let i = 1; i <= emptyTiles; i++) {
					const dateInYMDFormat = datePrefix + i.toString();
					const validDate = createJSDateFromYYYYMMDD(dateInYMDFormat);
					addTile("inactive", validDate);
				}
			};

			if (firstDayOfMonth !== 0) {
				addInactiveTiles(
					getNumberOfDays(userDate.getFullYear(), userDate.getMonth()) - firstDayOfMonth + 2,
					getNumberOfDays(userDate.getFullYear(), userDate.getMonth())
				);
			} else {
				addInactiveTiles(
					getNumberOfDays(userDate.getFullYear(), userDate.getMonth()) - 7 + 2,
					getNumberOfDays(userDate.getFullYear(), userDate.getMonth())
				);
			}

			addCurrentMonthTiles();

			if (7 - lastDayOfMonth !== 7) {
				addNextMonthTiles();
			}

			return tiles;
		}, [userDate]);

	return (
		<>
			<DayStringHeader />
			<SeparationLine />
			<div className='grid h-[90%] auto-rows-fr w-full grid-cols-7 gap-[1px] [&>*:nth-child(7n)]:text-red-400 [&>*:nth-child(7n-1)]:text-red-400 '>
				<DateTiles />
			</div>
		</>
	);
}
