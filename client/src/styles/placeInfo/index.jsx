import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const PlaceDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ImageContainer = styled.div`
  flex: 1;
`;

export const MainImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
`;

export const ImageWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export const ShowImage = styled.button`
  background-color: #008489;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #006c72;
  }
`;

export const DetailsContainer = styled.div`
  flex: 1;
  padding-left: 20px;

  p {
    font-size: 25px;
    font-weight: bold;
    color: #008489;
    margin-bottom: 5px;
  }

  h3 {
    font-size: 18px;
    margin-bottom: 10px;
  }

  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  button {
    background-color: #ff5a5f;
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #e04449;
    }
  }
`;

export const ShowImagesWraper=styled.div`
    background-color: black;
`

export const ShowImage1 = styled.img`
  display: block;
  margin: 0 auto;
  min-width: 1000px;
  width: 100%;
  max-width: 100%;
`;
