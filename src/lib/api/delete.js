import axios from "axios";

const baseURL = "https://localhost:4001";

const turnoffServer = async (headers, body) => {
    try {
        const {data} = await axios({
            baseURL,
            url: "/api/Server/turnoff",
            method: 'delete',
            headers,
            data: body,
        });
    console.log("[SUCCESS] TURN OFF SERVER", data);
    return data;
    } catch (e) {
        console.error("[FAIL] TURN OFF SERVER", e);
        return e;
    }
};


const unregisterServer = async (headers, body) => {
    try {
        const {data} = await axios({
            baseURL,
            url: "/api/Server/unregister",
            method: 'delete',
            headers,
            data: body,
        });
    console.log("[SUCCESS] UNREGISTER SERVER", data);
    return data;
    } catch (e) {
        console.error("[FAIL] UNREGISTER SERVER", e);
        return e;
    }
};

const deleteMatch = async (headers, body) => {
    try {
        const {data} = await axios({
            baseURL,
            url: "/api/Matches/delete",
            method: 'delete',
            headers,
            data: body,
        });
    console.log("[SUCCESS] DELETE MATCH", data);
    return data;
    } catch (e) {
        console.error("[FAIL] DELETE MATCH", e);
        return e;
    }
};


const deleteApi = {
    turnoffServer,
    unregisterServer,
    deleteMatch,
};

export default deleteApi;