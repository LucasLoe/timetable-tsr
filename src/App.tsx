import Calendar from "./components/Calendar";
import { useState } from "react";
import NewEventModal from "./components/NewEventModal";
import TopBar from "./components/TopBar";
import useLocalStorage from "./functions/useLocalStorage";
import Header from "./components/Header";
import { CalendarLocalStorageType, EventModalType, EventType } from "./types";

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

	function handleNewEventModal(prefill: EventType | undefined = undefined) {
		if (!eventModalState.newEvent) {
			setEventModalState({
				...eventModalState,
				newEvent: true,
				newEventPrefill: prefill,
			});
		}
	}

	return (
		<div className='h-screen w-screen'>
			<div className='h-[10vh]'>
				<Header title={"Calendar App"} />
			</div>
			<div className='flex h-[90vh] w-full'>
				<div className='h-full w-16 bg-blue-500 '></div>
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
