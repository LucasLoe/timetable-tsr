import CalendarCellLayout from "./CalendarCellLayout";
import PopupTileMenu from "./PopupTileMenu";
import { useState, useEffect, useRef } from "react";
import useClientRect from "../functions/useClientRect";
import useWindowSize from "../functions/useWindowSize";
import EventCell from "./EventCell";
import EventDetails from "./EventDetails";
import { CellType, CalendarLocalStorageType, SetValue, EventArrayType, EventType } from "../types";

type CellControllerProps = {
	cellType: CellType;
	date: Date;
	calenderEventsHook: [CalendarLocalStorageType, SetValue<CalendarLocalStorageType>];
	activeEvents: EventArrayType;
};

export default function CellController(props: CellControllerProps) {
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const cellRef = useRef<HTMLDivElement>(null);
	const [events, setEvents] = props.calenderEventsHook;
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [activeEventDetail, setActiveEventDetail] = useState<EventType | undefined>(undefined);

	const [rect, rectRef] = useClientRect();
	const windowSize = useWindowSize();
	const [popupAlign, setPopupAlign] = useState("middle");

	const activeEvents = props.activeEvents;
	const [touchCount, setTouchCount] = useState(0);

	useEffect(() => {
		const extraSpace = 50;
		if (rect != undefined && windowSize?.width != undefined) {
			if (windowSize.width - rect.right < rect.width / 2 + extraSpace) {
				setPopupAlign("right");
			} else if (rect.left < rect.width / 2 + extraSpace) {
				setPopupAlign("left");
			} else if (popupAlign != "middle") {
				setPopupAlign("middle");
			}
		}
	}, [windowSize]);

	useEffect(() => {
		const checkIfClickedOutside = (e: MouseEvent) => {
			// If the menu is open and the clicked target is not within the menu,
			// then close the menu
			if (isPopupOpen && cellRef.current && !cellRef.current.contains(e.target as Node)) {
				setIsPopupOpen(false);
			}
		};
		document.addEventListener("mousedown", checkIfClickedOutside);

		return () => {
			// Cleanup the event listener
			document.removeEventListener("mousedown", checkIfClickedOutside);
		};
	});

	const handleDoubleTouch = () => {
		setTouchCount((prevCount) => prevCount + 1);
		const touchTimer = setTimeout(() => setTouchCount(0), 300);
		if (touchCount === 1) {
			setIsPopupOpen(true);
			setTouchCount(0);
			clearTimeout(touchTimer);
		}
	};

	const handleDoubleClick = (e: React.MouseEvent) => {
		// @ts-ignore

		if (e.nativeEvent.pointerType === "mouse") {
			console.log("sda");

			if (e.detail === 2) {
				setIsPopupOpen(true);
			}
		}
	};

	return (
		<div
			onClick={(e) => handleDoubleClick(e)}
			onTouchEnd={() => handleDoubleTouch()}
			className='relative '
			ref={cellRef}
		>
			{isPopupOpen ? (
				<PopupTileMenu
					setPopupOpen={setIsPopupOpen}
					calenderEventsHook={[events, setEvents]}
					popupAlign={popupAlign}
					date={props.date}
				></PopupTileMenu>
			) : (
				<></>
			)}

			<div className='h-full max-h-full'>
				<CalendarCellLayout ref={rectRef} cellType={props.cellType} date={props.date}>
					{activeEvents &&
						activeEvents.map((e, index) => {
							return (
								<EventCell
									key={"eventcell" + index}
									setModalIsOpen={setModalIsOpen}
									setActiveEventDetails={setActiveEventDetail}
									activeEvent={e}
								/>
							);
						})}
					{modalIsOpen && (
						<EventDetails
							calenderEventsHook={[events, setEvents]}
							eventModalHook={[modalIsOpen, setModalIsOpen]}
							eventDetailsHook={[activeEventDetail, setActiveEventDetail]}
						/>
					)}
				</CalendarCellLayout>
			</div>
		</div>
	);
}
