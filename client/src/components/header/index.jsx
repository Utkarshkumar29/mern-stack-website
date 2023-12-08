import React, { useContext, useEffect, useState } from "react";
import { HeaderContainer, HeaderGuest, HeaderLogin, HeaderLogo, HeaderWrapper } from "../../styles/header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { UserContext } from "../../context/userContext";

const Header = () => {
    const {user}=useContext(UserContext)

    return (
        <HeaderContainer>
            <HeaderWrapper>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <HeaderLogo>
                    <FontAwesomeIcon icon={faHome} />
                    <span style={{ textDecoration: "none" }}>StayHome</span>
                    </HeaderLogo>
                </Link>

                <HeaderGuest>
                    <span>Anywhere</span>
                    <span>Any week</span>
                    <span>Add guests</span>
                    <FontAwesomeIcon icon={faSearch} style={{ color: "#FF5A5F" }} />
                </HeaderGuest>

                <HeaderLogin>
                    <Link to="/login">
                        <FontAwesomeIcon icon={faBars} style={{ textDecoration: "none" }} />
                    </Link>
                    <FontAwesomeIcon icon={faUser} />
                    {!!user && (
                        <Link to={'/account/profile'} style={{textDecoration:"none"}}>
                            <div>{user.name}</div>
                        </Link>
                    )}
                </HeaderLogin>
            </HeaderWrapper>
        </HeaderContainer>
    );
};

export default Header;
