import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { LoginScreenNavigationProp } from "../types/navigation";

const LoginScreen = () => {
	const navigation = useNavigation<LoginScreenNavigationProp>();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

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
			<Button
				mode="contained"
				onPress={() => navigation.navigate("Home")}
				style={styles.button}
			>
				Login
			</Button>
			<Button
				onPress={() => navigation.navigate("Signup")}
				style={styles.button}
			>
				Create Account
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

export default LoginScreen;
