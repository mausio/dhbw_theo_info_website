import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, UserContextType, TaskPoints } from '../types/user.types';
import { useLeaderboard } from './LeaderboardContext';

const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a default user with initial tasks
const createDefaultUser = (): User => ({
  id: '0',
  name: 'Test',
  points: [], // Create a fresh copy of the tasks
});

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { updateUserProgress } = useLeaderboard();
  const [user, setUser] = useState<User | null>(() => {
    // Check if this is a fresh session
    const sessionKey = 'userSession';
    const hasExistingSession = sessionStorage.getItem(sessionKey);

    if (!hasExistingSession) {
      // This is a fresh session, create new user
      const defaultUser = createDefaultUser();
      // Mark that we have an active session
      sessionStorage.setItem(sessionKey, 'active');
      // Store in localStorage for navigation persistence
      localStorage.setItem('currentUser', JSON.stringify(defaultUser));
      return defaultUser;
    }

    // This is an existing session, try to load from localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      // Update leaderboard with initial points
      setTimeout(() => updateUserProgress(
        parsedUser.points.reduce((total: number, task: TaskPoints) => total + task.collectedPoints, 0)
      ), 0);
      return parsedUser;
    }

    // Fallback to default user if something went wrong
    const defaultUser = createDefaultUser();
    localStorage.setItem('currentUser', JSON.stringify(defaultUser));
    return defaultUser;
  });

  // Get current user data for leaderboard
  const getCurrentUserData = () => {
    if (!user) return null;
    
    // Calculate total points from collected points and cap at 100
    const totalPoints = Math.min(
      100,
      user.points.reduce((total, task) => total + task.collectedPoints, 0)
    );
    
    return {
      id: user.id,
      name: user.name,
      score: totalPoints
    };
  };

  // Update localStorage and leaderboard whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      const userData = getCurrentUserData();
      if (userData) {
        updateUserProgress(userData.score);
      }
    }
  }, [user]);

  const resetDefaultUser = () => {
    console.log('Resetting user...');
    
    // Create a fresh default user
    const defaultUser = createDefaultUser();
    console.log('New default user:', defaultUser);
    
    // Clear all storage
    sessionStorage.clear();
    localStorage.clear();
    
    // Update the user state with the fresh default user
    setUser(defaultUser);
    
    // Store the fresh state
    localStorage.setItem('currentUser', JSON.stringify(defaultUser));
    sessionStorage.setItem('userSession', 'active');
    
    console.log('Reset complete. Current user state:', defaultUser);
  };

  const getTotalPoints = () => {
    if (!user) return 0;
    return Math.min(
      100,
      user.points.reduce((total, task) => total + task.collectedPoints, 0)
    );
  };

  const getTaskById = (taskId: string) => {
    return user?.points.find((task) => task.taskId === taskId);
  };

  const addTask = (newTask: TaskPoints) => {
    if (!user) return;

    // Check if task already exists
    if (getTaskById(newTask.taskId)) return;

    // Check if adding this task would exceed 100 points
    const currentTotal = getTotalPoints();
    const potentialTotal = currentTotal + newTask.points;

    if (potentialTotal > 100) {
      console.warn('Cannot add task: would exceed maximum points of 100');
      return;
    }

    setUser((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        points: [...prev.points, newTask],
      };
    });
  };

  const updateTask = (taskId: string, collectedPoints: number) => {
    if (!user) return;

    const task = getTaskById(taskId);
    if (!task) return;

    // Calculate the point difference
    const pointDifference = collectedPoints - task.collectedPoints;
    const newTotal = getTotalPoints() + pointDifference;

    // Check if update would exceed 100 points
    if (newTotal > 100) {
      console.warn('Cannot update task: would exceed maximum points of 100');
      return;
    }

    setUser((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        points: prev.points.map((task) =>
          task.taskId === taskId
            ? { ...task, collectedPoints }
            : task
        ),
      };
    });
  };

  const value: UserContextType = {
    user,
    getTotalPoints,
    addTask,
    getTaskById,
    updateTask,
    resetDefaultUser,
    getCurrentUserData,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}; 