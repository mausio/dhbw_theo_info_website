import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        //margin: 0;
        //padding: 0;
        border: 0;
        //font-size: 100%;
        //font: inherit;
        vertical-align: baseline;
        font-family: Helvetica, Arial, sans-serif
    }


    :root {
        --black: #000;
        --primary: #2b2b2b;
        --secondary: #808080;
        --tertiary: #5b6971;
        --quarternary: #ffffff;

        --accent: #e2001a;
        --contrastAccent: #39576f;
    }

    h1, h2, h3, h4, h5, h6, p, button {
        color: var(--black);
    }

    body {
        background-color: var(--primary);
    }

    .text-updater-node {
        height: 50px;
        border: 1px solid #eee;
        padding: 5px;
        border-radius: 5px;
        background: white;
    }

    .text-updater-node label {
        display: block;
        color: #777;
        font-size: 12px;
    }

    .react-flow__attribution {
        display: none !important;
    }
    
`;
