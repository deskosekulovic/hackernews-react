import styled from 'styled-components';

export const Title = styled.div`
    font-size: 18px;
    @media (max-width: 800px) {
			font-size: 16px;
		}
		@media (max-width: 600px) {
			font-size: 14px;
		}
    a {
      color: #000;
    }
`;

export const Data = styled.div`
    a {
      color: #666;
    }
`;

const StyledItem = styled.li`
  padding: 10px;
  color: #666;
  a {
      text-decoration: none;
      &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;

export default StyledItem;
