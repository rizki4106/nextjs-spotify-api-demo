import style from "./style/ListData.module.css";
import Link from "next/link";
import stateManagement from "../../config/stateManagement";

function PlayList({ id, name, image, icon, no }) {
  return (
    <div className={style.listPlaylist}>
      <Link href={`/song/${id}?playlist_name=${name}`}>
        <a className={style.box_data}>
          <span className={style.number}>{no + 1}</span>
          <img src={image} alt={name} className={style.data_img} />
          <div className={style.playListName}>
            <span>{name}</span>
          </div>
        </a>
      </Link>
      <div className={style.icon}>
        <img src={icon} alt={icon} />
      </div>
    </div>
  );
}

function Tracks({ id, name, image, icon, no, uri }) {
  /**
   * When the user clicks the delete button, the delete_track action is dispatched
   */
  function handleDelete() {
    stateManagement.dispatch({
      type: "delete_track",
      uri: uri,
      trackName: name,
    });
  }

  return (
    <div className={style.listPlaylist}>
      <div className={style.box_data}>
        <span className={style.number}>{no + 1}</span>
        <img src={image} alt={name} className={style.data_img} />
        <div className={style.playListName}>
          <span>{name}</span>
        </div>
      </div>
      <div onClick={() => handleDelete()} className={style.icon}>
        <img src={icon} alt={icon} />
      </div>
    </div>
  );
}

export default function ListData({ id, name, image, icon, no, uri, type }) {
  return type === "playlist" ? (
    <PlayList id={id} name={name} image={image} icon={icon} no={no} />
  ) : (
    <Tracks id={id} name={name} image={image} uri={uri} icon={icon} no={no} />
  );
}
