// components/FormProgress.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { ProgressBar, Text } from "react-native-paper";

type FormProgressProps = {
	currentStep: number;
	totalSteps: number;
};

export default function FormProgress({
	currentStep,
	totalSteps,
}: FormProgressProps) {
	const progress = currentStep / totalSteps;

	return (
		<View style={styles.container}>
			<Text variant="labelLarge">
				Step {currentStep} of {totalSteps}
			</Text>
			<ProgressBar
				progress={progress}
				color="#4CAF50"
				style={styles.progressBar}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 20,
		paddingHorizontal: 10,
	},
	progressBar: {
		height: 8,
		borderRadius: 4,
		marginTop: 5,
		backgroundColor: "#E0E0E0",
	},
});
