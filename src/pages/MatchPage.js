import React, { useEffect } from 'react';
import styled from 'styled-components';
// router
import { withRouter } from "react-router-dom";
// components
import { SideBar, Match } from "../components";
// hooks
import useWindowSize from "../hooks/useWindowSize";
// recoil
import { useRecoilState } from "recoil";
import { AllMatchState } from "../states/atom";
// api
import { getApi } from "../lib/api";



export default withRouter(({history}) => {
    const size = useWindowSize();
    const [allMatches, setAllMatches] = useRecoilState(AllMatchState);
    // const Matchesdata = [
    //     {
    //         name: "string",
    //         matchID: "string",
    //         ipPortInfo: {
    //           ipAddress: "string",
    //           desktopPort: 0,
    //           websocketPort: 0
    //         },
    //         maxPlayers: 0,
    //         hasStarted: true,
    //         createdDate: "2021-02-20T10:31:50.602Z",
    //         players: [
    //           {
    //             id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //             connectionID: 0,
    //             studentID: "string",
    //             name:"string",
    //             isHost: true,
    //             createdTime: "2021-02-20T10:31:50.602Z",
    //             matchID: "string"
    //           }
    //         ],
    //         currentPlayersCount: 0,
    //         canJoin: true
    //       }
    // ]

    useEffect(async ()=>{
        const header = {
            "Authorization": "Bearer "+localStorage.getItem("token")
        };
        const response = await getApi.getAllMatch(header);
        setAllMatches(response);
        // setAllMatches(Matchesdata);
    }, [])

    return(
        <Wrap>
            <SideBar history={history}/>
            <InnerWrap width={size.width}>
                <ListWrap>
                    {allMatches.map((item, idx)=>{
                        return <Match
                                    key={idx}
                                    matchIndex={idx}
                                    history={history}
                                    data={item}
                                />
                    })}
                </ListWrap>
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