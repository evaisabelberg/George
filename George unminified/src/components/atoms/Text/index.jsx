import styled from 'styled-components';
import colors from '../../../constants/colors';

const Text = styled.p`
    font-family: sans-serif;
    letter-spacing: 0.07em;
    color: ${props => props.error ? colors.error : colors.text};
    ${props => props.error && `
        padding-left: 1em;
        padding-right: 1em;
    `};
    font-weight: ${props => props.bold ? 700 : 400};
    ${props => props.status && `
        color: ${colors.text};
    `};
    ${props => props.name && `
        color: ${colors.text};
    `};
    ${props => props.nameText && `
        color: rgba(0,0,0,0.5);
        text-transform: capitalize;
        width: 100%;
        padding: 1em;
    `};
    ${props => props.prominent && `
        color: rgba(0,0,0,0.85);
    `};
`;

export default Text;
