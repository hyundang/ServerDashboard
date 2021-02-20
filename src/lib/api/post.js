import axios from 'axios';

const baseURL = 'https://localhost:4001';

const userLogin = async (body) => {
    try {
        const {data} = await axios({
            baseURL,
            url: "/api/User/login",
            method: 'post',
            data: body,
        });
    console.log("[SUCCESS] USER LOGIN", data);
    return {
        data: data,
        success: true,
    };
    } catch (e) {
        console.error("[FAIL] USER LOGIN", e);
        return {
            data: e,
            success: false,
        };
    }
};

const createServer = async (headers, body) => {
    try {
        const {data} = await axios({
            baseURL,
            url: "/api/Server/add",
            method: 'post',
            headers,
            data: body,
        });
    console.log("[SUCCESS] CREATE SERVER", data);
    return {
        data: data,
        success: true,
    };
    } catch (e) {
        console.error("[FAIL] CREATE SERVER", e);
        return {
            data: e,
            success: false,
        };
    }
};

const postApi = {
    userLogin,
    createServer,
  };
  
  export default postApi;