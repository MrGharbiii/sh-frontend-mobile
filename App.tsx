import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import AuthStack from "./navigation/AuthStack";

export default function App() {
	return (
		<NavigationContainer>
			<StatusBar style="auto" />
			<AuthStack />
		</NavigationContainer>
	);
}
