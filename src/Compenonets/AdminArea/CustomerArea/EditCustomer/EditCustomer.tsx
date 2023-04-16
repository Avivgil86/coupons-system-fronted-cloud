import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { CustomerModel } from "../../../../Models/CustomerModel";
import { UpdateCustomerAction } from "../../../../Redux/AdminState";
import store from "../../../../Redux/store";
import adminApi from "../../../../Services/AdminApi";
import notify from "../../../../Services/Notification";
function EditCustomer(): JSX.Element {

    const { register, handleSubmit, formState, setValue } = useForm<CustomerModel>();
    const navigate = useNavigate();

    const params = useParams();
    const id = +params.id;

    useEffect(() => {
        adminApi.getOneCustomer(id)

            .then((customer) => {
                console.log(id);
                setValue("id", customer.data.id);
                setValue("lastName", customer.data.firstName);
                setValue("firstName", customer.data.lastName);
                setValue("email", customer.data.email);
                setValue("password", customer.data.password);
            })

            .catch((err) => {
                notify.error(err)
            });
    }, []);



    async function send(customer: CustomerModel) {

        try {
            await adminApi.updateCustomer(customer);
            notify.success("Customer has been updated");
            store.dispatch(UpdateCustomerAction(customer))
            navigate("/admin/customers");

        } catch (error: any) {
            notify.error(error);
        }
    }
    return (
        <div className="EditCustomer">
            <form>
                <h2>Edit customer</h2>

                <label>First Name: </label>
                <input type="text"  {...register("firstName",
                    {
                        required: { value: true, message: "Missing first Name" },
                        minLength: { value: 2, message: "first Name too short" }
                    }
                )} />

                <span>{formState.errors?.firstName?.message}</span>

                <label>Last Name: </label>
                <input type="text"  {...register("lastName",
                    {
                        required: { value: true, message: "Missing last name" },
                        minLength: { value: 2, message: "last name too short" }
                    }
                )} />

                <span>{formState.errors?.lastName?.message}</span>
                <label>Email: </label>
                <input type="string" {...register("email",
                    {
                        required: { value: true, message: "Missing email" },

                    }
                )} />
                <span>{formState.errors?.email?.message}</span>

                <label>Password: </label>
                <input type="password" {...register("password")} />



                <button className='button-link edit' onClick={handleSubmit(send)}>Edit</button>
            </form>
        </div>
    );
}
export default EditCustomer;
