import styled from 'styled-components';

export const GenericMainContainer = styled.div`
    width: 90vw;
    height: 100%;
    inset: 0;
    margin: 25px auto;
    border-radius: 5px;
    //background-color: var(--quarternary);
    backdrop-filter: brightness(100) opacity(1);
    padding: 0.25vh 3vw;

    -webkit-box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 1);
    -moz-box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 1);
    box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 1);
`;

export const GenericImprintNotice = styled.div`
    width: 90vw;
    height: 4vh;
    inset: 0;
    margin: 25px auto;
    border-radius: 5px;
    //background-color: var(--quarternary);
    backdrop-filter: brightness(100) opacity(1);
    padding: 0.25vh 3vw;

    -webkit-box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 1);
    -moz-box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 1);
    box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 1);

    display: flex;
    align-items: center;
    justify-content: space-between;
`;
