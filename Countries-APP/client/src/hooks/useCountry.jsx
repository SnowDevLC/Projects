import { useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import {getCountryDetail, cleanDetail} from "../redux/actions";

const useCountry = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const country = useSelector((state) => state.countryDetail);

    useEffect(() => {
        dispatch(getCountryDetail(id));
        return () => {
            dispatch(cleanDetail());
        };
    }, [dispatch, id]);

    return country;
};

export default useCountry;