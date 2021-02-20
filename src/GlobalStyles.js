import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export default createGlobalStyle`
    ${reset}
    html{
        font-size: 10px;
        box-sizing: border-box;
    }
`;
