// FitnessPro - Types

export type MuscleGroup = 
  | 'peito' 
  | 'costas' 
  | 'ombros' 
  | 'bracos' 
  | 'pernas' 
  | 'abdomen' 
  | 'gluteos'
  | 'cardio';

export type Location = 'casa' | 'academia' | 'ambos';

export type Level = 'iniciante' | 'intermediario' | 'avancado';

export type Goal = 'perda_peso' | 'ganho_massa' | 'manutencao';

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  description: string;
  sets: string;
  reps: string;
  equipment: string[];
  location: Location;
  level: Level;
  isPremium: boolean;
  videoUrl?: string;
  imageUrl?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  goal: Goal;
  level: Level;
  availableDays: number;
  sessionDuration: number; // minutos
  weight?: number;
  height?: number;
  isPremium: boolean;
}

export interface WorkoutPlan {
  id: string;
  userId: string;
  date: string;
  exercises: Exercise[];
  completed: boolean;
}

export interface Meal {
  id: string;
  userId: string;
  date: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface Progress {
  userId: string;
  date: string;
  weight: number;
  measurements?: {
    chest?: number;
    waist?: number;
    hips?: number;
    arms?: number;
    legs?: number;
  };
}
