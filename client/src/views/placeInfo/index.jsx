import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { Container, DetailsContainer, ImageContainer, ImageWrapper, MainImage, PlaceDetails, ShowImage, ShowImage1, ShowImagesWraper } from "../../styles/placeInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { differenceInDays } from 'date-fns';

const PlaceInfo = () => {
    const { id } = useParams();
    const [place, setPlace] = useState();
    const [showPhotos,setShowPhotos]=useState(false)

    const [checkIn,setCheckIn]=useState('')
    const [checkOut,setCheckOut]=useState('')
    const [numberOfGuest,setNumberOfGuest]=useState(1)
    const [names,setNames]=useState('')
    const [number,setNumber]=useState('')
    const [redirect,setRedirect]=useState(false)

    let numberOfNights=0
    if(checkIn && checkOut){
        numberOfNights=differenceInDays(new Date(checkOut),new Date(checkIn))
        console.log(checkOut,checkIn,numberOfNights)
    }

    const handleSubmit=()=>{
        axios.post('/booking',{
            checkIn,
            checkOut,
            numberOfGuest,
            names,
            number,
            place
        })
        setRedirect(true)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!id) {
                    return;
                }
                const response = await axios.get(`/placesDetails/${id}`);
                console.log(response.data);
                setPlace(response.data);
            } catch (error) {
                console.error('Error fetching place details:', error);
            }
        };

        fetchData();
    }, [id]);

    if(showPhotos)
    {
        return(
            <div>
                <FontAwesomeIcon icon={faClose} onClick={()=>{setShowPhotos(false)}}/>
                {place.addedPhotos.map((item,index)=>(
                    <>
                    <ShowImagesWraper>
                        <ShowImage1 src={`http://localhost:4000/uploads/`+place.addedPhotos[index]} alt="error" style={{height:"300px",width:"300px"}}/>
                    </ShowImagesWraper>
                    </>
                ))}
            </div>
        )
    }

    if(redirect){
        return <Navigate to={'/account/bookings'}/>
    }

    return (
        <>
            <Header />
            <Container>
      {place ? (
        <PlaceDetails>
          <ImageContainer>
            <MainImage src={`http://localhost:4000/uploads/${place.addedPhotos[0]}`} alt="error" style={{width:"1210px",height:"400px"}}/>
            <ImageWrapper>
              <img src={`http://localhost:4000/uploads/${place.addedPhotos[1]}`} alt="error" style={{width:"600px",height:"400px"}}/>
              <img src={`http://localhost:4000/uploads/${place.addedPhotos[2]}`} alt="error" style={{width:"600px",height:"400px"}}/>
            </ImageWrapper>
            <ShowImage onClick={() => setShowPhotos(true)}>Show All Photos</ShowImage>
          </ImageContainer>

          <DetailsContainer>
            <p>Description</p>
            <h3>{place.description}</h3>

            <h3>Check In Time: {place.checkIn}</h3>
            <h3>Check Out Time: {place.checkOut}</h3>
            <h3>Max People: {place.maxPeople}</h3>

            <div>
              <h3 style={{color:"#FF5A5F"}}>₹ Price: {place.price}</h3>
              <input type="date" value={checkIn} onChange={(e) => { setCheckIn(e.target.value) }} />
              <input type="date" value={checkOut} onChange={(e) => { setCheckOut(e.target.value) }} />
              <input type="number" value={numberOfGuest} onChange={(e) => { setNumberOfGuest(e.target.value) }} />
              <input type="text" placeholder="Enter your name" value={names} onChange={(e) => setNames(e.target.value)} />
              <input type="text" placeholder="Enter your number" value={number} onChange={(e) => setNumber(e.target.value)} />
              <button onClick={handleSubmit}>
                Book Ticket for: <span>${numberOfNights * place.price}</span>
              </button>
            </div>
          </DetailsContainer>
        </PlaceDetails>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
        </>
    );
};

export default PlaceInfo;
