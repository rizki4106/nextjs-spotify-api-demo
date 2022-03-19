import style from "./style/Home.module.css";

// component
import { ListData } from "../../molekul";
import MainTemplate from "../../templates/Main";

//
import { useEffect, useState } from "react";
import Head from "next/head";
import Null from "../../molekul/Null";

export default function Home({ PlayList, Success }) {
  const [listPlay, setPlayList] = useState([]);

  useEffect(() => {
    ProcessData();
  }, []);

  function ProcessData() {
    if (Success) {
      setPlayList(PlayList.items);
    } else {
      // window.location.href = "/login";
    }
  }

  return (
    <MainTemplate page={"home"}>
      <Head>
        <title>Your Own Public Playlist</title>
      </Head>
      <div className="mt-5">
        <small className="label">Data</small>
        <h1 className="header-1">Playlist Spotify</h1>
        <div className="mt-5">
          {listPlay.length > 0 ? (
            (listPlay || []).map((items, i) => (
              <ListData
                id={items.id}
                name={items.name}
                key={i}
                no={i}
                image={
                  items.images.length > 0
                    ? items.images[0].url
                    : "/icon/music-placeholder.svg"
                }
                icon="/icon/playlist.svg"
                type={"playlist"}
              />
            ))
          ) : (
            <Null message={"Kamu belum membuat playlist public"} />
          )}
        </div>
      </div>
    </MainTemplate>
  );
}
