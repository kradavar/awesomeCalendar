import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { format, isSunday, isSameISOWeek, endOfMonth, isMonday, isSameMonth, isSameDay } from 'date-fns';
import { calendarContext } from './context';
import { VIEW_MODES } from '../../constants/calendarConstants';
import Hour from './Hour';

const Day = ({ date }) => {
	const { mode, currentDate, events } = useContext(calendarContext);
	const [hasEvents, setEventsFlag] = useState(false);
	const isMonthMode = mode === VIEW_MODES.MONTH;
	const isDayMode = mode === VIEW_MODES.DAY;
	const isLastWeekOfMonth = isSameISOWeek(date, endOfMonth(currentDate));
	const hours = [];
	const dayStyles = isSameMonth(currentDate, date) ? styles.currentMonthDate : styles.dayContainer;

	for (let index = 0; index < 24; index++) {
		hours.push(<Hour key={index} hour={index} isMonday={isMonday(date)} />);
	}

	console.log('[events date]', events);

	useEffect(() => {
		const hasEventsChanged = !!events.filter(event => isSameDay(new Date(event.startDate), date)).length;

		setEventsFlag(hasEventsChanged);
	}, [events]);

	return (
		<View
			style={{
				...styles.dayContainer,
				width: isDayMode ? '85%' : '14%',
				borderRightWidth: !isDayMode && !isSunday(date) ? 0 : 1,
				borderBottomWidth: isMonthMode && !isLastWeekOfMonth ? 0 : 1,
				...dayStyles,
			}}>
			{isMonthMode ? (
				<TouchableOpacity onPress={() => alert(hasEvents)}>
					<Text>{format(date, 'dd')}</Text>
					{hasEvents && (
						<View style={styles.eventMark}>
							<TouchableOpacity style={styles.eventMark}></TouchableOpacity>
						</View>
					)}
				</TouchableOpacity>
			) : (
				hours
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	dayContainer: {
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: 'blue',
		backgroundColor: 'blue',
		opacity: 0.3,
		minHeight: 50,
	},
	currentMonthDate: {
		backgroundColor: 'white',
		opacity: 1,
	},
	eventMark: {
		backgroundColor: 'green',
		borderRadius: 50,
		width: 10,
		height: 10,
	},
});

export default Day;
