import { Link } from "react-router-dom";
import style from "./Landing.module.css";

export default function Landing() {
    return (
        <div className={style.container}>
            <div className={style.arrowL}></div>
            <Link to="/home">
                <button>ENJOY THE WORLD</button>
            </Link>
            <div className={style.arrow}></div>
        </div>
    );
}
