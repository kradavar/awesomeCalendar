import React, { createContext, useState } from 'react';
import { VIEW_MODES } from '../../constants/calendarConstants';
import _ from 'lodash';
import { format } from 'date-fns';

const context = {
	mode: VIEW_MODES.MONTH,
	currentDate: new Date(),
	setMode: () => ({}),
	setCurrentDate: () => ({}),
	events: [],
	addEvent: event => events.push(event),
	deleteEvent: event => {},
	reloading: false,
	setLoadingState: boolean => {},
};

export const calendarContext = createContext(context);

const CalendarContextProvider = ({ children }) => {
	const [mode, setMode] = useState(VIEW_MODES.MONTH);
	const [currentDate, setCurrentDate] = useState(new Date());
	const [events, setEvents] = useState([
		{
			name: 'first',
			startDate: format(currentDate, 'PP'),
			isAllDayEvent: true,
			endDate: format(currentDate, 'PP'),
			description: 'hey hey hey',
		},
		{
			name: 'second',
			startDate: format(new Date('2020-03-07T03:25:00'), 'MMM dd, yyyy, HH:mm'),
			isAllDayEvent: false,
			endDate: format(new Date('2020-03-07T05:10:00'), 'MMM dd, yyyy, HH:mm'),
			description: 'event for some hours',
		},
	]);
	const [isLoading, setLoadingState] = useState(false);

	const updateMode = mode => {
		setMode(mode);
		setLoadingState(true);
	};

	const value = {
		mode,
		setMode: updateMode,
		currentDate,
		setCurrentDate,
		events,
		isLoading,
		setLoadingState,
		addEvent: event => setEvents([...events, event]),
		deleteEvent: event => setEvents([..._.pull(events, event)]),
	};

	return <calendarContext.Provider value={value}>{children}</calendarContext.Provider>;
};

export default CalendarContextProvider;
