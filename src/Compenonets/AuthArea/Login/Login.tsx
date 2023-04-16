import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import store from "../../../Redux/store";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import "./Login.css";
import { useForm } from "react-hook-form";
import { LoginRequestModel } from "../../../Models/LoginRequestModel";
import loginApi from "../../../Services/LoginApi";
import notify from "../../../Services/Notification";
import { loginAction } from "../../../Redux/AuthState";


function Login(): JSX.Element {
    const navigate = useNavigate();

    const schema = yup.object().shape({
        email: yup.string().lowercase().required("Email is required"),
        password: yup.string().min(4, "password is minimus 4 characters").required("Password is required")
    })

    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<LoginRequestModel>({
        mode: "all",
        resolver: yupResolver(schema)
    })

    function loginFromServer(loginRequest: LoginRequestModel) {
        loginApi.login(loginRequest).then((res) => {
            notify.success("logined seccussefully")
            store.dispatch(loginAction(res.data))
            navigate("/home")
        }).catch((err) => {
            notify.error(err)
        })
    }

    return (
        <div className="login-div">
            <h2>Login</h2>
            <form className="login-card" onSubmit={handleSubmit(loginFromServer)}>
                <label htmlFor="email">Email</label>
                <input {...register("email")} type="email" placeholder="email here" id="email" />
                <span>{errors.email?.message}</span>

                <label htmlFor="password">Password</label>
                <input {...register("password")} type="password" placeholder="password here" id="password" />
                <span>{errors.password?.message}</span>

                <select  {...register("clientType")} name="clientType" id="clientType">
                    <option value="ADMINISTRATOR">Admin</option>
                    <option value="COMPANY">Company</option>
                    <option value="CUSTOMER">Customer</option>
                </select>
                <button className="login-button" disabled={!isValid}>login</button>
            </form>
        </div>
    );
}

export default Login;
