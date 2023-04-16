abstract class Config {

}

class DevelopmentConfig extends Config {
    public urls = {
        admin: "http://localhost:8080/api/admin/",
        company: "http://localhost:8080/api/company/",
        customer: "http://localhost:8080/api/customer/",
        login: "http://localhost:8080/api/login/",
    }
}

class ProductionConfig extends Config {
    public urls = {
        admin: "https://coupons-system-backend-cloud-production.up.railway.app/api/admin/",
        company: "https://coupons-system-backend-cloud-production.up.railway.app/api/company/",
        customer: "https://coupons-system-backend-cloud-production.up.railway.app/api/customer/",
        login: "https://coupons-system-backend-cloud-production.up.railway.app/api/login/",
    }
}

const config = process.env.NODE_ENV === "production" ? new ProductionConfig() : new DevelopmentConfig();

export default config;


