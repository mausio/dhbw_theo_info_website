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
  
  // First, sort ALL entries by score and name (including non-displayed ones)
  const allSortedEntries = [...entries].sort((a, b) => {
    // First sort by score
    const scoreDiff = b.score - a.score;
    if (scoreDiff !== 0) return scoreDiff;
    // If scores are equal, sort alphabetically by name
    return a.name.localeCompare(b.name);
  });

  // Calculate user's position by counting how many users have a better score
  const userPosition = currentUserData 
    ? allSortedEntries.filter(entry => 
        entry.score > currentUserData.score || 
        (entry.score === currentUserData.score && entry.name.localeCompare(currentUserData.name) < 0)
      ).length + 1
    : -1;

  // Now create display list with current user
  const processedEntries = entries.filter(entry => entry.id !== '0'); // Remove any old user entry
  if (currentUserData) {
    processedEntries.push(currentUserData);
  }
  
  // Sort display entries
  const sortedEntries = processedEntries.sort((a, b) => {
    const scoreDiff = b.score - a.score;
    if (scoreDiff !== 0) return scoreDiff;
    return a.name.localeCompare(b.name);
  });
  
  // Get top 10 entries for display
  const topEntries = sortedEntries.slice(0, 10);
  const isUserInTop10 = userPosition <= 10;

  return (
    <LeaderboardContainer>
      <LeaderboardTitle>{t('general.leaderboard.title')}</LeaderboardTitle>
      {sortedEntries.length > 0 ? (
        <LeaderboardTable>
          <thead>
            <tr>
              <LeaderboardHeader data-center={true}>{t('general.leaderboard.rank')}</LeaderboardHeader>
              <LeaderboardHeader>{t('general.leaderboard.name')}</LeaderboardHeader>
              <LeaderboardHeader data-center={true}>{t('general.leaderboard.score')}</LeaderboardHeader>
              <LeaderboardHeader>{t('general.leaderboard.progress')}</LeaderboardHeader>
            </tr>
          </thead>
          <tbody>
            {topEntries.map((entry) => {
              // Calculate actual position for each entry
              const position = allSortedEntries.findIndex(e => e.id === entry.id) + 1;
              return (
                <LeaderboardRow 
                  key={entry.id} 
                  isCurrentUser={currentUserData ? entry.id === currentUserData.id : false}
                >
                  <RankCell data-center={true}>{position}</RankCell>
                  <LeaderboardCell>{entry.name}</LeaderboardCell>
                  <LeaderboardCell data-center={true}>{entry.score}</LeaderboardCell>
                  <LeaderboardCell>
                    <ProgressBar progress={entry.score} />
                  </LeaderboardCell>
                </LeaderboardRow>
              );
            })}
            
            {!isUserInTop10 && currentUserData && (
              <>
                <UserPositionDivider>
                  <td style={{ textAlign: 'center' }} colSpan={4}>...</td>
                </UserPositionDivider>
                <CurrentUserRow>
                  <RankCell data-center={true}>{allSortedEntries.filter(entry => 
                    entry.score > currentUserData.score || 
                    (entry.score === currentUserData.score && entry.name.localeCompare(currentUserData.name) < 0)
                  ).length + 1}</RankCell>
                  <LeaderboardCell>{currentUserData.name}</LeaderboardCell>
                  <LeaderboardCell data-center={true}>{currentUserData.score}</LeaderboardCell>
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