import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AccomendationContainer, AccomendationWrapper, MyPLaces, NewPLaceBtn} from "../../styles/accomendations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import Mine from "../../components/Mine";
import RegisterPlace from "../../components/registerPlace";

const Accomendation=()=>{
    const {action}=useParams()
    const [error, setError] = useState(null);



    return(
        <AccomendationContainer>
            <AccomendationWrapper>
            {error && <div>Error: {error}</div>}
                
                {action !=='new' && (
                    <MyPLaces>
                        <Link to={'/account/accomendations/new'} style={{textDecoration:"none",paddingBottom:"20px"}}>
                            <NewPLaceBtn >Add New Place<FontAwesomeIcon icon={faPlus}/></NewPLaceBtn>
                        </Link>
                        <Mine/>
                    </MyPLaces>
                )}

                {action==='new' && (
                    <RegisterPlace/>
                )}
                
            </AccomendationWrapper>
        </AccomendationContainer>
    )
}

export default Accomendation
