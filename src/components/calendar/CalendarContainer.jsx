import React, { useContext, useEffect } from 'react';
import { calendarContext } from './context';

import { StyleSheet, Text, View } from 'react-native';
import { VIEW_MODES } from '../../constants/calendarConstants';
import Month from './Month';
import Week from './Week';
import Day from './Day';
import { startOfISOWeek } from 'date-fns';

const CalendarContainer = () => {
	const calendarInfo = useContext(calendarContext);

	const getCalendarContent = () => {
		const { mode, currentDate } = calendarInfo;

		switch (mode) {
			case VIEW_MODES.WEEK:
				return <Week start={startOfISOWeek(currentDate)} />;
			case VIEW_MODES.DAY:
				return <Day date={currentDate} />;
			default:
				return <Month />;
		}
	};

	console.log('[events]', calendarInfo.events);

	return (
		<View style={styles.container}>
			{/* <Header /> */}
			{getCalendarContent()}
			{calendarInfo.events.map(event => (
				<View key={event.name}>
					<Text>{event.name}</Text>
				</View>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '90%',
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default CalendarContainer;
