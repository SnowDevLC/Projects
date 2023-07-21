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
    const [difficulty, setDifficulty] = useState(1);

    const [input, setInput] = useState({
        name: "",
        difficulty: 1,
        duration: 0,
        season: [],
        countries: [],
        search: "",
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
        setInput({ ...input, search: value });
        dispatch(getCountryByName(value, "All", "allActivities"));
        setShowCountries(value.trim());
    };

    const handleClick = (countryId, countryName, countryFlag) => {
        const findCountry = input.countries.find((country) => country.id === countryId);
        if (findCountry) {
            window.alert(`El país ${countryName} ya ha sido agregado.`);
        } else {
            setInput({
                ...input,
                countries: [...input.countries, { id: countryId, name: countryName, flag: countryFlag }],
            });
            setErrors(
                validate({
                    ...input,
                    countries: [...input.countries, { id: countryId }],
                })
            );
        }
    };

    const handleDelete = (countryId) => {
        const filterInput = input.countries.filter((country) => country.id !== countryId);
        setInput({ ...input, countries: filterInput });
        setErrors(
            validate({
                ...input,
                countries: filterInput,
            })
        );
    };

    const handleChange = (event) => {
        if (event.target.name === "difficulty") {
            setDifficulty(event.target.value);
        }
        if (event.target.name === "season") {
            const value = event.target.value;
            const checked = event.target.checked;
            let updatedSeasons = [...input.season];

            if (checked) {
                updatedSeasons.push(value);
            } else {
                updatedSeasons = updatedSeasons.filter((season) => season !== value);
            }

            setInput({
                ...input,
                season: updatedSeasons,
            });
            setErrors(
                validate({
                    ...input,
                    season: updatedSeasons,
                })
            );
        } else {
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
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (Object.keys(errors).length === 0) {
            try {
                const response = await axios.post(`${URL_BASE}/activities`, input);
                if (response.status === 200) {
                    window.alert("The activity was added successfully");
                    setErrors({});
                    setInput({
                        name: "",
                        difficulty: 1,
                        duration: 0,
                        season: [],
                        countries: [],
                        search: "",
                    });
                    setShowCountries("");
                    setDifficulty(1);
                }
            } catch (error) {
                window.alert(error.response.data);
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className={style.containerForm}>
                <div className={style.containerLeft}>
                    <div className={style.inputContainer}>
                        <label className={style.labelD}>Name*</label>
                        <input
                            type="text"
                            name="name"
                            value={input.name}
                            onChange={handleChange}
                            placeholder="name of the activity"
                            required
                        />
                    </div>
                    <p className={style.danger}>{errors.name}</p>
                    <div className={style.difficulty}>
                        <label className={style.labelD}>Difficulty</label>
                        <span className={style.number}>{difficulty}</span>
                        <input
                            type="range"
                            min="1"
                            max="5"
                            name="difficulty"
                            value={input.difficulty}
                            onChange={handleChange}
                            list="tickmarks"
                        />
                        <datalist id="tickmarks">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </datalist>
                    </div>
                    <div className={style.inputContainer}>
                        <label className={style.labelD}>Duration* (hrs)</label>
                        <input
                            type="number"
                            step="0.5"
                            name="duration"
                            value={input.duration}
                            onChange={handleChange}
                        />
                    </div>
                    <p className={style.danger}>{errors.duration}</p>

                    <div className={style.season}>
                        <p>Season*</p>
                        <div className={style.labels}>
                            <label>
                                <input
                                    type="checkbox"
                                    name="season"
                                    value="Verano"
                                    checked={input.season.includes("Verano")}
                                    onChange={handleChange}
                                />
                                Verano
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="season"
                                    value="Primavera"
                                    checked={input.season.includes("Primavera")}
                                    onChange={handleChange}
                                />
                                Primavera
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="season"
                                    value="Invierno"
                                    checked={input.season.includes("Invierno")}
                                    onChange={handleChange}
                                />
                                Invierno
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="season"
                                    value="Otoño"
                                    checked={input.season.includes("Otoño")}
                                    onChange={handleChange}
                                />
                                Otoño
                            </label>
                        </div>
                    </div>
                    <p className={style.danger}>{errors.season}</p>

                    <button disabled={!send} type="submit" className={style.submit}>
                        Create Activity
                    </button>
                    <p className={style.danger}>* required to create</p>
                </div>
                <div className={style.containerCenter}>
                    <div className={style.countries}>
                        <label>Countries*</label>
                        <SearchBar handleChange={handleChangeSearch} value={input.search} />
                    </div>
                    {showCountries &&
                        countries.map((country) => (
                            <div key={country.id} className={style.searchList}>
                                <img src={country.flag}></img>
                                <span>{country.name}</span>
                                <button
                                    type="button"
                                    onClick={() => handleClick(country.id, country.name, country.flag)}
                                    className={style.addCountry}
                                >
                                    +
                                </button>
                            </div>
                        ))}

                    <p className={style.danger}>{errors.countries}</p>
                </div>

                <div className={style.containerRight}>
                    {input.countries.length > 0 && <label>Selected Countries</label>}
                    {input.countries?.map((country, index) => (
                        <div key={index} className={style.searchList}>
                            <img src={country.flag}></img>
                            <span>{country.name}</span>
                            <button
                                type="button"
                                onClick={() => handleDelete(country.id)}
                                className={style.deleteCountry}
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>
            </form>
        </div>
    );
}
