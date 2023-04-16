import React from 'react'
import {useNavigate } from 'react-router-dom'
import { CompanyModel } from '../../../../Models/CompanyModel'
import "./CompanyCard.css"

export interface CompanyCardProps {
    company: CompanyModel
}



function CompanyCard(props: CompanyCardProps): JSX.Element {
    const navigate = useNavigate();

    function editCompany() {
        navigate('/admin/companies/edit/' + props.company.id)
    }
    function DeleteCompany() {
        navigate('/admin/companies/remove/' + props.company.id)
    }
    return (
        <div className='Box'>
            <p>Name: {props.company.name}</p>
            <p>Email: {props.company.email}</p>
            <p>Password: {props.company.password}</p>


            <button className='button-link edit' onClick={editCompany}>Edit </button>
            <button className='button-link delete' onClick={DeleteCompany}> Delete</button>


        </div>
    )
}

CompanyCard.propTypes = {}

export default CompanyCard
