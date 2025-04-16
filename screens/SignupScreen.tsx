import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { SignupScreenNavigationProp } from "../types/navigation";

const SignupScreen = () => {
	const navigation = useNavigation<SignupScreenNavigationProp>();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	return (
		<View style={styles.container}>
			<TextInput
				label="Email"
				mode="outlined"
				value={email}
				onChangeText={setEmail}
				style={styles.input}
			/>
			<TextInput
				label="Password"
				mode="outlined"
				secureTextEntry
				value={password}
				onChangeText={setPassword}
				style={styles.input}
			/>
			<TextInput
				label="Confirm Password"
				mode="outlined"
				secureTextEntry
				value={confirmPassword}
				onChangeText={setConfirmPassword}
				style={styles.input}
			/>
			<Button
				mode="contained"
				onPress={() => navigation.navigate("Home")}
				style={styles.button}
			>
				Sign Up
			</Button>
			<Button onPress={() => navigation.goBack()} style={styles.button}>
				Back to Login
			</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		justifyContent: "center",
	},
	input: {
		marginBottom: 16,
	},
	button: {
		marginTop: 8,
	},
});

export default SignupScreen;
