import styled from 'styled-components'

export const HeaderContainer=styled.div`
    width: 100%;
    display: flex;
`

export const HeaderWrapper=styled.div`   
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 2000px;
    justify-content: space-between;
    align-items: center;
    padding-top: 7px;
`

export const HeaderLogo=styled.div`
    color: #FF5A5F;
    display: flex;
    gap: 5px;
    font-size: 25px;
    padding-left: 10px;
`
export const HeaderGuest=styled.div`
    display: flex;
    gap: 5px;
    padding: 10px;
    flex-direction: row;
    border: 2px solid #555;
    border-radius: 20px;
    justify-content: space-between;
    align-items: center;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    flex: 0.3;

    span:nth-child(1),
    span:nth-child(2)
    {
        border-right: 2px solid #333;
        padding-left: 15px;
        padding-right: 25px;
    }
`

export const HeaderLogin=styled.div`
    display: flex;
    gap: 10px;
    border: 2px solid #333;
    padding: 10px;
    border-radius: 20px;
    margin-right: 20px;
`