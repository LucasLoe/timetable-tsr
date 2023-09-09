import Calendar from "./components/Calendar";
import { useState } from "react";
import NewEventModal from "./components/NewEventModal";
import TopBar from "./components/TopBar";
import TopBarMobile from "./components/TopBarMobile";
import useLocalStorage from "./functions/useLocalStorage";
import Header from "./components/Header";
import { CalendarLocalStorageType, EventModalType, EventType } from "./types";
import useWindowSize from "./functions/useWindowSize";

type ColoredSideBarProps = {
	tailwindWidth: string;
};

function App(): JSX.Element {
	const today = new Date();
	const [calendarDate, setCalendarDate] = useState<Date>(new Date(today));
	const [eventModalState, setEventModalState] = useState<EventModalType>({
		newEvent: false,
		newEventPrefill: undefined,
	});
	const [events, setEvents] = useLocalStorage<CalendarLocalStorageType>("timetable-react-app", {
		eventData: [],
	});
	const windowSize = useWindowSize();
	const { width } = windowSize;
	const userWindowIsMobile = width != undefined && width < 768;

	function handleNewEventModal(prefill: EventType | undefined = undefined) {
		if (!eventModalState.newEvent) {
			setEventModalState({
				...eventModalState,
				newEvent: true,
				newEventPrefill: prefill,
			});
		}
	}

	const ColoredSideBar = (props: ColoredSideBarProps) => {
		return <div className={`h-full bg-blue-500 ${props.tailwindWidth}`}></div>;
	};

	return (
		<div className='h-screen w-screen'>
			<div className='h-[10vh]'>
				<Header title={"Calendar App"} />
			</div>
			<div className='flex h-[90vh] w-full'>
				{userWindowIsMobile ? (
					<>
						<div className='w-full'>
							<TopBarMobile
								handleNewEventModal={handleNewEventModal}
								calendarDateHook={[calendarDate, setCalendarDate]}
								calendarEvents={events}
							/>
							<div className='h-[92%] w-full bg-zinc-100'>
								<Calendar
									calenderEventsHook={[events, setEvents]}
									userDate={calendarDate}
									handleNewEventModal={handleNewEventModal}
								/>
							</div>
						</div>
					</>
				) : (
					<>
						<ColoredSideBar tailwindWidth={"w-16"} />
						<div className='w-full'>
							<TopBar
								handleNewEventModal={handleNewEventModal}
								calendarDateHook={[calendarDate, setCalendarDate]}
								calendarEvents={events}
							/>
							<div className='h-[92%] w-full bg-zinc-100'>
								<Calendar
									calenderEventsHook={[events, setEvents]}
									userDate={calendarDate}
									handleNewEventModal={handleNewEventModal}
								/>
							</div>
						</div>
					</>
				)}
			</div>
			{eventModalState.newEvent && (
				<NewEventModal
					modalControls={[eventModalState, setEventModalState]}
					eventHooks={[events, setEvents]}
				/>
			)}
		</div>
	);
}

export default App;
