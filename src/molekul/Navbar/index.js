import style from "./style/Navbar.module.css";

// component
import Link from "next/link";

// icon
import { ChevronDown } from "react-feather";

//
import cookie from "js-cookie";
import { useEffect, useState } from "react";
import jsCookie from "js-cookie";

export default function Navbar({ page }) {
  const [user, setUser] = useState({ images: [{ url: "" }] });

  useEffect(() => {
    getUser();
  }, []);

  /**
   * Get the user's data from the cookie and set the user object to the state
   */
  async function getUser() {
    const userCookie = cookie.get("access_token");
    if (userCookie !== undefined) {
      const req = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${userCookie}`,
        },
      });

      const res = await req.json();

      if (req.status === 200) {
        setUser(res);
      } else {
        window.location.href = "/login";
      }
    } else {
      window.location.href = "/login";
    }
  }

  /**
   * This function is used to log out the user. It removes the access token from the cookie and redirects
   * the user to the login page
   */
  function handleLogOut() {
    jsCookie.remove("access_token");
    window.location.href = "/login";
  }

  return (
    <nav className={style.navigation}>
      <Link href="/">
        <a className={page === "home" ? style.activeLink : style.nonActiveLink}>
          Home
        </a>
      </Link>
      {/* <Link href="/">
          <a className="btn btn-primary btn-sm">login</a>
        </Link> */}
      <div className={style.profile}>
        <img className={style.profileImg} src={user.images[0].url} />
        <span>{user.display_name}</span>
        <ChevronDown color="#363636" size={14} />

        <div className={style.user_action}>
          <span>Profile</span>
          <span onClick={() => handleLogOut()}>Log Out</span>
        </div>
      </div>
    </nav>
  );
}
