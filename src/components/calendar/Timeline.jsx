import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import colors from './../../constants/theme';

const Timeline = () => {
	const currentTimeHours = new Date().getHours();
	const currentTimeMinutes = new Date().getMinutes();
	const timelineTop = currentTimeHours * 50 + Math.round((currentTimeMinutes * 5) / 6);

	useEffect(() => {});

	return (
		<View
			style={{
				...styles.timeline,
				top: timelineTop,
			}}></View>
	);
};

const styles = StyleSheet.create({
	timeline: {
		height: '0.5%',
		backgroundColor: colors.SECONDARY_COLOR_LIGHT,
		width: '100%',
		position: 'absolute',
	},
});

export default Timeline;
