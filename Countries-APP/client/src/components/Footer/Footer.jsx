import style from "./Footer.module.css";
import github from "../../assets/github.png";
import linkedin from "../../assets/linkedin.png";

export default function Footer() {
    return (
        <footer className={style.footer}>
            <div className={style.container}>
                <div className={style.text}>
                    <h3>Developed by Luis Canales &copy; {new Date().getFullYear()}</h3>
                </div>
                <a href="https://www.linkedin.com/in/canalesluis9/" target="_blank" rel="noreferrer" className={style.profile}>
                    <img
                        src={linkedin}
                        alt="LinkedIn"
                    />
                </a>
                <a href="https://github.com/snowdevlc" target="_blank" rel="noreferrer" className={style.profile}>
                    <img
                        src={github}
                        alt="Github"
                    />
                </a>
            </div>
        </footer>
    );
}
