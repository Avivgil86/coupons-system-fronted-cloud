import "./DeleteCompany.css"
import { useNavigate, useParams } from 'react-router-dom'
import adminApi from '../../../../Services/AdminApi';
import notify from "../../../../Services/Notification";
import store from "../../../../Redux/store";
import { DeleteCompanyAction } from "../../../../Redux/AdminState";

function DeleteCompany(): JSX.Element {
    const params = useParams();
    const companyId = +params.id;
    const navigate = useNavigate();

    function yesDelete() {
        adminApi.deleteCompany(companyId).then((res) => {
            store.dispatch(DeleteCompanyAction((companyId)));
            notify.success("Company deleted");
            navigate("/admin/companies");

        }).catch((err) => {
            notify.error(err);
        });
    }

    function noDelete() {
        navigate("/admin/companies");
    }




return (
    <div className="DeleteCompany">
        <h2>Are you sure you want to delete this company?</h2>
        <button className='button-link edit'  onClick={yesDelete}>Yes</button>
        <button className='button-link delete' onClick={noDelete}>Cancel</button>
    </div>
);
}
export default DeleteCompany