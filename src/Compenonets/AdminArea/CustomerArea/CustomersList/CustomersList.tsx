import React, { useEffect, useState } from 'react'
import "./CustomersList.css"
import store from '../../../../Redux/store';
import adminApi from '../../../../Services/AdminApi';
import notify from "../../../../Services/Notification";
import { CustomerModel } from '../../../../Models/CustomerModel';
import CustomerCard from '../../../SharedArea/Cards/CustomerCard/CustomerCard';
import { useNavigate } from 'react-router-dom';
import { fethCustomersAction } from '../../../../Redux/AdminState';

function CustomersList(): JSX.Element {
    const navigate = useNavigate();

    const [customers, setCustomers] = useState<CustomerModel[]>(store.getState().adminReducer.customers);

    useEffect(() => {

        adminApi.getAllCustomers().then((res) => {
            setCustomers(res.data);
            store.dispatch(fethCustomersAction(res.data))
        }).catch((err) => {
            notify.error(err)
        })
    }, [])

    function addNewCustomer() {
        navigate("/admin/customer/add")
    }

    return (
        <div>
            <button className='button-link edit' onClick={addNewCustomer}>Add New Customer</button>
            <div>
                {customers.length > 0 ?
                    customers.map((customer) => {
                        return <CustomerCard key={customer.id} customer={customer} />
                    }) :
                    <>No customers to show yet</>
                }

            </div>
        </div>
    )
}

export default CustomersList