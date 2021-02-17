import axios from 'axios';

const baseURL = 'https://local:4001';

const userLogin = async (headers, body) => {
    try {
        const {data} = await axios({
            baseURL,
            url: "/api/User/login",
            method: 'post',
            headers,
            data: body,
        });
    console.log("[SUCCESS] USER LOGIN", data);
    return data;
    } catch (e) {
        console.error("[FAIL] USER LOGIN", e);
        return e;
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
    return data;
    } catch (e) {
        console.error("[FAIL] CREATE SERVER", e);
        return e;
    }
};

const postApi = {
    userLogin,
    createServer,
  };
  
  export default postApi;