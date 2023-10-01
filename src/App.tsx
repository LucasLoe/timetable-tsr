import Calendar from "./components/Calendar";
import { useState } from "react";
import NewEventModal from "./components/NewEventModal";
import TopBar from "./components/TopBar";
import useLocalStorage from "./functions/useLocalStorage";
import Header from "./components/Header";
import { CalendarLocalStorageType } from "./types";
import { useNewEventModal } from "./contexts/NewEventModalContext";

function App(): JSX.Element {
	const [calendarDate, setCalendarDate] = useState<Date>(new Date());
	const { modalState } = useNewEventModal();
	const [events, setEvents] = useLocalStorage<CalendarLocalStorageType>("timetable-react-app", {
		eventData: [],
	});

	return (
		<div className='h-screen w-screen'>
			<Header title={"Calendar App"} />
			<div className='h-[95vh]'>
				<TopBar calendarDateHook={[calendarDate, setCalendarDate]} calendarEvents={events} />
				<Calendar calenderEventsHook={[events, setEvents]} userDate={calendarDate} />
			</div>
			{modalState.newEvent && <NewEventModal eventHooks={[events, setEvents]} />}
		</div>
	);
}

export default App;
