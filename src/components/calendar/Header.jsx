import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { startOfWeek, addDays, format, isSameDay, getDate } from 'date-fns';
import { calendarContext } from './context';

import { VIEW_MODES } from '../../constants/calendarConstants';
import colors from '../../constants/theme';

const Header = () => {
	const { mode, currentDate } = useContext(calendarContext);
	const [weekDates, setWeekDates] = useState([]);

	useEffect(() => {
		const startOfWeekDate = startOfWeek(currentDate, { weekStartsOn: 1 });
		const week = [];

		for (let i = 0; i < 7; i++) {
			week.push(addDays(startOfWeekDate, i));
		}

		setWeekDates(week);
	}, [currentDate]);

	return (
		<View style={{ ...styles.container, width: '100%' }}>
			{weekDates.map((day, index) => (
				<View
					key={index}
					style={{
						...styles.cell,
						borderRightWidth: index === 6 ? 1 : 0,
						height: mode === VIEW_MODES.MONTH ? 30 : 60,
					}}>
					<Text>{format(day, 'E')}</Text>
					{mode !== VIEW_MODES.MONTH && (
						<Text style={isSameDay(day, currentDate) && styles.chosenDay}>{getDate(day)}</Text>
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
