import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { startOfWeek, addDays, format, isSameDay, getDate } from 'date-fns';
import { calendarContext } from './context';

import { VIEW_MODES } from '../../constants/calendarConstants';
import colors from '../../constants/theme';

const Header = () => {
	const { mode, currentDate } = useContext(calendarContext);
	const [weekDates, setWeekDates] = useState([]);
	const dayByWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

	useEffect(() => {
		const startOfWeekDate = startOfWeek(currentDate, { weekStartsOn: 2 });
		const week = [];

		for (let i = 0; i < dayByWeek.length; i++) {
			week.push(addDays(startOfWeekDate, i));
		}

		setWeekDates(week);
	}, [currentDate]);

	return (
		<View style={{ ...styles.container, width: '100%' }}>
			{dayByWeek.map((day, index) => (
				<View
					key={index}
					style={{
						...styles.cell,
						borderRightWidth: index === 6 ? 1 : 0,
						height: mode === VIEW_MODES.MONTH ? 30 : 60,
						marginTop: mode === VIEW_MODES.MONTH ? 5 : 30,
					}}>
					<Text>{day}</Text>
					{mode !== VIEW_MODES.MONTH && !!weekDates.length && (
						<Text style={isSameDay(addDays(weekDates[index], -1), currentDate) && styles.chosenDay}>
							{getDate(addDays(weekDates[index], -1))}
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
		justifyContent: 'flex-start',
	},
	cell: {
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: colors.MAIN_COLOR,
		backgroundColor: colors.MAIN_COLOR_LIGHT,
		width: '14%',
		borderBottomWidth: 0,
		justifyContent: 'center',
		alignItems: 'center',
	},
	chosenDay: {
		backgroundColor: colors.WHITE,
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
