import { Home } from "../src/pages";
import cookie from "cookie";

export default function HomePage({ playlist, success }) {
  return <Home PlayList={playlist} Success={success} />;
}

export async function getServerSideProps(ctx) {
  try {
    const { access_token } = cookie.parse(ctx.req.headers.cookie);

    // request user
    const req_user = await fetch(`https://api.spotify.com/v1/me`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const user = await req_user.json();

    // get user playlist
    const req = await fetch(
      `https://api.spotify.com/v1/users/${user.id}/playlists`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const res = await req.json();

    if (req.status === 200) {
      return {
        props: {
          playlist: res || [],
          success: true,
        },
      };
    } else {
      return {
        props: {
          playlist: [],
          success: false,
        },
      };
    }
  } catch (err) {
    return {
      props: {
        playlist: [],
        success: false,
      },
    };
  }
}
