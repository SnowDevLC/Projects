import { Card, Loader } from "..";
import { useSelector, useDispatch } from "react-redux";
import style from "./Cards.module.css";
import { setCurrentPage } from "../../redux/actions";
/* eslint-disable react/prop-types */
export default function Cards({ countries }) {
    const dispatch = useDispatch();

    const loader = useSelector((state) => state.loader);

    const currentPage = useSelector((state) => state.currentPage);
    const countriesPerPage = 10;

    // Calcula los índices de inicio y fin para los países de la página actual
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const currentCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry);

    const totalPages = Math.ceil(countries.length / countriesPerPage);

    //IR DIRECTO A UNA PAGINA ESPECIFICA
    const goToPage = (pageNumber) => {
        dispatch(setCurrentPage(pageNumber));
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            dispatch(setCurrentPage(currentPage - 1));
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            dispatch(setCurrentPage(currentPage + 1));
        }
    };

    if (loader.show) {
        return (
            <>
                <Loader />
            </>
        );
    }

    return (
        <>
            {currentCountries.length === 0 ? (
                <div className={style.noCountries}>
                    <h2>No countries available with those filters</h2>
                </div>
            ) : (
                <div className={style.container}>
                    {currentCountries?.map((country) => (
                        <Card key={country.id} country={country} />
                    ))}
                </div>
            )}
            <div className={style.pagination}>
                {currentPage > 1 && <button onClick={goToPreviousPage}>{"<"}</button>}

                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => goToPage(i + 1)}
                        className={currentPage === i + 1 ? style.active : ""}
                    >
                        {i + 1}
                    </button>
                ))}

                {currentPage < totalPages && <button onClick={goToNextPage}>{">"}</button>}
            </div>
        </>
    );
}
