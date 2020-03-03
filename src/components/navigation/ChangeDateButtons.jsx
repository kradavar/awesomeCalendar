import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Button from './Button';
import { calendarContext } from '../calendar/context';
import { VIEW_MODES } from '../../constants/calendarConstants';
import { addMonths, addWeeks, addDays, subMonths, subWeeks, subDays, format } from 'date-fns';

const ChangeDateButtons = () => {
	const { currentDate, mode, setCurrentDate } = useContext(calendarContext);

	const increaseFnc = () => {
		const add = mode === VIEW_MODES.MONTH ? addMonths : mode === VIEW_MODES.WEEK ? addWeeks : addDays;

		setCurrentDate(add(currentDate, 1));
	};

	const decreaseFnc = () => {
		const subtract = mode === VIEW_MODES.MONTH ? subMonths : mode === VIEW_MODES.WEEK ? subWeeks : subDays;

		setCurrentDate(subtract(currentDate, 1));
	};

	return (
		<View style={styles.container}>
			<Button name="previous" action={decreaseFnc} />
			<Text>{format(currentDate, 'MMMM')}</Text>
			<Button name="next" action={increaseFnc} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '75%',
	},
});

export default ChangeDateButtons;
