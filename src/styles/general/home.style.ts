import { styled } from "styled-components";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import crumpledPaper from '../../static/media/crumpled-paper.jpg';

export const HomeContainer = styled(Box)`
  font-family: Arial, sans-serif;
  margin: 40px 30px 30px 30px;

`;

export const StoryCard = styled.div`
  padding: 40px;
  margin: 0;
  position: relative;
  background-image: url(${crumpledPaper});
  background-size: cover;
  background-position: center;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.15));

  &::before {
    content: '';
    position: absolute;
    inset: -10px;
    background-image: url(${crumpledPaper});
    background-size: cover;
    background-position: center;
    clip-path: polygon(
      /* A more natural, fuzzy edge pattern */
      2% 0%, 4% 0.5%, 6% 0%, 8% 0.7%, 10% 0%, 12% 0.3%, 15% 0%, 18% 0.8%, 22% 0%, 25% 0.4%, 30% 0%, 35% 0.6%, 40% 0%, 45% 0.5%, 50% 0%, 55% 0.7%, 60% 0%, 65% 0.4%, 70% 0%, 75% 0.8%, 80% 0%, 85% 0.3%, 90% 0%, 95% 0.5%, 98% 0%,
      100% 2%, 99.5% 4%, 100% 6%, 99.3% 8%, 100% 10%, 99.7% 12%, 100% 15%, 99.2% 18%, 100% 22%, 99.6% 25%, 100% 30%, 99.4% 35%, 100% 40%, 99.5% 45%, 100% 50%, 99.3% 55%, 100% 60%, 99.6% 65%, 100% 70%, 99.2% 75%, 100% 80%, 99.7% 85%, 100% 90%, 99.5% 95%, 100% 98%,
      98% 100%, 95% 99.5%, 90% 100%, 85% 99.3%, 80% 100%, 75% 99.7%, 70% 100%, 65% 99.2%, 60% 100%, 55% 99.6%, 50% 100%, 45% 99.4%, 40% 100%, 35% 99.5%, 30% 100%, 25% 99.3%, 20% 100%, 15% 99.6%, 10% 100%, 5% 99.2%, 2% 100%,
      0% 98%, 0.5% 95%, 0% 90%, 0.7% 85%, 0% 80%, 0.3% 75%, 0% 70%, 0.8% 65%, 0% 60%, 0.4% 55%, 0% 50%, 0.6% 45%, 0% 40%, 0.5% 35%, 0% 30%, 0.7% 25%, 0% 20%, 0.4% 15%, 0% 10%, 0.8% 5%, 0% 2%
    );
    z-index: -1;
    filter: brightness(0.98);
  }

  /* Content needs to stay above the fuzzy edge */
  & > * {
    position: relative;
    z-index: 1;
  }

  h2, h3, h6 {
    color: var(--tertiary);
  }

  h2 {
    font-size: 2.2rem;
    margin-bottom: 1.5rem;
    color: var(--accent);
    font-weight: 600;
  }

  p {
    line-height: 1.6;
    color: rgba(0, 0, 0, 0.87);
    font-size: 1.05rem;
  }
`;

export const AvatarWrapper = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  
  .MuiAvatar-root {
    box-shadow: 
      0 4px 8px rgba(0, 0, 0, 0.15),
      0 2px 4px rgba(0, 0, 0, 0.12);
    border: 2px solid rgba(255, 255, 255, 0.8);
  }
`;

export const IntroContent = styled(Box)`
  margin-left: 16px;
  
  p {
    text-shadow: 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.1);
  }
`;

export const AlgorithmList = styled.ul`
  list-style-type: none;
  padding-left: 16px;
  margin: 0;
`;

export const AlgorithmListItem = styled(Link)`
  padding: 8px 0;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  text-shadow: 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: inherit;
  position: relative;
  padding-left: 8px;

  &::before {
    content: '';
    position: absolute;
    left: -4px;
    top: 50%;
    transform: translateY(-50%) scaleX(0);
    width: 3px;
    height: 70%;
    background: var(--accent);
    transition: transform 0.3s ease;
    border-radius: 4px;
  }

  &:hover {
    transform: translateX(8px);
    color: var(--accent);
    
    &::before {
      transform: translateY(-50%) scaleX(1);
    }
  }
`;

export const TipsSection = styled(Box)`
  margin: 60px 0;
  padding: 24px;
  position: relative;
  transform: rotate(-1deg);

  & > * {
    position: relative;
    z-index: 2;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${crumpledPaper}); 
    background-size: 140%;
    background-position: center;
    clip-path: polygon(
      0% 5%, 2% 0%, 5% 3%, 8% 1%, 12% 4%, 15% 0%, 18% 2%, 22% 1%, 25% 3%,
      30% 0%, 35% 4%, 40% 1%, 45% 3%, 50% 0%, 55% 4%, 60% 1%, 65% 3%, 70% 0%,
      75% 4%, 80% 1%, 85% 3%, 90% 0%, 95% 4%, 98% 1%, 100% 5%,
      100% 95%, 98% 100%, 95% 97%, 90% 100%, 85% 97%, 80% 100%, 75% 97%,
      70% 100%, 65% 97%, 60% 100%, 55% 97%, 50% 100%, 45% 97%, 40% 100%,
      35% 97%, 30% 100%, 25% 97%, 20% 100%, 15% 97%, 10% 100%, 5% 97%, 2% 100%, 0% 95%
    );
    z-index: 0;
    box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.09);
    filter: brightness(0.99);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 1;
  }

  &:nth-child(even) {
    transform: rotate(0.5deg);
    &::before {
      background-position: right center;
    }
  }

  border: none;
  box-shadow: 
    11px 5px 5px 0px rgba(0,0,0, 0.09),
    0 0 15px 0px rgba(0, 0, 0, 0.05);
  backdrop-filter: brightness(0.98);
  border-radius: 5px;
`;

export const TipsList = styled.ul`
  padding-left: 16px;
  margin: 0;
`;

export const TipsListItem = styled.li<{ disabled?: boolean }>`
  padding: 8px 0;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
  text-shadow: 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: ${props => props.disabled ? 'none' : 'translateX(8px)'};
    color: ${props => props.disabled ? 'inherit' : 'var(--accent)'};
  }
`;

export const SectionHeader = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  .MuiSvgIcon-root {
    margin-right: 8px;
    transition: transform 0.2s ease;
    filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.1));
  }

  &:hover .MuiSvgIcon-root {
    transform: scale(1.1) rotate(-5deg);
  }
`;

export const CallToAction = styled(Box)`
  text-align: center;
  
  h6 {
    font-family: "Arial Black", Impact, sans-serif;
    font-size: 1.4rem;
    font-weight: 900;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--accent);
    -webkit-text-fill-color: var(--accent);
    position: relative;
    transform: rotate(-1deg);
    opacity: 0.85;
    mix-blend-mode: multiply;
  }
`; 