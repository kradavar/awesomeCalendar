import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { calendarContext } from './calendar/context';
import { VIEW_MODES } from '../constants/calendarConstants';
import colors from '../constants/theme';

const ModeSwitcher = () => {
	const { mode, setMode } = useContext(calendarContext);
	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={{
					...styles.buttonWrapper,
					backgroundColor: mode === VIEW_MODES.MONTH ? colors.MAIN_COLOR_LIGHT : colors.MAIN_COLOR,
				}}
				onPress={() => mode !== VIEW_MODES.MONTH && setMode(VIEW_MODES.MONTH)}>
				<Text style={styles.label}>{VIEW_MODES.MONTH}</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={{
					...styles.buttonWrapper,
					backgroundColor: mode === VIEW_MODES.WEEK ? colors.MAIN_COLOR_LIGHT : colors.MAIN_COLOR,
				}}
				onPress={() => {
					console.log('[aaa]');

					mode !== VIEW_MODES.WEEK && setMode(VIEW_MODES.WEEK);
				}}>
				<Text style={styles.label}>{VIEW_MODES.WEEK}</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={{
					...styles.buttonWrapper,
					backgroundColor: mode === VIEW_MODES.DAY ? colors.MAIN_COLOR_LIGHT : colors.MAIN_COLOR,
				}}
				onPress={() => mode !== VIEW_MODES.DAY && setMode(VIEW_MODES.DAY)}>
				<Text style={styles.label}>{VIEW_MODES.DAY}</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '85%',
	},
	buttonWrapper: {
		backgroundColor: colors.MAIN_COLOR_LIGHT,
		padding: 10,
		borderRadius: 5,
	},
	label: {},
});

export default ModeSwitcher;
