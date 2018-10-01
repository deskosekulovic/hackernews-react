import styled from 'styled-components';

const Header = styled.div`
  color: ${props => props.theme.primaryColor};
  background-color: ${props => props.theme.backgrounHeader};
  font-size: 16px;
  padding: 1%;
  a {
    text-decoration: none;
    color: ${props => props.theme.primaryColor};
  }
  .selected {
    color: white;
  }
  @media (min-width: 960px) {
    padding: 0.5%;
  }
`;

export default Header;
