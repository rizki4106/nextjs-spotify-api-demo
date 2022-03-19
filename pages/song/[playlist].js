import cookie from "cookie";

import { Song } from "../../src/pages";

export default function SongPage({ success, playlist, data, playlist_id }) {
  return (
    <Song
      Success={success}
      Data={data}
      PlaylistName={playlist}
      PlayListId={playlist_id}
    />
  );
}

export async function getServerSideProps(ctx) {
  try {
    const { access_token } = cookie.parse(ctx.req.headers.cookie);
    const req = await fetch(
      `https://api.spotify.com/v1/playlists/${ctx.params.playlist}/tracks`,
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
          success: true,
          playlist: ctx.query.playlist_name || "",
          data: res || [],
          playlist_id: ctx.params.playlist,
        },
      };
    } else {
      return {
        props: {
          success: false,
          playlist: "",
          data: [],
          playlist_id: "",
        },
      };
    }
  } catch (err) {
    return {
      props: {
        success: false,
        playlist: "",
        data: [],
        playlist_id: "",
      },
    };
  }
}
