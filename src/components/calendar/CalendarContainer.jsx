import React, { useContext, useEffect, useState } from 'react';
import { calendarContext } from './context';
import { addMonths, addWeeks, addDays, subMonths, subWeeks, subDays, format } from 'date-fns';

import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { VIEW_MODES } from '../../constants/calendarConstants';
import Month from './Month';
import Week from './Week';
import Day from './Day';
import Header from './Header';
import { startOfISOWeek, isSameMonth } from 'date-fns';
import EventList from '../events-component/EventList';
import colors from './../../constants/theme';
import GestureRecognizer from 'react-native-swipe-gestures';

const CalendarContainer = () => {
	const { mode, currentDate, events, isLoading, setLoadingState, setCurrentDate } = useContext(calendarContext);
	const [calendar, setCalendar] = useState(<Month />);

	const getCalendarContent = () => {
		switch (mode) {
			case VIEW_MODES.WEEK:
				return <Week start={startOfISOWeek(currentDate)} />;
			case VIEW_MODES.DAY:
				return <Day date={currentDate} />;
			default:
				return <Month />;
		}
	};

	const increaseFnc = () => {
		const add = mode === VIEW_MODES.MONTH ? addMonths : mode === VIEW_MODES.WEEK ? addWeeks : addDays;

		setCurrentDate(add(currentDate, 1));
	};

	const decreaseFnc = () => {
		const subtract = mode === VIEW_MODES.MONTH ? subMonths : mode === VIEW_MODES.WEEK ? subWeeks : subDays;

		setCurrentDate(subtract(currentDate, 1));
	};

	useEffect(() => {
		const content = getCalendarContent();

		setCalendar(content);
		setLoadingState(false);
	}, [mode]);

	return isLoading ? (
		<View style={styles.loaderContainer}>
			<ActivityIndicator size={70} color={colors.SECONDARY_COLOR_DARK} />
		</View>
	) : (
		<View style={styles.calendarContainer}>
			<GestureRecognizer onSwipeRight={decreaseFnc} onSwipeLeft={increaseFnc}>
				<Header />
				<View>{calendar}</View>
			</GestureRecognizer>
			{mode === VIEW_MODES.MONTH && (
				<EventList events={[...events.filter(event => isSameMonth(new Date(event.startDate), currentDate))]} />
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	calendarContainer: {
		width: '90%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	loaderContainer: {
		flex: 1,
		justifyContent: 'center',
	},
});

export default CalendarContainer;
