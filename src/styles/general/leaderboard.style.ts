import { styled } from "styled-components";

interface CenterProps {
  center?: boolean;
}

interface LeaderboardRowProps {
  isCurrentUser?: boolean;
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
  width: auto;
  min-width: 350px;
  max-width: 800px;
  margin: 20px auto 40px auto;
  padding: 0 20px 20px 20px;
  border-radius: 25px;
  border: 1px solid darkgray;
  box-shadow: rgb(0, 0, 0, 0.5) 2px 2px 5px 0px inset;
  background: radial-gradient(white, color-mix(in srgb, var(--primary), white 95%) 95%);
`;

export const LeaderboardTitle = styled.h1`
  font-size: 22px;
  margin-bottom: 15px;
  text-align: center;
  color: var(--black);
`;

export const LeaderboardTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: rgb(0, 0, 0, 0.5) 1px 1px 3px 0px;
`;

export const LeaderboardHeader = styled.th<CenterProps>`
  padding: 8px 10px;
  text-align: ${props => props.center ? 'center' : 'left'};
  background: var(--tertiary);
  color: white;
  font-weight: bold;
`;

export const LeaderboardRow = styled.tr<LeaderboardRowProps>`
  &:nth-child(even) {
    background-color: rgba(0, 0, 0, 0.02);
  }
  &:hover {
    background-color: rgba(57, 87, 111, 0.05);
  }
  ${props => props.isCurrentUser && `
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
  opacity: 0.5;
  font-weight: bold;
  
  td {
    padding: 8px;
  }
`;

export const CurrentUserRow = styled(LeaderboardRow)`
  // background: linear-gradient(
  //   90deg,
  //         rgba(255, 0, 0, 0.1),
  //   rgba(255, 165, 0, 0.1),
  //   rgba(255, 255, 0, 0.1),
  //   rgba(0, 255, 0, 0.1),
  //   rgba(0, 0, 255, 0.1),
  //   rgba(75, 0, 130, 0.1),
  //   rgba(255, 0, 0, 0.1)
  // );
  // background-size: 200% 100%;
  // animation: rainbow-background 10s linear infinite;
  font-weight: bold;
  ${rainbowKeyframes}
`;

export const RankCell = styled.td<CenterProps>`
  padding: 6px 10px;
  text-align: ${props => props.center ? 'center' : 'left'};
  color: var(--black);
  vertical-align: middle;
`;

export const LeaderboardCell = styled.td<CenterProps>`
  padding: 6px 10px;
  text-align: ${props => props.center ? 'center' : 'left'};
  color: var(--black);
  position: relative;
  vertical-align: middle;
  
  &:last-child {
    width: 40%;
    padding-right: 0;
  }
`;

export const NoDataMessage = styled.p`
  text-align: center;
  color: var(--black);
  padding: 20px;
  background: color-mix(in srgb, var(--tertiary), white 20%);
  border-radius: 10px;
  box-shadow: rgb(0, 0, 0, 0.5) 1px 1px 3px 0px inset;
`;

export const ProgressBar = styled.div<{ progress: number }>`
  height: 16px;
  width: 90%;
  background-color: #f3f3f3;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 3px;
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