import { Link } from "react-router-dom";

export default function Landing() {

    return (
        <div>
            <Link to="/home">
                <button>ENTRAR A LA WEB</button>
            </Link>
        </div>
    );
}