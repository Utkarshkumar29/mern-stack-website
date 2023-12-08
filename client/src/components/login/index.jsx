    import React, { useContext, useState, useEffect } from "react";
    import { Email, LoginBtn, LoginContainer, LoginForm, LoginFormWrapper, LoginHeading, LoginWrapper, Password, RegisterBtn } from "../../styles/login";
    import { BrowserRouter as Router, Routes, Navigate, Link } from 'react-router-dom';
    import axios from 'axios';
    import Header from "../header";
    import { UserContext, userNameContext } from "../../context/userContext";

    const Login = () => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [redirect, setRedirect] = useState(false);
        const {setUser}=useContext(UserContext)

        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const {data}=await axios.post('/login',{email,password})
                if(data==="not found")
                {
                    alert('User not found')
                }
                else
                {
                    setUser(data)
                    setRedirect(true)
                }
            } catch (err) {
                console.log(err);
                alert('Invalid Email or Password');
            }
        };

        if (redirect) {
            return <Navigate to={'/'} />;
        }

        

        return (
            <>
                <Header/>
                <LoginContainer>
                    <LoginWrapper>
                        <LoginFormWrapper>
                            <LoginHeading>Login</LoginHeading>
                            <LoginForm method="post" onSubmit={handleSubmit}>
                                <Email 
                                    placeholder="ABC@email.com" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)}></Email>
                                <Password 
                                    placeholder="Password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}></Password>
                                <LoginBtn>Login</LoginBtn>
                                <RegisterBtn>Don't have an account yet?
                                    <Link to='/register'>Register Here</Link>
                                </RegisterBtn>
                            </LoginForm>
                        </LoginFormWrapper>
                    </LoginWrapper>
                </LoginContainer>
            </>
        );
    };

    export default Login;
