import React, { useContext, useEffect } from 'react';
import { calendarContext } from './context';

import { StyleSheet, Text, View } from 'react-native';
import { VIEW_MODES } from '../../constants/calendarConstants';
import Month from './Month';
import Week from './Week';
import Day from './Day';
import Header from './Header';
import { startOfISOWeek } from 'date-fns';

const CalendarContainer = () => {
	const { mode, currentDate, events } = useContext(calendarContext);

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

	return (
		<View style={styles.calendarContainer}>
			<Header />
			{getCalendarContent()}
			{mode === VIEW_MODES.MONTH &&
				events.map(event => (
					<View key={event.name}>
						<Text>{event.name}</Text>
					</View>
				))}
		</View>
	);
};

const styles = StyleSheet.create({
	calendarContainer: {
		width: '90%',
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default CalendarContainer;
