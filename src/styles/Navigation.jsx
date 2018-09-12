import styled from 'styled-components';

const Header = styled.div`
    color: ${(props) => props.theme.primaryColor};
    background-color: ${(props) => props.theme.backgrounHeader};
    padding: 0.5%;
    a{
      text-decoration: none;
      color: ${(props) => props.theme.primaryColor};
    }
    .selected{
      color: white;
    }
    @media (max-width: 800px) {
			font-size: 16px;
      padding: 1%;
		}
`;

export default Header;
