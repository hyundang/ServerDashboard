import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// router
import { withRouter } from "react-router-dom";
// components
import { SideBar } from "../components";
// hooks
import useWindowSize from "../hooks/useWindowSize";
// recoil
import { useRecoilValue } from "recoil";
import { AllMatchState, MatchIdxState } from "../states/atom";
// api
import { deleteApi, getApi } from "../lib/api";


export default withRouter(({history}) => {
    const size = useWindowSize();

    const matchIndex = useRecoilValue(MatchIdxState);
    const allMatches = useRecoilValue(AllMatchState);
    
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
   

    useEffect(async() => {
        setData(allMatches[matchIndex]);
        setTimeout(()=>{
            setIsLoading(false);
        }, 100)
    }, [])

    const handleDelClick = async () => {
        const header = {
            "Authorization": "Bearer "+localStorage.getItem("token")
        };
        const body = {
            ipPortInfo:{
                ipAddress: data.ipPortInfo.ipAddress,
                desktopPort: data.ipPortInfo.desktopPort,
                websocketPort: data.ipPortInfo.websocketPort
            },
            matchID: data.matchID
        }
        await deleteApi.deleteMatch(header, body);
        history.push('/server');
    }

    return(
        <Wrap>
            <SideBar history={history}/>
            <InnerWrap width={size.width}>
                <InfoWrap>
                    {isLoading? <>로딩중</> : (
                    <>
                        <Text text={"Match ID"} data={data.matchID}/>
                        <Text text={"Match 이름"} data={data.name}/>
                        <Text text={"ip 주소"} data={data.ipPortInfo.ipAddress}/>
                        <Text text={"desktop 포트번호"} data={data.ipPortInfo.desktopPort}/>
                        <Text text={"websocket 포트번호"} data={data.ipPortInfo.websocketPort}/>
                        <div style={{marginTop:'2.5rem', marginLeft:'3rem', fontWeight:'bold', fontSize:'1.5rem'}}>플레이어 목록</div>
                        <PlayerListWrap>
                            {data.players.map((item, idx)=>{
                                return  <Player
                                            key={idx}
                                            data={item}    
                                        />
                            })}
                        </PlayerListWrap>
                    </>)}
                </InfoWrap>
                <BtnWrap>
                    <Btn onClick={handleDelClick}>삭제하기</Btn>
                </BtnWrap>
            </InnerWrap>
        </Wrap>
    )
})


const Text = ({text, data}) => {
    return(
        <TextWrap>
            <div style={{fontSize:'1.3rem', fontWeight:'bold'}}>{text}</div>
            <div style={{fontSize:'1.3rem', fontWeight:'bold', marginLeft:'3rem'}}>{data}</div>
        </TextWrap>
    )
}

const Player = ({data}) => {
    return(
        <PlayerWrap>
            <Text text={"connectionID"} data={data.connectionID}/>
            <Text text={"ID"} data={data.id}/>
            <Text text={"학번"} data={data.studentID}/>
            <Text text={"이름"} data={data.name}/>
            <Text text={"호스트 여부"} data={data.isHost? "yes" : "no"}/>
        </PlayerWrap>
    )
}

const Wrap = styled.div`
    width: 100vw;
    height: 100vh;
    min-width: 100rem;
`;

const InnerWrap = styled.div`
    width: 100vw${props=>props.width};
    height: 100vh;
    min-height: 60rem;
    padding-left: 20rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const InfoWrap = styled.div`
    width: 70rem;
    height: 45rem;
    margin-top: 5rem;
    border: solid 0.1rem black;
    display: flex;
    flex-direction: column;
`;

const TextWrap = styled.div`
    width: 55rem;
    height: 2rem;
    margin-left: 5rem; 
    margin-top: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const PlayerListWrap = styled.div`
    width: 65rem;
    height: 28rem;
    margin-top: 1rem;
    margin-left: 2.5rem;
    border: solid 0.1rem black;
    display: flex;
    flex-direction: column;
    overflow: scroll;
`;

const PlayerWrap = styled.div`
    box-sizing: border-box;
    width: 63rem;
    height: 16rem;
    padding: 0rem 2rem;
    border: solid 0.1rem black;
    display: flex;
    flex-direction: column;
`;


const BtnWrap = styled.div`
    width: 70rem;
    height: 4rem;
    margin-top: 3rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
`;

const Btn = styled.button`
    width: 15rem;
    height: 4rem;
    margin-left: 1rem;
    font-size: 1.8rem;
`;
