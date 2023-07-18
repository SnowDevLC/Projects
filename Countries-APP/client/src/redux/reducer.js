import {
    GET_COUNTRIES,
    GET_COUNTRY_DETAIL,
    CLEAN_DETAIL,
    GET_COUNTRY_BY_NAME,
    ORDER,
    SET_FILTERS,
    SET_CURRENT_PAGE,
} from "./actions";

const initialState = {
    countries: [],
    filteredCountries: [],
    filteredCountriesDefault: [],
    countryDetail: {},
    currentPage: 1,
    order: "Default",
    filters: {
        continent: "All",
        activity: "allActivities",
        alphabet: "Default",
        population: "Default",
        search: ""
    }
};

const rootReducer = (state = initialState, action) => {
    let orderedCountries = [...state.filteredCountries];
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                filteredCountries: action.payload,
                filteredCountriesDefault: action.payload,
            };
        case GET_COUNTRY_DETAIL:
            return {
                ...state,
                countryDetail: action.payload,
            };
        case CLEAN_DETAIL:
            return {
                ...state,
                countryDetail: {},
            };
        case GET_COUNTRY_BY_NAME:
            return {
                ...state,
                countries: action.payload,
                filteredCountries: action.payload,
                filteredCountriesDefault: action.payload,
            };
        case SET_FILTERS:
            return {
                ...state,
                filters: action.payload
            }
        case ORDER:
            switch (action.payload) {
                case "A":
                case "D":
                    orderedCountries.sort((a, b) => {
                        const nameA = a.name.toLowerCase();
                        const nameB = b.name.toLowerCase();
                        return action.payload === "A"
                            ? nameA.localeCompare(nameB)
                            : nameB.localeCompare(nameA);
                    });
                    break;
                case "H":
                case "L":
                    orderedCountries.sort((a, b) => {
                        return action.payload === "H"
                            ? b.population - a.population
                            : a.population - b.population;
                    });
                    break;
                default:
                    orderedCountries = state.filteredCountriesDefault;
                    break;
            }
            return {
                ...state,
                filteredCountries: orderedCountries,
                order: action.payload
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload,
            };
        default:
            return { ...state };
    }
};

export default rootReducer;
