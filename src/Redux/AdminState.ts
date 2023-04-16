import { CompanyModel } from "../Models/CompanyModel";
import { CustomerModel } from "../Models/CustomerModel";

// 1. products state - the data we need at global application level
export class AdminState {
    public companies: CompanyModel[] = [];
    public customers: CustomerModel[] = [];
}

// 2. Action Types - list of actions - enum
export enum AdminActionType {
    FetchCompanies = "FetchCompanies",
    FetchCustomers = "FetchCustomers",
    AddCompany = "AddCompany",
    AddCustomer = "AddCustomer",
    UpdateCompany = "UpdateCompany",
    UpdateCustomer = "UpdateCustomer",
    DeleteCompany = "DeleteCompany",
    DeleteCustomer = "DeleteCustomer"
}

// 3. Action - an interface describing a single command
export interface AdminAction {
    type: AdminActionType; // action type
    payload: any; // action data
}

// 4. action creators - functions to create action objects
export function fethCompaniesAction(companies: CompanyModel[]): AdminAction {
    return { type: AdminActionType.FetchCompanies, payload: companies };
}
export function AddCompanyAction(company: CompanyModel): AdminAction {
    return { type: AdminActionType.AddCompany, payload: company };
}
export function UpdateCompanyAction(company: CompanyModel): AdminAction {
    return { type: AdminActionType.UpdateCompany, payload: company };
}
export function DeleteCompanyAction(companyId: number): AdminAction {
    return { type: AdminActionType.DeleteCompany, payload: companyId };
}
export function fethCustomersAction(customers: CustomerModel[]): AdminAction {
    return { type: AdminActionType.FetchCustomers, payload: customers };
}
export function AddCustomerAction(cusomter: CustomerModel): AdminAction {
    return { type: AdminActionType.AddCustomer, payload: cusomter };
}
export function UpdateCustomerAction(cusomter: CustomerModel): AdminAction {
    return { type: AdminActionType.UpdateCustomer, payload: cusomter };
}
export function DeleteCustomerAction(customerId: number): AdminAction {
    return { type: AdminActionType.DeleteCustomer, payload: customerId };
}

// 5. reducer - a single function performing any of the above actions
export function adminReducer(currentState: AdminState = new AdminState(), action: AdminAction): AdminState {
    const newState = { ...currentState }; // duplicate current state

    switch (action.type) {
        case AdminActionType.FetchCompanies: // here payload is all products
            newState.companies = action.payload;
            break;
        case AdminActionType.AddCompany: // here payload is a single product to add
            newState.companies.push(action.payload);
            break;
        case AdminActionType.UpdateCompany: // here payload is a single product to update
            const indexToUpdateCompany = newState.companies.findIndex(p => p.id === action.payload.id);
            if (indexToUpdateCompany >= 0) newState.companies[indexToUpdateCompany] = action.payload;
            break;
        case AdminActionType.DeleteCompany: // here payload is an id of product to delete
            const indexToDelete = newState.companies.findIndex(p => p.id === action.payload);
            if (indexToDelete >= 0) newState.companies.splice(indexToDelete, 1);
            break;
        case AdminActionType.FetchCustomers: // here payload is all products
            newState.customers = action.payload;
            break;
        case AdminActionType.AddCustomer: // here payload is a single product to add
            newState.customers.push(action.payload);
            break;
        case AdminActionType.UpdateCustomer: // here payload is a single product to update
            const indexToUpdateCustimer = newState.customers.findIndex(p => p.id === action.payload.id);
            if (indexToUpdateCustimer >= 0) newState.customers[indexToUpdateCustimer] = action.payload;
            break;
        case AdminActionType.DeleteCompany: // here payload is an id of product to delete
            const indexToDeleteCustomer = newState.customers.findIndex(p => p.id === action.payload);
            if (indexToDeleteCustomer >= 0) newState.customers.splice(indexToDeleteCustomer, 1);
            break;
    }

    return newState;
}