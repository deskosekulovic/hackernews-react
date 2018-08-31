import styled from 'styled-components';

export const Title = styled.div`
  font-size: ${(props) => props.theme.titleFontSize};
	@media (max-width: 800px) {
		font-size: 16px;
	}
	@media (max-width: 600px) {
		font-size: 14px;
	}
`;
