import React, { useState, useEffect, useRef } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { CalendarLocalStorageType, EventArrayType, EventType, SetValue } from "../types";
import dateToDotFormat from "../functions/dateToDotFormat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import userDeviceIsMobile from "../functions/userDeviceIsMobile";

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
	const isMobile = userDeviceIsMobile();

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

	const SearchBarElement = (props: { e: EventType; index: number }) => {
		const e = props.e;
		return (
			<div
				onClick={(event) => {
					handleTransitionToNewEventModal(event, e);
				}}
				className=' relative z-[100] flex h-8 w-full cursor-pointer  flex-row justify-between bg-zinc-50 px-2'
			>
				<div className='flex flex-row'>
					<p className='my-auto mr-4 text-sm font-semibold tracking-wide'>
						{dateToDotFormat(new Date(e.beginDate))}
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
			<div className=' bg-zinc-5  relative z-[100] flex h-16 w-full justify-center'>
				<p className='mx-auto my-auto text-center text-sm text-slate-600'>{props.message}</p>
			</div>
		);
	};

	return (
		<div className='relative mx-2 h-8 w-8 rounded'>
			<div className={`absolute right-0 top-0`}>
				<div
					ref={searchRef}
					className='flex items-center justify-start rounded bg-zinc-50 shadow-2xl'
				>
					<button
						className='relative h-8 w-8 rounded bg-zinc-50'
						onClick={() => setSearchIsOpen(!searchIsOpen)}
					>
						<FontAwesomeIcon className='text-blue-500' icon={faMagnifyingGlass} />
					</button>
					{searchIsOpen ? (
						<div className={`h-12 p-2`}>
							<input
								autoFocus
								placeholder='What are you looking for?'
								className={`${isMobile ? "w-[70vw]" : "w-[400px] "} rounded px-4 py-1 `}
								value={searchQuery}
								onChange={(e) => handleSearchInput(e)}
							/>
							{searchQuery && (
								<div className='h-content absolute left-0 top-[95%] z-50 w-full rounded-b-xl bg-zinc-100 p-2 shadow-xl'>
									{searchResult.length ? (
										searchResult &&
										searchResult.map((e, i) => {
											return <SearchBarElement e={e} index={i} key={"searchbar-element-" + i} />;
										})
									) : (
										<EmptySearchResult message='No search result for the given query' />
									)}
								</div>
							)}
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}
