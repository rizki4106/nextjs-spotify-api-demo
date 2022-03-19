import { serialize } from "cookie";
import api from "../../../src/config/api";

export default async function callback(req, res) {
  const { access_token, refresh_token } = req.query;

  // get new token
  const req_token = await fetch(
    `${api.backend}/refresh_token?refresh_token=${refresh_token}`
  );
  const res_token = await req_token.json();

  // expires dates
  const date = new Date();
  const day = 1000 * 60 * 60 * 24;
  const expires = new Date(date.getTime() + day);

  if (req_token.status === 200) {
    res.setHeader(
      "Set-Cookie",
      serialize("access_token", res_token.access_token, {
        expires: expires,
        path: "/",
      })
    );
    res.statusCode = 200;
    setTimeout(() => {
      res.redirect("/");
    }, 2000);
  }
}
