// navigation/QuestionnaireStack.tsx
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BasicInfoScreen from "../screens/questionnaire/BasicInfoScreen";
import MedicalHistoryScreen from "../screens/questionnaire/MedicalHistoryScreen";
import LifestyleScreen from "../screens/questionnaire/LifestyleScreen";
import GoalsScreen from "../screens/questionnaire/GoalsScreen";
import SummaryScreen from "../screens/questionnaire/SummaryScreen";
import { QuestionnaireStackParamList } from "../types/navigation";

const Stack = createNativeStackNavigator<QuestionnaireStackParamList>();

const QuestionnaireStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				animation: "slide_from_right",
			}}
		>
			<Stack.Screen name="BasicInfo" component={BasicInfoScreen} />
			<Stack.Screen name="MedicalHistory" component={MedicalHistoryScreen} />
			<Stack.Screen name="Lifestyle" component={LifestyleScreen} />
			<Stack.Screen name="Goals" component={GoalsScreen} />
			<Stack.Screen name="Summary" component={SummaryScreen} />
		</Stack.Navigator>
	);
};

export default QuestionnaireStack;
