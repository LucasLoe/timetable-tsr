import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faEllipsis,
	faX,
	faChevronRight,
	faQuoteRight,
	faPaperclip,
	faLocationDot,
	faPenNib,
	faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import removeEventByIdFromArray from "../functions/removeEventByIdFromArray";
import { SetValue, EventType, CalendarLocalStorageType } from "../types";
import dateToDotFormat from "../functions/dateToDotFormat";

type EventDetailsPropsType = {
	calenderEventsHook: [CalendarLocalStorageType, SetValue<CalendarLocalStorageType>];
	eventDetailsHook: [EventType | undefined, SetValue<EventType | undefined>];
	eventModalHook: [boolean, SetValue<boolean>];
	handleNewEventModal: (e: EventType | undefined) => void;
};

export default function EventDetails(props: EventDetailsPropsType) {
	const [modalIsOpen, setModalIsOpen] = props.eventModalHook;
	const [events, setEvents] = props.calenderEventsHook;
	const [activeEventDetail, setActiveEventDetail] = props.eventDetailsHook;
	const [submenuIsOpen, setSubmenuIsOpen] = useState(false);
	const modalRef = useRef<HTMLDivElement>(null);
	const submenuRef = useRef<HTMLDivElement>(null);

	function handleRemoveEvent() {
		if (activeEventDetail != undefined) {
			setEvents(removeEventByIdFromArray(events, activeEventDetail._uuid));
			setSubmenuIsOpen(false);
			setModalIsOpen(false);
		}
	}

	function handleTransitionToEventModal() {
		setSubmenuIsOpen(false);
		setModalIsOpen(false);
		props.handleNewEventModal(activeEventDetail);
	}

	useEffect(() => {
		const checkIfClickedOutside = (e: MouseEvent) => {
			// If the menu is open and the clicked target is not within the menu,
			// then close the menu
			if (modalIsOpen && modalRef.current && !modalRef.current.contains(e.target as Node)) {
				setModalIsOpen(false);
				setSubmenuIsOpen(false);
				setActiveEventDetail(undefined);
			}
		};
		document.addEventListener("mousedown", checkIfClickedOutside);

		return () => {
			// Cleanup the event listener
			document.removeEventListener("mousedown", checkIfClickedOutside);
		};
	});

	useEffect(() => {
		const checkIfClickedOutsideSubmenu = (e: MouseEvent) => {
			// If the menu is open and the clicked target is not within the menu,
			// then close the menu
			if (submenuIsOpen && submenuRef.current && !submenuRef.current.contains(e.target as Node)) {
				setSubmenuIsOpen(false);
			}
		};
		document.addEventListener("mousedown", checkIfClickedOutsideSubmenu);

		return () => {
			// Cleanup the event listener
			document.removeEventListener("mousedown", checkIfClickedOutsideSubmenu);
		};
	});

	return (
		activeEventDetail && (
			<div
				onClick={(event) => event.stopPropagation()}
				className='fixed left-0 top-0 z-50 flex h-screen w-screen justify-center align-middle'
			>
				<div className=' absolute h-full w-full bg-slate-900 opacity-25'></div>
				<div
					ref={modalRef}
					className='relative z-10 m-auto h-auto w-[350px] rounded-lg bg-slate-50 px-4 py-4 opacity-100 shadow-2xl'
				>
					<div className='relative flex w-full flex-row justify-between align-middle'>
						<FontAwesomeIcon
							onClick={() => {
								setModalIsOpen(false);
								setActiveEventDetail(undefined);
							}}
							icon={faX}
							className='cursor-pointer text-slate-500 hover:text-blue-500'
						/>
						<FontAwesomeIcon
							icon={faEllipsis}
							className='cursor-pointer text-slate-500 hover:text-blue-500'
							onClick={() => setSubmenuIsOpen(true)}
						/>
						{submenuIsOpen && (
							<div
								ref={submenuRef}
								className='w-content absolute right-0 top-6 rounded-lg bg-slate-50 shadow-xl outline outline-1 outline-slate-200'
							>
								<div
									onClick={() => {
										handleTransitionToEventModal();
									}}
									className='flex w-full cursor-pointer flex-row rounded-t-lg px-4 py-2 align-middle text-sm font-light text-slate-500 hover:bg-slate-200 hover:text-slate-700'
								>
									<FontAwesomeIcon icon={faPenNib} className='my-auto ' />
									<p className='ml-2'>Edit</p>
								</div>
								<div
									onClick={() => handleRemoveEvent()}
									className='flex w-full cursor-pointer flex-row rounded-b-lg px-4 py-2 align-middle text-sm font-light text-red-400 hover:bg-slate-200 hover:text-red-500'
								>
									<FontAwesomeIcon icon={faTrashCan} className='my-auto ' />
									<p className='ml-2'>Delete</p>
								</div>
							</div>
						)}
					</div>
					<p className='w-full text-center text-4xl font-bold tracking-wider text-blue-500'>
						{activeEventDetail.title}
					</p>
					<div className='mt-8 flex w-full flex-row justify-center align-middle'>
						<div className='text-center'>
							<p className='text-lg text-slate-500'>
								{dateToDotFormat(new Date(activeEventDetail.beginDate))}
							</p>
							{!activeEventDetail.fullDay && (
								<p className='text-4xl'>{activeEventDetail.beginTime}</p>
							)}
						</div>
						<FontAwesomeIcon
							icon={faChevronRight}
							className='fa fa-2x h-content mx-8 my-auto text-blue-500'
						/>
						<div className='text-center'>
							<p className='text-lg text-slate-500'>
								{dateToDotFormat(new Date(activeEventDetail.endDate))}
							</p>
							{!activeEventDetail.fullDay && (
								<p className='text-4xl'>{activeEventDetail.endTime}</p>
							)}
						</div>
					</div>
					{activeEventDetail.notes && (
						<div className='my-4 ml-6 flex flex-row justify-between align-middle'>
							<FontAwesomeIcon icon={faQuoteRight} className='my-auto mr-8 text-slate-500' />
							<p className='my-auto ml-0 mr-auto text-left font-light'>{activeEventDetail.notes}</p>
						</div>
					)}
					{activeEventDetail.location && (
						<div className='my-4 ml-6 flex flex-row justify-between align-middle'>
							<FontAwesomeIcon icon={faLocationDot} className='my-auto mr-8 text-slate-500' />
							<p className='my-auto ml-0 mr-auto text-left font-light'>
								{activeEventDetail.location}
							</p>
						</div>
					)}
					{activeEventDetail.url && (
						<div className='my-4 ml-6 flex flex-row justify-between align-middle'>
							<FontAwesomeIcon icon={faPaperclip} className='my-auto mr-8 text-slate-500' />
							<p className='my-auto ml-0 mr-auto text-left font-light'>{activeEventDetail.url}</p>
						</div>
					)}
				</div>
			</div>
		)
	);
}
