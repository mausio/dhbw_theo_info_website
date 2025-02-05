export interface TaskPoints {
  task: string;
  taskId: string;
  points: number;
  collectedPoints: number;
}

export interface User {
  id: string;
  name: string;
  points: TaskPoints[];
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
}

export interface UserContextType {
  user: User | null;
  getTotalPoints: () => number;
  addTask: (task: TaskPoints) => void;
  getTaskById: (taskId: string) => TaskPoints | undefined;
  updateTask: (taskId: string, collectedPoints: number) => void;
  resetDefaultUser: () => void;
  getCurrentUserData: () => LeaderboardEntry | null;
} 