import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { startOfWeek, addDays, format, isSameDay } from 'date-fns';
import { calendarContext } from './context';
import { VIEW_MODES } from '../../constants/calendarConstants';
import colors from '../../constants/theme';

const Header = () => {
	const { mode, currentDate } = useContext(calendarContext);
	const [weekDates, setWeekDates] = useState([]);
	const dayByWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

	useEffect(() => {
		const startOfWeekDate = startOfWeek(currentDate, { weekStartsOn: 1 });
		const week = [];

		for (let i = 0; i < dayByWeek.length; i++) {
			week.push(addDays(startOfWeekDate, i));
		}

		setWeekDates(week);
	});

	return (
		<View style={styles.container}>
			{dayByWeek.map((weekDay, index) => (
				<View key={index} style={styles.cell}>
					<Text>{weekDay}</Text>
					{mode !== VIEW_MODES.MONTH && (
						<Text style={isSameDay(weekDates[index], currentDate) ? styles.chosenDay : {}}>
							{format(weekDates[index], 'dd')}
						</Text>
					)}
				</View>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'center',
	},
	cell: {
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: colors.MAIN_COLOR,
		minHeight: 50,
	},
	chosenDay: {
		backgroundColor: colors.MAIN_COLOR_LIGHT,
		borderRadius: 50,
		width: 30,
		height: 30,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center',
		textAlign: 'center',
		lineHeight: 25,
	},
});

export default Header;
