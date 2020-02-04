import styled from 'styled-components';

export const ModalContent = styled.div`
    color: black;
    background-color: white;
    border-radius: 5px;
    height: 600px;
    margin-top: 120px;
    position: relative;
    text-align: center;
    width: 1500px;

    @media (max-width: 700px) {
        color: black;
        background-color: white;
        border-radius: 5px;
        height: 400px;
        margin-top: 70px;
        /* position: relative; */
        text-align: center;
        /* width: 500px; */
    }
`;

export const ModalTitle = styled.h2`
    font-size: 22px;
    padding: 4px;
`;

export const ModalBody = styled.div`
    font-size: 16px;
`;

export const NextGameCardShuffle = styled.button`
    background: var(--primary-color);
    border-radius: 4px;
    margin-bottom: 5px;
    margin-top: 5px;
    padding: 6px;
    width: 150px;
    
`;