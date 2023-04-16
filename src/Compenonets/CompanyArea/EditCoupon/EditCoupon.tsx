import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { CouponModel } from "../../../Models/CouponModel";
import { updateCouponAction } from "../../../Redux/CompanyState";
import store from "../../../Redux/store";
import companyApi from "../../../Services/CompanyApi";
import notify from "../../../Services/Notification";
function EditCoupon(): JSX.Element {

    const { register, watch, handleSubmit, formState, setValue } = useForm<CouponModel>();
    const navigate = useNavigate();

    const params = useParams();
    const id = +params.id;
    const couponToEdit = store.getState().companyReducer.coupons.filter(coupon => coupon.id === id)[0];

    useEffect(() => {
        try {
            setValue("id", couponToEdit.id);
            setValue("title", couponToEdit.title);
            setValue("description", couponToEdit.description);
            setValue("startDate", couponToEdit.startDate);
            setValue("endDate", couponToEdit.endDate);
            setValue("amount", couponToEdit.amount);
            setValue("price", couponToEdit.price);
            setValue("image", couponToEdit.image);
            setValue("category", couponToEdit.category);
        }
        catch (error) {
            console.log(error)
        }

    }, []);



    async function send(coupon: CouponModel) {

        try {
            await companyApi.updateCoupon(coupon);
            notify.success("coupon has been updated");
            store.dispatch(updateCouponAction(coupon));
            navigate("/company/coupons");

        } catch (error: any) {
            notify.error(error);
        }
    }
    return (
        <div className="EditCoupon">
            <form>
                <h2>Edit coupon</h2>

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

                <label>Start date: </label>
                <input type="date"  {...register("startDate",
                    {
                        required: { value: true, message: "  Missing start Date  " },
                    }
                )} />

                <span>{formState.errors?.startDate?.message}</span>
                <label>End date: </label>
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
                        required: { value: true, message: "  Missing amount  " },
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


                <button className='button-link edit' onClick={handleSubmit(send)}>Edit</button>
            </form>
        </div>
    );
}
export default EditCoupon;
