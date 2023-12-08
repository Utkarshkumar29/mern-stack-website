import styled from "styled-components";

export const MinePLacesWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

export const PlacesCard = styled.div`
  display: flex;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const PlaceImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
`;

export const PlaceDescription = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;

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

export const Title = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
`;

export const Description = styled.p`
  color: #555;
`;

export const Price = styled.p`
  font-weight: bold;
  color: #ff5a5f;
`;
