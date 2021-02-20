import React from 'react';
import styled from 'styled-components';
// recoil
import { useSetRecoilState } from "recoil";
import { ServerIDState } from "../states/atom";


export default ({history, data}) => {
    const setServerID = useSetRecoilState(ServerIDState);

    const handleClick = () => {
        setServerID(data.id);
        setTimeout(()=>{
            history.push(`/server/${data.id}`);
        },100)
    }
    
    return(
        <Wrap onClick={handleClick}>
            <Text>SERVER ID: {data.id}</Text>
            <Text>SERVER 이름: {data.name}</Text>
        </Wrap>
    )
}

const Wrap = styled.div`
    box-sizing: border-box;
    width: 68rem;
    height: 8rem;
    padding: 2rem 4rem;
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
`;