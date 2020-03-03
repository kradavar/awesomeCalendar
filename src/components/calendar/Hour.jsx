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
				<View>
					{events &&
						events.map(event => {
							const eventHeight = Math.round(
								(differenceInMinutes(new Date(event.endDate), new Date(event.startDate)) * 5) / 6
							);
							const eventTop = styles.eventWrapper.top + Math.round((new Date(event.startDate).getMinutes() * 5) / 6);

							return (
								<View
									key={new Date()}
									style={{
										position: 'relative',
									}}>
									<TouchableOpacity
										style={{
											...styles.eventWrapper,
											height: eventHeight,
											top: eventTop,
										}}
										onPress={() => {
											setSelectedEvent(event);
											setInfoModalVisible(true);
										}}>
										<Text style={styles.eventName}>{event.name}</Text>
									</TouchableOpacity>
								</View>
							);
						})}
				</View>
			</View>
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
		zIndex: 10,
		position: 'relative',
	},
	eventWrapper: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: colors.EVENT_COLOR,
		width: '95%',
		marginLeft: '5%',
		borderRadius: 5,
		position: 'absolute',
		top: -22,
		zIndex: 100,
	},
	eventName: {
		fontSize: 7,
		padding: 1,
	},
});

export default Hour;
