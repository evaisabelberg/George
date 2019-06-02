import styled from 'styled-components';
import Text from '../Text';

const FlexBox = styled.section`
  display: flex;
  background: none;
  width: ${props => props.row ? '' : '100%'};
  flex-direction: ${props => props.row ? 'row' : 'column'};
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: ${props => props.row ? 'center' : 'flex-start'};
  text-align: center;
  min-width: 400px;
  padding-top: ${props => props.className === 'device' || props.className === 'userSet' ? '0.9em' : 0};
  padding-bottom: ${props => props.className === 'userSet' ? '1em' : 0};
  box-shadow: ${props => props.className === 'device' ? 'rgba(0, 0, 0, 0.12) 0px 1px 4px' : 'none'};
  > ${Text} {
      width: 30%;
      word-break: break-all;
  }
`;

export default FlexBox;
