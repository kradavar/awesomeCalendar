import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import NewEventModal from './NewEventModal';
import colors from '../../constants/theme';

const NewEventButton = () => {
	const [isModalShown, setModalVisability] = useState(false);
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => setModalVisability(true)} style={styles.buttonWrapper}>
				<FontAwesomeIcon icon={faPlus} style={styles.plusButton} />
			</TouchableOpacity>

			{isModalShown && <NewEventModal visible={isModalShown} hideModal={() => setModalVisability(false)} />}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		width: '100%',

		position: 'absolute',
		bottom: 36,
		right: 30,
	},
	plusButton: {
		color: 'white',
	},
	buttonWrapper: {
		borderRadius: 50,
		backgroundColor: colors.MAIN_COLOR,
		padding: 10,
	},
});

export default NewEventButton;
