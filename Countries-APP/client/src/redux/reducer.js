import {
    GET_COUNTRIES,
    GET_ACTIVITIES,
    GET_COUNTRY_DETAIL,
    CLEAN_DETAIL,
    GET_COUNTRY_BY_NAME,
    SET_FILTERS,
    SET_SEARCH,
    SET_CURRENT_PAGE,
    SET_LOADER,
} from "./actions";

const initialState = {
    countries: [],
    countriesCopy: [],
    activities: [],
    filteredCountries: [],
    filteredCountriesDefault: [],
    countryDetail: {},
    currentPage: 1,
    filters: {
        continent: "All",
        activity: "allActivities",
        order: "Default",
        search: "",
    },
    searchInput: "",
    loader: { show: false, message: "" },
};

const rootReducer = (state = initialState, action) => {
    let countriesByFilters = [...state.countriesCopy];
    let orderedCountries = [...state.filteredCountries];
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                countriesCopy: action.payload,
                filteredCountries: action.payload,
                filteredCountriesDefault: action.payload,
            };
        case GET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload,
            };
        case GET_COUNTRY_BY_NAME:
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
        
        case SET_FILTERS:
            if(action.payload.continent !== "All"){
                orderedCountries = countriesByFilters.filter((country) => country.continent === action.payload.continent);   
            }else{
                orderedCountries = countriesByFilters;
            }
            if(action.payload.activity !== "allActivities"){
                orderedCountries = orderedCountries.filter((country) => country.Activities.some((activity) => activity.name === action.payload.activity));
            }
            switch (action.payload.order) {
                case "A":
                case "Z":

                    orderedCountries.sort((a, b) => {
                        const nameA = a.name.toLowerCase();
                        const nameB = b.name.toLowerCase();
                        return action.payload.order === "A" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
                    });
                    break;
                case "H":
                case "L":
                    orderedCountries.sort((a, b) => {
                        return action.payload.order === "H" ? b.population - a.population : a.population - b.population;
                    });
                    break;
            }

            return {
                ...state,
                filters: action.payload,
                filteredCountries: orderedCountries,
            };
        case SET_SEARCH:
            return {
                ...state,
                searchInput: action.payload,
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload,
            };
        case SET_LOADER:
            return {
                ...state,
                loader: action.payload,
            };
        default:
            return { ...state };
    }
};

export default rootReducer;
