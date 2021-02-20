import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// router
import { withRouter } from "react-router-dom";
// components
import { SideBar } from "../components";
// hooks
import useWindowSize from "../hooks/useWindowSize";
import useInput from "../hooks/useInput";
// recoil
import { useRecoilValue } from "recoil";
import { ServerIDState } from "../states/atom";
// api
import { putApi, deleteApi, getApi } from "../lib/api";


export default withRouter(({history}) => {
    const size = useWindowSize();
    const name = useInput("");

    const ServerID = useRecoilValue(ServerIDState);
    
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
   

    useEffect(async() => {
        const header = {
            "Authorization": "Bearer "+localStorage.getItem("token")
        };
        const response = await getApi.getServer(header, ServerID);
        setData(response);
        setTimeout(()=>{
            setIsLoading(false);
        },100)
    }, [])

    const handleOffClick = async() => {
        const header = {
            "Authorization": "Bearer "+localStorage.getItem("token")
        };
        const body = {
            ipAddress: data.ipAddress,
            desktopPort: data.desktopPort,
            websocketPort: data.websocketPort
        }
        await deleteApi.turnoffServer(header, body);
        history.push('/server');
    }

    const handleDelClick = async () => {
        const header = {
            "Authorization": "Bearer "+localStorage.getItem("token")
        };
        const body = {
            ipAddress: data.ipAddress,
            desktopPort: data.desktopPort,
            websocketPort: data.websocketPort
        }
        await deleteApi.unregisterServer(header, body);
        history.push('/server');
    }

    const handleEditClick = async () => {
        const header = {
            "Authorization": "Bearer "+localStorage.getItem("token")
        };
        const body = {
            name: name.value
        }
        await putApi.renameServer(header, body, ServerID);
        history.push('/server')
    }

    return(
        <Wrap>
            <SideBar history={history}/>
            <InnerWrap width={size.width}>
                <InputListWrap>
                    {isLoading? <>로딩중</> : (
                    <>
                        <Text text={"Server ID"} data={data.id}/>
                        <Input text={"Server 이름"} input={name} data={data.name}/>
                        <Text text={"최대 match 수"} data={data.maxMatches}/>
                        <Text text={"ip 주소"} data={data.ipPortInfo.ipAddress}/>
                        <Text text={"desktop 포트번호"} data={data.ipPortInfo.desktopPort}/>
                        <Text text={"websocket 포트번호"} data={data.ipPortInfo.websocketPort}/>
                        <Text text={"state"} data={data.state}/>
                    </>)}
                </InputListWrap>
                <BtnWrap>
                    <Btn onClick={handleOffClick}>서버 끄기</Btn>
                    <Btn onClick={handleDelClick}>서버 삭제하기</Btn>
                    <Btn onClick={handleEditClick}>이름 변경하기</Btn>
                </BtnWrap>
            </InnerWrap>
        </Wrap>
    )
})

const Input = ({text, input, data}) => {
    return(
        <InputWrap>
            <div style={{fontSize:'1.3rem', fontWeight:'bold'}}>{text}</div>
            <InputBox
                value={input.value}
                onChange={input.onChange}
                type="text"
                placeholder={data}
            />
        </InputWrap>
    )
}

const Text = ({text, data}) => {
    return(
        <InputWrap>
            <div style={{fontSize:'1.3rem', fontWeight:'bold'}}>{text}</div>
            <div style={{fontSize:'1.3rem', fontWeight:'bold', marginLeft:'3rem'}}>{data}</div>
        </InputWrap>
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

const InputListWrap = styled.div`
    width: 70rem;
    height: 40rem;
    margin-top: 5rem;
    border: solid 0.1rem black;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const InputWrap = styled.div`
    width: 55rem;
    height: 2rem;
    margin-left: 5rem; 
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const InputBox = styled.input`
    width: 30rem;
    height: 2rem;
    padding: 0 1rem;
    margin-left: 3rem;
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