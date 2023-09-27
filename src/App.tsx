import Calendar from "./components/Calendar";
import { useState } from "react";
import NewEventModal from "./components/NewEventModal";
import TopBar from "./components/TopBar";
import TopBarMobile from "./components/TopBarMobile";
import useLocalStorage from "./functions/useLocalStorage";
import Header from "./components/Header";
import { CalendarLocalStorageType } from "./types";
import useWindowSize from "./functions/useWindowSize";
import { useNewEventModal } from "./contexts/NewEventModalContext";
import isMobile from "./functions/isMobile";

const ColoredSideBar = (props: { tailwindWidth: string }) => {
	return <div className={`h-full bg-blue-500 ${props.tailwindWidth}`}></div>;
};

function App(): JSX.Element {
	const today = new Date();
	const [calendarDate, setCalendarDate] = useState<Date>(new Date(today));
	const { modalState } = useNewEventModal();
	const [events, setEvents] = useLocalStorage<CalendarLocalStorageType>("timetable-react-app", {
		eventData: [],
	});
	const { width } = useWindowSize();
	const userWindowIsMobile = isMobile(width);

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
								calendarDateHook={[calendarDate, setCalendarDate]}
								calendarEvents={events}
							/>
							<div className='h-[92%] w-full bg-zinc-100'>
								<Calendar calenderEventsHook={[events, setEvents]} userDate={calendarDate} />
							</div>
						</div>
					</>
				) : (
					<>
						<ColoredSideBar tailwindWidth={"w-16"} />
						<div className='w-full'>
							<TopBar calendarDateHook={[calendarDate, setCalendarDate]} calendarEvents={events} />
							<div className='h-[92%] w-full bg-zinc-100'>
								<Calendar calenderEventsHook={[events, setEvents]} userDate={calendarDate} />
							</div>
						</div>
					</>
				)}
			</div>
			{modalState.newEvent && <NewEventModal eventHooks={[events, setEvents]} />}
		</div>
	);
}

export default App;
