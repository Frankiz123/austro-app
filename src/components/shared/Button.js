import React from 'react';
import {
	Dimensions,
	Text,
	TouchableOpacity,
	StyleSheet,
	ActivityIndicator,
} from 'react-native';
const { width: WIDTH } = Dimensions.get('window');

export const Button = (props) => {
	const { onPress, isLoading } = props;
	return (
		<TouchableOpacity
			onPress={onPress}
			style={{ ...styles.btnLogin, ...props.style }}
		>
			{isLoading ? (
				<ActivityIndicator size="small" color={'white'} />
			) : (
				<Text style={styles.logintext}>{props.children}</Text>
			)}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	btnLogin: {
		width: WIDTH - 55,
		justifyContent: 'center',
		height: 50,
		borderRadius: 10,

		backgroundColor: '#432577',
		marginTop: 20,
	},
	logintext: {
		color: 'rgba(255,255,255,255)',
		fontSize: 16,
		textAlign: 'center',
		fontWeight: 'bold',
	},
});
