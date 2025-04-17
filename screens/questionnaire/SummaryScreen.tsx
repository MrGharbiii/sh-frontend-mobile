// screens/questionnaire/SummaryScreen.tsx
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, Text, Divider, Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useQuestionnaire } from "../../context/QuestionnaireContext";

export default function SummaryScreen() {
	const navigation = useNavigation();
	const { data } = useQuestionnaire();

	const handleSubmit = () => {
		// Here you would typically send the data to your backend
		console.log("Submitting questionnaire data:", data);
		navigation.navigate("Home");
	};

	const handleBack = () => {
		navigation.goBack();
	};

	const renderSection = (title: string, content: React.ReactNode) => (
		<Card style={styles.sectionCard}>
			<Card.Title title={title} titleVariant="titleMedium" />
			<Card.Content>{content}</Card.Content>
		</Card>
	);

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text variant="headlineSmall" style={styles.title}>
				Review Your Information
			</Text>

			{/* Basic Info Section */}
			{renderSection(
				"Basic Information",
				<View>
					<Text>Age: {data.basic?.age}</Text>
					<Text>Gender: {data.basic?.gender}</Text>
					<Text>Height: {data.basic?.height} cm</Text>
					<Text>Weight: {data.basic?.weight} kg</Text>
					<Text>Target Weight: {data.basic?.targetWeight} kg</Text>
				</View>,
			)}

			{/* Medical History Section */}
			{renderSection(
				"Medical History",
				<View>
					<Text>Allergies: {data.medical?.allergies.join(", ") || "None"}</Text>
					<Text>
						Conditions: {data.medical?.conditions.join(", ") || "None"}
					</Text>
					<Text>
						Surgeries:{" "}
						{data.medical?.surgeries
							.map((s) => `${s.name} (${s.year})`)
							.join(", ") || "None"}
					</Text>
					<Text>
						Medications: {data.medical?.medications.join(", ") || "None"}
					</Text>
				</View>,
			)}

			{/* Lifestyle Section */}
			{renderSection(
				"Lifestyle",
				<View>
					<Text>Sleep: {data.lifestyle?.sleepHours} hours/night</Text>
					<Text>Activity Level: {data.lifestyle?.activityLevel}</Text>
					<Text>Smoker: {data.lifestyle?.smoker ? "Yes" : "No"}</Text>
					<Text>Alcohol: {data.lifestyle?.alcohol}</Text>
					<Text>
						Food Preferences:{" "}
						{data.lifestyle?.foodPreferences.join(", ") || "None"}
					</Text>
				</View>,
			)}

			{/* Goals Section */}
			{renderSection(
				"Goals",
				<View>
					<Text>Primary Goal: {data.goals?.primaryGoal}</Text>
					<Text>
						Workout Preferences:{" "}
						{data.goals?.workoutPreferences.join(", ") || "None"}
					</Text>
					<Text>
						Dietary Restrictions:{" "}
						{data.goals?.dietaryRestrictions.join(", ") || "None"}
					</Text>
				</View>,
			)}

			<Divider style={styles.divider} />

			<View style={styles.buttonContainer}>
				<Button mode="outlined" onPress={handleBack} style={styles.button}>
					Back
				</Button>
				<Button
					mode="contained"
					onPress={handleSubmit}
					style={styles.button}
					icon="check"
				>
					Submit Questionnaire
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
	sectionCard: {
		marginBottom: 15,
		backgroundColor: "white",
	},
	divider: {
		marginVertical: 20,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 10,
	},
	button: {
		flex: 1,
		marginHorizontal: 5,
		paddingVertical: 8,
	},
});
