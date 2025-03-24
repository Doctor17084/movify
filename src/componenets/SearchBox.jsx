// SearchBox.js
import styled from "styled-components";

// styled-components ელემენტი
const SearchBox = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 40px;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  background: #111111;
  border-radius: 10px;
  color: #ffffff;
  font-family: "BPG Nino Mtavruli";
  border: none;
  padding: 0 33px;
  font-weight: 400;
  font-size: 15px;
  line-height: 29px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
  }

  
`;

export default SearchBox;
