import "./DeleteCoupon.css"
import { useNavigate, useParams } from 'react-router-dom'
import companyApi from "../../../Services/CompanyApi";
import { deleteCouponAction } from "../../../Redux/CompanyState";
import store from "../../../Redux/store";
import notify from "../../../Services/Notification";

function DeleteCoupon(): JSX.Element {
    const params = useParams();
    const couponId = +params.id;
    const navigate = useNavigate();

    function yesDelete() {
        companyApi.deleteCoupon(couponId).then((res) => {
            store.dispatch(deleteCouponAction((couponId)));
            notify.success("Coupon deleted");
            navigate("/company/coupons");

        }).catch((err) => {
            notify.error(err);
        });
    }

    function noDelete() {
        navigate("/company/coupons");
    }




    return (
        <div className="DeleteCoupon">
            <h2>Are you sure you want to delete this coupon?</h2>
            <button className='button-link edit' onClick={yesDelete}>Yes</button>
            <button className='button-link delete' onClick={noDelete}>Cancel</button>
        </div>
    );
}
export default DeleteCoupon