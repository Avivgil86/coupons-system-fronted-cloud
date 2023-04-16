import config from "./Config";
import tokenAxios from "./TokenAxios";
import { AxiosResponse } from "axios";
import { CompanyModel } from "../Models/CompanyModel";
import { CouponModel } from "../Models/CouponModel";


class CompanyApi {
    private companyUrl = config.urls.company;

    public addCoupon(Coupon: CouponModel): Promise<AxiosResponse<any>> {
        return tokenAxios.post<any>(this.companyUrl + "coupon", Coupon)
    }

    public updateCoupon(coupon: CouponModel): Promise<AxiosResponse<any>> {
        return tokenAxios.put<any>(this.companyUrl + "coupon", coupon)
    }

    public deleteCoupon(couponId: number): Promise<AxiosResponse<any>> {
        return tokenAxios.delete<any>(this.companyUrl + "coupon/" + couponId)
    }

    public getAllCouponByPrice(price: number): Promise<AxiosResponse<CouponModel[]>> {
        return tokenAxios.get<CouponModel[]>(this.companyUrl + "coupon/price?price=" + price)
    }

    public getAllCouponByCategory(category: string): Promise<AxiosResponse<CouponModel[]>> {
        return tokenAxios.get<CouponModel[]>(this.companyUrl + "coupon/category?category=" + category)
    }

    public getAllCoupons(): Promise<AxiosResponse<CouponModel[]>> {
        return tokenAxios.get<CouponModel[]>(this.companyUrl + "coupons")
    }

    public getCompanyDetails(): Promise<AxiosResponse<CompanyModel>> {
        return tokenAxios.get<CompanyModel>(this.companyUrl + "details")
    }
    public getOneCoupon(couponId: number): Promise<AxiosResponse<CouponModel>> {
        return tokenAxios.get<CouponModel>(this.companyUrl + "coupon/" + couponId)
    }
}

const companyApi = new CompanyApi();
export default companyApi;