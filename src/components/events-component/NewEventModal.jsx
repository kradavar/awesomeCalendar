import React, { useContext, useState } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet, TextInput, CheckBox } from 'react-native';
import { calendarContext } from '../calendar/context';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';

const NewEventModal = ({ visible, hideModal }) => {
	const { currentDate, addEvent } = useContext(calendarContext);
	const [isShownStart, showStartPicker] = useState(false);
	const [isShownEnd, showEndPicker] = useState(false);
	const [isAllDayEvent, setEventDuration] = useState(false);
	const [startDate, setStartDate] = useState(format(currentDate, 'PP'));
	const [isStartFilled, setStartFilled] = useState(false);
	const [isEndFilled, setEndFilled] = useState(false);
	const [endDate, setEndDate] = useState(format(currentDate, 'PP'));
	const [eventName, setEventName] = useState('');

	const handleDateChanging = (date, isStart) => {
		const setFnc = isStart ? setStartDate : setEndDate;
		const setFilledFnc = isStart ? setStartFilled : setEndFilled;
		const formatStr = isAllDayEvent ? 'PP' : 'MMM dd, yyyy, HH:mm';
		if (!date) {
			return;
		}
		showStartPicker(false);
		showEndPicker(false);

		setFnc(format(date, formatStr));
		setFilledFnc(true);
	};

	const handleEventAdding = () => {
		const event = {
			name: eventName,
			startDate,
			endDate,
			isAllDayEvent,
		};
		addEvent(event);
		hideModal();
	};
	return (
		<View>
			<Modal animationType="slide" transparent={true} visible={visible}>
				<View style={styles.container}>
					<View style={styles.modal}>
						<TouchableOpacity onPress={hideModal} style={styles.closeButton}>
							<Text>x</Text>
						</TouchableOpacity>
						<Text>Add a new event</Text>
						<View style={styles.inputWrapper}>
							<Text>Event name:</Text>
							<TextInput placeholder="Enter event name" onChangeText={text => setEventName(text)} />
						</View>
						<View style={styles.checkBoxWrapper}>
							<CheckBox onValueChange={() => setEventDuration(!isAllDayEvent)} value={isAllDayEvent} />
							<Text>All day event</Text>
						</View>
						<View style={styles.inputWrapper}>
							<Text>Start:</Text>
							<TouchableOpacity onPress={() => showStartPicker(true)}>
								<Text>{isStartFilled ? startDate : 'Choose event start'}</Text>
							</TouchableOpacity>
							<DateTimePickerModal
								isVisible={isShownStart}
								date={new Date(startDate)}
								onConfirm={date => handleDateChanging(date, true)}
								onCancel={() => {}}
								mode={isAllDayEvent ? 'date' : 'datetime'}
							/>
						</View>
						<View style={styles.inputWrapper}>
							<Text>End:</Text>
							<TouchableOpacity onPress={() => showEndPicker(true)}>
								<Text>{isEndFilled ? endDate : 'Choose event end'}</Text>
							</TouchableOpacity>
							<DateTimePickerModal
								isVisible={isShownEnd}
								date={new Date(endDate)}
								onConfirm={date => handleDateChanging(date, false)}
								onCancel={() => {}}
								mode={isAllDayEvent ? 'date' : 'datetime'}
							/>
						</View>
						<TouchableOpacity onPress={handleEventAdding} disabled={!eventName}>
							<Text> add new event</Text>
						</TouchableOpacity>
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
		height: '50%',
		backgroundColor: 'white',
		borderWidth: 1,
		borderColor: 'blue',
		shadowColor: 'blue',
		shadowOpacity: 0.5,
		paddingTop: 15,
	},
	inputWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	closeButton: {
		position: 'absolute',
		right: 5,
	},
	checkBoxWrapper: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
});

export default NewEventModal;
