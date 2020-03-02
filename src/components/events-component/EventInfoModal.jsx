import React, { useContext } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet, TextInput, CheckBox } from 'react-native';
import { calendarContext } from '../calendar/context';

const EventInfoModal = ({ hideModal, event, visible }) => {
	const { deleteEvent } = useContext(calendarContext);

	const removeEvent = event => {
		deleteEvent(event);
		hideModal();
	};

	return (
		<View>
			<Modal animationType="slide" transparent={true} visible={visible}>
				<View style={styles.container}>
					<View style={styles.modal}>
						<TouchableOpacity onPress={hideModal} style={styles.closeButton}>
							<Text
								style={{
									fontSize: 26,
								}}>
								x
							</Text>
						</TouchableOpacity>
						<Text style={styles.eventName}>{event.name}</Text>
						<View>
							{event.isAllDayEvent && <Text style={styles.description}>This is all day long event.</Text>}
							<View>
								<Text>Event start {event.startDate}</Text>
							</View>
							<View>
								<Text>Event end {event.endDate}</Text>
							</View>
						</View>
						<View>
							<TouchableOpacity onPress={() => removeEvent(event)}>
								<Text>delete event</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modal: {
		width: '75%',
		height: '40%',
		backgroundColor: 'white',
		borderWidth: 1,
		borderColor: 'blue',
		shadowColor: 'blue',
		shadowOpacity: 0.5,
		paddingTop: 15,
	},
	closeButton: {
		position: 'absolute',
		right: 10,
		top: 0,
	},
	eventName: {
		fontSize: 20,
		textAlign: 'center',
	},
	description: {},
});

export default EventInfoModal;
