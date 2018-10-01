import styled from 'styled-components';

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px auto;
  color: ${props => props.theme.primaryColor};
  background-color: ${props => props.theme.backgroundColor};
  font-size: ${props => props.theme.fontSize};
  @media (min-width: 960px) {
    width: 90%;
    max-width: 1280px;
  }
`;

export default StyledApp;
