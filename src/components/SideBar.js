import React from 'react';
import styled from 'styled-components';
// router
import { withRouter } from "react-router-dom";
// recoil
import { useRecoilState } from "recoil";
import { ServerClickedState, MatchClickedState } from "../states/atom";
import { skyblue } from 'color-name';


export default withRouter(({history}) => {
    const [isServerClicked, setIsServerClicked] = useRecoilState(ServerClickedState);
    const [isMatchClicked, setIsMatchClicked] = useRecoilState(MatchClickedState);

    const handleMenuClick = (e) => {
        if(e.target.id === "server"){
            setIsServerClicked(true);
            setIsMatchClicked(false);
            history.push('/server');
        }
        else{
            setIsServerClicked(false);
            setIsMatchClicked(true);
            history.push('/match');
        }
    }

    const handleLogoutClick = () => {
        localStorage.setItem("isLogin", false);
        localStorage.removeItem("token");
        history.push('/');
    }
    

    return(
        <Wrap>
            <div style={{marginTop:'7rem', display:'flex', flexDirection:'column'}}>
                <MenuBtn 
                    isClicked={isServerClicked}
                    id="server"
                    onClick={handleMenuClick}
                >SERVER</MenuBtn>
                <MenuBtn 
                    isClicked={isMatchClicked}
                    id="match"
                    onClick={handleMenuClick}
                >MATCH</MenuBtn>
            </div>
            <LogoutBtn onClick={handleLogoutClick}>LOGOUT</LogoutBtn>
        </Wrap>
    )
})

const Wrap = styled.div`
    position: absolute;
    left: 0;
    width: 20rem;
    height: 100vh;
    min-height: 60rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 0 1rem 1rem rgba(0, 0, 0, 0.1);
`;

const MenuBtn = styled.div`
    cursor: pointer;
    width: 20rem;
    height: 5rem;
    border: solid 0.1rem black;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    font-weight: bold;
    background-color: ${props=>props.isClicked? 'skyblue' : 'none'};
`;

const LogoutBtn = styled.button`
    cursor: pointer;
    width: 15rem;
    height: 5rem;
    margin-bottom: 7rem;
    font-size: 1.8rem;
    font-weight: bold;
`;