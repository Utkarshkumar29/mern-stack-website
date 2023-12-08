import styled from 'styled-components'

export const RegisterContainer = styled.div`
    width: 100%;
    display: flex;
    background-color: #f9f9f9; 
`

export const Colors = {
    primary: '#FF5A5F',
    white: '#ffffff',
    grey: '#484848',
};


export const RegisterWrapper=styled.div`
    width: 100%;
    max-width: 2000px;
    height: 100%;
    min-height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const RegisterFormWrapper = styled.div`
    text-align: center;
    border: 2px solid ${Colors.grey};
    padding: 50px;
    border-radius: 20px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
`;

export const RegisterHeading=styled.h1`
    
`

export const RegisterForm=styled.form`
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

export const RegisterBtn = styled.button`
`;



export const Name=styled.input`
    padding: 10px;
    border: 1px solid ${Colors.grey};
    border-radius: 5px;
`