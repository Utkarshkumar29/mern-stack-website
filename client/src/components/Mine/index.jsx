import axios from "axios";
import React, { useEffect, useState } from "react";
import { Description, MinePLacesWrapper, PlaceDescription, PlaceImage, PlacesCard, Price, Title } from "../../styles/Mine";
import { Link, useParams } from "react-router-dom";

const Mine = () => {
    const [places, setPlaces] = useState([]);
    const { id } = useParams();

    const fetchPlaces = async () => {
        try {
            const response = await axios.get('/myaccomendation');
            console.log('Response data:', response.data);
            setPlaces(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchPlaces();
    }, []); 

    return (
        <MinePLacesWrapper>
            {places.map((item, index) => (
                <Link to={`/account/places/` + item._id} key={index} style={{textDecoration:"none"}}>
                    <PlacesCard>
                        <PlaceImage src={`http://localhost:4000/uploads/` + item.addedPhotos[0]} alt="error"/>
                        <PlaceDescription>
                            <Title style={{textDecoration:"none"}}>{item.title}</Title>
                            <Description>{item.description}</Description>
                            <Price>{item.price} per night</Price>
                        </PlaceDescription>
                    </PlacesCard>
                </Link>
            ))}
        </MinePLacesWrapper>
    );
};

export default Mine;
