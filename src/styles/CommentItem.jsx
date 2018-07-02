import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
	from {
    opacity: 0;
    transform: translateX(50px);
	}
	to {
    opacity: 1;
    transform: translateX(0px);
	}
`;

export const TextToggle = styled.div`
  display: ${(props) => props.visible ? null : 'none'};
  padding-top: 10px;
  .text a{
      text-decoration: underline;
  }
`;

export const ToggleMeta = styled.span`
		&:hover {
		cursor: pointer;
		}
`;

const StyledComment = styled.div`
  padding-left: 30px;
  padding-right: 10px;
	padding-bottom: 10px;

  animation-name: ${fadeIn};
  animation-duration: 500ms;
  animation-timing-function: ease;

`;

export default StyledComment;
