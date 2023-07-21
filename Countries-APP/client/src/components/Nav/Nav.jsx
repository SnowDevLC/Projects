import { Link } from "react-router-dom";
import style from "./Nav.module.css";
import logo from "../../assets/logo.png"

export default function Nav() {
    return (
        <div className={style.container}>
            <Link to="/home" className={style.link}>
            <div className={style.logo}>
                    <img src={logo}/>
                    <span>Countries APP</span>
            </div>
            </Link>
            <div>
            <Link to="/home"><button>HOME</button></Link>
            <Link to="/form"><button>CREATE ACTIVITIES</button></Link>
            </div>
        </div>
    );
}
