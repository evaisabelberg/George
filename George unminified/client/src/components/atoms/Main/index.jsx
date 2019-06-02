import styled from 'styled-components';

const Main = styled.main`
    width: 100%;
    display: flex;
    flex-direction: ${props => props.row ? 'row' : 'column'};
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0.5em 0.5em 0.5em 0.5em;
    align-items: flex-start;
`;

export default Main;
