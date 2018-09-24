import styled from 'styled-components';

export const Title = styled.div`
    font-size: ${(props) => props.theme.titleFontSize};
    a {
      color: ${(props) => props.theme.primaryColor};
    }
    span {
      color: ${(props) => props.theme.linkColor};
    }
`;

export const Data = styled.div`
    a {
      color: ${(props) => props.theme.linkColor};
    }
    span {
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
