import React, { useEffect, useState } from 'react'
import "./AddCustomer.css"
import { useNavigate } from 'react-router-dom'
import adminApi from '../../../../Services/AdminApi';
import notify from "../../../../Services/Notification";
import { useForm } from 'react-hook-form';
import store from '../../../../Redux/store';
import { AddCustomerAction } from '../../../../Redux/AdminState';
import { CustomerModel } from '../../../../Models/CustomerModel';

function AddCustomer(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<CustomerModel>();
    const navigate = useNavigate();



    async function send(customer: CustomerModel) {
        try {
            await adminApi.addCustomer(customer);
            store.dispatch(AddCustomerAction(customer))
            notify.success("customer Added");
            navigate("/admin/customers");

        } catch (error: any) {
            notify.error(error);
        }
    }

    return (
        <div className="AddCustomer">
            <form>
                <h2>Add Customer</h2>

                <label>First Name: </label>
                <input type="text"  {...register("firstName",
                    {
                        required: { value: true, message: "Missing First Name" },
                        minLength: { value: 2, message: "First Name too short" }

                    }
                )} />
                <label>Last Name: </label>
                <input type="text"  {...register("lastName",
                    {
                        required: { value: true, message: "Missing Last Name" },
                        minLength: { value: 2, message: "Last Name too short" }

                    }
                )} />

                <span>{formState.errors?.firstName?.message}</span>

                <label>Email: </label>
                <input type="string" {...register("email")} />

                <label>Password: </label>
                <input type="string" {...register("password")} />

                <button className='button-link edit' onClick={handleSubmit(send)}>Add</button>
            </form>
        </div>
    );
}

export default AddCustomer