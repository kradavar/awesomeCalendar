import React, { useContext, useState } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet, TextInput, CheckBox } from 'react-native';
import { calendarContext } from '../calendar/context';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format, isPast } from 'date-fns';
import colors from '../../constants/theme';

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
	const [description, setEventDescription] = useState('');
	const [errors, setErrors] = useState({});

	const handleDateChanging = (date, isStart) => {
		const setFnc = isStart ? setStartDate : setEndDate;
		const setFilledFnc = isStart ? setStartFilled : setEndFilled;
		const formatStr = isAllDayEvent ? 'PP' : 'MMM dd, yyyy, HH:mm';
		if (!date) {
			return;
		}

		showStartPicker(false);
		showEndPicker(false);
		if (isPast(date)) {
			isStart
				? (errors.startDate = "Event can't be created in the past")
				: (errors.endDate = "Event can't be created in the past");
		}

		setFnc(format(date, formatStr));
		setFilledFnc(true);
	};

	const handleEventAdding = () => {
		const event = {
			name: eventName,
			startDate,
			endDate,
			isAllDayEvent,
			description,
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
							<Text
								style={{
									fontSize: 20,
								}}>
								x
							</Text>
						</TouchableOpacity>
						<Text style={styles.headerText}>Add a new event</Text>
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
							{errors.startDate && <Text>{errors.startDate}</Text>}
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
							{errors.endDate && <Text>{errors.endDate}</Text>}
							<DateTimePickerModal
								isVisible={isShownEnd}
								date={new Date(endDate)}
								onConfirm={date => handleDateChanging(date, false)}
								onCancel={() => {}}
								mode={isAllDayEvent ? 'date' : 'datetime'}
							/>
						</View>
						<View style={styles.inputWrapper}>
							<Text>Description:</Text>
							<TextInput
								placeholder="Event description"
								onChangeText={text => setEventDescription(text)}
								multiline={true}
								numberOfLines={3}
								style={{
									width: '60%',
								}}
							/>
						</View>
						<TouchableOpacity onPress={handleEventAdding} disabled={!eventName} style={styles.createButton}>
							<Text style={styles.buttonLabel}>create</Text>
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
		backgroundColor: 'rgba(255, 115, 115, 0.4)',
	},
	modal: {
		width: '75%',
		height: '50%',
		backgroundColor: 'white',
		borderWidth: 1,
		paddingTop: 15,
		justifyContent: 'space-between',
	},
	headerText: {
		fontSize: 20,
		textAlign: 'center',
	},
	inputWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'flex-start',
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
	createButton: {
		backgroundColor: colors.MAIN_COLOR_LIGHT,
		width: '100%',
		paddingVertical: 10,
		justifyContent: 'center',
	},
	buttonLabel: {
		textAlign: 'center',
		textTransform: 'uppercase',
	},
});

export default NewEventModal;
