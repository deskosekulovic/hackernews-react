import styled from 'styled-components';

const Header = styled.div`
    width: 99%;
    color: ${(props) => props.theme.primaryColor};
    background-color: ${(props) => props.theme.backgrounHeader};
    padding: 0.5%;
    vertical-align: middle;
    a{
      text-decoration: none;
      color: ${(props) => props.theme.primaryColor};
    }
    .selected{
      color: white;
    }
`;

export default Header;
