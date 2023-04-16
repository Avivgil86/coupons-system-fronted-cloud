import { CompanyModel } from "../Models/CompanyModel";
import { CustomerModel } from "../Models/CustomerModel";
import { LoginRequestModel } from "../Models/LoginRequestModel";
import { LoginResponseModel } from "../Models/LoginResponseModel";

// 1. products state - the data we need at global application level
export class AuthState {
    public user: LoginResponseModel = {
        email: "",
        password: "",
        clientType: "",
        id: 0,
        token: ""
    }
    public constructor() {
        try {
            const tokenFromStorage = JSON.parse(localStorage.getItem("user") || "");
            if (tokenFromStorage) {
                this.user = tokenFromStorage;
            }

        } catch (err) {
            console.log(err)
        }
    }
}

// 2. Action Types - list of actions - enum
export enum AuthActionType {
    Login = "Login",
    Logout = "Logout"
}

// 3. Action - an interface describing a single command
export interface AuthAction {
    type: AuthActionType; // action type
    payload?: any; // action data
}

// 4. action creators - functions to create action objects
export function loginAction(loginResponse: LoginResponseModel): AuthAction {
    return { type: AuthActionType.Login, payload: loginResponse };
}
export function logoutAction(): AuthAction {
    return { type: AuthActionType.Logout };
}



// 5. reducer - a single function performing any of the above actions
export function authReducer(currentState: AuthState = new AuthState(), action: AuthAction): AuthState {
    const newState = { ...currentState }; // duplicate current state

    switch (action.type) {
        case AuthActionType.Login: // here payload is all products
            newState.user = action.payload;
            localStorage.setItem("user", JSON.stringify(newState.user));
            break;
        case AuthActionType.Logout: // here payload is a single product to add
            newState.user = {
                email: "",
                password: "",
                clientType: "",
                id: 0,
                token: ""
            }
            localStorage.removeItem("user")
            break;
    }
    return newState;
}