import { AxiosResponse } from "axios";
import { CompanyModel } from "../Models/CompanyModel";
import { CustomerModel } from "../Models/CustomerModel";
import config from "./Config";
import tokenAxios from "./TokenAxios";

class AdminApi {
    private adminUrl = config.urls.admin;

    public addCompany(company:CompanyModel):Promise<AxiosResponse<any>> {
        return tokenAxios.post<any>(this.adminUrl+"company", company)
    }

    public updateCompany(company:CompanyModel):Promise<AxiosResponse<any>> {
        return tokenAxios.put<any>(this.adminUrl+"company", company)
    }

    public deleteCompany(companyId:number):Promise<AxiosResponse<any>> {
        return tokenAxios.delete<any>(this.adminUrl+"company/" + companyId)
    }

    public getOneCompany(companyId:number):Promise<AxiosResponse<CompanyModel>> {
        return tokenAxios.get<CompanyModel>(this.adminUrl+"company/" + companyId)
    }

    public getAllCompanies():Promise<AxiosResponse<CompanyModel[]>> {
        return tokenAxios.get<CompanyModel[]>(this.adminUrl+"companies")
    }

    public addCustomer(customer:CustomerModel):Promise<AxiosResponse<any>> {
        return tokenAxios.post<any>(this.adminUrl+"customer", customer)
    }

    public updateCustomer(customer:CustomerModel):Promise<AxiosResponse<any>> {
        return tokenAxios.put<any>(this.adminUrl+"customer", customer)
    }

    public deleteCustomer(customerId:number):Promise<AxiosResponse<any>> {
        return tokenAxios.delete<any>(this.adminUrl+"customer/" + customerId)
    }

    public getOneCustomer(customerId:number):Promise<AxiosResponse<CustomerModel>> {
        return tokenAxios.get<CustomerModel>(this.adminUrl+"customer/" + customerId)
    }

    public getAllCustomers():Promise<AxiosResponse<CustomerModel[]>> {
        return tokenAxios.get<CustomerModel[]>(this.adminUrl+"customers")
    }
}

const adminApi = new AdminApi();
export default adminApi;