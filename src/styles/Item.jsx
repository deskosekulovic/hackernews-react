import styled from 'styled-components';

export const Data = styled.div`
  font-size: ${props => props.title && props.theme.titleFontSize};
  a {
    color: ${props =>
    props.title ? props.theme.primaryColor : props.theme.linkColor};
  }
  span {
    color: ${props => props.theme.linkColor};
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
