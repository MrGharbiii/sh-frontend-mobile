// App.tsx
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import RootNavigator from "./navigation/RootNavigator";
import { QuestionnaireProvider } from "./context/QuestionnaireContext";

export default function App() {
	return (
		<QuestionnaireProvider>
			<NavigationContainer>
				<StatusBar style="auto" />
				<RootNavigator />
			</NavigationContainer>
		</QuestionnaireProvider>
	);
}
