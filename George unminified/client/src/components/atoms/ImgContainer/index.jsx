import styled from 'styled-components';
import colors from '../../../constants/colors';
import MoveHandle from '../../../constants/MoveHandle.svg';

const ImgContainer = styled.div`
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

export default ImgContainer;
