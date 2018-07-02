import styled, { keyframes } from 'styled-components';

const spinner = keyframes`
to {
  transform: rotate(360deg);
}
`;

const StyledSpinner = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60px;
  height: 60px;
  margin-top: -30px;
  margin-left: -30px;
  border-radius: 50%;
  border: 8px solid lightgray;
  border-top-color: coral;
  animation: ${spinner} 0.7s linear infinite;

  ${'' /* content: "";
box-sizing: border-box;
position: absolute;
top: 50%;
left: 50%;
width: 60px;
height: 60px;
margin-top: -30px;
margin-left: -30px;
border-radius: 50%;
border: 2px solid transparent;
border-top-color: coral;
border-bottom-color: coral;
animation: ${spinner} 0.7s ease infinite; */}

${'' /* content: "";
box-sizing: border-box;
position: absolute;
top: 50%;
left: 50%;
width: 60px;
height: 60px;
margin-top: -30px;
margin-left: -30px;
border-radius: 50%;
border-top: 2px solid coral;
border-right: 2px solid transparent;
animation: ${spinner} 0.6s linear infinite; */}

`;

export default StyledSpinner;
