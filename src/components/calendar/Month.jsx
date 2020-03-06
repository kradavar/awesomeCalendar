import React, { useContext } from 'react';
import { View } from 'react-native';
import { calendarContext } from './context';
import { startOfMonth, addDays, startOfISOWeek, isSameMonth } from 'date-fns';
import Week from './Week';

const Month = () => {
	const { currentDate } = useContext(calendarContext);
	const monthStart = startOfMonth(currentDate);
	const weeks = [];
	for (let index = 0; index < 6; index++) {
		const weekStart = startOfISOWeek(addDays(monthStart, 7 * index));
		if (isSameMonth(weekStart, currentDate) || index === 0) {
			weeks.push(<Week key={index} start={weekStart} />);
		}
	}

	return <View>{weeks}</View>;
};

export default Month;
