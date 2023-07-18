import useCountry from "../../hooks/useCountry";

export default function Detail() {
  const country = useCountry();
  return (
    <div>
      {typeof country === "string" ? <p>{country}</p> : 
        country.name ? (
        <>
          <div>
            <h1>{country.name}</h1>
            <h2>ID ⇒ {country.id}</h2>
            <h2>NAME ⇒ {country.name}</h2>
            <h2>CONTINENT ⇒ {country.continent}</h2>
            <h2>CAPITAL ⇒ {country.capital}</h2>
            <h2>SUBREGIÓN ⇒ {country.subregion}</h2>
            <h2>ÁREA ⇒ {country.area}</h2>
            <h2>POPULATION ⇒ {country.population}</h2>
            <h2>ACTIVITIES ⇒ </h2>
            {country.Activities?.map((activity) => (
              <div key={activity.id}>
                <h4>Name: {activity.name}</h4>
                <h4>Difficulty: {activity.difficulty}</h4>
                <h4>Duration: {activity.duration}</h4>
                <h4>Season: {activity.season}</h4>
              </div>
            ))

            }
          </div>
          <div>
            <img src={country.flag} alt={country.name} />
          </div>
        </>
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
}
