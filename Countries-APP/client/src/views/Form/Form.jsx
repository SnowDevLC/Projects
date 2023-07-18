import { useState, useEffect } from "react";
import validate from "../../utils/validate";
import axios from "axios";
import { URL_BASE } from "../../utils/const";
import { useDispatch, useSelector } from "react-redux";
import { SearchBar } from "../../components";
import { getCountryByName } from "../../redux/actions";
import style from "./Form.module.css";

export default function Form() {
    const dispatch = useDispatch();
    const countries = useSelector((state) => state.countries);

    const [showCountries, setShowCountries] = useState("");

    const [input, setInput] = useState({
        name: "",
        difficulty: 1,
        duration: 0.1,
        season: "",
        countries: [],
    });

    const [errors, setErrors] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countries: "",
    });

    //DESABILITAR EL BOTON SUBMIT SI HAY ERRORES
    const [send, setSend] = useState(false);
    useEffect(() => {
        let value = Object.keys(errors).length === 0;
        setSend(value);
    }, [errors]);

    const handleChangeSearch = (event) => {
        event.preventDefault();
        const value = event.target.value;
        dispatch(getCountryByName(value, "All", "allActivities"));
        setShowCountries(value.trim());
    };

    const handleClick = (countryId) => {
        setInput({ ...input, countries: [...input.countries, countryId] });
    };

    const handleChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value,
        });
        setErrors(
            validate({
                ...input,
                [event.target.name]: event.target.value,
            })
        );
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (Object.keys(errors).length === 0) {
            axios.post(`${URL_BASE}/activities`, input);
            setErrors({});
        }
        setInput({
            name: "",
            difficulty: 1,
            duration: 0.1,
            season: "",
            countries: [],
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Name: </label>
                <input
                    type="text"
                    name="name"
                    value={input.name}
                    onChange={handleChange}
                />
                {errors.name && <p>{errors.name}</p>}

                <label>Difficulty: </label>
                <input
                    name="difficulty"
                    value={input.difficulty}
                    onChange={handleChange}
                />

                <label>Duartion: </label>
                <input
                    type="text"
                    name="duration"
                    value={input.duration}
                    onChange={handleChange}
                />
                {errors.duration && <p>{errors.duration}</p>}

                <label>Season: </label>
                <input
                    type="text"
                    name="season"
                    value={input.season}
                    onChange={handleChange}
                />
                {errors.season && <p>{errors.season}</p>}

                <label>Countries: </label>
                <SearchBar handleChange={handleChangeSearch} />
                <div className={style.container}>
                    {showCountries &&
                        countries.map((country) => (
                            <div key={country.id}>
                                <button
                                    type="button"
                                    onClick={() => handleClick(country.id)}
                                >
                                    {country.name}
                                </button>
                            </div>
                        ))}
                    <p>{input.countries.join(" - ")}</p>
                </div>

                {errors.countries && <p>{errors.countries}</p>}

                <button disabled={!send} type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}
