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

const StyledUser = styled.div`
	padding-left: 30px;
	padding-right: 10px;
	padding-bottom: 10px;

  animation-name: ${slideIn};
  animation-duration: 500ms;
  animation-timing-function: ease;
`;

export const UserItem = styled.div`
  margin: 10px;
`;

export default StyledUser;
