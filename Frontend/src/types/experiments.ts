
export interface ExperimentCategory {
  id: string;
  name: string;
  icon: string;
}

export interface TheorySection {
  title: string;
  content: string;
}

export interface ExperimentData {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  completed: boolean;
  progress?: number;
  image: string;
  xp: number;
  hasVideo?: boolean;
  videoUrl?: string;
  theory?: TheorySection[];
}

export interface SimulationResult {
  maxHeight: number;
  maxDistance: number;
  flightTime: number;
  trajectory: {
    time: number;
    height: number;
    distance: number;
  }[];
}

export interface SimulationSettings {
  gravity: number;
  velocity: number;
  mass: number;
  angle: number;
  airResistance: number;
  time: number;
}
