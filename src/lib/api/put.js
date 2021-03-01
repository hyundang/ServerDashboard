import axios from 'axios';

const baseURL = 'https://localhost:4001';

const renameServer = async (headers, params, id) => {
    try {
        const {data} = await axios({
            baseURL,
            url: `/api/Server/rename/${id}`,
            params: params,
            method: 'put',
            headers,
        });
    console.log("[SUCCESS] RENAME SERVER", data);
    return data;
    } catch (e) {
        console.error("[FAIL] RENAME SERVER", e);
        return e;
    }
};

const putApi = {
    renameServer,
  };
  
  export default putApi;