import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import store from "../../../Redux/store";
import "./AuthMenu.css";


function AuthMenu(): JSX.Element {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(store.getState().authReducer.user.token?.length > 0);
    const [email, setEmail] = useState<string>(store.getState().authReducer.user.email);

    useEffect(() => {

        return store.subscribe(() => {
            setIsLoggedIn(store.getState().authReducer.user.token?.length > 0);
            setEmail(store.getState().authReducer.user.email)
        });
    }, [])

    return (
        <div className="AuthMenu">
            {
                isLoggedIn
                    ?
                    <>Hello
                        <br />
                        {email} <NavLink className="log" to={"/logout"} >Sign out</NavLink>
                    </>
                    :
                    <>Hello guest
                        <br />
                        <NavLink className="log" to={"/login"}>Sign in</NavLink></>





            }
        </div>
    );
}

export default AuthMenu;
