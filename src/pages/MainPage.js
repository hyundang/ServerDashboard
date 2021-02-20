import React from 'react';
import styled from 'styled-components';
// router
import { withRouter } from "react-router-dom";
// components
import { SideBar } from "../components";


export default withRouter(({history}) => {
    return(
        <Wrap>
            <SideBar history={history}/>
        </Wrap>
    )
})

const Wrap = styled.div`
    width: 100vw;
    height: 100vh;
    min-width: 100rem;
`;
