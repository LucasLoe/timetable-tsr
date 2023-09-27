import React, { useState, createContext, useContext } from "react";
import { EventModalType, SetValue } from "../types";

type NewEventModalProviderProps = {
	children: React.ReactNode | React.ReactNode[];
};

export const NewEventModal = createContext<
	| {
			modalState: EventModalType;
			setModalState: SetValue<EventModalType>;
	  }
	| undefined
>(undefined);

const NewEventModalProvider = (props: NewEventModalProviderProps) => {
	const [modalState, setModalState] = useState<EventModalType>({
		newEvent: false,
		newEventPrefill: undefined,
	});

	return (
		<NewEventModal.Provider value={{ modalState, setModalState }}>
			{props.children}
		</NewEventModal.Provider>
	);
};

const useNewEventModal = () => {
	const context = useContext(NewEventModal);

	if (context === undefined) {
		throw new Error("useNewEventModal must be used within a NewEventModalProvider");
	}

	return context;
};

export { NewEventModalProvider, useNewEventModal };
