import "./Routing.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import App from "../../../App";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import CompaniesList from "../../AdminArea/CompanyArea/CompaniesList/CompaniesList";
import AddCompany from "../../AdminArea/CompanyArea/AddCompany/AddCompany";
import DeleteCompany from "../../AdminArea/CompanyArea/DeleteCompany/DeleteCompany";
import EditCompany from "../../AdminArea/CompanyArea/EditCompany/EditCompany";
import CustomersList from "../../AdminArea/CustomerArea/CustomersList/CustomersList";
import AddCustomer from "../../AdminArea/CustomerArea/AddCustomer/AddCustomer";
import EditCustomer from "../../AdminArea/CustomerArea/EditCustomer/EditCustomer";
import CouponsList from "../../CompanyArea/CouponsList/CouponsList";
import AddCoupon from "../../CompanyArea/AddCoupon/AddCoupon";
import EditCoupon from "../../CompanyArea/EditCoupon/EditCoupon";
import DeleteCoupon from "../../CompanyArea/DeleteCoupon/DeleteCoupon";
import DeleteCustomer from "../../AdminArea/CustomerArea/DeleteCustomer/DeleteCustomer";
import CouponsListCustomer from "../../CustomerArea/MyCouponsList/MyCouponsList";
import PurschaseCoupon from "../../CustomerArea/PurschaseCoupon/PurschaseCoupon";
import MyCouponsList from "../../CustomerArea/MyCouponsList/MyCouponsList";
import AllCouponsList from "../../CustomerArea/AllCouponList/AllCouponsList";
import About from "../../HomeArea/About/About";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                {/* Commons */}
                <Route path="/" element={<App />} />
                <Route path="/home" element={<Home />} />
                <Route index element={<Home />} />
                <Route path="/about" element={<About />} />

                {/* Admin */}
                <Route path="/admin/companies" element={<CompaniesList />} />
                <Route path="/admin/companies/add" element={<AddCompany />} />
                <Route path="/admin/companies/edit/:id" element={<EditCompany />} />
                <Route path="/admin/companies/remove/:id" element={<DeleteCompany />} />

                <Route path="/admin/customers" element={<CustomersList />} />
                <Route path="/admin/customer/add" element={<AddCustomer />} />
                <Route path="/admin/customers/edit/:id" element={<EditCustomer />} />
                <Route path="/admin/customers/remove/:id" element={<DeleteCustomer />} />


                {/* Company */}
                <Route path="/company/coupons" element={<CouponsList />} />
                <Route path="/company/coupons/add" element={<AddCoupon />} />
                <Route path="/company/coupons/edit/:id" element={<EditCoupon />} />
                <Route path="/company/coupons/remove/:id" element={<DeleteCoupon />} />

                {/* Customer */}
                <Route path="/customer/coupons" element={<AllCouponsList />} />
                <Route path="/customer/my-coupons" element={<MyCouponsList />} />
                <Route path="/customer/coupons/purchase/:id" element={<PurschaseCoupon />} />


                {/* Auth */}
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />

                {/* page not found */}
                <Route path="*" element={<PageNotFound />} />

            </Routes>
        </div>
    );
}

export default Routing;
