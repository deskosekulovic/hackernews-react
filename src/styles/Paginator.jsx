import styled from 'styled-components';

const StyledPaginator = styled.div`
  padding: 10px;
  a {
      color: #000;
      text-decoration: none;
      &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;

export default StyledPaginator;
