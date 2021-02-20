import axios from "axios";

const baseURL = "https://localhost:4001";
// const baseURL = "https://battlecampusmatchserver.azurewebsites.net";

const getAllServer = async (headers) => {
    try {
        const {data} = await axios({
            baseURL,
            url: "/api/Server/all",
            method: 'get',
            headers,
        });
    console.log("[SUCCESS] GET ALL SERVERS", data);
    return data;
    } catch (e) {
        console.error("[FAIL] GET ALL SERVERS", e);
        return e;
    }
};

const getAllDBServer = async (headers) => {
    try {
        const {data} = await axios({
            baseURL,
            url: "/api/Server/all/db",
            method: 'get',
            headers,
        });
    console.log("[SUCCESS] GET ALL DB SERVERS", data);
    return data;
    } catch (e) {
        console.error("[FAIL] GET ALL DB SERVERS", e);
        return e;
    }
};


const getServer = async (headers, id) => {
    try {
        const {data} = await axios({
            baseURL,
            url: `/api/Server/${id}`,
            method: 'get',
            headers,
        });
    console.log("[SUCCESS] GET SERVER", data);
    return data;
    } catch (e) {
        console.error("[FAIL] GET SERVER", e);
        return e;
    }
};

const getAllMatch = async (headers) => {
    try {
        const {data} = await axios({
            baseURL,
            url: "/api/Matches",
            method: 'get',
            headers,
        });
    console.log("[SUCCESS] GET MATCHES", data);
    return data;
    } catch (e) {
        console.error("[FAIL] GET MATCHES", e);
        return e;
    }
};

const getApi = {
    getAllDBServer,
    getAllServer,
    getServer,
    getAllMatch,
};

export default getApi;