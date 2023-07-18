import { useEffect, useState } from "react";
import { Cards, SearchBar } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, getCountryByName, orderCountries, setCurrentPage, setFilters} from "../../redux/actions";

import style from "./Home.module.css";

export default function Home() {
    const countries = useSelector((state) => state.filteredCountries);
    const order = useSelector((state) => state.order);
    const filters = useSelector((state) => state.filters);

    const dispatch = useDispatch();


    const [valueSearch, setValueSearch] = useState(filters.search);

    // const [selects, setSelects] = useState({
    //     continent: "All",
    //     activity: "allActivities",
    //     alphabet: "Default",
    //     population: "Default",
    // });

    const [selects, setSelects] = useState({
        continent: filters.continent,
        activity: filters.activity,
        alphabet: filters.alphabet,
        population: filters.population,
    });
    const defaultContinent = "All";
    const defaultActivity = "allActivities";
    const defaultAlphabet = "Default";
    const defaultPopulation = "Default";

    //? FILTRO BY NAME
    const handleChange = (e) => {
        e.preventDefault();
        const value = e.target.value;
        const filtersB = {...selects, search: value};
        dispatch(setFilters(filtersB));
        setValueSearch(value);
        dispatch(getCountryByName(value, selects.continent, selects.activity));
    };

    useEffect(() => {
        dispatch(getCountries()).then(() => {
            dispatch(getCountryByName(filters.search, filters.continent, filters.activity)).then(() => {
                dispatch(orderCountries(order));
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const handleOrder = (e) => {
        let filtersB = {};
        dispatch(orderCountries(e.target.value));
        dispatch(setCurrentPage(1));
        if (e.target.name === "alphabet") {
            setSelects({ ...selects, population: defaultPopulation, [e.target.name]: e.target.value });
            filtersB = ({ ...selects, population: defaultPopulation, [e.target.name]: e.target.value });
        } else if (e.target.name === "population") {
            setSelects({ ...selects, alphabet: defaultAlphabet, [e.target.name]: e.target.value });
            filtersB = ({ ...selects, alphabet: defaultAlphabet, [e.target.name]: e.target.value });
        } /* else {
            setSelects({ ...selects, [e.target.name]: e.target.value });
            setSelects({ ...selects, [e.target.name]: e.target.value });
        } */
        dispatch(setFilters(filtersB));
    };

    const handleFilter = (e) => {
        let filtersB = {};
        dispatch(setCurrentPage(1));
        if (e.target.name === "continent") {
            const continent = e.target.value;
            filtersB = { ...selects, continent: continent };
            setSelects({ ...selects, continent: continent });
            dispatch(getCountryByName(valueSearch, continent, selects.activity)).then(() => {
                dispatch(orderCountries(order));
            });
        } else {
            const activity = e.target.value;
            filtersB = { ...selects, activity: activity };
            setSelects({ ...selects, activity: activity });
            dispatch(getCountryByName(valueSearch, selects.continent, activity)).then(() => {
                dispatch(orderCountries(order));
            });
        }
        dispatch(setFilters(filtersB));
    };

    const handleReset = () => {
        setSelects({
            continent: defaultContinent,
            activity: defaultActivity,
            alphabet: defaultAlphabet,
            population: defaultPopulation,
        });
        setValueSearch("");
        const filtersB = {
            continent: defaultContinent,
            activity: defaultActivity,
            alphabet: defaultAlphabet,
            population: defaultPopulation,
            search: ""
        }
        dispatch(setFilters(filtersB));
        dispatch(getCountryByName("", "All", "allActivities")).then(() => {
            dispatch(orderCountries("Default"));
        });
    };
    return (
        <div className={style.container}>
            <h1>COUNTRIES APP</h1>
            <div className={style.content}>
                <aside className={style.filters}>
                    <div className={style.selects}>
                        <span>By Continent</span>
                        <select onChange={handleFilter} value={selects.continent} name="continent">
                            <option value="All">All</option>
                            <option value="Africa">Africa</option>
                            <option value="America">America</option>
                            <option value="Antarctica">Antarctica</option>
                            <option value="Asia">Asia</option>
                            <option value="Europe">Europe</option>
                            <option value="Oceania">Oceania</option>
                        </select>
                        <span>By Activity</span>
                        <select onChange={handleFilter} value={selects.activity} name="activity">
                            <option value="allActivities">All</option>
                            <option value="Futbol">Futbol</option>
                            <option value="Basquet">Basquet</option>
                        </select>
                        <span>By Alphabet</span>
                        <select onChange={handleOrder} value={selects.alphabet} name="alphabet">
                            <option value="Default">Default</option>
                            <option value="A">Ascendente</option>
                            <option value="D">Descendente</option>
                        </select>
                        <span>By Population</span>
                        <select onChange={handleOrder} value={selects.population} name="population">
                            <option value="Default">Default</option>
                            <option value="H">Higher Population</option>
                            <option value="L">Lower Population</option>
                        </select>

                        <button type="button" onClick={handleReset}>
                            Reset
                        </button>
                    </div>
                </aside>
                <div className={style.cards}>
                    <div className={style.search}>
                        <SearchBar handleChange={handleChange} value={valueSearch} />
                    </div>
                    <Cards countries={countries} />
                </div>
            </div>
        </div>
    );
}
