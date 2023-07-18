import axios from "axios";
import { URL_BASE } from "../utils/const";


export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRY_DETAIL = "GET_COUNTRY_DETAIL";
export const CLEAN_DETAIL = "CLEAN_DETAIL";
export const GET_COUNTRY_BY_NAME = "GET_COUNTRY_BY_NAME";
export const ORDER = "ORDER";
export const SET_FILTERS = "SET_FILTERS";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";


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
            
        }
    };
};

export const orderCountries = (orden) => {
    return { type: ORDER, payload: orden };
};

export const setFilters = (filters) => {
    return { type: SET_FILTERS, payload: filters };
};

export const setCurrentPage = (page) => {
    return { type: SET_CURRENT_PAGE, payload: page };
};
