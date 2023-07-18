import { Link } from "react-router-dom";

export default function Nav() {
    return (
        <div>
            <Link to="/home">HOME</Link>
            <Link to="/form">FORM</Link>
        </div>
    );
}
