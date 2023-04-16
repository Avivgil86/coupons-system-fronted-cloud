import tokenAxios from "./TokenAxios";
import { CustomerModel } from "../Models/CustomerModel";
import { CouponModel } from "../Models/CouponModel";
import config from "./Config";
import { AxiosResponse } from "axios";

class CustomerApi {
    private customerUrl = config.urls.customer;


    public parschaseCoupon(coupon: CouponModel): Promise<AxiosResponse<any>> {
        return tokenAxios.post<any>(this.customerUrl + "purchase", coupon)
    }

    public getCouponsByPrice(price: number): Promise<AxiosResponse<CouponModel[]>> {
        return tokenAxios.get<CouponModel[]>(this.customerUrl + "coupon/price?price=" + price)
    }
    public getCouponsByCategory(category: string): Promise<AxiosResponse<CouponModel[]>> {
        return tokenAxios.get<CouponModel[]>(this.customerUrl + "coupons/category?category=" + category)
    }

    public getAllCoupons(): Promise<AxiosResponse<CouponModel[]>> {
        return tokenAxios.get<CouponModel[]>(this.customerUrl + "all-coupons")
    }

    public getAllCustomerCoupons(): Promise<AxiosResponse<CouponModel[]>> {
        return tokenAxios.get<CouponModel[]>(this.customerUrl + "coupons")
    }

    public getCustomerDetails(): Promise<AxiosResponse<CustomerModel>> {
        return tokenAxios.get<CustomerModel>(this.customerUrl + "details")
    }
}
const customerApi = new CustomerApi();
export default customerApi;