import { useEffect, useState } from "react";
import {
	faClock,
	faQuoteRight,
	faPaperclip,
	faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from "uuid";
import replaceObjectByUuid from "../functions/replaceObjectByUuid";
import { CalendarLocalStorageType, EventModalType, SetValue } from "../types";

type NewEventModalPropType = {
	eventHooks: [CalendarLocalStorageType, SetValue<CalendarLocalStorageType>];
	modalControls: [EventModalType, SetValue<EventModalType>];
};

export default function NewEventModal(props: NewEventModalPropType): JSX.Element {
	const [events, setEvents] = props.eventHooks;
	const [eventModalState, setEventModalState] = props.modalControls;
	const [formattedBeginDate, setFormattedBeginDate] = useState("");
	const [formattedEndDate, setFormattedEndDate] = useState("");
	const [eventData, setEventData] = useState(
		eventModalState.newEventPrefill || {
			title: "",
			beginDate: new Date(),
			beginTime: "01:00",
			endDate: new Date(new Date().setDate(new Date().getDate())),
			endTime: "14:00",
			fullDay: true,
			option: false,
			notes: "",
			url: "",
			location: "",
			_uuid: uuidv4(),
		}
	);

	useEffect(() => {
		// console.log(`begin date: ${eventData.beginDate}`);
		if (eventData.beginDate) {
			const dateObj = new Date(eventData.beginDate);
			const formatted = dateObj.toISOString().split("T")[0];
			setFormattedBeginDate(formatted);
		}
		if (eventData.endDate) {
			const dateObj = new Date(eventData.endDate);
			const formatted = dateObj.toISOString().split("T")[0];
			setFormattedEndDate(formatted);
		}
	}, [eventData]);

	const closeNewEventModal = () => {
		setEventModalState({
			...eventModalState,
			newEvent: false,
			newEventPrefill: undefined,
		});
	};

	function handleEventDataChange(e: React.ChangeEvent<HTMLInputElement>) {
		e.target.type == "checkbox"
			? setEventData({
					...eventData,
					[e.target.id]: e.target.checked,
			  })
			: setEventData({
					...eventData,
					[e.target.id]: e.target.value,
			  });
		if (e.target.id === " beginDate" || e.target.id === "endDate")
			if (eventData.beginDate != eventData.endDate)
				setEventData({
					...eventData,
					[e.target.id]: new Date(e.target.value),
					fullDay: true,
				});
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!events.eventData.length) {
			setEvents({ ...events, eventData: [...events.eventData, eventData] });
		} else if (
			events.eventData.length &&
			events.eventData.filter((e) => e._uuid === eventData._uuid).length == 0
		) {
			setEvents({ ...events, eventData: [...events.eventData, eventData] });
		} else {
			let eventsCopy = [...events.eventData];
			eventsCopy = replaceObjectByUuid(events.eventData, eventData, eventData._uuid);
			setEvents({ ...events, eventData: eventsCopy });
		}
		setEventModalState((prevState) => ({ ...prevState, newEvent: false }));
	}

	return (
		<div className='absolute left-0 top-0 z-50 flex h-screen w-screen justify-center align-middle'>
			<div
				onClick={closeNewEventModal}
				className=' absolute h-full w-full bg-slate-900 opacity-25'
			></div>
			<form
				onSubmit={(e) => handleSubmit(e)}
				className='relative z-10 m-auto h-auto w-[800px] rounded-lg bg-slate-50 px-12 py-6 opacity-100 shadow-2xl'
			>
				<input
					id='title'
					autoFocus
					className='mx-4 my-4 w-[80%] border-0 border-b-2 border-blue-500 bg-transparent px-1 py-0 text-xl font-semibold text-blue-500 placeholder-blue-300 outline-0 focus:!outline-none'
					required
					type='text'
					placeholder='Event title...'
					value={eventData.title}
					onChange={(e) => handleEventDataChange(e)}
				/>
				<div className='my-4 flex w-full align-middle'>
					<FontAwesomeIcon className='my-auto mr-4 text-blue-700' icon={faClock} />
					<input
						id='beginDate'
						className=' mx-2 my-auto w-[170px] rounded bg-blue-100 px-4 py-1'
						required
						type='date'
						value={formattedBeginDate}
						onChange={handleEventDataChange}
					/>
					{eventData.fullDay ? (
						<></>
					) : (
						<input
							id='beginTime'
							className='mx-2 my-auto grow rounded bg-blue-100 px-4 py-1'
							required
							type='time'
							value={eventData.beginTime}
							onChange={handleEventDataChange}
						/>
					)}
					<p className='my-auto'>-</p>
					{eventData.fullDay ? (
						<></>
					) : (
						<input
							id='endTime'
							className='mx-2 my-auto grow rounded bg-blue-100 px-4 py-1'
							required
							type='time'
							value={eventData.endTime}
							onChange={handleEventDataChange}
						/>
					)}
					<input
						id='endDate'
						className=' mx-2 my-auto w-[170px] rounded bg-blue-100 px-4 py-1'
						required
						type='date'
						value={formattedEndDate}
						onChange={handleEventDataChange}
					/>
				</div>
				<div className='my-2 flex w-full pl-12 align-middle'>
					<input
						id='fullDay'
						className='peer/1 my-auto mr-2'
						type='checkbox'
						checked={eventData.fullDay}
						onChange={handleEventDataChange}
					/>
					<label className='my-auto mr-4 text-sm peer-checked/1:text-blue-700 '>full day</label>
					<input
						id='option'
						className='peer/2 my-auto mr-2'
						type='checkbox'
						checked={eventData.option}
						onChange={handleEventDataChange}
					/>
					<label className='my-auto mr-4 text-sm peer-checked/2:text-blue-700 '>option No. 2</label>
				</div>
				<div className='my-4 flex w-full align-middle'>
					<FontAwesomeIcon className='my-auto mr-4 text-blue-700' icon={faQuoteRight} />
					<input
						id='notes'
						className='mx-2 my-auto w-full rounded bg-blue-100 px-4 py-1'
						type='text'
						placeholder='some notes...'
						value={eventData.notes}
						onChange={handleEventDataChange}
					/>
				</div>
				<div className='my-4 flex w-full align-middle'>
					<FontAwesomeIcon className='my-auto mr-4 text-slate-500' icon={faPaperclip} />
					<input
						id='url'
						className='mx-2 my-auto w-full rounded bg-blue-100 px-4 py-1'
						type='text'
						placeholder='url'
						value={eventData.url}
						onChange={handleEventDataChange}
					/>
				</div>
				<div className='my-4 flex w-full align-middle'>
					<FontAwesomeIcon className='my-auto mr-4 text-slate-500' icon={faLocationDot} />
					<input
						id='location'
						className='mx-2 my-auto w-full rounded bg-blue-100 px-4 py-1'
						type='text'
						placeholder='place'
						value={eventData.location}
						onChange={handleEventDataChange}
					/>
				</div>
				<div className='flex w-full justify-center'>
					<button className=' mx-auto my-2 rounded border border-blue-700 bg-transparent px-4 py-2 font-semibold text-blue-700 hover:border-transparent hover:bg-blue-700 hover:text-white'>
						Submit!
					</button>
				</div>
			</form>
		</div>
	);
}
