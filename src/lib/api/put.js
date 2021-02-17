import axios from 'axios';

const baseURL = 'https://local:4001';

const renameServer = async (headers, body, id) => {
    try {
        const {data} = await axios({
            baseURL,
            url: `/api/Server/rename/${id}`,
            method: 'put',
            headers,
            data: body,
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