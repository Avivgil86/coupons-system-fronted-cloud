import axios from "axios";
import store from "../Redux/store";

const tokenAxios = axios.create();
tokenAxios.interceptors.request.use((req: any) => {
    const token = store.getState().authReducer.user.token;
    req.headers = { "authorization": token }
    return req;
})

export default tokenAxios;