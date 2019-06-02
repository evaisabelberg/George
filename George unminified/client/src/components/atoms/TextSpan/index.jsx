import styled from 'styled-components';
import colors from '../../../constants/colors';

const TextSpan = styled.span`
    display: block;
    font-family: sans-serif;
    letter-spacing: 0.07em;
    color: ${props => props.error ? colors.error : colors.text};
    font-weight: ${props => props.bold ? 700 : 400};
    ${props => props.status && `
        color: ${colors.title};
    `};
    ${props => props.name && `
        color: ${colors.text};
    `};
`;

export default TextSpan;
