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
  ProgressBar
} from '../../styles/general/leaderboard.style';

interface LeaderboardProps {
  entries: { id: string; name: string; score: number }[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ entries }) => {
  const { t } = useTranslation();
  const sortedEntries = [...entries]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

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
            {sortedEntries.map((entry, index) => (
              <LeaderboardRow key={entry.id}>
                <RankCell center>{index + 1}</RankCell>
                <LeaderboardCell>{entry.name}</LeaderboardCell>
                <LeaderboardCell center>{entry.score}</LeaderboardCell>
                <LeaderboardCell>
                  <ProgressBar progress={entry.score} />
                </LeaderboardCell>
              </LeaderboardRow>
            ))}
          </tbody>
        </LeaderboardTable>
      ) : (
        <NoDataMessage>{t('general.leaderboard.noData')}</NoDataMessage>
      )}
    </LeaderboardContainer>
  );
};

export default Leaderboard; 