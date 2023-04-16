import { combineReducers } from "redux";
import { authReducer } from "./AuthState";
import { adminReducer } from "./AdminState";
import { companyReducer } from "./CompanyState";
import { customerReducer } from "./CustomerState";
import { createStore } from "redux";



const reducers = combineReducers({ authReducer: authReducer, adminReducer: adminReducer, companyReducer: companyReducer, customerReducer: customerReducer })
const store = createStore(reducers);

export default store;