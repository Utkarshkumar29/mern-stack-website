import styled from 'styled-components'

export const LoginContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`;


export const Colors = {
    primary: '#FF5A5F',
    white: '#ffffff',
    grey: '#484848',
};


export const LoginWrapper=styled.div`
    width: 100%;
    max-width: 2000px;
    height: 100%;
    min-height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const LoginFormWrapper = styled.div`
    text-align: center;
    border: 2px solid ${Colors.grey};
    padding: 50px;
    border-radius: 20px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
`;

export const LoginHeading=styled.h1`
    
`

export const LoginForm=styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

export const Email = styled.input`
    padding: 10px;
    border: 1px solid ${Colors.grey};
    border-radius: 5px;
`;

export const Password = styled.input`
    padding: 10px;
    border: 1px solid ${Colors.grey};
    border-radius: 5px;
`;

export const LoginBtn = styled.button`
    background-color: ${Colors.primary};
    color: ${Colors.white};
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #ff767b;
    }
`;

export const RegisterBtn=styled.p`
`