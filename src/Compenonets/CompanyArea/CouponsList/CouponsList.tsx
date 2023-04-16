import React, { ChangeEvent, useEffect, useState } from 'react'
import "./CouponsList.css"
import { CouponModel } from '../../../Models/CouponModel';
import companyApi from '../../../Services/CompanyApi';
import CouponCard from '../../SharedArea/Cards/CouponCard/CouponCard';
import store from '../../../Redux/store';
import notify from '../../../Services/Notification';
import { useNavigate } from 'react-router-dom';
import { fetchCouponsAction } from '../../../Redux/CompanyState';

function CouponsList(): JSX.Element {

    const [coupons, setCoupons] = useState<CouponModel[]>(store.getState().companyReducer.coupons);
    const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
    const [selectedPrice, setSelectedPrice] = useState<number>(0);

    const navigate = useNavigate();
    useEffect(() => {
        companyApi.getAllCoupons().then((res) => {
            setCoupons(res.data);
            store.dispatch(fetchCouponsAction(res.data))
        }).catch((err) => {
            notify.error(err)
        })
    }, [])

    function addNewCoupon() {
        navigate("/company/coupons/add");
    }

    function handleCategoryChange(e: ChangeEvent<HTMLSelectElement>) {
        const currentSelectedCategory = e.currentTarget.value
        setSelectedCategory(currentSelectedCategory);

        let fillteredCoupons = store.getState().companyReducer.coupons;

        if (currentSelectedCategory !== "ALL") {
            fillteredCoupons = fillteredCoupons.filter((c) => {
                return c.category === currentSelectedCategory
            })
        }

        if (selectedPrice !== 0) {
            fillteredCoupons = fillteredCoupons.filter((c) => {
                return c.price <= selectedPrice
            })
        }
        setCoupons(fillteredCoupons);

    }

    function handlePriceChange(e: ChangeEvent<HTMLInputElement>) {
        const currentSelectedPrice = +e.currentTarget.value
        setSelectedPrice(currentSelectedPrice);

        let fillteredCoupons = store.getState().companyReducer.coupons;

        if (currentSelectedPrice !== 0) {
            fillteredCoupons = fillteredCoupons.filter((c) => {
                return c.price <= currentSelectedPrice
            })
        }

        if (selectedCategory !== "ALL") {
            fillteredCoupons = fillteredCoupons.filter((c) => {
                return c.category === selectedCategory
            })
        }
        setCoupons(fillteredCoupons);
    }

    return (
        <div >
            <button className='button-link edit' onClick={addNewCoupon}>Add New Coupon</button>
            <select className='button-link ' name="category" id="category" value={selectedCategory} onChange={handleCategoryChange}>
                <option value="ALL">All</option>
                <option value="FOOD">Food</option>
                <option value="ELECTRICITY">Electricity</option>
                <option value="VACETION">Vacation</option>
                <option value="RESTAURONT">Restauront</option>
            </select>
            <input className='button-link' type="number" name="price" id="price" min={0} value={selectedPrice} onChange={handlePriceChange} />
            <div>
                {coupons.length > 0 ?
                    coupons.map((coupon) => {
                        return <CouponCard key={coupon.id} coupon={coupon} />
                    }) :
                    <>No coupons to show yet</>
                }

            </div>
        </div>
    )
}

export default CouponsList