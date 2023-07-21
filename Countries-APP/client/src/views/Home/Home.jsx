import { useEffect } from "react";
import { Cards, SearchBar } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getActivities, getCountries, getCountryByName, setCurrentPage, setFilters } from "../../redux/actions";

import style from "./Home.module.css";

export default function Home() {
    const countries = useSelector((state) => state.filteredCountries);
    const activities = useSelector((state) => state.activities);
    const filters = useSelector((state) => state.filters);

    const dispatch = useDispatch();

    const defaultContinent = "All";
    const defaultActivity = "allActivities";
    const defaultOrder = "Default";

    //? FILTRO BY NAME
    const handleChange = (e) => {
        e.preventDefault();
        const value = e.target.value;
        dispatch(getCountryByName(value, filters.continent, filters.activity));
        dispatch(setFilters({ ...filters, search: value, order: "Default" }));
    };

    useEffect(() => {
        dispatch(getActivities());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
            dispatch(getCountries())
            .then(() => dispatch(setFilters(filters)))
            .then(() => dispatch(getCountryByName(filters.search, filters.continent, filters.activity)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const handleFilter = (e) => {
        dispatch(setCurrentPage(1));
        if (e.target.name === "continent") {
            dispatch(setFilters({ ...filters, continent: e.target.value }));
        } else if (e.target.name === "activity"){
            dispatch(setFilters({ ...filters, activity: e.target.value }));
        } else {
            dispatch(setFilters({ ...filters, order: e.target.value }));
        }
    };

    const handleReset = () => {
        const filtersB = {
            continent: defaultContinent,
            activity: defaultActivity,
            order: defaultOrder,
            search: "",
        };
        dispatch(setFilters(filtersB));
        dispatch(getCountryByName("", "All", "allActivities"));
    };
    return (
        <div className={style.container}>
            <div className={style.content}>
                <aside className={style.filters}>
                    <div className={style.selects}>
                        <span>By Continent</span>
                        <select onChange={handleFilter} value={filters.continent} name="continent">
                            <option value="All">All</option>
                            <option value="Africa">Africa</option>
                            <option value="America">America</option>
                            <option value="Antarctica">Antarctica</option>
                            <option value="Asia">Asia</option>
                            <option value="Europe">Europe</option>
                            <option value="Oceania">Oceania</option>
                        </select>
                        <span>By Activity</span>
                        <select onChange={handleFilter} value={filters.activity} name="activity">
                            <option value="allActivities">All</option>
                            {activities?.map((activity, index) => (
                                <option key={index} value={activity.name}>
                                    {activity.name}
                                </option>
                            ))}
                        </select>
                        <span>By Alphabet</span>
                        <select onChange={handleFilter} value={filters.order} name="alphabet">
                            <option value="Default">Default</option>
                            <option value="A">A-Z</option>
                            <option value="Z">Z-A</option>
                        </select>
                        <span>By Population</span>
                        <select onChange={handleFilter} value={filters.order} name="population">
                            <option value="Default">Default</option>
                            <option value="H">Higher</option>
                            <option value="L">Lower</option>
                        </select>

                        <button type="button" onClick={handleReset}>
                            Reset
                        </button>
                    </div>
                </aside>
                <div className={style.cards}>
                    <div className={style.search}>
                        <SearchBar handleChange={handleChange} value={filters.search} />
                    </div>
                    <Cards countries={countries} />
                </div>
            </div>
        </div>
    );
}
