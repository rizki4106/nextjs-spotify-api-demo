import style from "./style/Main.module.css";

// component
import { Navbar } from "../../molekul";

export default function MainTemplate({ children, page }) {
  return (
    <div className="container">
      <div className={style.wrapper}>
        {/* profile info */}
        <div className={style.playlist}>
          <div className={style.playlistWrapper}>
            {/* navigation */}
            <Navbar page={page} />

            {/* main body */}
            {children}
            {/*  */}
          </div>
        </div>
      </div>
    </div>
  );
}
