import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const PlaceForm = styled.form`
  display: flex;
  flex-direction: column;
  min-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  h2 {
    margin-bottom: 10px;
    font-size: 1.5rem;
  }

  p {
    margin-bottom: 10px;
    color: #555;
  }

  input,
  textarea,
  select {
    width: 98%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  textarea {
    resize: vertical;
  }

  button {
    background-color: #ff5a5f;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #e04449;
    }
  }
`;

export const TitleWrapper = styled.div`
  margin-bottom: 20px;
`;

export const TitleHeading = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 5px;
`;

export const TitleDescription = styled.p`
  color: #555;
  margin-bottom: 10px;
`;

export const TitleInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const UploadFromDevice = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 1rem;
  color: #333;
  margin-top: 10px;

  input {
    display: none;
  }

  div {
    display: flex;
    align-items: center;
    margin-left: 10px;

    svg {
      margin-right: 5px;
    }
  }
`;

export const Icon = styled.svg`
  width: 24px;
  height: 24px;
  margin-right: 5px;
  position: relative;
  left: -30px;
`;

export const Trash = styled(FontAwesomeIcon)`
  position: relative;
  left: -90px;
  top: -85px;
  color: red;
  cursor: pointer;
`;

export const ImageUploadContainer = styled.div`
margin-top: 20px;
padding: 20px;

input {
  width: calc(100% - 20px);
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

.uploaded-image {
  position: relative;
  overflow: hidden;
  margin-top: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  .delete-icon,
  .like-icon {
    position: absolute;
    bottom: 10px; /* Align icons to the bottom */
    right: 10px; /* Align icons to the right */
    color: red;
    cursor: pointer;
  }

  .like-icon {
    color: ${(props) => (props.liked ? "yellow" : "white")};
  }
}

.upload-section {
  margin-top: 10px;

  input[type="file"] {
    display: none;
  }

  label {
    cursor: pointer;
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

    svg {
      margin-right: 5px;
    }
  }
}
`;