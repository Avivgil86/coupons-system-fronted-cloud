import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import store from "../../../Redux/store";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import "./Logout.css";
import { useForm } from "react-hook-form";
import notify from "../../../Services/Notification";
import { logoutAction } from "../../../Redux/AuthState";


function Logout(): JSX.Element {
    const navigate = useNavigate();
    useEffect(() => {
        notify.success("Logout successfully")
        store.dispatch(logoutAction());
        navigate("/home")
    }, [])


    return (
        <>
        </>
    );
}

export default Logout;
