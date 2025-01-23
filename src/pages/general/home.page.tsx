import { GenericMainContainer } from '../../styles/general/generic.style.ts';
import { useTranslation } from 'react-i18next';
import Leaderboard from '../../components/general/leaderboard.component';
import { useLeaderboard } from '../../context/LeaderboardContext';

const HomePage = () => {
  const { t } = useTranslation();
  const { leaderboardData } = useLeaderboard();

  return (
    <GenericMainContainer>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>{t('home.title')}</h1>
        <Leaderboard entries={leaderboardData} />
        <h2>{t('home.subtitle')}</h2>
        <p>{t('home.noLoginRequired')}</p>
        <p>{t('home.bonusNote')}</p>
        <ul>
          <li>{t('home.loginInstruction')}</li>
          <li>{t('home.bonusInstruction')}</li>
        </ul>
        <h3>{t('home.tipsTitle')}</h3>
        <ul>
          <li>{t('home.tipSubmit')}</li>
          <li>{t('home.tipBigScreen')}</li>
        </ul>
        <p>{t('home.fun')}</p>
      </div>
    </GenericMainContainer>
  );
};

export default HomePage;
