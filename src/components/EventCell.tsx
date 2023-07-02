import { EventType, SetValue } from "../types";

type EventCellPropsType = {
	activeEvent: EventType;
	setModalIsOpen: SetValue<boolean>;
	setActiveEventDetails: SetValue<EventType | undefined>;
};

export default function EventCell(props: EventCellPropsType): JSX.Element {
	const activeEvent = props.activeEvent;
	const setModalIsOpen = props.setModalIsOpen;
	const setActiveEventDetails = props.setActiveEventDetails;
	return (
		<div
			onClick={() => {
				setModalIsOpen(true);
				setActiveEventDetails(activeEvent);
			}}
			className='mx-auto mb-2 box-border flex h-6 w-[90%] cursor-pointer justify-between bg-slate-100 align-middle hover:translate-y-[-2px] hover:rounded hover:bg-slate-50 hover:shadow-lg'
		>
			{activeEvent.fullDay ? (
				<>
					<p className='my-auto grow overflow-x-hidden text-ellipsis whitespace-nowrap rounded bg-blue-500 pl-3 text-sm font-semibold text-white'>
						{" "}
						{activeEvent.title}{" "}
					</p>
				</>
			) : (
				<>
					<div className='mx-1 my-auto h-[65%] w-1 rounded bg-blue-500'></div>
					<p className='my-auto grow overflow-x-hidden text-ellipsis whitespace-nowrap text-sm font-semibold text-gray-500'>
						{" "}
						{activeEvent.title}{" "}
					</p>
					<p className='mx-1 my-auto w-fit text-sm font-light text-gray-800'>
						{activeEvent.beginTime}
					</p>
				</>
			)}
		</div>
	);
}
