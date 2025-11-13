import { Exercise } from '../types';

export const exercises: Exercise[] = [
  // PEITO (3 exercícios - 2 free, 1 premium)
  {
    id: 'ex-001',
    name: 'Supino Reto',
    muscleGroup: 'peito',
    description: 'Deite no banco reto, segure a barra com pegada média, desça até o peito e empurre para cima.',
    sets: '3-4',
    reps: '8-12',
    equipment: ['Barra', 'Banco reto', 'Anilhas'],
    location: 'academia',
    level: 'intermediario',
    isPremium: false,
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop'
  },
  {
    id: 'ex-002',
    name: 'Flexão de Braço',
    muscleGroup: 'peito',
    description: 'Posição de prancha, mãos na largura dos ombros, desça o corpo e empurre para cima.',
    sets: '3',
    reps: '10-20',
    equipment: ['Peso corporal'],
    location: 'ambos',
    level: 'iniciante',
    isPremium: false,
    imageUrl: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400&h=300&fit=crop'
  },
  {
    id: 'ex-003',
    name: 'Crucifixo',
    muscleGroup: 'peito',
    description: 'Deite no banco, abra os braços lateralmente com halteres e retorne ao centro.',
    sets: '3',
    reps: '10-15',
    equipment: ['Halteres', 'Banco'],
    location: 'academia',
    level: 'intermediario',
    isPremium: true,
    videoUrl: '/videos/crucifixo.mp4'
  },

  // COSTAS (3 exercícios - 2 free, 1 premium)
  {
    id: 'ex-004',
    name: 'Remada Curvada',
    muscleGroup: 'costas',
    description: 'Incline o tronco, puxe a barra em direção ao abdômen, mantendo as costas retas.',
    sets: '3-4',
    reps: '8-12',
    equipment: ['Barra', 'Anilhas'],
    location: 'academia',
    level: 'intermediario',
    isPremium: true
  },
  {
    id: 'ex-005',
    name: 'Puxada Frontal',
    muscleGroup: 'costas',
    description: 'Sentado, puxe a barra em direção ao peito, contraindo as costas.',
    sets: '3',
    reps: '10-15',
    equipment: ['Máquina pulldown'],
    location: 'academia',
    level: 'iniciante',
    isPremium: true,
    videoUrl: '/videos/pulldown.mp4'
  },
  {
    id: 'ex-006',
    name: 'Barra Fixa',
    muscleGroup: 'costas',
    description: 'Segure a barra com pegada pronada, puxe o corpo até o queixo passar a barra.',
    sets: '3',
    reps: '6-10',
    equipment: ['Barra fixa'],
    location: 'ambos',
    level: 'intermediario',
    isPremium: true,
    imageUrl: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=400&h=300&fit=crop'
  },

  // OMBROS (3 exercícios - todos premium)
  {
    id: 'ex-007',
    name: 'Desenvolvimento',
    muscleGroup: 'ombros',
    description: 'Sentado, empurre os halteres acima da cabeça até extensão completa.',
    sets: '3',
    reps: '8-12',
    equipment: ['Halteres', 'Banco'],
    location: 'academia',
    level: 'intermediario',
    isPremium: true,
    imageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=300&fit=crop'
  },
  {
    id: 'ex-008',
    name: 'Elevação Lateral',
    muscleGroup: 'ombros',
    description: 'De pé, eleve os halteres lateralmente até a altura dos ombros.',
    sets: '3',
    reps: '12-15',
    equipment: ['Halteres'],
    location: 'ambos',
    level: 'iniciante',
    isPremium: true
  },
  {
    id: 'ex-009',
    name: 'Elevação Frontal',
    muscleGroup: 'ombros',
    description: 'De pé, eleve os halteres à frente até a altura dos ombros.',
    sets: '3',
    reps: '10-12',
    equipment: ['Halteres'],
    location: 'ambos',
    level: 'iniciante',
    isPremium: true,
    videoUrl: '/videos/elevacao-frontal.mp4'
  },

  // BÍCEPS (3 exercícios - todos premium)
  {
    id: 'ex-010',
    name: 'Rosca Direta',
    muscleGroup: 'bracos',
    description: 'De pé, flexione os cotovelos levando a barra em direção aos ombros.',
    sets: '3',
    reps: '8-12',
    equipment: ['Barra', 'Anilhas'],
    location: 'academia',
    level: 'iniciante',
    isPremium: true,
    imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=300&fit=crop'
  },
  {
    id: 'ex-011',
    name: 'Rosca Martelo',
    muscleGroup: 'bracos',
    description: 'De pé, flexione os cotovelos com pegada neutra (palmas frente a frente).',
    sets: '3',
    reps: '10-12',
    equipment: ['Halteres'],
    location: 'ambos',
    level: 'iniciante',
    isPremium: true,
    videoUrl: '/videos/rosca-martelo.mp4'
  },
  {
    id: 'ex-012',
    name: 'Rosca Concentrada',
    muscleGroup: 'bracos',
    description: 'Sentado, apoie o cotovelo na coxa e flexione o braço.',
    sets: '3',
    reps: '10-12',
    equipment: ['Halteres'],
    location: 'ambos',
    level: 'intermediario',
    isPremium: true
  },

  // TRÍCEPS (3 exercícios - todos premium)
  {
    id: 'ex-013',
    name: 'Tríceps Testa',
    muscleGroup: 'bracos',
    description: 'Deitado, desça a barra em direção à testa e estenda os braços.',
    sets: '3',
    reps: '10-15',
    equipment: ['Barra', 'Banco'],
    location: 'academia',
    level: 'intermediario',
    isPremium: true
  },
  {
    id: 'ex-014',
    name: 'Mergulho',
    muscleGroup: 'bracos',
    description: 'Apoie as mãos em barras paralelas, desça o corpo e empurre para cima.',
    sets: '3',
    reps: '8-12',
    equipment: ['Barras paralelas'],
    location: 'ambos',
    level: 'intermediario',
    isPremium: true
  },
  {
    id: 'ex-015',
    name: 'Tríceps Corda',
    muscleGroup: 'bracos',
    description: 'Na polia alta, empurre a corda para baixo estendendo os braços.',
    sets: '3',
    reps: '12-15',
    equipment: ['Polia', 'Corda'],
    location: 'academia',
    level: 'iniciante',
    isPremium: true
  },

  // PERNAS (4 exercícios - todos premium)
  {
    id: 'ex-016',
    name: 'Agachamento',
    muscleGroup: 'pernas',
    description: 'Com a barra nas costas, desça até as coxas ficarem paralelas ao chão.',
    sets: '3-4',
    reps: '8-12',
    equipment: ['Barra', 'Anilhas', 'Rack'],
    location: 'academia',
    level: 'intermediario',
    isPremium: true,
    imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&h=300&fit=crop'
  },
  {
    id: 'ex-017',
    name: 'Leg Press',
    muscleGroup: 'pernas',
    description: 'Sentado na máquina, empurre a plataforma com os pés.',
    sets: '3',
    reps: '10-15',
    equipment: ['Leg Press'],
    location: 'academia',
    level: 'iniciante',
    isPremium: true
  },
  {
    id: 'ex-018',
    name: 'Afundo',
    muscleGroup: 'pernas',
    description: 'Dê um passo à frente e desça o joelho traseiro em direção ao chão.',
    sets: '3',
    reps: '10-12 cada perna',
    equipment: ['Halteres (opcional)'],
    location: 'ambos',
    level: 'iniciante',
    isPremium: true
  },
  {
    id: 'ex-019',
    name: 'Cadeira Extensora',
    muscleGroup: 'pernas',
    description: 'Sentado, estenda as pernas contra a resistência.',
    sets: '3',
    reps: '12-15',
    equipment: ['Cadeira extensora'],
    location: 'academia',
    level: 'iniciante',
    isPremium: true,
    videoUrl: '/videos/extensora.mp4'
  },

  // ABDÔMEN (3 exercícios - 2 free, 1 premium)
  {
    id: 'ex-020',
    name: 'Prancha',
    muscleGroup: 'abdomen',
    description: 'Apoie antebraços e pés, mantendo o corpo reto.',
    sets: '3',
    reps: '30-60 segundos',
    equipment: ['Peso corporal'],
    location: 'ambos',
    level: 'iniciante',
    isPremium: false
  },
  {
    id: 'ex-021',
    name: 'Abdominal Infra',
    muscleGroup: 'abdomen',
    description: 'Deitado, eleve o tronco contraindo o abdômen.',
    sets: '3',
    reps: '15-25',
    equipment: ['Peso corporal'],
    location: 'ambos',
    level: 'iniciante',
    isPremium: false,
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
  },
  {
    id: 'ex-022',
    name: 'Elevação de Pernas',
    muscleGroup: 'abdomen',
    description: 'Deitado, eleve as pernas até 90 graus.',
    sets: '3',
    reps: '12-15',
    equipment: ['Peso corporal'],
    location: 'ambos',
    level: 'intermediario',
    isPremium: true,
    videoUrl: '/videos/elevacao-pernas.mp4'
  }
];

// Grupos musculares disponíveis para usuários gratuitos
export const freeAccessGroups = ['peito', 'abdomen'];

// Verificar se usuário tem acesso ao exercício
export const hasAccessToExercise = (exercise: Exercise, userPlan: 'free' | 'premium'): boolean => {
  if (userPlan === 'premium') return true;
  if (!exercise.isPremium && freeAccessGroups.includes(exercise.muscleGroup)) return true;
  return false;
};

// Verificar se usuário tem acesso ao grupo muscular
export const hasAccessToMuscleGroup = (muscleGroup: string, userPlan: 'free' | 'premium'): boolean => {
  if (userPlan === 'premium') return true;
  return freeAccessGroups.includes(muscleGroup);
};

export const getMuscleGroupLabel = (group: string): string => {
  const labels: Record<string, string> = {
    peito: 'Peito',
    costas: 'Costas',
    ombros: 'Ombros',
    bracos: 'Braços',
    pernas: 'Pernas',
    abdomen: 'Abdômen',
    gluteos: 'Glúteos',
    cardio: 'Cardio'
  };
  return labels[group] || group;
};

export const getLocationLabel = (location: string): string => {
  const labels: Record<string, string> = {
    casa: 'Casa',
    academia: 'Academia',
    ambos: 'Casa e Academia'
  };
  return labels[location] || location;
};

export const getLevelLabel = (level: string): string => {
  const labels: Record<string, string> = {
    iniciante: 'Iniciante',
    intermediario: 'Intermediário',
    avancado: 'Avançado'
  };
  return labels[level] || level;
};
