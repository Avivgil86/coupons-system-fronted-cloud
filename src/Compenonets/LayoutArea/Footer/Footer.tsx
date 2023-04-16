import "./Footer.css";

function Footer(): JSX.Element {

    return (
        <div className="Footer">
            <p>All Rights Reserved &copy; {new Date().getFullYear()}</p>
        </div>
    );
}

export default Footer;
