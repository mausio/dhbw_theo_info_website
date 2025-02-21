import { GenericMainContainer } from '../../styles/general/generic.style.ts';
import { useTranslation } from 'react-i18next';
import Leaderboard from '../../components/general/leaderboard.component';
import { useLeaderboard } from '../../context/LeaderboardContext';
import { Avatar, Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import {
  HomeContainer,
  StoryCard,
  AvatarWrapper,
  IntroContent,
  AlgorithmList,
  AlgorithmListItem,
  TipsSection,
  TipsList,
  TipsListItem,
  SectionHeader,
  CallToAction
} from '../../styles/general/home.style';

const HomePage = () => {
  const { t } = useTranslation();
  const { leaderboardData } = useLeaderboard();

  // Sort all entries by score before passing to leaderboard
  const sortedEntries = [...leaderboardData].sort((a, b) => b.score - a.score);

  return (
    <>
      {/* Title and Leaderboard Container */}
      <GenericMainContainer>
        <HomeContainer>
          <Typography variant="h2" component="h1" gutterBottom style={{fontWeight: "900"}}>
            {t('home.title')}
          </Typography>

          <Leaderboard entries={sortedEntries} />
        </HomeContainer>
      </GenericMainContainer>

      {/* Story Section Container */}
      <GenericMainContainer>
        <HomeContainer>
          <StoryCard>
            <div>
              {/* Welcome and Introduction */}
              <Typography variant="h4" component="h2" gutterBottom>
                {t('home.story.welcomeTitle')}
              </Typography>
              
              <AvatarWrapper>
                <Avatar sx={{ bgcolor: '#1976d2', width: 56, height: 56 }}>
                  <SchoolIcon sx={{ fontSize: 32 }} />
                </Avatar>
                <IntroContent>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {t('home.story.meetAlex')}
                  </Typography>
                  <Typography paragraph>
                    {t('home.story.intro')}
                  </Typography>
                </IntroContent>
              </AvatarWrapper>

              <Typography paragraph>
                {t('home.story.exerciseInfo')}
              </Typography>

              {/* Algorithm Characters */}
              <TipsSection>
                <SectionHeader>
                  <EmojiObjectsIcon sx={{ color: '#ffc107' }} />
                  <Typography variant="h6">
                    {t('home.story.meetCharacters')}
                  </Typography>
                </SectionHeader>
                <AlgorithmList>
                  <AlgorithmListItem to="/quick">
                    🏃🏿‍➡️ {t('home.story.quickSort')}
                  </AlgorithmListItem>
                  <AlgorithmListItem to="/merge">
                    🎭 {t('home.story.mergeSort')}
                  </AlgorithmListItem>
                  <AlgorithmListItem to="/heap">
                    🌳 {t('home.story.heapSort')}
                  </AlgorithmListItem>
                  <AlgorithmListItem to="/insertion">
                    🎯 {t('home.story.insertionSort')}
                  </AlgorithmListItem>
                  <AlgorithmListItem to="/bucket">
                    🪣 {t('home.story.bucketSort')}
                  </AlgorithmListItem>
                  <AlgorithmListItem to="/radix">
                    🔢 {t('home.story.radixSort')}
                  </AlgorithmListItem>
                  <AlgorithmListItem to="/counting">
                    🧮 {t('home.story.countingSort')}
                  </AlgorithmListItem>
                </AlgorithmList>
              </TipsSection>

              <TipsSection>
                <SectionHeader>
                  <TipsAndUpdatesIcon sx={{ color: '#4caf50' }} />
                  <Typography variant="h6">
                    {t('home.story.importantNotes')}
                  </Typography>
                </SectionHeader>
                <TipsList>
                  <TipsListItem disabled>{t('home.story.loginTip')}</TipsListItem>
                  <TipsListItem disabled>{t('home.story.examTip')}</TipsListItem>
                  <TipsListItem disabled>{t('home.story.submitTip')}</TipsListItem>
                  <TipsListItem disabled>{t('home.story.screenTip')}</TipsListItem>
                </TipsList>
              </TipsSection>

              <Typography paragraph>
                {t('home.story.callToAction')}
              </Typography>
            </div>
          </StoryCard>
        </HomeContainer>
      </GenericMainContainer>
    </>
  );
};

export default HomePage;
