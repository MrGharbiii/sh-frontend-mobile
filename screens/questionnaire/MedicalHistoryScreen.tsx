// screens/questionnaire/MedicalHistoryScreen.tsx
import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, TextInput, Text, Chip } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useQuestionnaire } from "../../context/QuestionnaireContext";
import FormProgress from "../../components/FormProgress";
import ChipInput from "../../components/ChipInput";

const MedicalHistoryScreen = () => {
	const navigation = useNavigation();
	const { data, updateData } = useQuestionnaire();
	const [formData, setFormData] = useState({
		allergies: data.medical?.allergies || [],
		conditions: data.medical?.conditions || [],
		surgeries: data.medical?.surgeries || [],
		medications: data.medical?.medications || [],
	});
	const [newSurgery, setNewSurgery] = useState({
		name: "",
		year: "",
	});

	const handleNext = () => {
		updateData("medical", formData);
		navigation.navigate("Lifestyle");
	};

	const handleBack = () => {
		updateData("medical", formData);
		navigation.goBack();
	};

	const addSurgery = () => {
		if (newSurgery.name.trim() && newSurgery.year.trim()) {
			setFormData((prev) => ({
				...prev,
				surgeries: [
					...prev.surgeries,
					{
						name: newSurgery.name.trim(),
						year: parseInt(newSurgery.year.trim()),
					},
				],
			}));
			setNewSurgery({ name: "", year: "" });
		}
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<FormProgress currentStep={2} totalSteps={4} />

			<Text variant="headlineSmall" style={styles.title}>
				Medical History
			</Text>

			<ChipInput
				label="Allergies"
				values={formData.allergies}
				onAdd={(item) =>
					setFormData((prev) => ({
						...prev,
						allergies: [...prev.allergies, item],
					}))
				}
				onRemove={(index) =>
					setFormData((prev) => ({
						...prev,
						allergies: prev.allergies.filter((_, i) => i !== index),
					}))
				}
			/>

			<ChipInput
				label="Chronic Conditions"
				values={formData.conditions}
				onAdd={(item) =>
					setFormData((prev) => ({
						...prev,
						conditions: [...prev.conditions, item],
					}))
				}
				onRemove={(index) =>
					setFormData((prev) => ({
						...prev,
						conditions: prev.conditions.filter((_, i) => i !== index),
					}))
				}
			/>

			<Text variant="labelLarge" style={styles.sectionTitle}>
				Surgeries
			</Text>
			<View style={styles.row}>
				<TextInput
					label="Surgery Name"
					value={newSurgery.name}
					onChangeText={(text) =>
						setNewSurgery((prev) => ({ ...prev, name: text }))
					}
					style={styles.flexInput}
				/>
				<TextInput
					label="Year"
					value={newSurgery.year}
					onChangeText={(text) =>
						setNewSurgery((prev) => ({ ...prev, year: text }))
					}
					keyboardType="numeric"
					style={styles.yearInput}
				/>
			</View>
			<Button mode="outlined" onPress={addSurgery} style={styles.addButton}>
				Add Surgery
			</Button>

			<View style={styles.surgeryList}>
				{formData.surgeries.map((surgery, index) => (
					<Chip
						key={index}
						onClose={() =>
							setFormData((prev) => ({
								...prev,
								surgeries: prev.surgeries.filter((_, i) => i !== index),
							}))
						}
						style={styles.surgeryChip}
					>
						{surgery.name} ({surgery.year})
					</Chip>
				))}
			</View>

			<ChipInput
				label="Current Medications"
				values={formData.medications}
				onAdd={(item) =>
					setFormData((prev) => ({
						...prev,
						medications: [...prev.medications, item],
					}))
				}
				onRemove={(index) =>
					setFormData((prev) => ({
						...prev,
						medications: prev.medications.filter((_, i) => i !== index),
					}))
				}
			/>

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
		marginTop: 15,
		marginBottom: 5,
	},
	row: {
		flexDirection: "row",
		marginBottom: 10,
	},
	flexInput: {
		flex: 2,
		marginRight: 10,
	},
	yearInput: {
		flex: 1,
	},
	addButton: {
		marginBottom: 15,
	},
	surgeryList: {
		flexDirection: "row",
		flexWrap: "wrap",
		marginBottom: 15,
	},
	surgeryChip: {
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

export default MedicalHistoryScreen;
