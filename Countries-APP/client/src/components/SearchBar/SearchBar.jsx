import style from "./SearchBar.module.css";
/* eslint-disable react/prop-types */
export default function SearchBar(props) {
    const { handleChange, value } = props;
    
    return (
        <div className={style.container}>
            <input
                value={value}
                type="search"
                onChange={handleChange}
                placeholder="Search by Name"
            />
        </div>
    );
}
