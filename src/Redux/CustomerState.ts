import { CompanyModel } from "../Models/CompanyModel";
import { CouponModel } from "../Models/CouponModel";
import { CustomerModel } from "../Models/CustomerModel";

// 1. products state - the data we need at global application level
export class CustomerState {
    public myCoupons: CouponModel[] = [];
    public allCoupons: CouponModel[] = [];
    public customer: CustomerModel = {
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    };
}

// 2. Action Types - list of actions - enum
export enum CustomerActionType {
    BuyCoupon = "BuyCoupon",
    FetchMyCoupons = "FetchMyCoupons",
    FetchAllCoupons = "FetchAllCoupons",
    FetchCustomer = "FetchCustomer",
    DeleteCustomer = "DeleteCustomer"
}

// 3. Action - an interface describing a single command
export interface CustomerAction {
    type: CustomerActionType; // action type
    payload?: any; // action data
}

// 4. action creators - functions to create action objects
export function buyCouponAction(coupon: CouponModel): CustomerAction {
    return { type: CustomerActionType.BuyCoupon, payload: coupon };
}
export function fetchMyCouponsAction(coupons: CouponModel[]): CustomerAction {
    return { type: CustomerActionType.FetchMyCoupons, payload: coupons };
}
export function fetchAllCouponsAction(coupons: CouponModel[]): CustomerAction {
    return { type: CustomerActionType.FetchAllCoupons, payload: coupons };
}
export function fetchCustomerAction(customer: CustomerModel): CustomerAction {
    return { type: CustomerActionType.FetchCustomer, payload: customer };
}
export function deleteCustomerAction(): CustomerAction {
    return { type: CustomerActionType.DeleteCustomer };
}

// 5. reducer - a single function performing any of the above actions
export function customerReducer(currentState: CustomerState = new CustomerState(), action: CustomerAction): CustomerState {
    const newState = { ...currentState }; // duplicate current state

    switch (action.type) {
        case CustomerActionType.BuyCoupon: // here payload is all products
            newState.myCoupons.push(action.payload);
            break;
        case CustomerActionType.FetchMyCoupons: // here payload is a single product to add
            newState.myCoupons = action.payload;
            break;
        case CustomerActionType.FetchAllCoupons: // here payload is a single product to update
            newState.allCoupons = action.payload;
            break;
        case CustomerActionType.FetchCustomer: // here payload is an id of product to delete
            newState.customer = action.payload;
            break;
        case CustomerActionType.DeleteCustomer: // here payload is an id of product to delete
            newState.customer = {
                id: 0,
                firstName: "",
                lastName: "",
                email: "",
                password: ""
            };
            break;
    }

    return newState;
}