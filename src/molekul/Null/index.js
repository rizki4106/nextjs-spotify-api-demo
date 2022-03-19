import style from "./style/Null.module.css";

export default function Null({ message }) {
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <img src="/icon/null.svg" alt="null" />
        <h4>Kosong</h4>
        <small>{message}</small>
      </div>
    </div>
  );
}
