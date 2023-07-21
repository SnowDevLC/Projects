import style from "./Loader.module.css";

export default function Loader() {
    const handleClick = () => {};

    return (
        <div className={style.msgContainer}>
            <div className={style.msgContent}>
                <button className={style.btn} onClick={handleClick}>
                    X
                </button>
                <div className={style.errorMessage}>Cargando</div>
            </div>
        </div>
    );
}
