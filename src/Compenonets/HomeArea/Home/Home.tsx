import Clock from "../Clock/Clock";
import "./Home.css";

function Home(): JSX.Element {
    return (
        <div className="Home">
            <Clock />
            <br />
              Welcome to my webStie ! 
            <br />
              this is my Coupons System Project... 
            <br />
              admin details is: 
            <br />
              email:admin@admin.com 
            <br />
              passowrd : admin
        </div>
    );
}

export default Home;
