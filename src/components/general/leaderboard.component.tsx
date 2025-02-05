import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  LeaderboardContainer,
  LeaderboardTitle,
  LeaderboardTable,
  LeaderboardHeader,
  LeaderboardRow,
  RankCell,
  LeaderboardCell,
  NoDataMessage,
  ProgressBar,
  UserPositionDivider,
  CurrentUserRow
} from '../../styles/general/leaderboard.style';
import { useUser } from '../../context/user.context';

interface LeaderboardProps {
  entries: { id: string; name: string; score: number }[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ entries }) => {
  const { t } = useTranslation();
  const { getCurrentUserData } = useUser();
  
  // Get current user data
  const currentUserData = getCurrentUserData();
  
  // Create a new array with top entries and current user data
  const processedEntries = entries.filter(entry => entry.id !== '0'); // Remove any old user entry
  if (currentUserData) {
    processedEntries.push(currentUserData); // Add current user data
  }
  
  // Sort all entries by score
  const sortedEntries = processedEntries.sort((a, b) => b.score - a.score);
  
  // Get top 10 entries
  const topEntries = sortedEntries.slice(0, 10);
  
  // Find current user's position
  const userPosition = currentUserData 
    ? sortedEntries.findIndex(entry => entry.id === currentUserData.id) + 1 
    : -1;
  const isUserInTop10 = userPosition <= 10;
  
  return (
    <LeaderboardContainer>
      <LeaderboardTitle>{t('general.leaderboard.title')}</LeaderboardTitle>
      {sortedEntries.length > 0 ? (
        <LeaderboardTable>
          <thead>
            <tr>
              <LeaderboardHeader center>{t('general.leaderboard.rank')}</LeaderboardHeader>
              <LeaderboardHeader>{t('general.leaderboard.name')}</LeaderboardHeader>
              <LeaderboardHeader center>{t('general.leaderboard.score')}</LeaderboardHeader>
              <LeaderboardHeader>{t('general.leaderboard.progress')}</LeaderboardHeader>
            </tr>
          </thead>
          <tbody>
            {topEntries.map((entry, index) => (
              <LeaderboardRow 
                key={entry.id} 
                isCurrentUser={currentUserData ? entry.id === currentUserData.id : false}
              >
                <RankCell center>{index + 1}</RankCell>
                <LeaderboardCell>{entry.name}</LeaderboardCell>
                <LeaderboardCell center>{entry.score}</LeaderboardCell>
                <LeaderboardCell>
                  <ProgressBar progress={entry.score} />
                </LeaderboardCell>
              </LeaderboardRow>
            ))}
            
            {!isUserInTop10 && currentUserData && (
              <>
                <UserPositionDivider>
                  <td colSpan={4}>...</td>
                </UserPositionDivider>
                <CurrentUserRow>
                  <RankCell center>{userPosition}</RankCell>
                  <LeaderboardCell>{currentUserData.name}</LeaderboardCell>
                  <LeaderboardCell center>{currentUserData.score}</LeaderboardCell>
                  <LeaderboardCell>
                    <ProgressBar progress={currentUserData.score} />
                  </LeaderboardCell>
                </CurrentUserRow>
              </>
            )}
          </tbody>
        </LeaderboardTable>
      ) : (
        <NoDataMessage>{t('general.leaderboard.noData')}</NoDataMessage>
      )}
    </LeaderboardContainer>
  );
};

export default Leaderboard; 