import { createGlobalStyle, css } from 'styled-components';
import reset from 'styled-reset';
import type { CSS, FlexAlignment, FlexDirection, FlexWrap } from '../types/style.types';

export const GlobalStyles = createGlobalStyle`
    ${reset};

    #__next {
        min-height: 100vh;
        width: 100vw;
        overflow-x: hidden;
        display: grid;
        grid-template-areas:
            "header"
            "main"
            "footer";
        grid-template-rows: max-content 1fr max-content;
    }

    ${[`header`, `main`, `footer`].map(
      (region) => css`
        .global-${region} {
          grid-area: ${region};
          padding: 0 7.5%;
        }
      `
    )}
`;

export const theme = {
  flex: (
    jc: FlexAlignment = `center`,
    ai: FlexAlignment = `center`,
    fd: FlexDirection = `row`,
    fw: FlexWrap = `nowrap`
  ): CSS => css`
    display: flex;
    justify-content: ${jc};
    align-items: ${ai};
    flex-direction: ${fd};
    flex-wrap: ${fw};
  `,
  posCenter: css`
    display: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
};
