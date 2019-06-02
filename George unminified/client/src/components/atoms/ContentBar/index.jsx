import styled from 'styled-components';
import colors from '../../../constants/colors';
import Title from '../Title';
import Text from '../Text';

const ContentBar = styled.section`
  background: ${colors.blue};
  padding: 0.6em;
  width: 100%;
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  text-align: center;
  align-items: center;
  > ${Title} {
      width: 100%;
      background: none;
      font-weight: 500;
      text-transform: uppercase;
  }
  > ${Text} {
      width: 100%;
  }
`;

export default ContentBar;
