import styled from 'styled-components'

export const AccountContainer=styled.div`
    width: 100%;
    display: flex;
`

export const AccountWrapper=styled.div`
    width: 100%;
    max-width: 2100px;
    height: 100%;
`

export const AccountInfo=styled.div`
    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: center;
    padding: 40px;
`
export const Profile=styled.div`
    padding: 10px;
    border-radius: 20px;
    color: black;
`
export const Bookings=styled.div`
    background-color: ${(props)=>(props.active ? '#FF5A5F' : '')};
    padding: 10px;
    border-radius: 20px;
    color: black;
`
export const Accomendations=styled.div`
    background-color: ${(props)=>(props.active ? '#FF5A5F' : '')};
    padding: 10px;
    border-radius: 20px;
    color: black;
`

export const LogoutContainer=styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
`

export const UserDetails=styled.div`
    
`

export const LogoutBtn=styled.button`
    background-color: #FF5A5F;
    border: none;
    padding: 10px;
    width: 100%;
    max-width: 500px;
    color: white;
    border-radius: 20px;
`