import React from 'react'
import {  useNavigate } from 'react-router-dom'
import { CouponModel } from '../../../../Models/CouponModel'
import store from '../../../../Redux/store'
import "./CouponCard.css"

export interface CouponCardProps {
    coupon: CouponModel
}


function CouponCard(props: CouponCardProps): JSX.Element {
    const clientType = store.getState().authReducer.user.clientType;
    const navigate = useNavigate();

    function purchaseCoupon() {
        navigate('/customer/coupons/purchase/' + props.coupon.id)
    }
    function editCoupon() {
        navigate('/company/coupons/edit/' + props.coupon.id)
    }
    function deleteCoupon() {
        navigate('/company/coupons/remove/' + props.coupon.id)
    }
    return (
        <div className='Box'>
            <img src={props.coupon.image} alt={"image" + props.coupon.id} />
            <p>Title: {props.coupon.title}</p>
            <p>Description: {props.coupon.description}</p>
            <p>Start Date: {props?.coupon?.startDate?.toString()}</p>
            <p>End Date: {props?.coupon?.endDate?.toString()}</p>
            <p>Amount: {props?.coupon?.amount}</p>
            <p>Price: {props.coupon.price}</p>
            <p>category: {props.coupon.category}</p>
            <br />


            {
                clientType === "COMPANY" ?
                    <>

                        <button className='button-link edit' onClick={editCoupon}>Edit </button>
                        <button className='button-link delete' onClick={deleteCoupon}> Delete</button>
                    </>
                    :
                    <>
                        {store.getState().customerReducer.myCoupons.find((c) => c.id === props.coupon.id) ?
                            <button className='button-link purschased' disabled={true} onClick={purchaseCoupon}>Purschase</button> :
                            <button className='button-link purschase' onClick={purchaseCoupon}>Purschase</button>
                        }
                    </>
            }
        </div>
    )
}

CouponCard.propTypes = {}

export default CouponCard
