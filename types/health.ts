// types/health.ts
export type HealthData = {
    basic?: {
      age: number;
      gender: 'male' | 'female' | 'other';
      height: number;
      weight: number;
      targetWeight: number;
    };
    medical?: {
      allergies: string[];
      conditions: string[];
      surgeries: Array<{
        name: string;
        year: number;
      }>;
      medications: string[];
    };
    lifestyle?: {
      sleepHours: number;
      activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'extreme';
      jobType: string;
      smoker: boolean;
      alcohol: 'never' | 'occasionally' | 'regularly';
      foodPreferences: string[];
    };
    goals?: {
      primaryGoal: 'weight-loss' | 'muscle-gain' | 'fitness' | 'health';
      workoutPreferences: string[];
      dietaryRestrictions: string[];
    };
  };