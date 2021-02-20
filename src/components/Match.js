import React from 'react';
import styled from 'styled-components';
// recoil
import { useSetRecoilState } from "recoil";
import { MatchIdxState } from "../states/atom";


export default ({history, data, matchIndex}) => {
    const setMatchIdx = useSetRecoilState(MatchIdxState);

    const handleClick = () => {
        setMatchIdx(matchIndex);
        setTimeout(()=>{
            history.push(`/match/${data.matchID}`);
        },100)
    }
    
    return(
        <Wrap onClick={handleClick}>
            <Text>ID: {data.matchID}</Text>
            <Text>이름: {data.name}</Text>
            <div style={{display:'flex', flexDirection:'row'}}>
                <Text>최대 접속 유저 수: {data.maxPlayers}</Text>
                <Text>현재 접속 유저 수: {data.currentPlayersCount}</Text>
            </div>
            <div style={{display:'flex', flexDirection:'row'}}>
                <Text>시작 여부: {data.hasStarted? "시작 됨" : "시작되지 않음"}</Text>
                <Text>접속 가능 여부: {data.canJoin? "가능" : "불가능"}</Text>
            </div>
        </Wrap>
    )
}

const Wrap = styled.div`
    box-sizing: border-box;
    width: 68rem;
    height: 13rem;
    padding: 2rem 2rem;
    border: solid 0.1rem black;
    display: flex;
    flex-direction: column;
    &:hover{
        background-color:rgba(0,0,0,0.2);
    }
`;

const Text = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    margin-left: 3rem;
`;