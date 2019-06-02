import styled from 'styled-components';
import colors from '../../../constants/colors';

const TextInput = styled.input`
  background: ${colors.veryLightgrey};
  border: none;
  padding: 0.6em;
  box-shadow: inset rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.12) 0px 1px 1px;
  text-align: center;
`;

export default TextInput;
