import React, { useEffect, useState } from 'react'
import "./AddCoupon.css"
import { useNavigate } from 'react-router-dom'

import { useForm } from 'react-hook-form';

import { CouponModel } from '../../../Models/CouponModel';
import companyApi from '../../../Services/CompanyApi';
import { addCouponAction } from '../../../Redux/CompanyState';
import store from '../../../Redux/store';
import notify from '../../../Services/Notification';

function AddCoupon(): JSX.Element {

    const { register, watch, handleSubmit, formState } = useForm<CouponModel>();
    const navigate = useNavigate();


    async function send(coupon: CouponModel) {
        try {
            await companyApi.addCoupon(coupon);
            store.dispatch(addCouponAction(coupon))
            notify.success("coupon Added");
            navigate("/company/coupons");

        } catch (error: any) {
            notify.error(error);
        }
    }

    return (
        <div className="AddCoupon">
            <form className='add-coupon-form'>
                <h2>Add Coupon</h2>

                <label>Title: </label>
                <input type="text"  {...register("title",
                    {
                        required: { value: true, message: "Missing title  " },
                    }
                )} />

                <span>{formState.errors?.title?.message}</span>

                <label>Description: </label>
                <input type="text"  {...register("description",
                    {
                        required: { value: true, message: "  Missing description  " },
                    }
                )} />

                <span>{formState.errors?.description?.message}</span>

                <label>start Date: </label>
                <input type="date"  {...register("startDate",
                    {
                        min: { value: new Date().toISOString().substring(0, 10), message: "Start Date cannot be fore today" },
                        required: { value: true, message: "  Missing start Date  " },
                    }
                )} />

                <span>{formState.errors?.startDate?.message}</span>
                <label>endDate: </label>
                <input type="date"  {...register("endDate",
                    {
                        min: {
                            value: watch("startDate")?.toString(),
                            message: "End Date cannot be before Start Date"
                        },
                        required: { value: true, message: "  Missing end Date  " },
                    }
                )} />

                <span>{formState.errors?.endDate?.message}</span>

                <label>Amount: </label>
                <input type="number"  {...register("amount",
                    {
                        required: { value: true, message: "  Missing Amount  " },
                        min: { value: 0, message: "  Amount cannot be negative  " },
                        max: { value: 1000, message: "  Amount cannot exeed 1000  " }

                    }
                )} step="0.01" />

                <span>{formState.errors?.amount?.message}</span>

                <label>Price: </label>
                <input type="number" {...register("price",
                    {
                        required: { value: true, message: "  Missing price  " },
                        min: { value: 0, message: "  Price cannot be negative  " },
                        max: { value: 1000, message: "  Price cannot exeed 1000  " }

                    }
                )} step="0.01" />
                <span>{formState.errors?.price?.message}</span>


                <label>Image: </label>
                <input type="string" {...register("image")} value={"https://picsum.photos/250/150?" + Math.floor(Math.random() * 999_999_999_999)
                } />





                <label>Category: </label>
                <select  {...register("category")} name="category" id="category">
                    <option value="FOOD">Food</option>
                    <option value="ELECTRICITY">Electricity</option>
                    <option value="VACETION">Vacetion</option>
                    <option value="RESTAURONT">Restauront</option>
                </select>




                <button className='button-link edit' onClick={handleSubmit(send)}>Add</button>
            </form>
        </div>
    );
}

export default AddCoupon