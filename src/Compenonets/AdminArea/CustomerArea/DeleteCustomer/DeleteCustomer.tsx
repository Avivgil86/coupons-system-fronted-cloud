import "./DeleteCustomer.css"
import { useNavigate, useParams } from 'react-router-dom'
import adminApi from '../../../../Services/AdminApi';
import notify from "../../../../Services/Notification";
import store from "../../../../Redux/store";
import { DeleteCustomerAction } from "../../../../Redux/AdminState";

function DeleteCustomer(): JSX.Element {
    const params = useParams();
    const customerId = +params.id;
    const navigate = useNavigate();

    function yesDelete() {
        adminApi.deleteCustomer(customerId).then((res) => {
            store.dispatch(DeleteCustomerAction((customerId)));
            notify.success("Customer deleted");
            navigate("/admin/customers");

        }).catch((err) => {
            notify.error(err);
        });
    }

    function noDelete() {
        navigate("/admin/customers");
    }




    return (
        <div className="DeleteCustomer">
            <h2>Are you sure you want to delete this customer?</h2>
            <button className='button-link edit' onClick={yesDelete}>Yes</button>
            <button className='button-link delete' onClick={noDelete}>Cancel</button>
        </div>
    );

}
export default DeleteCustomer