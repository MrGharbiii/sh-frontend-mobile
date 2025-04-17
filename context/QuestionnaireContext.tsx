// context/QuestionnaireContext.tsx
import React, { createContext, useState, useContext } from "react";
import { HealthData } from "../types/health";

type QuestionnaireContextType = {
	data: HealthData;
	updateData: <T extends keyof HealthData>(
		section: T,
		values: HealthData[T],
	) => void;
	progress: number;
};

const QuestionnaireContext = createContext<
	QuestionnaireContextType | undefined
>(undefined);

export const QuestionnaireProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [data, setData] = useState<HealthData>({});

	const updateData = <T extends keyof HealthData>(
		section: T,
		values: HealthData[T],
	) => {
		setData((prev) => ({ ...prev, [section]: values }));
	};

	const progress = calculateProgress(data);

	return (
		<QuestionnaireContext.Provider value={{ data, updateData, progress }}>
			{children}
		</QuestionnaireContext.Provider>
	);
};

const calculateProgress = (data: HealthData): number => {
	const sections = ["basic", "medical", "lifestyle", "goals"];
	const completed = sections.filter(
		(section) => data[section as keyof HealthData] !== undefined,
	);
	return (completed.length / sections.length) * 100;
};

export const useQuestionnaire = () => {
	const context = useContext(QuestionnaireContext);
	if (!context) {
		throw new Error(
			"useQuestionnaire must be used within a QuestionnaireProvider",
		);
	}
	return context;
};
