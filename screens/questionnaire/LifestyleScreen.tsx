// screens/questionnaire/LifestyleScreen.tsx
import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, Text, TextInput, RadioButton, Chip } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useQuestionnaire } from "../../context/QuestionnaireContext";
import FormProgress from "../../components/FormProgress";

const activityLevels = [
	{ label: "Sedentary (little or no exercise)", value: "sedentary" },
	{ label: "Lightly active (light exercise 1-3 days/week)", value: "light" },
	{
		label: "Moderately active (moderate exercise 3-5 days/week)",
		value: "moderate",
	},
	{ label: "Very active (hard exercise 6-7 days/week)", value: "active" },
	{
		label: "Extremely active (very hard exercise & physical job)",
		value: "extreme",
	},
];

const foodPreferences = [
	"Vegetarian",
	"Vegan",
	"Pescatarian",
	"Mediterranean",
	"Low-carb",
	"Keto",
	"Other",
];

export default function LifestyleScreen() {
	const navigation = useNavigation();
	const { data, updateData } = useQuestionnaire();
	const [formData, setFormData] = useState({
		sleepHours: data.lifestyle?.sleepHours?.toString() || "7",
		activityLevel: data.lifestyle?.activityLevel || "moderate",
		smoker: data.lifestyle?.smoker || false,
		alcohol: data.lifestyle?.alcohol || "never",
		foodPreferences: data.lifestyle?.foodPreferences || [],
	});
	const [customFoodPref, setCustomFoodPref] = useState("");

	const handleNext = () => {
		updateData("lifestyle", {
			...formData,
			sleepHours: Number(formData.sleepHours),
		});
		navigation.navigate("Goals");
	};

	const handleBack = () => {
		updateData("lifestyle", {
			...formData,
			sleepHours: Number(formData.sleepHours),
		});
		navigation.goBack();
	};

	const toggleFoodPreference = (pref: string) => {
		setFormData((prev) => ({
			...prev,
			foodPreferences: prev.foodPreferences.includes(pref)
				? prev.foodPreferences.filter((p) => p !== pref)
				: [...prev.foodPreferences, pref],
		}));
	};

	const addCustomFoodPref = () => {
		if (
			customFoodPref.trim() &&
			!formData.foodPreferences.includes(customFoodPref.trim())
		) {
			setFormData((prev) => ({
				...prev,
				foodPreferences: [...prev.foodPreferences, customFoodPref.trim()],
			}));
			setCustomFoodPref("");
		}
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<FormProgress currentStep={3} totalSteps={4} />

			<Text variant="headlineSmall" style={styles.title}>
				Lifestyle Information
			</Text>

			<Text variant="labelLarge" style={styles.sectionTitle}>
				Sleep
			</Text>
			<TextInput
				label="Average hours per night"
				keyboardType="numeric"
				value={formData.sleepHours}
				onChangeText={(text) => setFormData({ ...formData, sleepHours: text })}
				style={styles.input}
			/>

			<Text variant="labelLarge" style={styles.sectionTitle}>
				Activity Level
			</Text>
			<RadioButton.Group
				onValueChange={(value) =>
					setFormData({ ...formData, activityLevel: value })
				}
				value={formData.activityLevel}
			>
				{activityLevels.map((level) => (
					<RadioButton.Item
						key={level.value}
						label={level.label}
						value={level.value}
						style={styles.radioItem}
					/>
				))}
			</RadioButton.Group>

			<Text variant="labelLarge" style={styles.sectionTitle}>
				Habits
			</Text>
			<View style={styles.habitRow}>
				<Text>Smoker:</Text>
				<RadioButton.Group
					onValueChange={(value) =>
						setFormData({ ...formData, smoker: value === "yes" })
					}
					value={formData.smoker ? "yes" : "no"}
				>
					<View style={styles.radioRow}>
						<RadioButton.Item label="Yes" value="yes" />
						<RadioButton.Item label="No" value="no" />
					</View>
				</RadioButton.Group>
			</View>

			<Text variant="labelLarge" style={styles.sectionTitle}>
				Alcohol Consumption
			</Text>
			<RadioButton.Group
				onValueChange={(value) => setFormData({ ...formData, alcohol: value })}
				value={formData.alcohol}
			>
				<RadioButton.Item label="Never" value="never" />
				<RadioButton.Item label="Occasionally" value="occasionally" />
				<RadioButton.Item label="Regularly" value="regularly" />
			</RadioButton.Group>

			<Text variant="labelLarge" style={styles.sectionTitle}>
				Food Preferences
			</Text>
			<View style={styles.chipContainer}>
				{foodPreferences.map((pref) => (
					<Chip
						key={pref}
						selected={formData.foodPreferences.includes(pref)}
						onPress={() => toggleFoodPreference(pref)}
						style={styles.chip}
					>
						{pref}
					</Chip>
				))}
			</View>
			<View style={styles.row}>
				<TextInput
					label="Add custom preference"
					value={customFoodPref}
					onChangeText={setCustomFoodPref}
					style={styles.flexInput}
				/>
				<Button
					mode="contained-tonal"
					onPress={addCustomFoodPref}
					style={styles.addButton}
				>
					Add
				</Button>
			</View>

			<View style={styles.buttonRow}>
				<Button mode="outlined" onPress={handleBack} style={styles.button}>
					Back
				</Button>
				<Button mode="contained" onPress={handleNext} style={styles.button}>
					Continue
				</Button>
			</View>
		</ScrollView>
	);
}

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
		marginTop: 15,
		marginBottom: 5,
	},
	input: {
		marginBottom: 15,
	},
	radioItem: {
		paddingVertical: 5,
	},
	habitRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
	},
	radioRow: {
		flexDirection: "row",
	},
	chipContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		marginBottom: 10,
	},
	chip: {
		margin: 4,
	},
	row: {
		flexDirection: "row",
		marginBottom: 15,
	},
	flexInput: {
		flex: 1,
		marginRight: 10,
	},
	addButton: {
		justifyContent: "center",
	},
	buttonRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 20,
	},
	button: {
		flex: 1,
		marginHorizontal: 5,
		paddingVertical: 8,
	},
});
