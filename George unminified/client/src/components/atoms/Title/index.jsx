import styled from 'styled-components';
import colors from '../../../constants/colors';

const Title = styled.h2`
  display: ${props => props.invisible ? 'none' : 'block'};
  font-size: 1em;
  font-weight: 300;
  text-transform: ${props => props.room ? 'uppercase' : 'initial'};
  font-family: sans-serif;
  letter-spacing: 0.05em;
  width: 100%;
  cursor: ${props => props.collapsible ? 'pointer' : ''};
  padding: 0.8em;
  background: none;
  color: ${colors.title};
`;

export default Title;
