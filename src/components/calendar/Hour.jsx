import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../../constants/theme';
import EventInfoModal from '../events-component/EventInfoModal';

const Hour = ({ hour, isMonday, isDayMode, events }) => {
	const [selectedEvent, setSelectedEvent] = useState({});
	const [isInfoModalVisible, setInfoModalVisible] = useState(false);

	return (
		<View>
			<TouchableOpacity
				style={{
					...styles.cell,
					borderTopWidth: hour === 0 ? 0 : 1,
				}}
				onPress={() => alert('hey')}>
				{(isMonday || isDayMode) && (
					<View>
						<Text>{hour}</Text>
						{events &&
							events.map(event => (
								<View key={new Date()}>
									<TouchableOpacity
										style={styles.eventWrapper}
										onPress={() => {
											setSelectedEvent(event);
											setInfoModalVisible(true);
										}}>
										<View style={styles.eventMark}></View>
										<Text style={styles.eventName}>{event.name}</Text>
									</TouchableOpacity>
								</View>
							))}
					</View>
				)}
			</TouchableOpacity>
			<EventInfoModal visible={isInfoModalVisible} hideModal={() => setInfoModalVisible(false)} event={selectedEvent} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 50,
	},
	cell: {
		borderTopWidth: 1,
		borderColor: colors.MAIN_COLOR,
		height: 50,
	},
	eventWrapper: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	eventMark: {
		backgroundColor: colors.EVENT_MARKER_COLOR,
		borderRadius: 50,
		width: 5,
		height: 5,
	},
	eventName: {
		fontSize: 7,
		backgroundColor: colors.EVENT_COLOR,
		padding: 1,
		borderRadius: 5,
	},
});

export default Hour;
