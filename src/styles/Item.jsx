import styled from 'styled-components';

export const Title = styled.div`
    font-size: ${(props) => props.theme.titleFontSize};
    @media (max-width: 800px) {
			font-size: 16px;
		}
		@media (max-width: 600px) {
			font-size: 14px;
		}
    a {
      color: ${(props) => props.theme.primaryColor};
    }
`;

export const Data = styled.div`
    a {
      color: ${(props) => props.theme.linkColor};
    }
`;

const StyledItem = styled.li`
  padding: 10px;
  a {
      text-decoration: none;
      &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;

export default StyledItem;
