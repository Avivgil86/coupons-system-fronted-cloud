import React, { useEffect, useState } from 'react'
import "./MyCouponsList.css"
import { CouponModel } from '../../../Models/CouponModel';
import CouponCard from '../../SharedArea/Cards/CouponCard/CouponCard';
import store from '../../../Redux/store';
import notify from '../../../Services/Notification';
import { useNavigate } from 'react-router-dom';
import customerApi from '../../../Services/CustomerApi';
import { fetchAllCouponsAction, fetchMyCouponsAction } from '../../../Redux/CustomerState';
import CustomerCouponCard from '../../SharedArea/Cards/CustomerCouponCard/CustomerCouponCard';

function MyCouponsList(): JSX.Element {

    const [coupons, setCoupons] = useState<CouponModel[]>(store.getState().customerReducer.myCoupons);
    const navigate = useNavigate();
    useEffect(() => {
        customerApi.getAllCustomerCoupons().then((res) => {

            setCoupons(res.data);
            store.dispatch(fetchMyCouponsAction(res.data))
        }).catch((err) => {
            notify.error(err)
        })
    }, [])
    
  

    return (
        <div >
                {coupons.length > 0 ?
                    coupons.map((coupons) => {
                        return <CustomerCouponCard key={coupons.id} coupon={coupons} />
                    }) :
                    <>No coupons to show yet</>
                }
        </div>
    )
}

export default MyCouponsList