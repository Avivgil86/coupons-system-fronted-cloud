import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { CompanyModel } from "../../../../Models/CompanyModel";
import { UpdateCompanyAction } from "../../../../Redux/AdminState";
import store from "../../../../Redux/store";
import adminApi from "../../../../Services/AdminApi";
import notify from "../../../../Services/Notification";
function EditCompany(): JSX.Element {

    const { register, handleSubmit, formState, setValue } = useForm<CompanyModel>();
    const navigate = useNavigate();

    const params = useParams();
    const id = +params.id;

    useEffect(() => {
        adminApi.getOneCompany(id)
            .then((company) => {
                setValue("id", company.data.id)
                setValue("name", company.data.name);
                setValue("email", company.data.email);
                setValue("password", company.data.password);
            })

            .catch((err) => {
                notify.error(err)
            });
    }, []);



    async function send(company: CompanyModel) {

        try {
            await adminApi.updateCompany(company);
            notify.success("Company has been updated");
            store.dispatch(UpdateCompanyAction(company))
            navigate("/admin/companies");

        } catch (error: any) {
            notify.error(error);
        }
    }
    return (
        <div className="EditCompany">
            <form>
                <h2>Edit Company</h2>

                <label>Name: </label>
                <input type="text"  {...register("name",
                    {
                        required: { value: true, message: "Missing name" },
                        minLength: { value: 2, message: "Name too short" }
                    }
                )} />

                <span>{formState.errors?.name?.message}</span>

                <label>Email: </label>
                <input type="string" {...register("email",
                    {
                        required: { value: true, message: "Missing email" },

                    }
                )} />
                <span>{formState.errors?.email?.message}</span>

                <label>Password: </label>
                <input type="string" {...register("password")} />



                <button className='button-link edit' onClick={handleSubmit(send)}>Edit</button>
            </form>
        </div>
    );
}
export default EditCompany;
