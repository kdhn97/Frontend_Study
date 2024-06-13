import styled, { css } from 'styled-components';

const StyledButton = styled.button`
    border: none;
    padding: 0;
    background: transparent;
    color: ${props => props.color || '#09c'};
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
    ${props => props.important &&
        css`
            color: red;
            &:hover {
                background: red;
                color: white;
            }
        `
    }
    `
;

export default StyledButton;