import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
	from {
    opacity: 0;
    transform: translateX(50px);
	}
	to {
    opacity: 1;
    transform: translateX(0px);
	}
`;

const ComponentAnimation = styled.div`
  padding-left: 30px;
  padding-right: 10px;
  padding-bottom: 30px;

  animation-name: ${slideIn};
  animation-duration: 500ms;
  animation-timing-function: ease;
`;

export default ComponentAnimation;
