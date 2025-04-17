// screens/SignupScreen.tsx
import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, TextInput, Text, HelperText } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { SignupScreenNavigationProp } from "../types/navigation";

const SignupScreen = () => {
	const navigation = useNavigation<SignupScreenNavigationProp>();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [errors, setErrors] = useState({
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [secureTextEntry, setSecureTextEntry] = useState(true);
	const [loading, setLoading] = useState(false);

	const validate = () => {
		const newErrors = {
			email: "",
			password: "",
			confirmPassword: "",
		};
		let isValid = true;

		if (!formData.email) {
			newErrors.email = "Email is required";
			isValid = false;
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Email is invalid";
			isValid = false;
		}

		if (!formData.password) {
			newErrors.password = "Password is required";
			isValid = false;
		} else if (formData.password.length < 6) {
			newErrors.password = "Password must be at least 6 characters";
			isValid = false;
		}

		if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = "Passwords do not match";
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	const handleSignup = () => {
		if (validate()) {
			setLoading(true);
			// Simulate API call
			setTimeout(() => {
				setLoading(false);
				navigation.navigate("Home");
			}, 1500);
		}
	};

	const handleChange = (name: keyof typeof formData, value: string) => {
		setFormData((prev) => ({ ...prev, [name]: value }));
		// Clear error when typing
		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	return (
		<ScrollView
			contentContainerStyle={styles.container}
			keyboardShouldPersistTaps="handled"
		>
			<Text variant="headlineMedium" style={styles.title}>
				Create Account
			</Text>

			<TextInput
				label="Email"
				mode="outlined"
				value={formData.email}
				onChangeText={(text) => handleChange("email", text)}
				autoCapitalize="none"
				keyboardType="email-address"
				error={!!errors.email}
				style={styles.input}
				left={<TextInput.Icon icon="email" />}
			/>
			<HelperText type="error" visible={!!errors.email}>
				{errors.email}
			</HelperText>

			<TextInput
				label="Password"
				mode="outlined"
				value={formData.password}
				onChangeText={(text) => handleChange("password", text)}
				secureTextEntry={secureTextEntry}
				error={!!errors.password}
				style={styles.input}
				left={<TextInput.Icon icon="lock" />}
				right={
					<TextInput.Icon
						icon={secureTextEntry ? "eye-off" : "eye"}
						onPress={() => setSecureTextEntry(!secureTextEntry)}
					/>
				}
			/>
			<HelperText type="error" visible={!!errors.password}>
				{errors.password}
			</HelperText>

			<TextInput
				label="Confirm Password"
				mode="outlined"
				value={formData.confirmPassword}
				onChangeText={(text) => handleChange("confirmPassword", text)}
				secureTextEntry={secureTextEntry}
				error={!!errors.confirmPassword}
				style={styles.input}
				left={<TextInput.Icon icon="lock" />}
			/>
			<HelperText type="error" visible={!!errors.confirmPassword}>
				{errors.confirmPassword}
			</HelperText>

			<Button
				mode="contained"
				onPress={handleSignup}
				loading={loading}
				disabled={loading}
				style={styles.button}
				contentStyle={styles.buttonContent}
			>
				{loading ? "Creating Account..." : "Sign Up"}
			</Button>

			<Button
				onPress={() => navigation.goBack()}
				style={styles.button}
				disabled={loading}
				textColor="#4CAF50"
			>
				Already have an account? Login
			</Button>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		padding: 20,
		justifyContent: "center",
	},
	title: {
		textAlign: "center",
		marginBottom: 30,
		color: "#4CAF50",
	},
	input: {
		marginBottom: 5,
		backgroundColor: "transparent",
	},
	button: {
		marginTop: 20,
		borderRadius: 5,
	},
	buttonContent: {
		height: 50,
	},
});

export default SignupScreen;
