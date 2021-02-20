import { exp } from "prelude-ls";
import { atom } from "recoil";

export const ServerClickedState = atom({
    key: "ServerState",
    default: false
})

export const MatchClickedState = atom({
    key: "AtomState",
    default: false
})

export const AllServerState = atom({
    key: "AllServerState",
    default: []
})

export const AllMatchState = atom({
    key: "AllMatchState",
    default: []
})

export const AllPlayerState = atom({
    key: "AllPlayerState",
    default: []
})

export const ServerIDState = atom({
    key: "ServerIDState",
    default: ""
})

export const MatchIdxState = atom({
    key: "MatchIDState",
    default: ""
})