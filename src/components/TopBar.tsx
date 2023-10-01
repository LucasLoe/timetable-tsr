import {
	faSquareCaretLeft,
	faSquareCaretRight,
	faPlus,
	faHome,
} from "@fortawesome/free-solid-svg-icons";
import SearchBar from "./SearchBar";
import React, { useState, ReactNode } from "react";
import { EventType, SetValue, CalendarLocalStorageType } from "../types";
import MenuButton from "./MenuButton";
import FontAwesomeButton from "./FontAwesomeButton";
import { useNewEventModal } from "../contexts/NewEventModalContext";
import getMonthString from "../functions/getMonthStrings";
import userDeviceIsMobile from "../functions/userDeviceIsMobile";

type TopBarPropsType = {
	calendarDateHook: [Date, SetValue<Date>];
	calendarEvents: CalendarLocalStorageType;
};

export default function TopBar(props: TopBarPropsType) {
	const [calendarDate, setCalendarDate] = props.calendarDateHook;
	const { modalState, setModalState } = useNewEventModal();
	const [searchIsOpen, setSearchIsOpen] = useState(false);
	const isMobile = userDeviceIsMobile();

	const switchMonth = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (e.currentTarget.id === "prevMonthButton") {
			setCalendarDate((prevDate) => new Date(prevDate.setMonth(prevDate.getMonth() - 1)));
		} else if (e.currentTarget.id === "nextMonthButton") {
			setCalendarDate((prevDate) => new Date(prevDate.setMonth(prevDate.getMonth() + 1)));
		}
	};

	const GroupedElements = ({
		children,
		css,
	}: {
		children: ReactNode | ReactNode[];
		css?: string;
	}) => {
		return <div className={`my-auto flex flex-row text-base ${css}`}>{children}</div>;
	};

	function handleNewEventModal(prefill: EventType | undefined = undefined) {
		if (!modalState.newEvent) {
			setModalState({
				...modalState,
				newEvent: true,
				newEventPrefill: prefill,
			});
		}
	}

	const TopBarLayoutWrapper = ({ children }: { children: ReactNode }) => {
		return (
			<div className='flex h-[8%] flex-row justify-between bg-blue-500 px-2 align-middle text-xl font-semibold'>
				{children}
			</div>
		);
	};

	const CurrentMonthLabel = ({ calendarDate }: { calendarDate: Date }) => {
		const monthStrings = getMonthString();
		return (
			<p className='mx-4 my-auto w-36 text-base font-semibold'>
				{monthStrings[calendarDate.getMonth()] + ", " + calendarDate.getFullYear()}
			</p>
		);
	};

	return isMobile ? (
		<TopBarLayoutWrapper>
			<GroupedElements>
				<FontAwesomeButton
					id='jumpToTodayButton'
					fontIconString={faHome}
					onClickFunction={() => setCalendarDate(new Date())}
				/>
				<CurrentMonthLabel calendarDate={calendarDate} />
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
			</GroupedElements>
			<GroupedElements>
				<SearchBar
					handleNewEventModal={handleNewEventModal}
					calendarEvents={props.calendarEvents}
					searchHooks={[searchIsOpen, setSearchIsOpen]}
				/>
				<FontAwesomeButton
					fontIconString={faPlus}
					onClickFunction={() => handleNewEventModal(undefined)}
				/>
			</GroupedElements>
		</TopBarLayoutWrapper>
	) : (
		<TopBarLayoutWrapper>
			<GroupedElements>
				<MenuButton onClickFunction={() => setCalendarDate(new Date())}>Today</MenuButton>
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
				<CurrentMonthLabel calendarDate={calendarDate} />
			</GroupedElements>

			<GroupedElements>
				<MenuButton onClickFunction={() => void 0}>Monthly</MenuButton>
				<MenuButton onClickFunction={() => void 0}>Weekly</MenuButton>
			</GroupedElements>
			<GroupedElements>
				<SearchBar
					handleNewEventModal={handleNewEventModal}
					calendarEvents={props.calendarEvents}
					searchHooks={[searchIsOpen, setSearchIsOpen]}
				/>
				<FontAwesomeButton
					fontIconString={faPlus}
					onClickFunction={() => handleNewEventModal(undefined)}
				/>
			</GroupedElements>
		</TopBarLayoutWrapper>
	);
}
