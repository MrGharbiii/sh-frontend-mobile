// screens/HomeScreen.tsx
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

const HomeScreen = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Welcome to Slim & Healthy</Text>
			<Button
				mode="contained"
				onPress={() => navigation.navigate("Questionnaire")}
				style={styles.button}
			>
				Start Health Assessment
			</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 30,
		textAlign: "center",
		color: "#4CAF50",
	},
	button: {
		width: "100%",
		paddingVertical: 8,
	},
});

export default HomeScreen;
