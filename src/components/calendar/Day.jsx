import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { format, isSunday, isSameISOWeek, endOfMonth, isMonday, isSameMonth, isSameDay, isToday } from 'date-fns';
import { calendarContext } from './context';
import { VIEW_MODES } from '../../constants/calendarConstants';
import Hour from './Hour';
import colors from './../../constants/theme';
import EventInfoModal from '../events-component/EventInfoModal';
import Timeline from './Timeline';

const Day = ({ date }) => {
	const { mode, currentDate, events, setCurrentDate, setMode } = useContext(calendarContext);
	const [dayEvents, setEvents] = useState([]);
	const [isInfoModalVisible, setInfoModalVisible] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState({});
	const [hours, setHours] = useState([]);
	const [isTimelineShown, setIsTimelineShown] = useState(isSameDay(date, new Date()));
	const isMonthMode = mode === VIEW_MODES.MONTH;
	const isDayMode = mode === VIEW_MODES.DAY;
	const isLastWeekOfMonth = isSameISOWeek(date, endOfMonth(currentDate));
	const dayStyles = isSameMonth(currentDate, date)
		? styles.currentMonthDate
		: isMonthMode
		? styles.dayContainer
		: styles.currentMonthDate;

	useEffect(() => {
		const eventsForThatDay = events.filter(event =>
			isSameDay(new Date(event.startDate), isDayMode ? currentDate : date)
		);
		const hourArr = [];
		for (let index = 0; index < 24; index++) {
			const hourEvents = eventsForThatDay.filter(
				event => !event.isAllDayEvent && +new Date(event.startDate).getHours() === index
			);
			hourArr.push(
				<Hour key={index} hour={index} isMonday={isMonday(date)} events={hourEvents} isDayMode={isDayMode} />
			);
		}
		setHours(hourArr);
		setEvents(eventsForThatDay);
	}, [events, date, currentDate]);

	useEffect(() => {
		setIsTimelineShown(isSameDay(currentDate, new Date()));
	}, [currentDate]);

	return (
		<View
			style={{
				...styles.dayContainer,
				width: isDayMode ? '100%' : '14%',
				borderRightWidth: !isDayMode && !isSunday(date) ? 0 : 1,
				borderBottomWidth: isMonthMode && !isLastWeekOfMonth ? 0 : 1,
				height: isDayMode ? '82%' : '100%',
				marginBottom: isDayMode ? 70 : 0,
				...dayStyles,
			}}>
			{isMonthMode ? (
				<TouchableOpacity
					onPress={() => {
						if (isSameMonth(currentDate, date)) {
							setCurrentDate(date);
							setMode(VIEW_MODES.DAY);
						}
					}}>
					<Text style={isToday(date) ? styles.todayDate : {}}>{format(date, 'dd')}</Text>
					{dayEvents &&
						dayEvents.map(event => (
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
				</TouchableOpacity>
			) : (
				<SafeAreaView
					style={{
						height: '100%',
					}}>
					<ScrollView>
						{isTimelineShown && <Timeline />}
						<View>{hours}</View>
					</ScrollView>
				</SafeAreaView>
			)}
			<EventInfoModal visible={isInfoModalVisible} hideModal={() => setInfoModalVisible(false)} event={selectedEvent} />
		</View>
	);
};

const styles = StyleSheet.create({
	dayContainer: {
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: colors.MAIN_COLOR,
		backgroundColor: colors.SECONDARY_COLOR_LIGHT,
		minHeight: 50,
	},
	currentMonthDate: {
		backgroundColor: 'white',
		opacity: 1,
	},
	todayDate: {
		backgroundColor: colors.MAIN_COLOR_LIGHT,
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

export default Day;
