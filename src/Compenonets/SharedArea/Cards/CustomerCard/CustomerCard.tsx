import React from 'react'
import {  useNavigate } from 'react-router-dom'
import { CustomerModel } from '../../../../Models/CustomerModel'
import "./CustomerCard.css"

export interface CustomerCardProps {
    customer: CustomerModel
}


function CustomerCard(props: CustomerCardProps): JSX.Element {
    const navigate = useNavigate();

    function editCustomer() {
        navigate('/admin/customers/edit/' + props.customer.id)
    }
    function deleteCustomer() {
        navigate('/admin/customers/remove/' + props.customer.id)
    }
    return (
        <div className='Box'>
            <p>First Name: {props.customer.firstName}</p>
            <p>last Name: {props.customer.lastName}</p>
            <p>Email: {props.customer.email}</p>
            <p>Password: {props.customer.password}</p>


            <button className='button-link edit' onClick={editCustomer}>Edit </button>
            <button className='button-link delete' onClick={deleteCustomer}> Delete</button>

        </div>
    )
}

CustomerCard.propTypes = {}

export default CustomerCard
