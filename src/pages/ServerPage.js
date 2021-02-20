import React, { useEffect } from 'react';
import styled from 'styled-components';
// router
import { withRouter } from "react-router-dom";
// components
import { SideBar, Server } from "../components";
// hooks
import useWindowSize from "../hooks/useWindowSize";
// recoil
import { useRecoilState } from "recoil";
import { AllServerState } from "../states/atom";
// api
import { getApi } from "../lib/api";



export default withRouter(({history}) => {
    const size = useWindowSize();
    const [allServers, setAllServers] = useRecoilState(AllServerState);

    useEffect(async ()=>{
        const header = {
            "Authorization": "Bearer "+localStorage.getItem("token")
        };
        const response = await getApi.getAllServer(header);
        setAllServers(response);
    }, [])

    const handleDBClick = async () => {
        const header = {
            "Authorization": "Bearer "+localStorage.getItem("token")
        };
        const response = await getApi.getAllDBServer(header);
        setAllServers(response);
    }

    return(
        <Wrap>
            <SideBar history={history}/>
            <InnerWrap width={size.width}>
                <ListWrap>
                    {allServers.map((item, idx)=>{
                        return <Server
                                    key={idx}
                                    history={history}
                                    data={item}
                                />
                    })}
                </ListWrap>
                <BtnWrap>
                    <Btn onClick={()=>history.push('/server/add')}>서버 만들기</Btn>
                    <Btn onClick={handleDBClick}>DB 불러오기</Btn>
                </BtnWrap>
            </InnerWrap>
        </Wrap>
    )
})

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

const ListWrap = styled.div`
    width: 70rem;
    height: 40rem;
    margin-top: 5rem;
    border: solid 0.1rem black;
    overflow: scroll;
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
    margin-left: 2rem;
    font-size: 1.8rem;
`;