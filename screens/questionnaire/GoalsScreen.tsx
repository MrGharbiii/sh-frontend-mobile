// screens/questionnaire/GoalsScreen.tsx
import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, Text, RadioButton, Chip } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useQuestionnaire } from "../../context/QuestionnaireContext";
import FormProgress from "../../components/FormProgress";

const primaryGoals = [
	{ label: "Weight loss", value: "weight-loss" },
	{ label: "Muscle gain", value: "muscle-gain" },
	{ label: "Improve fitness", value: "fitness" },
	{ label: "Health management", value: "health" },
];

const workoutPreferences = [
	"Gym",
	"Home workouts",
	"Running",
	"Yoga",
	"Cycling",
	"Swimming",
	"Sports",
];

const dietaryRestrictions = [
	"Vegetarian",
	"Vegan",
	"Gluten-free",
	"Dairy-free",
	"Nut-free",
	"Halal",
	"Kosher",
];

export default function GoalsScreen() {
	const navigation = useNavigation();
	const { data, updateData } = useQuestionnaire();
	const [formData, setFormData] = useState({
		primaryGoal: data.goals?.primaryGoal || "",
		workoutPreferences: data.goals?.workoutPreferences || [],
		dietaryRestrictions: data.goals?.dietaryRestrictions || [],
	});

	const handleSubmit = () => {
		updateData("goals", formData);
		navigation.navigate("Summary");
	};

	const handleBack = () => {
		updateData("goals", formData);
		navigation.goBack();
	};

	const toggleWorkoutPref = (pref: string) => {
		setFormData((prev) => ({
			...prev,
			workoutPreferences: prev.workoutPreferences.includes(pref)
				? prev.workoutPreferences.filter((p) => p !== pref)
				: [...prev.workoutPreferences, pref],
		}));
	};

	const toggleDietaryRestriction = (restriction: string) => {
		setFormData((prev) => ({
			...prev,
			dietaryRestrictions: prev.dietaryRestrictions.includes(restriction)
				? prev.dietaryRestrictions.filter((r) => r !== restriction)
				: [...prev.dietaryRestrictions, restriction],
		}));
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<FormProgress currentStep={4} totalSteps={4} />

			<Text variant="headlineSmall" style={styles.title}>
				Your Goals
			</Text>

			<Text variant="labelLarge" style={styles.sectionTitle}>
				Primary Goal
			</Text>
			<RadioButton.Group
				onValueChange={(value) =>
					setFormData({ ...formData, primaryGoal: value })
				}
				value={formData.primaryGoal}
			>
				{primaryGoals.map((goal) => (
					<RadioButton.Item
						key={goal.value}
						label={goal.label}
						value={goal.value}
						style={styles.radioItem}
					/>
				))}
			</RadioButton.Group>

			<Text variant="labelLarge" style={styles.sectionTitle}>
				Workout Preferences
			</Text>
			<View style={styles.chipContainer}>
				{workoutPreferences.map((pref) => (
					<Chip
						key={pref}
						selected={formData.workoutPreferences.includes(pref)}
						onPress={() => toggleWorkoutPref(pref)}
						style={styles.chip}
					>
						{pref}
					</Chip>
				))}
			</View>

			<Text variant="labelLarge" style={styles.sectionTitle}>
				Dietary Restrictions
			</Text>
			<View style={styles.chipContainer}>
				{dietaryRestrictions.map((restriction) => (
					<Chip
						key={restriction}
						selected={formData.dietaryRestrictions.includes(restriction)}
						onPress={() => toggleDietaryRestriction(restriction)}
						style={styles.chip}
					>
						{restriction}
					</Chip>
				))}
			</View>

			<View style={styles.buttonRow}>
				<Button mode="outlined" onPress={handleBack} style={styles.button}>
					Back
				</Button>
				<Button mode="contained" onPress={handleSubmit} style={styles.button}>
					Review Summary
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
	radioItem: {
		paddingVertical: 5,
	},
	chipContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		marginBottom: 15,
	},
	chip: {
		margin: 4,
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
