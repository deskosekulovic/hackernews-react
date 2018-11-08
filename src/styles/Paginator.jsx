import styled from 'styled-components';

const StyledPaginator = styled.div`
  padding-left: 20px;
  margin-bottom: 30px;
  a {
    color: ${props => props.theme.primaryColor};
    text-decoration: none;
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;

export default StyledPaginator;
