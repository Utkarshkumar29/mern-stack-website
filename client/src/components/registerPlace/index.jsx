  import React, { useEffect, useState } from "react";
  import {Icon, ImageUploadContainer, PlaceForm,TitleDescription,TitleHeading,TitleInput,TitleWrapper,Trash,UploadFromDevice,} from "../../styles/registerPlace";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import {faDoorOpen,faHeart,faRadio,faThumbsUp,faTrash,faTruck,faTv,faUpload,faWifi,} from "@fortawesome/free-solid-svg-icons";
  import axios from "axios";
  import AccountPage from "../../views/accounts";
  import { useParams } from "react-router-dom";

  const RegisterPlace = () => {
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photolink, setPhotoLink] = useState("");
    const [description, setDescription] = useState("");
    const [selectedPerks, setSelectedPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [maxPeople, setMaxPeople] = useState(1);
    const [price,setPrice]=useState("")
    const [Error, setError] = useState(null);
    const { id } = useParams();

    const addPhotoByLink = async (e) => {
      e.preventDefault();
      try {
        const { data: filename } = await axios.post("/uploads-by-link", {
          photolink,
        });
        setAddedPhotos((prev) => {
          return [...prev, filename];
        });
        setPhotoLink("");
      } catch (error) {
        console.error("Error uploading image:", error);
        setError("Error uploading image. Please try again.");
        console.log(Error);
      }
    };

    const perk = [
      { id: "wifi", label: "Wifi", icon: faWifi },
      { id: "parking", label: "Free Parking Plot", icon: faTruck },
      { id: "tv", label: "TV", icon: faTv },
      { id: "music", label: "Music", icon: faRadio },
      { id: "pets", label: "Pets", icon: faThumbsUp },
      { id: "privateEntrance", label: "Private Entrance", icon: faDoorOpen },
    ];

    const handlePerkChange = (e) => {
      const { checked, name } = e.target;
      if (checked) {
        setSelectedPerks([...selectedPerks, name]);
      } else {
        setSelectedPerks([
          ...selectedPerks.filter((selectedName) => selectedName !== name),
        ]);
      }
      console.log(selectedPerks);
    };

    const uploadPhoto = (e) => {
      const files = e.target.files;
      const data = new FormData();
      for (let i = 0; i < files.length; i++) {
        data.append("photos", files[i]);
      }
      axios
        .post("/upload", data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          const { data: filename } = response;
          setAddedPhotos((prev) => {
            return [...prev, ...filename];
          });
        });
    };

    const handlSubmit = async (e) => {
      e.preventDefault()
      const placeData={
          id,
          title,
          address,
          addedPhotos,
          description,
          selectedPerks,
          extraInfo,
          checkIn,
          checkOut,
          maxPeople,
          price
      }
      if(id)
      {
          try {
              await axios.put('/editplace',{
                  id,...placeData})
          } catch (error) {
              console.log(error)
          }
      }
      else
      {
          try {
              await axios.post("/newplace", placeData);
            } catch (error) {
              console.log(error);
            }
      }
    }

    useEffect(()=>{
      if(!id)
      {
          return
      }
      const fetchData = async () => {
          try {
            const response = await axios.get('/placesDetails/' + id);
            setTitle(response.data.title)
            setAddress(response.data.address)
            setAddedPhotos(response.data.addedPhotos)
            setDescription(response.data.description)
            setSelectedPerks(response.data.selectedPerks)
            setExtraInfo(response.data.extraInfo)
            setCheckIn(response.data.checkIn)
            setCheckOut(response.data.checkOut)
            setMaxPeople(response.data.maxPeople)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
      };
      
        fetchData();
    },[id])

    const handleDelete=(filename)=>{
      setAddedPhotos([...addedPhotos.filter(photo=> photo !== filename)])
    }

    const [likedPhotos, setLikedPhotos] = useState({});

    const handleLike = (filename) => {
      setLikedPhotos(prevLikedPhotos => {
        const updatedLikedPhotos = { ...prevLikedPhotos };
        updatedLikedPhotos[filename] = !updatedLikedPhotos[filename]; 
        return updatedLikedPhotos;
      });
    
      const updatedAddedPhotos = [filename, ...addedPhotos.filter(photo => photo !== filename)];
      setAddedPhotos(updatedAddedPhotos);
    };
    

    return (
      <>
      <PlaceForm>
          
          <TitleWrapper>
              <TitleHeading>Title</TitleHeading>
              <TitleDescription>Title for your place, should be short and catchy as in advestisement</TitleDescription>
              <TitleInput placeholder="Title,For Example: My Lovely PLace" value={title} onChange={(e) => {setTitle(e.target.value);}}type="text"/>
          </TitleWrapper>

        
          <div>
              <h2>Address</h2>
              <p>Your address or location of the place</p>
              <input placeholder="1234567890,Street Name,City,Country" value={address} onChange={(e) => {setAddress(e.target.value); }} type="text"></input>
          </div>
          
          <div>
              <h2>Photos</h2>
              <ImageUploadContainer>
                <div style={{display:"flex",gap:"10px"}}>
                  <input placeholder="Add photos using link"value={photolink}onChange={(e) => {setPhotoLink(e.target.value);}}></input>
                  <button onClick={addPhotoByLink}>Add Photo</button></div>
                  <div style={{display:"flex"}}>
                  {addedPhotos.length > 0 &&
                      addedPhotos.map((link) => (
                        <div>
                          <img src={`http://localhost:4000/uploads/${link}`} alt="error" style={{height: "150px", width: "150px", borderRadius: "20px"}}></img>
                          <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" onClick={()=>handleLike(link)}  fill={likedPhotos[link] ? "yellow" : "white"} >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                          </Icon>
                        </div>
                  ))}
                  </div>
                  <UploadFromDevice>
                      <input type="file" style={{ opacity: "0" }} onChange={uploadPhoto}/>
                      <div>
                          <FontAwesomeIcon icon={faUpload} />
                          <div>Upload</div>
                      </div>
                  </UploadFromDevice>
              </ImageUploadContainer>
          </div>
        
          <div>
              <h2>Description</h2>
              <p>Description of the PLace</p>
              <textarea value={description} onChange={(e) => {setDescription(e.target.value);}}type="text"></textarea>
          </div>
          
          <div>
              <h2>Perks</h2>
              <p>Select all the perks of your place</p>
              <div>
              {perk.map((perk) => (
                  <div key={perk.id}>
                      <input type="checkbox" id={perk.id} name={perk.id} onClick={(e) => {handlePerkChange(e);}} checked={selectedPerks.includes(perk.id)}/>
                      <label>
                          <FontAwesomeIcon icon={perk.icon} /> {perk.label}
                      </label>
                  </div>
              ))}
              </div>
          </div>
        
          <div>
              <h2>Extra Info</h2>
              <p>Any extra information about your place</p>
              <textarea value={extraInfo} onChange={(e) => { setExtraInfo(e.target.value);}}type="text"/>
          </div>
        
          <div>
              <h2>Check In & Out Times</h2>
              <p>Set check-in and checkout times</p>
              <div>
                  <div>
                      <p>Check in Time</p>
                      <input placeholder="12:00" value={checkIn} onChange={(e) => { setCheckIn(e.target.value);}}type="number"/>
                  </div>
              
                  <div>
                      <p>Check in Out</p>
                      <input placeholder="11:00" value={checkOut} onChange={(e) => { setCheckOut(e.target.value); }} type="number"/>
                  </div>
              
                  <div>
                      <p>Max Number of People</p>
                      <input placeholder="X" type="number" value={maxPeople} onChange={(e) => { setMaxPeople(e.target.value); }}/>
                  </div>
                  <div>
                    <p>Price per night</p>
                    <input placeholder="Enter price" value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
                  </div>
              </div>
          </div>
          <button type="submit" onClick={handlSubmit}>Save</button>
      </PlaceForm>
      </>
    );
  };

  export default RegisterPlace;
