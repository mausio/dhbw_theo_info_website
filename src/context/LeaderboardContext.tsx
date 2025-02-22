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

const defaultLeaderboardData: LeaderboardEntry[] = [
  { id: '1', name: 'Alice Johnson', score: 8 },    
  { id: '2', name: 'Bob Smith', score: 9 },        
  { id: '3', name: 'Charlie Brown', score: 76 },    
  { id: '4', name: 'David Wilson', score: 9 },     
  { id: '5', name: 'Eva Martinez', score: 8 },     
  { id: '6', name: 'Frank Zhang', score: 8 },      
  { id: '7', name: 'Grace Lee', score: 9 },        
  { id: '8', name: 'Henry Davis', score: 78 },      
  { id: '9', name: 'Isabel Kim', score: 9 },       
  { id: '10', name: 'Jack Taylor', score: 85 },     
  { id: '11', name: 'Maria Garcia', score: 8 },
  { id: '12', name: 'Noah Chen', score: 9 },
  { id: '13', name: 'Olivia Patel', score: 82 },
  { id: '14', name: 'Peter Anderson', score: 9 },
  { id: '15', name: 'Quinn Murphy', score: 86 },
  { id: '16', name: 'Rachel Hall', score: 8 },
  { id: '17', name: 'Samuel Martin', score: 9 },
  { id: '18', name: 'Tessa Brooks', score: 8 },
  { id: '19', name: 'Uma Patel', score: 9 },
  { id: '20', name: 'Victor Lee', score: 8 },
  { id: '21', name: 'Walter Brown', score: 9 },
  { id: '22', name: 'Xavier Chen', score: 79 },
  { id: '23', name: 'Yvonne Davis', score: 9 },
  { id: '24', name: 'Zoe Taylor', score: 77 }
];

const LeaderboardContext = createContext<LeaderboardContextType | undefined>(undefined);

export const LeaderboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(() => {
    const savedData = localStorage.getItem('leaderboardData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      return parsedData;
    }
    const initialData = [
      { id: '0', name: 'Demo User', score: 0 },  
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
      
      localStorage.setItem('leaderboardData', JSON.stringify(updatedData));
      
      return updatedData;
    });
  };

  useEffect(() => {
    const currentData = localStorage.getItem('leaderboardData');
    if (!currentData || JSON.parse(currentData).length < defaultLeaderboardData.length + 1) {
      const completeData = [
        { id: '0', name: 'Demo User', score: 0 },
        ...defaultLeaderboardData
      ];
      localStorage.setItem('leaderboardData', JSON.stringify(completeData));
      setLeaderboardData(completeData);
    }
  }, []);

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