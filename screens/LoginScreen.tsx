// screens/LoginScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { LoginScreenProps } from '../types/navigation'; // Add this import

// Update the component to use typed props
const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TextInput label="Email" mode="outlined" />
      <TextInput label="Password" secureTextEntry mode="outlined" />
      <Button 
        mode="contained" 
        onPress={() => navigation.navigate('Home')}
      >
        Login
      </Button>
      <Button 
        onPress={() => navigation.navigate('Signup')}
      >
        Create Account
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
	container: { flex: 1, padding: 20, justifyContent: "center" },
	animation: { width: 200, height: 200, alignSelf: "center" },
});
