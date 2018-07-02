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

export const Title = styled.div`
  font-size: 18px;
	@media (max-width: 800px) {
		font-size: 16px;
	}
	@media (max-width: 600px) {
		font-size: 14px;
	}
`;

const StyledCommentMeta = styled.div`
  padding-left: 30px;
  padding-right: 10px;
  padding-bottom: 30px;

  animation-name: ${slideIn};
  animation-duration: 500ms;
  animation-timing-function: ease;
`;

export default StyledCommentMeta;
