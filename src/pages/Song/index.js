import style from "./style/Song.module.css";

// component
import { ListData } from "../../molekul";
import MainTemplate from "../../templates/Main";
import Head from "next/head";

// state management

// state management
import { useState, useEffect } from "react";
import stateManagement from "../../config/stateManagement";
import Cookies from "js-cookie";
import Null from "../../molekul/Null";

export default function Song({ Success, Data, PlaylistName, PlayListId }) {
  const [popUpPosition, setPosition] = useState(-200);
  const [tracks, setTracks] = useState([]);
  const [trackName, setTrackName] = useState("");

  useEffect(() => {
    ProcessData();
    getCurrentTrack();
  }, []);

  /**
   * If the user is logged in,
   * then we will set the global variable "Success" to true. If the user is not
   * logged in, then we will redirect them to the login page
   */
  function ProcessData() {
    if (Success) {
      if (Data.items.length > 0) {
        setTracks(Data.items);
      }

      listenEvent();
    } else {
      window.location.href = "/login";
    }
  }

  /**
   * It subscribes to the state management and listens for any changes.
   */
  function listenEvent() {
    stateManagement.subscribe(() => {
      const state = stateManagement.getState();
      console.log(state);
      if (state.type === "delete_track") {
        setPosition(0);
        setTrackName(state.trackName);
      }
    });
  }

  /**
   * It fetches the tracks from the playlist and sets the tracks state to the fetched tracks
   */
  function getCurrentTrack() {
    fetch(`https://api.spotify.com/v1/playlists/${PlayListId}/tracks`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("access_token")}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setTracks(res.items);
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  function deleteTracks(trackid, playlistid) {
    fetch(`https://api.spotify.com/v1/playlists/${playlistid}/tracks`);
  }

  return (
    <MainTemplate page="song">
      <Head>
        <title>Playlist {PlaylistName}</title>
      </Head>
      <div className="mt-5">
        <small className="label">Lagu dari playlist</small>
        <h1 className="header-1">
          {PlaylistName} ({tracks.length.toLocaleString()})
        </h1>

        <div className="mt-5">
          {tracks.length > 0 ? (
            tracks.map((items, i) => (
              <ListData
                name={items.track.name}
                image={
                  items.track.album.images.length > 0
                    ? items.track.album.images[0].url
                    : "/icon/music-placeholder.svg"
                }
                no={i}
                key={i}
                icon="/icon/trash.svg"
                type={"track"}
                uri={items.track.uri}
              />
            ))
          ) : (
            <Null message={"Belum ada lagu yang ditambahkan"} />
          )}
        </div>
      </div>

      {/* popup hapus */}
      <div className={style.popup} style={{ top: `${popUpPosition}%` }}>
        <div className={style.popup_content}>
          <small>
            apakah anda yakin ingin menghapus <b>{trackName}</b>?
          </small>
          <span className={style.delete}>Hapus</span>
          <span onClick={() => setPosition(-200)} className={style.cancel}>
            Batal
          </span>
        </div>
      </div>
    </MainTemplate>
  );
}
