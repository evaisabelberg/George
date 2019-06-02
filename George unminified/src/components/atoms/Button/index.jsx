import styled from 'styled-components';
import colors from '../../../constants/colors';
import Guest from '../../../constants/Guest.svg';
import User from '../../../constants/User.svg';
import MoveHandle from '../../../constants/MoveHandle.svg';

const Button = styled.button`
  background: ${colors.primary};
  cursor: pointer;
  padding: 0.6em;
  border-radius: 2px;
  border: none;
  ${({ toggleVertical }) => toggleVertical && `
    border: none;
    width: 100%;
  `};
  :visited {
      outline: none;
  };
  :focus {
      outline: none;
  }
  ${props => props.guest && `
      background-image: url(${Guest});
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center center;
      width: 30px;
      height: 30px;
      padding: 0;
  `};
  ${props => props.settings && `
      background-image: url(${User});
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center center;
      width: 30px;
      height: 30px;
      padding: 0;
  `};
  ${props => props.moveHandle && `
      background-image: url(${MoveHandle});
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center center;
      width: 24px;
      height: 24px;
      padding: 0;
      margin-right: 1em;
      cursor: grab;
  `};
`;

export default Button;
