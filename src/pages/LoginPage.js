import React from 'react';
import styled from 'styled-components';
// hooks
import  useInput  from "../hooks/useInput";
// api
import { postApi } from "../lib/api";


export default () => {
    // input값
    const id = useInput("");
    const pass = useInput("");

    const handleBtnClick = async () => {
        const data = {
            id: id.value,
            password: pass.value
        }
        const response = await postApi.userLogin(data);
        if(response.success === true){
            localStorage.setItem("isLogin", true);
            localStorage.setItem("token", response.data.token);
            window.open(window.location.href, '_self');
        }
        else{
            localStorage.setItem("isLogin", false);
        }
        
    }

    return(
        <Wrap>
            <InputWrap>
                <Text>ID</Text>
                <InputBox 
                    value={id.value} 
                    onChange={id.onChange} 
                    type="text"
                />
                <Text>PASSWORD</Text>
                <InputBox
                    value={pass.value} 
                    onChange={pass.onChange} 
                    type="text"
                />
                <Btn onClick={handleBtnClick}>login</Btn>
            </InputWrap> 
        </Wrap>
    )
}

const Wrap = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.2);
`;

const InputWrap = styled.div`
    width: 30rem;
    height: 20rem;
    display: flex;
    flex-direction: column;
`;

const Text = styled.div`
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 1rem;
`;

const InputBox = styled.input`
    box-sizing: border-box;
    width: 30rem;
    height: 3rem;
    padding: 0 1rem;
    margin-bottom: 2rem;
`;

const Btn = styled.button`
    cursor: pointer;
    width: 4rem;
    height: 3rem;
    margin-left: 26rem;
`;