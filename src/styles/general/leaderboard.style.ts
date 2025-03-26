import { styled } from "styled-components";

interface CenterProps {
  'data-center'?: boolean;
}

interface LeaderboardRowProps {
  $isCurrentUser?: boolean;
}

const rainbowKeyframes = `
  @keyframes rainbow-background {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 200% 50%;
    }
  }
`;

export const LeaderboardContainer = styled.div`
  @media (max-width: 768px) {
    min-width: 300px;
    max-width: 600px;
  }

  @media (max-width: 480px) {
    min-width: 250px;
    max-width: 400px;
  }

  width: auto;
  min-width: 350px;
  max-width: 800px;
  margin: 10px auto 0 auto;
  padding: 0 20px 10px 20px;
  border-radius: 15px;
  border: 1px solid darkgray;
  box-shadow: rgb(0, 0, 0, 0.5) 2px 2px 5px 0px inset;
  background: radial-gradient(white, color-mix(in srgb, var(--primary), white 95%) 95%);
`;

export const LeaderboardTitle = styled.h1`
  @media (max-width: 480px) {
    font-size: 18px;
    margin: 8px 0;
  }

  font-size: 20px;
  margin: 10px 0;
  text-align: center;
  color: var(--black);
`;

export const LeaderboardTable = styled.table`
  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 8px;
  }

  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
  margin-bottom: 10px;
  overflow: hidden;
  box-shadow: rgb(0, 0, 0, 0.5) 1px 1px 3px 0px;
`;

export const LeaderboardHeader = styled.th<CenterProps>`
  @media (max-width: 768px) {
    padding: 5px 6px;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 4px;
    font-size: 0.85rem;
    white-space: nowrap;
  }

  padding: 6px 8px;
  text-align: ${props => props['data-center'] ? 'center' : 'left'};
  background: var(--tertiary);
  color: white;
  font-weight: bold;
  font-size: 0.95rem;
`;

export const LeaderboardRow = styled.tr<LeaderboardRowProps>`
  &:nth-child(even) {
    background-color: rgba(0, 0, 0, 0.02);
  }
  &:hover {
    background-color: rgba(57, 87, 111, 0.05);
  }
  ${props => props.$isCurrentUser && `
    background: linear-gradient(
      90deg,
      rgba(255, 0, 0, 0.15),
      rgba(255, 165, 0, 0.15),
      rgba(255, 255, 0, 0.15),
      rgba(0, 255, 0, 0.15),
      rgba(0, 0, 255, 0.15),
      rgba(75, 0, 130, 0.15),
      rgba(255, 0, 0, 0.15)
    );
    background-size: 200% 100%;
    animation: rainbow-background 10s linear infinite;
    font-weight: bold;
    ${rainbowKeyframes}
  `}
`;

export const UserPositionDivider = styled.tr`
  text-align: center;
  color: var(--black);
    justify-content: center;
    align-items: center;
    vertical-align: middle;
  
  td {
    padding: 0 4px;
    font-size: 0.9rem;
    font-weight: bold;
    position: relative;
    bottom: 3px;
    left: 19px;
  }
`;

export const CurrentUserRow = styled(LeaderboardRow).attrs({
  $isCurrentUser: true,
})`
  font-weight: bold;
  ${rainbowKeyframes}
`;

export const RankCell = styled.td<CenterProps>`
  @media (max-width: 768px) {
    padding: 4px 6px;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 3px 4px;
    font-size: 0.85rem;
  }

  padding: 4px 8px;
  text-align: ${props => props['data-center'] ? 'center' : 'left'};
  color: var(--black);
  vertical-align: middle;
  font-size: 0.95rem;
`;

export const LeaderboardCell = styled.td<CenterProps>`
  @media (max-width: 768px) {
    padding: 4px 6px;
    font-size: 0.9rem;

    &:last-child {
      width: 30%;
    }
  }

  @media (max-width: 480px) {
    padding: 3px 4px;
    font-size: 0.85rem;

    &:last-child {
      width: 10%;
      padding-right: 0;
      margin-right: 0;
    }
  }

  padding: 4px 8px;
  text-align: ${props => props['data-center'] ? 'center' : 'left'};
  color: var(--black);
  position: relative;
  vertical-align: middle;
  font-size: 0.95rem;
  
  &:last-child {
    width: 40%;
    padding-right: 0;
  }
`;

export const NoDataMessage = styled.p`
  text-align: center;
  color: var(--black);
  padding: 15px;
  background: color-mix(in srgb, var(--tertiary), white 20%);
  border-radius: 10px;
  box-shadow: rgb(0, 0, 0, 0.5) 1px 1px 3px 0px inset;
  font-size: 0.95rem;
`;

export const ProgressBar = styled.div<{ progress: number }>`
  @media (max-width: 480px) {
    height: 10px;
    width: 90%;
    margin-top: 1px;
    margin: 0 auto;
  }

  height: 12px;
  width: 90%;
  background-color: #f3f3f3;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 2px;
  box-shadow: rgb(0, 0, 0, 0.5) 1px 1px 2px 0px inset;
  position: relative;
  border: 1px solid darkgray;

  &::before {
    content: "";
    display: block;
    height: 100%;
    background-color: var(--contrastAccent);
    width: ${props => props.progress}%;
    transition: width 0.3s ease-in-out;
  }
`; 