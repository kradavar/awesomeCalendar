import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../../constants/theme';
import EventInfoModal from '../events-component/EventInfoModal';
import { differenceInMinutes } from 'date-fns';
const Hour = ({ hour, isMonday, isDayMode, events }) => {
	const [selectedEvent, setSelectedEvent] = useState({});
	const [isInfoModalVisible, setInfoModalVisible] = useState(false);

	return (
		<View>
			<View
				style={{
					...styles.cell,
					borderTopWidth: hour === 0 ? 0 : 1,
				}}>
				{(isMonday || isDayMode) && (
					<View>
						<Text>{hour}</Text>
					</View>
				)}
			</View>
			<EventInfoModal visible={isInfoModalVisible} hideModal={() => setInfoModalVisible(false)} event={selectedEvent} />
			<View>
				{events &&
					events.map((event, index) => {
						const eventHeight = Math.round(
							(differenceInMinutes(new Date(event.endDate), new Date(event.startDate)) * 5) / 6
						);
						const eventTop = Math.round((new Date(event.startDate).getMinutes() * 5) / 6);

						return (
							<View key={index}>
								<TouchableOpacity
									style={{
										...styles.eventWrapper,
										height: eventHeight,
										top: -eventTop,
									}}
									onPress={() => {
										setSelectedEvent(event);
										setInfoModalVisible(true);
									}}>
									<Text style={styles.eventName}>{event.name}:</Text>
									<Text style={styles.eventDescription}>{event.description}</Text>
								</TouchableOpacity>
							</View>
						);
					})}
			</View>
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
		zIndex: 10,
		position: 'relative',
	},
	eventWrapper: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		paddingTop: 5,
		backgroundColor: colors.EVENT_COLOR,
		width: '95%',
		marginLeft: '5%',
		borderRadius: 5,
		position: 'absolute',
		zIndex: 100,
		borderWidth: 2,
		borderColor: colors.EVENT_MARKER_COLOR,
	},
	eventName: {
		fontSize: 8,
		padding: 1,
		paddingRight: 5,
	},
	eventDescription: {
		fontSize: 8,
		padding: 1,
		fontStyle: 'italic',
	},
});

export default Hour;
