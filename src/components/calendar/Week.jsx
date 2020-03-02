import React, { useContext } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { format, addDays } from 'date-fns';
import Day from './Day';
import { calendarContext } from './context';
import { VIEW_MODES } from '../../constants/calendarConstants';

const Week = ({ start }) => {
	const { mode } = useContext(calendarContext);
	const days = [];

	for (let index = 0; index < 7; index++) {
		days.push(<Day key={index} date={addDays(start, 1 * index)} />);
	}

	return (
		<View style={styles.week}>
			{mode === VIEW_MODES.MONTH ? (
				days
			) : (
				<SafeAreaView
					style={{
						width: '100%',
						flexDirection: 'row',
						height: '95%',
					}}>
					<ScrollView>
						<View style={styles.week}>{days}</View>
					</ScrollView>
				</SafeAreaView>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	week: {
		display: 'flex',
		flexDirection: 'row',
	},
});

export default Week;
