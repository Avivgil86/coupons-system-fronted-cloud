import React, { useEffect, useState } from 'react'
import "./CompaniesList.css"
import { useNavigate } from 'react-router-dom'
import store from '../../../../Redux/store';
import { CompanyModel } from '../../../../Models/CompanyModel';
import CompanyCard from '../../../SharedArea/Cards/CompanyCard/CompanyCard';
import adminApi from '../../../../Services/AdminApi';
import notify from "../../../../Services/Notification";
import { fethCompaniesAction } from '../../../../Redux/AdminState';

function CompaniesList(): JSX.Element {
    const navigate = useNavigate();
    const [companies, setCompanies] = useState<CompanyModel[]>(store.getState().adminReducer.companies);

    useEffect(() => {

        adminApi.getAllCompanies().then((res) => {
            setCompanies(res.data);
            store.dispatch(fethCompaniesAction(res.data))
        }).catch((err) => {
            notify.error(err)
        })
    }, [])

    function addNewCompany() {
        navigate("/admin/companies/add")
    }

    return (
        <div>
            <button className='button-link edit' onClick={addNewCompany}>Add New Company</button>
            <div>
                {companies.length > 0 ?
                    companies.map((company) => {
                        return <CompanyCard key={company.id} company={company} />
                    }) :
                    <>No companies to show yet</>
                }

            </div>
        </div>
    )
}

export default CompaniesList