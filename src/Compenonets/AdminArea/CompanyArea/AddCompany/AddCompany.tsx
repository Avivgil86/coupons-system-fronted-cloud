import React, { useEffect, useState } from 'react'
import "./AddCompany.css"
import { useNavigate } from 'react-router-dom'
import { CompanyModel } from '../../../../Models/CompanyModel';
import adminApi from '../../../../Services/AdminApi';
import notify from "../../../../Services/Notification";
import { useForm } from 'react-hook-form';
import store from '../../../../Redux/store';
import { AddCompanyAction } from '../../../../Redux/AdminState';

function AddCompany(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<CompanyModel>();
    const navigate = useNavigate();



    async function send(company: CompanyModel) {
        try {
            await adminApi.addCompany(company);
            store.dispatch(AddCompanyAction(company))
            notify.success("Company Added");
            navigate("/admin/companies");

        } catch (error: any) {
            notify.error(error);
        }
    }

    return (
        <div className="AddCompany">
            <form>
                <h2>Add Company</h2>

                <label>Name: </label>
                <input type="text"  {...register("name",
                    {
                        required: { value: true, message: "Missing name" },
                        minLength: { value: 2, message: "Name too short" }

                    }
                )} />

                <span>{formState.errors?.name?.message}</span>

                <label>Email: </label>
                <input type="email" {...register("email")} />

                <label>Password: </label>
                <input type="password" {...register("password")} />

                <button className='button-link edit' onClick={handleSubmit(send)}>Add</button>
            </form>
        </div>
    );
}

export default AddCompany