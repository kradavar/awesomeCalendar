import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns';

import colors from '../../constants/theme';

const EventList = ({ events }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.header}>This month events</Text>
			{!!events.length ? (
				events.map((event, index) => (
					<View key={index} style={styles.event}>
						<View style={styles.eventMark}></View>
						<Text style={styles.time}>{format(new Date(event.startDate), 'do ')}</Text>
						<Text style={styles.name}>{event.name}</Text>
					</View>
				))
			) : (
				<Text>There are no events this month</Text>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		marginTop: 10,
	},
	header: {
		textAlign: 'center',
		fontSize: 18,
	},
	event: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	time: {
		width: '13%',
	},
	name: {
		width: '80%',
	},
	eventMark: {
		backgroundColor: colors.EVENT_MARKER_COLOR,
		borderRadius: 50,
		width: 12,
		height: 12,
	},
});

export default EventList;
