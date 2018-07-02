import styled from 'styled-components';

const StyledApp = styled.div`
  width: 90%;
  max-width: 1280px;
  margin: 0px auto;
  color: #000;
  background-color: #f5f5f5;
  font-size: 14px;
  font-family: Verdana, Geneva, sans-serif;
  @media (max-width:800px) {
    width: 100%;
    font-size: 12px;
  }
`;

export default StyledApp;
