import styled from 'styled-components';

export const PlacesContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-evenly;
  flex-wrap: wrap;
  padding-top: 50px;

  :hover {
    transform: scale(1.05);
    transition: transform 0.3s ease; 
  }
`;

export const PlacesWrapper = styled.div`
  background-color: #ffffff; 
  width: 300px;
  max-height: 400px;
  height: 100%;
  font-family: 'Airbnb Cereal App', sans-serif; 

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
  border-radius: 10px; 

  :nth-child(2) {
    color: #222222; 
    font-size: 20px;
    font-weight: 700;
    margin: 0;
    padding: 10px;
  }

  :nth-child(3) {
    color: #717171; 
    font-size: 17px;
    font-weight: 500;
    width: 100%;
    padding: 10px;
  }

  :nth-child(4) {
    color: #222222;
    font-size: 17px;
    font-weight: 500;
    padding: 10px;
  }
`;

export const MainPageImg = styled.img`
  width: 100%;
  height: 200px; 
  object-fit: cover; 
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
