import axios from "axios";
import { URL_BASE } from "../utils/const";

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const GET_COUNTRY_DETAIL = "GET_COUNTRY_DETAIL";
export const CLEAN_DETAIL = "CLEAN_DETAIL";
export const GET_COUNTRY_BY_NAME = "GET_COUNTRY_BY_NAME";
export const SET_FILTERS = "SET_FILTERS";
export const SET_SEARCH = "SET_SEARCH";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const SET_LOADER = "SET_LOADER";

export const getCountries = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${URL_BASE}/countries`);
            return dispatch({
                type: GET_COUNTRIES,
                payload: data,
            });
        } catch (error) {
            console.log(error.response.data);
        }
        
    };
};

export const getActivities = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${URL_BASE}/activities`);
            return dispatch({
                type: GET_ACTIVITIES,
                payload: data,
            });
        } catch (error) {
            console.log(error.response.data);
        }
    };
};

export const getCountryDetail = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${URL_BASE}/countries/${id}`);
            return dispatch({
                type: GET_COUNTRY_DETAIL,
                payload: data,
            });
        } catch (error) {
            return dispatch({
                type: GET_COUNTRY_DETAIL,
                payload: error.response.data,
            });
        }
    };
};

export const cleanDetail = () => {
    return { type: CLEAN_DETAIL };
};

export const getCountryByName = (name, continent, activity) => {
    return async (dispatch) => {
        try {
            dispatch(setLoader({show: true, message: "Loading"}));
            const { data } = await axios.get(
                `${URL_BASE}/countries/name?name=${name.trim()}&continent=${continent}&activity=${activity}`
            );
            return dispatch({
                type: GET_COUNTRY_BY_NAME,
                payload: data,
            });
        } catch (error) {
            return dispatch({
                type: GET_COUNTRY_BY_NAME,
                payload: [],
            });
        } finally {
            setTimeout(()=>dispatch(dispatch(setLoader({show: false, message: ""}))), 500);
        }
    };
};

export const setFilters = (filters) => {
    return { type: SET_FILTERS, payload: filters };
};

export const setSearch = (input) => {
    return { type: SET_SEARCH, payload: input };
};

export const setCurrentPage = (page) => {
    return { type: SET_CURRENT_PAGE, payload: page };
};

export const setLoader = (loader) => {
    return { type: SET_LOADER, payload: loader };
};
