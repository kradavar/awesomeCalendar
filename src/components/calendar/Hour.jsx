import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../../constants/theme';

const Hour = ({ hour, isMonday, isDayMode }) => {
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
					</View>
				)}
			</TouchableOpacity>
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
});

export default Hour;
