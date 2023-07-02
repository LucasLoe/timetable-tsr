import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCaretLeft, faSquareCaretRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "./SearchBar";
import React, { useState } from "react";
import { EventType, SetValue, CalendarLocalStorageType } from "../types";

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

type TopBarPropsType = {
	calendarDateHook: [Date, SetValue<Date>];
	calendarEvents: CalendarLocalStorageType;
	handleNewEventModal: (e: EventType | undefined) => void;
};

export default function TopBar(props: TopBarPropsType) {
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
		<div className='flex h-[8%] w-full flex-row justify-between bg-slate-100 px-4 align-middle text-xl font-semibold'>
			<div className='my-auto flex flex-row'>
				{/* 
				<button className={`ml-2 mr-4 rounded-2xl bg-slate-200 px-4 py-1 text-base`}>
					<FontAwesomeIcon
						icon={faSliders}
						className='fa fa-lg my-auto mr-1 ml-0.5 text-slate-600'
					/>
				</button>
				*/}
				<button
					onClick={() => setCalendarDate(new Date())}
					className={`mx-2 rounded-2xl bg-slate-200 px-4 py-1 text-base hover:bg-slate-300`}
				>
					Today
				</button>
				<button onClick={(e) => switchMonth(e)} id='prevMonthButton'>
					<FontAwesomeIcon
						icon={faSquareCaretLeft}
						className='fa fa-lg my-auto ml-1 mr-0.5 text-slate-600 hover:bg-slate-300'
					/>
				</button>
				<button id='nextMonthButton' onClick={(e) => switchMonth(e)}>
					<FontAwesomeIcon
						icon={faSquareCaretRight}
						className='fa fa-lg my-auto ml-0.5 mr-1 text-slate-600 hover:bg-slate-300'
					/>
				</button>
				<p className='mx-4 my-auto text-base font-semibold'>
					{monthStrings[calendarDate.getMonth()] + ", " + calendarDate.getFullYear()}
				</p>
			</div>
			<div className='my-auto flex flex-row'>
				<button className={`mx-2 rounded-full bg-slate-200 px-4 py-1 text-base hover:bg-slate-300`}>
					Monthly
				</button>
				<button className={`mx-2 rounded-full bg-slate-200 px-4 py-1 text-base hover:bg-slate-300`}>
					Weekly
				</button>
			</div>
			<div className='my-auto flex flex-row text-base'>
				<SearchBar
					handleNewEventModal={props.handleNewEventModal}
					calendarEvents={props.calendarEvents}
					searchHooks={[searchIsOpen, setSearchIsOpen]}
				/>
				<button className={`mx-1 rounded-2xl bg-slate-200 px-4 py-1 text-base hover:bg-slate-300`}>
					<FontAwesomeIcon
						onClick={() => props.handleNewEventModal(undefined)}
						icon={faPlus}
						className='fa fa-lg my-auto ml-0.5 mr-1 text-slate-600'
					/>
				</button>
				{
					// <button className={`mx-1 rounded-2xl bg-slate-200 px-4 py-1 text-base`}>Button</button>
				}
			</div>
		</div>
	);
}
