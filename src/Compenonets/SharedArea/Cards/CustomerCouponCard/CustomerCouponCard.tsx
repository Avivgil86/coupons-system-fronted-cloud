import React from 'react'
import { Link } from 'react-router-dom'
import { CouponModel } from '../../../../Models/CouponModel'
import store from '../../../../Redux/store'
import "./CustomerCouponCard.css"

export interface CustomerCouponCardProps {
    coupon: CouponModel
}


function CustomerCouponCard(props: CustomerCouponCardProps): JSX.Element {
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
        </div>
    )
}

CustomerCouponCard.propTypes = {}

export default CustomerCouponCard
