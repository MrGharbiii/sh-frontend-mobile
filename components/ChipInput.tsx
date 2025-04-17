// components/ChipInput.tsx
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Chip, TextInput, Button, Text } from "react-native-paper";

const ChipInput = ({ label, values, onAdd, onRemove }) => {
	const [inputValue, setInputValue] = useState("");

	const handleAdd = () => {
		if (inputValue.trim() && !values.includes(inputValue.trim())) {
			onAdd(inputValue.trim());
			setInputValue("");
		}
	};

	return (
		<View style={styles.container}>
			<Text variant="labelLarge" style={styles.label}>
				{label}
			</Text>
			<View style={styles.row}>
				<TextInput
					value={inputValue}
					onChangeText={setInputValue}
					onSubmitEditing={handleAdd}
					style={styles.input}
				/>
				<Button
					mode="contained-tonal"
					onPress={handleAdd}
					style={styles.addButton}
				>
					Add
				</Button>
			</View>
			<View style={styles.chipContainer}>
				{values.map((value, index) => (
					<Chip key={index} onClose={() => onRemove(index)} style={styles.chip}>
						{value}
					</Chip>
				))}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginBottom: 15,
	},
	label: {
		marginBottom: 5,
	},
	row: {
		flexDirection: "row",
	},
	input: {
		flex: 1,
		marginRight: 10,
	},
	addButton: {
		justifyContent: "center",
	},
	chipContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		marginTop: 5,
	},
	chip: {
		margin: 2,
	},
});

export default ChipInput;
