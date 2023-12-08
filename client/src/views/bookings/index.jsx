import axios from "axios";
import React, { useEffect, useState } from "react";
import { BookingContainer } from "../../styles/bookings";

const Bookings = () => {
  const [userData, setUserData] = useState({});
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('/mybookings');
        console.log(response.data); // Log the entire response data
        setUserData(response.data.user);
        setBookings(response.data.bookings);
        console.log(response.data.bookings[0].place,'ss')
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <BookingContainer>
      <h2>User Details</h2>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
      <p>User ID: {userData._id}</p>

      <h2>Bookings</h2>
      {bookings?.length > 0 ? (
        bookings.map((booking) => (
          <div key={booking._id}>
            <img src={`http://localhost:4000/uploads/`+booking.place.addedPhotos[0]}/>
            <p>Check-in: {new Date(booking.checkIn).toLocaleDateString()}</p>
            <p>Check-out: {new Date(booking.checkOut).toLocaleDateString()}</p>
            <p>Number of Guests: {booking.numberOfGuest}</p>
            <p>Phone Number: {booking.number}</p>
          </div>
        ))
      ) : (
        <p>No bookings available</p>
      )}
    </BookingContainer>
  );
};

export default Bookings;
