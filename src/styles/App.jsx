import styled from 'styled-components';

export const theme = {
    backgroundColor: '#f5f5f5',
    fontSize: '14px',
    titleFontSize: '18px',
    primaryColor: 'black',
    backgrounHeader: '#ff6600',
    linkColor: '#666',
    borderColor: '#ccc',
};

const StyledApp = styled.div`
  width: 90%;
  max-width: 1280px;
  margin: 0px auto;
  color: ${(props) => props.theme.primaryColor};
  background-color: ${(props) => props.theme.backgroundColor};
  font-size: ${(props) => props.theme.fontSize};
  @media (max-width:800px) {
    width: 100%;
    font-size: 12px;
  }
`;

export default StyledApp;
