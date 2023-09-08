import { PropsWithChildren, ReactNode, forwardRef } from "react";
import { CellType } from "../types";

type CalendarCellProps = {
	cellType: CellType;
	date: Date;
	children: ReactNode;
};

const CalendarCellLayout = forwardRef(function CalendarCell(
	props: PropsWithChildren<CalendarCellProps>,
	ref: React.ForwardedRef<HTMLDivElement>
) {
	const day = props.date.getDate();

	return props.cellType == "currentMonth" ? (
		<div
			className='h-full max-h-full w-full overflow-hidden bg-zinc-50 text-lg font-semibold'
			ref={ref}
		>
			<p className='mb-2 mt-1 w-full select-none px-2'>{day}</p>
			<div className='scrollbar-hide h-full max-h-full w-full overflow-y-scroll'>
				{props.children}
			</div>
		</div>
	) : (
		<div
			className='h-full w-full overflow-hidden bg-zinc-100 p-2 text-lg font-bold opacity-50'
			ref={ref}
		>
			<p className='mb-2 mt-1 w-full select-none px-2'>{day}</p>
			<div className='scrollbar-hide h-full max-h-full w-full overflow-y-scroll'>
				{props.children}
			</div>
		</div>
	);
});

export default CalendarCellLayout;
