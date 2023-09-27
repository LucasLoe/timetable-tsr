import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { EventType, SetValue, CalendarLocalStorageType } from "../types";
import { useNewEventModal } from "../contexts/NewEventModalContext";
import getNewEventObject from "../functions/getNewEventObject";

type PopupTileMenuPropsType = {
	setPopupOpen: SetValue<boolean>;
	calenderEventsHook: [CalendarLocalStorageType, SetValue<CalendarLocalStorageType>];
	popupAlign: string;
	date: Date;
};
export default function PopupTileMenu(props: PopupTileMenuPropsType) {
	const popupAlign = props.popupAlign;
	const cellDate = props.date;
	const [events, setEvents] = props.calenderEventsHook;
	const { modalState, setModalState } = useNewEventModal();
	const setIsPopupOpen = props.setPopupOpen;
	const inputRef = useRef<HTMLInputElement>(null);

	// determine whether the popup menu is oriented in a symmetric or asymmetric way to not collide with the screen border
	let leftValClassName = "left-[calc(50%-125px)]";
	let leftTriangleClassName = "mx-auto";

	if (popupAlign === "right") {
		leftValClassName = "left-[calc(0%-200px)]";
		leftTriangleClassName = "mr-4 ml-auto";
	} else if (popupAlign === "left") {
		leftValClassName = "left-[10%]";
		leftTriangleClassName = "ml-4 mr-auto";
	}

	function handleNewEventModal(prefill: EventType | undefined = undefined) {
		if (!modalState.newEvent) {
			setModalState({
				...modalState,
				newEvent: true,
				newEventPrefill: prefill,
			});
		}
	}

	const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			const newEvent = getNewEventObject();
			(newEvent.title = inputRef.current!.value), (newEvent.beginDate = new Date(cellDate));
			newEvent.endDate = new Date(new Date().setDate(new Date(cellDate).getDate()));
			setEvents({ ...events, eventData: [...events.eventData, newEvent] });
		}
	};

	function handleTransitionToNewEventModal() {
		const newEvent = getNewEventObject();
		(newEvent.title = inputRef.current!.value), (newEvent.beginDate = new Date(cellDate));
		newEvent.endDate = new Date(new Date().setDate(new Date(cellDate).getDate()));
		handleNewEventModal(newEvent);
		setIsPopupOpen(false);
	}

	return (
		<div
			className={`absolute top-[50%] z-50 flex w-[250px] flex-col justify-center drop-shadow-xl ${leftValClassName}`}
		>
			<div
				id='popup-triangle'
				className={`h-0 w-0 border-b-[12px] border-l-[12px] border-r-[12px] border-b-blue-100 border-l-transparent border-r-transparent ${leftTriangleClassName}`}
			></div>
			<div
				id='popup-menu'
				className='mx-auto my-0 flex h-12 w-full justify-between rounded-lg bg-blue-100 px-4 py-2 align-middle'
			>
				<FontAwesomeIcon icon={faTag} className='fa my-auto text-blue-500' />
				<input
					autoFocus
					className='text-md mx-2 my-auto w-full border-0 border-b-2 border-blue-500 bg-transparent px-1 py-0 font-semibold text-blue-500 placeholder-blue-300 outline-0 focus:!outline-none'
					required
					type='text'
					placeholder='New Event..'
					ref={inputRef}
					onKeyDown={(e) => {
						handleEnterKey(e);
					}}
				/>
				<FontAwesomeIcon
					onClick={() => handleTransitionToNewEventModal()}
					icon={faEllipsis}
					className='my-auto cursor-pointer text-blue-500'
				/>
			</div>
		</div>
	);
}
