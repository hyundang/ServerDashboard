import React from 'react';
import styled from 'styled-components';
// router
import { withRouter } from "react-router-dom";
// components
import { SideBar } from "../components";
// hooks
import useWindowSize from "../hooks/useWindowSize";
import useInput from "../hooks/useInput";
// api
import { postApi } from "../lib/api";


export default withRouter(({history}) => {
    const size = useWindowSize();
    // inputs
    const id = useInput("");
    const name = useInput("");
    const maxMatch = useInput(10);
    const ip = useInput("");
    const dport = useInput(7777);
    const wport = useInput(7778);
    const state = useInput(0);
    const inputs = [
        {text:"Server ID", input:id},
        {text:"Server 이름", input:name},
        {text:"최대 match 수", input:maxMatch},
        {text:"ip 주소", input:ip},
        {text:"desktop 포트번호", input:dport},
        {text:"websocket 포트번호", input:wport},
        {text:"state", input:state}
    ]

    const handleBtnClick = async () => {
        const header = {
            "Authorization": "Bearer "+localStorage.getItem("token")
        };
        const data = {
            id: id.value,
            name: name.value,
            maxMatches: maxMatch.value,
            ipPortInfo:{
                ipAddress: ip.value,
                desktopPort: dport.value,
                websocketPort: wport.value
            },
            state: state.value
        }
        const response = await postApi.createServer(header, data);
        if(response.success === true){
            history.push('/server');
        }
        else{
            alert('fail!');
        }
    }
    
    return(
        <Wrap>
            <SideBar history={history}/>
            <InnerWrap width={size.width}>
                <InputListWrap>
                    {inputs.map((item, idx)=>{
                        return <Input
                                    key={idx}
                                    text={item.text}
                                    input={item.input}
                                />
                    })}
                </InputListWrap>
                <BtnWrap>
                    <Btn onClick={handleBtnClick}>생성하기</Btn>
                </BtnWrap>
            </InnerWrap>
        </Wrap>
    )
})

const Input = ({text, input}) => {
    return(
        <InputWrap>
            <div style={{fontSize:'1.3rem', fontWeight:'bold'}}>{text}</div>
            <InputBox
                value={input.value}
                onChange={input.onChange}
                type="text"
            />
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