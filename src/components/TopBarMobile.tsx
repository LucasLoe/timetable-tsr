import {
	faSquareCaretLeft,
	faSquareCaretRight,
	faPlus,
	faHamburger,
	faHome,
} from "@fortawesome/free-solid-svg-icons";
import SearchBar from "./SearchBar";
import React, { useState } from "react";
import { EventType, SetValue, CalendarLocalStorageType } from "../types";
import MenuButton from "./MenuButton";
import FontAwesomeButton from "./FontAwesomeButton";

const monthStrings = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

type TopBarMobileProps = {
	calendarDateHook: [Date, SetValue<Date>];
	calendarEvents: CalendarLocalStorageType;
	handleNewEventModal: (e: EventType | undefined) => void;
};

export default function TopBarMobile(props: TopBarMobileProps) {
	const [calendarDate, setCalendarDate] = props.calendarDateHook;
	const [searchIsOpen, setSearchIsOpen] = useState(false);

	const switchMonth = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (e.currentTarget.id === "prevMonthButton") {
			setCalendarDate((prevDate) => new Date(prevDate.setMonth(prevDate.getMonth() - 1)));
		} else if (e.currentTarget.id === "nextMonthButton") {
			setCalendarDate((prevDate) => new Date(prevDate.setMonth(prevDate.getMonth() + 1)));
		}
	};

	return (
		<div className='flex h-[8%] w-full flex-row justify-between bg-slate-100 px-2 align-middle text-xl font-semibold'>
			<div className='my-auto flex flex-row'>
				<FontAwesomeButton
					id='jumpToTodayButton'
					fontIconString={faHome}
					onClickFunction={() => setCalendarDate(new Date())}
				/>
				<p className='mx-4 my-auto w-36 text-base font-semibold'>
					{monthStrings[calendarDate.getMonth()] + ", " + calendarDate.getFullYear()}
				</p>
				<FontAwesomeButton
					id={"prevMonthButton"}
					fontIconString={faSquareCaretLeft}
					onClickFunction={(e) => switchMonth(e)}
				/>
				<FontAwesomeButton
					id={"nextMonthButton"}
					fontIconString={faSquareCaretRight}
					onClickFunction={(e) => switchMonth(e)}
				/>
				<SearchBar
					handleNewEventModal={props.handleNewEventModal}
					calendarEvents={props.calendarEvents}
					searchHooks={[searchIsOpen, setSearchIsOpen]}
					isMobile={true}
				/>
				<FontAwesomeButton
					fontIconString={faPlus}
					onClickFunction={() => props.handleNewEventModal(undefined)}
				/>
			</div>
		</div>
	);
}
