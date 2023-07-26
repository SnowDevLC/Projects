import useCountry from "../../hooks/useCountry";
import style from "./Detail.module.css";

export default function Detail() {
    const country = useCountry();
    return (
        <div className={`${style.container} ${style.spinIn}`}>
            {typeof country === "string" ? (
                <p>{country}</p>
            ) : country.name ? (
                <>
                    <div className={style.country}>
                        <img src={country.flag} alt={country.name} />
                        <h1>{country.name}</h1>
                        <h2>ID ⇒ {country.id}</h2>
                        <h2>NAME ⇒ {country.name}</h2>
                        <h2>CONTINENT ⇒ {country.continent}</h2>
                        <h2>CAPITAL ⇒ {country.capital}</h2>
                        <h2>SUBREGIÓN ⇒ {country.subregion}</h2>
                        <h2>ÁREA ⇒ {country.area}</h2>
                        <h2>POPULATION ⇒ {country.population}</h2>
                    </div>
                    <div className={style.activities}>
                        <h2>ACTIVITIES</h2>
                        <div className={style.activitiesGrid}>
                            {country.Activities && country.Activities.length > 0 ? (
                                country.Activities.map((activity) => (
                                    <div key={activity.id} className={style.activity}>
                                        <h3>Name: {activity.name}</h3>
                                        <h3>Difficulty: {activity.difficulty}</h3>
                                        <h3>Duration: {activity.duration} hrs</h3>
                                        <h3>Season: {activity.season.join(" - ")}</h3>
                                        <h3>Create by: {activity.createBy}</h3>
                                    </div>
                                ))
                            ) : (
                                <p>No activities found for this country</p>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <h3>Loading...</h3>
            )}
        </div>
    );
}
