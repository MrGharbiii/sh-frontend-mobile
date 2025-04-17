// navigation/RootNavigator.tsx
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./AuthStack";
import QuestionnaireStack from "./QuestionnaireStack";
import HomeScreen from "../screens/HomeScreen";
import { RootStackParamList } from "../types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="Auth" component={AuthStack} />
			<Stack.Screen name="Questionnaire" component={QuestionnaireStack} />
			<Stack.Screen name="Home" component={HomeScreen} />
		</Stack.Navigator>
	);
}
