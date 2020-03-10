import React, { useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { calendarContext } from '../calendar/context';
import { VIEW_MODES } from '../../constants/calendarConstants';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { addMonths, addWeeks, addDays, subMonths, subWeeks, subDays, format } from 'date-fns';
import colors from './../../constants/theme';

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
			<TouchableOpacity style={styles.navigationButton} onPress={decreaseFnc}>
				<FontAwesomeIcon style={styles.label} icon={faAngleLeft} size={20} />
			</TouchableOpacity>
			<Text style={styles.label}>{format(currentDate, 'MMMM, yyyy')}</Text>
			<TouchableOpacity style={styles.navigationButton} onPress={increaseFnc}>
				<FontAwesomeIcon style={styles.label} icon={faAngleRight} size={20} />
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '75%',
		alignItems: 'center',
		marginVertical: 10,
	},
	label: {
		color: colors.SECONDARY_COLOR_DARK,
		fontSize: 20,
	},
});

export default ChangeDateButtons;
