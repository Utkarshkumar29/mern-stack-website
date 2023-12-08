import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
import { Email, Name, Password, RegisterContainer, RegisterForm, RegisterFormWrapper, RegisterHeading, RegisterWrapper } from "../../styles/register";
import { LoginBtn, RegisterBtn } from "../../styles/login";
import axios from 'axios'
import Header from "../header";


    const Register=()=>{
        const [name,setName]=useState("")
        const [email,setEmail]=useState("")
        const [password,setPassword]=useState("")
        const [redirect,setRedirect]=useState("")

        const handleSubmit = async(e) => {
            e.preventDefault()
            console.log(name,email,password)
            console.log('context:',name)
            try{
                const response = await axios.post('http://localhost:4000/register', {
                    name,
                    email,
                    password
                });
                if(response.status===200)
                {
                    setRedirect(true)
                }
                console.log(response.data)
            }catch(err){
                console.log(err)
            }
        }

        if(redirect)
        {
            return(<Navigate to={'/'}/>)
        }

        return(
            <>
            <Header/>
            <RegisterContainer>
                <RegisterWrapper>
                    <RegisterFormWrapper>
                        <RegisterHeading>Register</RegisterHeading>
                        <RegisterForm onSubmit={handleSubmit} method="post">
                            <Name type="text" placeholder="Enter your name"  value={name} onChange={(e)=>{setName(e.target.value)}}></Name>
                            <Email type="email" placeholder="ABC@email.com" value={email} onChange={(e)=>{setEmail(e.target.value)}}></Email>
                            <Password type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}></Password>
                            <LoginBtn type="submit">Register</LoginBtn>
                            <RegisterBtn>Already a memeber?
                                <Link to='/login'>Login Here</Link>    
                            </RegisterBtn>
                        </RegisterForm>
                    </RegisterFormWrapper>
                </RegisterWrapper>
            </RegisterContainer>
            </>
        )
    }

    export default Register