import { useNavigate, useParams } from "react-router-dom";
import { buyCouponAction } from "../../../Redux/CustomerState";
import store from "../../../Redux/store";
import customerApi from "../../../Services/CustomerApi";
import notify from "../../../Services/Notification";

function PurschaseCoupon(): JSX.Element {
    const params = useParams();
    const couponId = +params.id;
    const navigate = useNavigate();

    function yes() {
        const coupon = store.getState().customerReducer.allCoupons.find((c) => c.id === couponId)
        customerApi.parschaseCoupon(coupon).then((res) => {
            store.dispatch(buyCouponAction(coupon))
            notify.success("Coupon parschased");
            navigate("/customer/coupons");
        }).catch((err) => {
            notify.error(err);
        });
    }

    function no() {
        navigate("/customer/coupons");
    }




    return (
        <div className="DeleteCoupon">
            <h2>Are you sure you want to PURCHASE this coupon?</h2>
            <button className='button-link edit' onClick={yes}>Yes</button>
            <button className='button-link edit' onClick={no}>Cancel</button>
        </div>
    );
}



export default PurschaseCoupon