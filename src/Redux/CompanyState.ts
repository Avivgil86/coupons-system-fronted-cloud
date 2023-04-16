import { CompanyModel } from "../Models/CompanyModel";
import { CouponModel } from "../Models/CouponModel";

// 1. products state - the data we need at global application level
export class CompanyState {
    public company: CompanyModel = {
        id: 0,
        name: "",
        email: "",
        password: ""
    };
    public coupons: CouponModel[] = [];
}

// 2. Action Types - list of actions - enum
export enum CompanyActionType {
    FetchCoupons = "FetchCoupons",
    AddCoupon = "AddCoupon",
    UpdateCoupon = "UpdateCoupon",
    DeleteCoupon = "DeleteCoupon",
    FetchCompany = "FetchCompany",
    DeleteCompany = "DeleteCompany",
}

// 3. Action - an interface describing a single command
export interface CompanyAction {
    type: CompanyActionType; // action type
    payload?: any; // action data
}

// 4. action creators - functions to create action objects
export function fetchCouponsAction(coupons: CouponModel[]): CompanyAction {
    return { type: CompanyActionType.FetchCoupons, payload: coupons };
}
export function addCouponAction(coupon: CouponModel): CompanyAction {
    return { type: CompanyActionType.AddCoupon, payload: coupon };
}
export function updateCouponAction(coupon: CouponModel): CompanyAction {
    return { type: CompanyActionType.UpdateCoupon, payload: coupon };
}
export function deleteCouponAction(couponId: number): CompanyAction {
    return { type: CompanyActionType.DeleteCoupon, payload: couponId };
}
export function fetchCompany(company: CompanyModel): CompanyAction {
    return { type: CompanyActionType.FetchCompany, payload: company };
}
export function deleteCompany(): CompanyAction {
    return { type: CompanyActionType.DeleteCompany };
}

// 5. reducer - a single function performing any of the above actions
export function companyReducer(currentState: CompanyState = new CompanyState(), action: CompanyAction): CompanyState {
    const newState = { ...currentState }; // duplicate current state

    switch (action.type) {
        case CompanyActionType.FetchCoupons: // here payload is all products
            newState.coupons = action.payload;
            break;
        case CompanyActionType.AddCoupon: // here payload is a single product to add
            newState.coupons.push(action.payload);
            break;
        case CompanyActionType.UpdateCoupon: // here payload is a single product to update
            const indexToUpdateCoupon = newState.coupons.findIndex(p => p.id === action.payload.id);
            if (indexToUpdateCoupon >= 0) {
                newState.coupons[indexToUpdateCoupon] = action.payload
            };
            break;
        case CompanyActionType.DeleteCoupon: // here payload is an id of product to delete
            const indexToDelete = newState.coupons.findIndex(p => p.id === action.payload);
            if (indexToDelete >= 0) newState.coupons.splice(indexToDelete, 1);
            break;
        case CompanyActionType.FetchCompany: // here payload is all products
            newState.company = action.payload;
            break;
        case CompanyActionType.DeleteCompany: // here payload is a single product to add
            newState.company = {
                id: 0,
                name: "",
                email: "",
                password: ""
            };
            break;
    }
    return newState;

}