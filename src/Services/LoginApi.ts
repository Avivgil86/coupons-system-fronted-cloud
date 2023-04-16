import { CustomerModel } from "../Models/CustomerModel";
import { CouponModel } from "../Models/CouponModel";
import config from "./Config";
import axios, { AxiosResponse } from "axios";
import { LoginRequestModel } from "../Models/LoginRequestModel";
import { LoginResponseModel } from "../Models/LoginResponseModel";

class LoginApi {
    private loginUrl = config.urls.login;


    public login(loginRequest: LoginRequestModel): Promise<AxiosResponse<LoginResponseModel>> {
        return axios.post<LoginResponseModel>(this.loginUrl, loginRequest)
    }

}
const loginApi = new LoginApi();
export default loginApi;