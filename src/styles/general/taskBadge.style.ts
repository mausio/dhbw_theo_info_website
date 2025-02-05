import styled from 'styled-components';

export const BadgePadding = styled.div`
    padding: 5px 8px 6px 8px;
    background-color: var(--primary);
    border-radius: 28px;
    background: white;
    box-shadow: rgb(0, 0, 0, 0.5) 1px 1px 5px 0px inset;
    margin-right: 0px;
`;

export const BadgeContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 14px;
  position: relative;
  font-size: 18px;
  color: var(--tertiary);
  border: 3px dotted darkgray;
  border-radius: 25px;
  background: transparent;
`;

export const ProgressBorder = styled.div<{ progress: number }>`
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  border: 3.5px solid rgb(89, 187, 92);
  border-radius: 20px;
  clip-path: ${props => {
    const segments = Math.floor(props.progress / 5);

    if (segments >= 20) return 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
    if (segments <= 0) return 'polygon(50% 0%, 50% 0%)';

    switch(segments) {
      case 1: return 'polygon(50% 0%, 100% 0%, 85% 5%, 50% 0%)';
      case 2: return 'polygon(50% 0%, 100% 0%, 100% 15%, 50% 0%)';
      case 3: return 'polygon(50% 0%, 100% 0%, 100% 25%, 50% 0%)';
      case 4: return 'polygon(50% 0%, 100% 0%, 100% 35%, 50% 0%)';
      case 5: return 'polygon(50% 0%, 100% 0%, 100% 100%, 100% 60%, 50% 0%)';
      case 6: return 'polygon(50% 0%, 100% 0%, 100% 100%, 90% 100%, 50% 0%)';
      case 7: return 'polygon(50% 0%, 100% 0%, 100% 100%, 80% 100%, 50% 0%)';
      case 8: return 'polygon(50% 0%, 100% 0%, 100% 100%, 70% 100%, 50% 0%)';
      case 9: return 'polygon(50% 0%, 100% 0%, 100% 100%, 60% 100%, 50% 0%)';
      case 10: return 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%, 50% 0%)';
      case 11: return 'polygon(50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 400%, 50% 0%)';
      case 12: return 'polygon(50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 200%, 50% 0%)';
      case 13: return 'polygon(50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 130%, 50% 0%)';
      case 14: return 'polygon(50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 80%, 50% 0%)';
      case 15: return 'polygon(50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 45%, 50% 0%)';
      case 16: return 'polygon(50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 25%, 50% 0%)';
      case 17: return 'polygon(50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 15%, 50% 0%)';
      case 18: return 'polygon(50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 10%, 50% 0%)';
      case 19: return 'polygon(50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 15% 0%, 50% 0%)';
      default: return 'polygon(50% 0%, 50% 0%)';
    }
  }};
`; 