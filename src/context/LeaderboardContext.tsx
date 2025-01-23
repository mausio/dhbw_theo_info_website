import React, { createContext, useContext, useState, useEffect } from 'react';

interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
}

interface LeaderboardContextType {
  leaderboardData: LeaderboardEntry[];
  updateUserProgress: (newScore: number) => void;
}

const generateRandomScore = () => Math.floor(Math.random() * 101); // 0-100

const defaultLeaderboardData: LeaderboardEntry[] = [
  { id: '1', name: 'Alice Johnson', score: 87 },    
  { id: '2', name: 'Bob Smith', score: 92 },        
  { id: '3', name: 'Charlie Brown', score: 76 },    
  { id: '4', name: 'David Wilson', score: 95 },     
  { id: '5', name: 'Eva Martinez', score: 83 },     
  { id: '6', name: 'Frank Zhang', score: 89 },      
  { id: '7', name: 'Grace Lee', score: 94 },        
  { id: '8', name: 'Henry Davis', score: 78 },      
  { id: '9', name: 'Isabel Kim', score: 91 },       
  { id: '10', name: 'Jack Taylor', score: 85 },     
  { id: '11', name: 'Maria Garcia', score: 88 },
  { id: '12', name: 'Noah Chen', score: 93 },
  { id: '13', name: 'Olivia Patel', score: 82 },
  { id: '14', name: 'Peter Anderson', score: 90 },
  { id: '15', name: 'Quinn Murphy', score: 86 }     
];

const LeaderboardContext = createContext<LeaderboardContextType | undefined>(undefined);

export const LeaderboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(() => {
    // Load data from localStorage on initial render
    const savedData = localStorage.getItem('leaderboardData');
    if (savedData) {
      return JSON.parse(savedData);
    }
    // If no saved data, initialize with default data and TestUser
    const initialData = [
      { id: '0', name: 'TestUser', score: 0 },
      ...defaultLeaderboardData
    ];
    localStorage.setItem('leaderboardData', JSON.stringify(initialData));
    return initialData;
  });

  const updateUserProgress = (newScore: number) => {
    setLeaderboardData(prevData => {
      // Find TestUser and update their score
      const updatedData = prevData.map(entry => 
        entry.id === '0' ? { ...entry, score: newScore } : entry
      );
      
      // Sort by score in descending order
      updatedData.sort((a, b) => b.score - a.score);
      
      // Save to localStorage
      localStorage.setItem('leaderboardData', JSON.stringify(updatedData));
      
      return updatedData;
    });
  };

  return (
    <LeaderboardContext.Provider value={{ leaderboardData, updateUserProgress }}>
      {children}
    </LeaderboardContext.Provider>
  );
};

export const useLeaderboard = () => {
  const context = useContext(LeaderboardContext);
  if (context === undefined) {
    throw new Error('useLeaderboard must be used within a LeaderboardProvider');
  }
  return context;
}; 