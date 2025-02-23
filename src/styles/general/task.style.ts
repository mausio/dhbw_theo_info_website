import styled from 'styled-components';

export const TaskTitle = styled.h2`
  margin: 20px 0;
  font-size: 1.5rem;
  font-weight: bold;
  
  @media (max-width: 480px) {
    font-size: 1rem;
    margin: 15px 80px 10px 5px !important;
  }
`;

export const TaskDescription = styled.p`
  margin: 15px 0;
  font-size: 1rem;
  line-height: 1.5;
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
    margin: 8px 0;
  }
`;

export const TaskInputArray = styled.p`
  margin: 15px 0;
  font-size: 1rem;
  line-height: 1.5;
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
    margin: 8px 0;
  }
`; 