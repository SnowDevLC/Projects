import style from "./Card.module.css";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function Card({ country }) {
    return (
        <div className={style.card}>
            <Link to={`/detail/${country.id}`} className={style.link}>
                <img src={country.flag} alt={country.name} />
                <h2>{country.name}</h2>
                <h3>{country.continent}</h3>
            </Link>
        </div>
    );
}
