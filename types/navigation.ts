// types/navigation.ts
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Auth: undefined;
  Questionnaire: undefined;
  Home: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

export type QuestionnaireStackParamList = {
  BasicInfo: undefined;
  MedicalHistory: undefined;
  Lifestyle: undefined;
  Goals: undefined;
  Summary: undefined;
};

// Navigation prop types
export type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Auth'>;
export type SignupScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Auth'>;
export type BasicInfoScreenNavigationProp = NativeStackNavigationProp<QuestionnaireStackParamList, 'BasicInfo'>;
// Add similar types for other screens