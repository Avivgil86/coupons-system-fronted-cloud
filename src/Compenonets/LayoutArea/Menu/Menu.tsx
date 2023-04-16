import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import store from "../../../Redux/store";
import "./Menu.css";

function Menu(): JSX.Element {
    const [clientType, setClientType] = useState<string>(store.getState().authReducer.user.clientType);

    useEffect(() => {
        store.subscribe(() => {
            setClientType(store.getState().authReducer.user.clientType)
        })

    }, [])
    return (
        <div className="Menu">
            <NavLink to={"/home"}>Home</NavLink>
            <NavLink to={"/about"}>About</NavLink>
            {
                clientType === "ADMINISTRATOR" && (
                    <>
                        <NavLink to={"/admin/companies"}>Companies</NavLink>
                        <NavLink to={"/admin/customers"}>Customers</NavLink>
                    </>
                )
            }
            {
                clientType === "COMPANY" && (
                    <>
                        <NavLink to={"/company/coupons"}>Coupons</NavLink>
                    </>
                )
            }
            {
                clientType === "CUSTOMER" && (
                    <>
                        <NavLink to={"/customer/my-coupons"}>My Coupons</NavLink>
                        <NavLink to={"/customer/coupons"}>All Coupons</NavLink>
                    </>
                )
            }

        </div>
    );
}

export default Menu;
