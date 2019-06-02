import styled from 'styled-components';
import colors from '../../../constants/colors';
import Text from '../Text';

const ListItem = styled.li`
    display: ${props => props.flexbox ? 'flex' : 'block'};
    flex-direction: ${props => props.row ? 'row' : 'column'};
    font-size: 1em;
    font-family: sans-serif;
    letter-spacing: 0.1em;
    width: 100%;
    cursor: ${props => props.className === 'device' ? 'pointer' : ''};
    padding-top: 0.8em;
    padding-bottom: 0.8em;
    background: ${colors.veryDarkgrey};
    color: ${colors.darkgrey};
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
    > ${Text} {
        width: 33%;
    }
`;

export default ListItem;
