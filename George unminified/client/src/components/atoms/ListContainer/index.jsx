import ListItem from '@material-ui/core/ListItem';
import styled from 'styled-components';

const ListContainer = styled.ul`
  width: 100%;
  padding-top: 1em;
  padding-bottom: 1em;
  > ${ListItem} p {
      width: 100%;
      background: none;
      text-align: left;
      word-break: break-word;
  }
`;

export default ListContainer;
