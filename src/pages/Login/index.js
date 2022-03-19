import style from "./style/Login.module.css";

// icon
import {} from "react-feather";
import Head from "next/head";

//
import { useState } from "react";
import api from "../../config/api";

export default function Login() {
  const [clicked, setBtnClick] = useState(false);

  /**
   * This function will set the state of the button to true, which will trigger the button to be
   * disabled.
   * Then it will redirect the user to the login page
   */
  function handleLogin() {
    setBtnClick(true);
    window.location.href = `${api.backend}/login`;
  }

  return (
    <>
      <Head>
        <title>Lanjutkan dengan Spotify hanyan dengan 1 kali klik</title>
        <meta
          name="description"
          content="Lanjutkan dengan akun spotify mu hanya dengan 1 kali klik"
        />
      </Head>
      <div className={style.container}>
        <div className={style.wrapper}>
          <small className="label">Login</small>
          <h3 className="header-1">Lanjutkan dengan akun Spotify</h3>

          <button
            onClick={() => handleLogin()}
            type="button"
            className={style.btn_login}
            disabled={clicked}
          >
            <span>{clicked ? "Loading..." : "Hubungkan ke Spotify"}</span>{" "}
            <img src="/icon/spotify.svg" alt="spotify" />
          </button>
        </div>
      </div>
    </>
  );
}
