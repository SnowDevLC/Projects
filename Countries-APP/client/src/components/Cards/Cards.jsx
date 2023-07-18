import { Card } from "..";
import { useSelector, useDispatch } from "react-redux";
import style from "./Cards.module.css";
import { setCurrentPage } from "../../redux/actions";
/* eslint-disable react/prop-types */
export default function Cards({countries}) {
  const dispatch = useDispatch();

  const currentPage = useSelector((state) => state.currentPage);
  const countriesPerPage = 10;
  const maxPageDisplay = 5;

  // Calcula los índices de inicio y fin para los países de la página actual
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const totalPages = Math.ceil(countries.length / countriesPerPage);
  const startPage = Math.max(currentPage - Math.floor(maxPageDisplay / 2), 1);
  const endPage = Math.min(startPage + maxPageDisplay - 1, totalPages);

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

  return (
    <>
      {currentCountries.length === 0 ? (
        <h2>No hay países disponibles</h2>
      ) : (
        <div className={style.container}>
          {currentCountries?.map((country) => (
            <Card key={country.id} country={country} />
          ))}
        </div>
      )}
      <div className={style.pagination}>
        {currentPage > 1 && (
          <button onClick={goToPreviousPage}>{"<"}</button>
        )}
  
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
          <button
            key={startPage + i}
            onClick={() => goToPage(startPage + i)}
            className={currentPage === startPage + i ? style.active : ""}
          >
            {startPage + i}
          </button>
        ))}
  
        {currentPage < totalPages && (
          <button onClick={goToNextPage}>{">"}</button>
        )}
      </div>
    </>
  );
}
