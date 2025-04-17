// screens/questionnaire/BasicInfoScreen.tsx
import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, TextInput, Text, RadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useQuestionnaire } from "../../context/QuestionnaireContext";
import FormProgress from "../../components/FormProgress";

const BasicInfoScreen = () => {
	const navigation = useNavigation();
	const { data, updateData } = useQuestionnaire();
	const [formData, setFormData] = useState({
		age: data.basic?.age?.toString() || "",
		gender: data.basic?.gender || "",
		height: data.basic?.height?.toString() || "",
		weight: data.basic?.weight?.toString() || "",
		targetWeight: data.basic?.targetWeight?.toString() || "",
	});
	const [errors, setErrors] = useState({
		age: "",
		gender: "",
		height: "",
		weight: "",
	});

	const validate = () => {
		const newErrors = {
			age: "",
			gender: "",
			height: "",
			weight: "",
		};
		let isValid = true;

		if (
			!formData.age ||
			isNaN(Number(formData.age)) ||
			Number(formData.age) < 18
		) {
			newErrors.age = "Please enter a valid age (18+)";
			isValid = false;
		}

		if (!formData.gender) {
			newErrors.gender = "Please select gender";
			isValid = false;
		}

		if (
			!formData.height ||
			isNaN(Number(formData.height)) ||
			Number(formData.height) < 100
		) {
			newErrors.height = "Please enter valid height (cm)";
			isValid = false;
		}

		if (
			!formData.weight ||
			isNaN(Number(formData.weight)) ||
			Number(formData.weight) < 30
		) {
			newErrors.weight = "Please enter valid weight (kg)";
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	const handleNext = () => {
		if (validate()) {
			updateData("basic", {
				age: Number(formData.age),
				gender: formData.gender as "male" | "female" | "other",
				height: Number(formData.height),
				weight: Number(formData.weight),
				targetWeight: Number(formData.targetWeight),
			});
			navigation.navigate("MedicalHistory");
		}
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<FormProgress currentStep={1} totalSteps={4} />

			<Text variant="headlineSmall" style={styles.title}>
				Basic Information
			</Text>

			<TextInput
				label="Age"
				mode="outlined"
				keyboardType="numeric"
				value={formData.age}
				onChangeText={(text) => setFormData({ ...formData, age: text })}
				error={!!errors.age}
				style={styles.input}
			/>
			{errors.age ? <Text style={styles.error}>{errors.age}</Text> : null}

			<Text variant="labelLarge" style={styles.sectionTitle}>
				Gender
			</Text>
			<RadioButton.Group
				onValueChange={(value) => setFormData({ ...formData, gender: value })}
				value={formData.gender}
			>
				<RadioButton.Item label="Male" value="male" />
				<RadioButton.Item label="Female" value="female" />
				<RadioButton.Item label="Other" value="other" />
			</RadioButton.Group>
			{errors.gender ? <Text style={styles.error}>{errors.gender}</Text> : null}

			<TextInput
				label="Height (cm)"
				mode="outlined"
				keyboardType="numeric"
				value={formData.height}
				onChangeText={(text) => setFormData({ ...formData, height: text })}
				error={!!errors.height}
				style={styles.input}
			/>
			{errors.height ? <Text style={styles.error}>{errors.height}</Text> : null}

			<TextInput
				label="Current Weight (kg)"
				mode="outlined"
				keyboardType="numeric"
				value={formData.weight}
				onChangeText={(text) => setFormData({ ...formData, weight: text })}
				error={!!errors.weight}
				style={styles.input}
			/>
			{errors.weight ? <Text style={styles.error}>{errors.weight}</Text> : null}

			<TextInput
				label="Target Weight (kg)"
				mode="outlined"
				keyboardType="numeric"
				value={formData.targetWeight}
				onChangeText={(text) =>
					setFormData({ ...formData, targetWeight: text })
				}
				style={styles.input}
			/>

			<Button mode="contained" onPress={handleNext} style={styles.button}>
				Continue
			</Button>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		padding: 20,
	},
	title: {
		marginBottom: 20,
		textAlign: "center",
	},
	sectionTitle: {
		marginTop: 10,
		marginBottom: 5,
	},
	input: {
		marginBottom: 10,
	},
	button: {
		marginTop: 20,
		paddingVertical: 8,
	},
	error: {
		color: "red",
		marginBottom: 10,
	},
});

export default BasicInfoScreen;
