import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MainPage, MainPageImg, PlacesContainer, PlacesWrapper } from "../../styles/mainPage";

const Main=()=>{
    const [places,setplaces]=useState([])

    const fetchPlaces=async()=>{
        try{
            const response=await axios.get('https://mern-stack-website-api.vercel.app/places')
            console.log(response.data)
            setplaces(response.data)
        }catch(error)
        {
            console.log(error)
        }
    }
    
    useEffect(()=>{
        fetchPlaces()
    },[])

    return(
        <PlacesContainer>
            {places.length>0 && places.map((item,index)=>(
                <Link to={`/placeInfo/${item._id}`} style={{textDecoration:"none"}}>
                <PlacesWrapper>
                    <MainPageImg src={`http://localhost:4000/uploads/`+item.addedPhotos[0]} alt="Error"/>
                    <div>{item.title}</div>
                    <div>{item.description}</div>
                    <div>₹{item.price} per night</div>
                </PlacesWrapper>
                </Link>
            ))}
        </PlacesContainer>
    )
}

export default Main
