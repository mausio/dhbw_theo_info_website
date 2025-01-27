import styled, { keyframes } from 'styled-components';

export const AllBucketsFrame = styled.div`
  width: 100%;
  height: 125px;
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const LittleBucket = styled.div`
  width: 20px;
  height: 20px;
  padding: 2px;
  margin: 2px 0;
  border-radius: 3px;
  background-color: white;

  border: 2px solid dimgray;
  text-align: center;
  transition: margin-top 0.5s ease;
`;

export const BucketsContainer = styled.div`
  width: 40px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 0 5px 5px 5px;

  border-radius: 5px;

  border: dimgray dotted 2px;
`;

export const BucketNumber = styled.p`
  width: 40px;
  padding: 2px 0;
  margin: 1px 0 5px 0;
  text-align: center;
  border-bottom: 2px dotted gray;
  user-select: none;
`;
