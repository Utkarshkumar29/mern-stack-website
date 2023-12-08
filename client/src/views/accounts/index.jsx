import React, { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { Link, Navigate, useParams } from "react-router-dom";
import Header from "../../components/header";
import { Accomendations, AccountContainer, AccountInfo, AccountWrapper,Bookings, LogoutBtn, LogoutContainer, Profile, UserDetails } from "../../styles/accounts";
import axios from "axios";
import Accomendation from "../accomendations";
import Booking from "../bookings";

const AccountPage = () => {
    const {user,setUser}=useContext(UserContext)
    const [background,setbackground]=useState('profile')
    const [redirect,setRedireact]=useState(false)
    const {subpage}=useParams()
    
    const handleChange=(type)=>{
        setbackground(type)
    }

    const handleLogout=()=>{
        axios.post('/logout')
        setRedireact(true)
        setUser(null)
    }

    if(redirect)
    {
        return(
            <Navigate to={'/'}/>
        )
    }
    return (
        <>
            <Header/>
            <AccountContainer>
                <AccountWrapper>

                    <AccountInfo>
                        <Link to={'/account/profile'} style={{textDecoration:"none"}}>
                            <Profile onClick={()=>{handleChange('profile')}} style={{backgroundColor:background==='profile'? "#FF5A5F":"", color:background==='profile'? "white":""}}>My profile</Profile>
                        </Link>

                        <Link to={'/account/bookings'} style={{textDecoration:"none"}}>
                            <Bookings onClick={()=>{handleChange('bookings')}} style={{backgroundColor:background==='bookings'? "#FF5A5F":"",color:background==='bookings'? "white":""}}>My bookings</Bookings>
                        </Link>

                        <Link to={'/account/accomendations'} style={{textDecoration:"none"}}>
                            <Accomendations onClick={()=>{handleChange('accomendations')}} style={{backgroundColor:background==='accomendations'? "#FF5A5F":"",color:background==='accomendations'? "white":""}}>My accomendation</Accomendations>
                        </Link>
                    </AccountInfo>

                    {(subpage === 'profile') && (
                        <LogoutContainer>
                            <UserDetails>Logged in as {user.name} ({user.email})</UserDetails>
                            <LogoutBtn onClick={handleLogout}>Logout</LogoutBtn>
                        </LogoutContainer>
                    )}

                    {subpage==='accomendations' && (
                        <Accomendation/>
                    )}

                    {subpage==='bookings' && (
                        <Booking/>
                    )}

                </AccountWrapper>
            </AccountContainer>
        </>
    );
};

export default AccountPage;
