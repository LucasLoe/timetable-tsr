import React, { useState, useEffect, useRef } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CalendarLocalStorageType, EventArrayType, EventType, SetValue } from "../types";

type SearchBarPropsType = {
	searchHooks: [boolean, SetValue<boolean>];
	calendarEvents: CalendarLocalStorageType;
	handleNewEventModal: (e: EventType | undefined) => void;
};

export default function SearchBar(props: SearchBarPropsType) {
	const [searchIsOpen, setSearchIsOpen] = props.searchHooks;
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResult, setSearchResult] = useState<EventArrayType>([]);
	const searchRef = useRef<HTMLDivElement>(null);
	const calendarEvents = props.calendarEvents;
	const handleNewEventModal = props.handleNewEventModal;

	function toDotFormat(date: Date) {
		return (
			date.toISOString().slice(8, 10) +
			date.toISOString().slice(4, 8) +
			date.toISOString().slice(0, 4).replaceAll("-", ".")
		);
	}

	function markKeywordInString(str: string, keyword: string): JSX.Element {
		const substrings = str.split(new RegExp(`(${keyword})`, "gi"));

		const markedSubstrings = substrings.map((substring, i) => {
			if (substring.toLowerCase() === keyword.toLowerCase()) {
				return (
					<mark key={"mark-string" + i} className='bg-blue-200'>
						{substring}
					</mark>
				);
			} else {
				return substring;
			}
		});
		return <>{markedSubstrings}</>;
	}

	function handleTransitionToNewEventModal(event: React.MouseEvent, e: EventType) {
		event.stopPropagation();
		setSearchIsOpen(false);
		handleNewEventModal(e);
	}

	useEffect(() => {
		const checkIfClickedOutside = (e: MouseEvent) => {
			// If the menu is open and the clicked target is not within the menu,
			// then close the menu
			if (searchIsOpen && searchRef.current && !searchRef.current.contains(e.target as Node)) {
				setSearchIsOpen(false);
			}
		};
		document.addEventListener("mousedown", checkIfClickedOutside);

		return () => {
			// Cleanup the event listener
			document.removeEventListener("mousedown", checkIfClickedOutside);
		};
	});

	useEffect(() => {
		const filteredEvents =
			calendarEvents.eventData.length != 0 &&
			calendarEvents.eventData.filter((e) => e.title.match(new RegExp(searchQuery, "gi")));
		filteredEvents && setSearchResult(filteredEvents.slice(0, 6));
	}, [searchQuery]);

	const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	const SearchBarElement = (props: { e: EventType }) => {
		const e = props.e;
		return (
			<div
				onClick={(event) => {
					handleTransitionToNewEventModal(event, e);
				}}
				className=' relative z-[100] flex h-8 w-full cursor-pointer  flex-row justify-between bg-slate-200 px-2'
			>
				<div className='flex flex-row'>
					<p className='my-auto mr-4 text-sm font-semibold tracking-wide'>
						{toDotFormat(new Date(e.beginDate))}
					</p>
					{!e.fullDay && (
						<>
							<p className='my-auto text-sm font-light tracking-wide'>{e.beginTime}</p>
							<p className='mx-1 my-auto text-sm font-light'>-</p>
							<p className='my-auto text-sm font-light tracking-wide'>{e.beginTime}</p>
						</>
					)}
				</div>
				<div className='ml-2 flex w-[50%] flex-row overflow-hidden text-ellipsis'>
					<div className='my-auto ml-2 mr-1 h-[70%] w-1 shrink-0 rounded-full bg-blue-500'></div>
					<p className='my-auto text-ellipsis text-black'>
						{markKeywordInString(e.title, searchQuery)}
					</p>
				</div>
			</div>
		);
	};

	const EmptySearchResult = (props: { message: string }) => {
		return (
			<div className=' relative  z-[100] flex h-16 w-full justify-center border-2 bg-slate-200'>
				<p className='mx-auto my-auto text-center text-sm text-slate-600'>{props.message}</p>
			</div>
		);
	};

	return (
		<>
			{searchIsOpen ? (
				<div ref={searchRef} className='relative'>
					<input
						autoFocus
						placeholder='What are you looking for?'
						className='transition-width w-[400px] rounded bg-slate-200 px-4 py-1 delay-150 ease-in-out focus:outline-none'
						value={searchQuery}
						onChange={(e) => handleSearchInput(e)}
					/>
					{searchQuery && (
						<div className='h-content absolute top-[95%] z-50 w-full rounded-b-xl border-t-2 border-gray-100 bg-slate-200 p-2 shadow-xl'>
							{searchResult.length ? (
								searchResult &&
								searchResult.map((e, i) => {
									return <SearchBarElement e={e} key={"searchbar-element-" + i} />;
								})
							) : (
								<EmptySearchResult message='No search result for the given query' />
							)}
						</div>
					)}
				</div>
			) : (
				<button
					onClick={() => {
						setSearchIsOpen(!searchIsOpen);
					}}
					className={`mx-1 rounded-2xl bg-slate-200 px-4 py-1 text-base hover:bg-slate-300`}
				>
					<FontAwesomeIcon
						icon={faMagnifyingGlass}
						className='fa fa-lg my-auto ml-0.5 mr-1 text-slate-600'
					/>
				</button>
			)}
		</>
	);
}
