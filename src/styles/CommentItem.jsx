import styled from 'styled-components';

export const TextToggle = styled.div`
  display: ${props => (props.visible ? null : 'none')};
  padding-top: 10px;
  .text a {
    text-decoration: underline;
	overflow-wrap: break-word;
  }
`;

export const ToggleMeta = styled.span`
  &:hover {
    cursor: pointer;
  }
`;
