import "./topics.css";
import List from "../list/List";

export default function Topics({ topics, show, setShow, nameTop, setNameTop }) {
  let out;
  if (show) {
    out = <List topics={topics} nameTop={nameTop} setNameTop={setNameTop} />;
  } else {
    out = (
      <div className="list">
        <ul>
          {topics.map((item) => {
            return <li onClick={(e) => handlerClick(e)}>{item.nameTop}</li>;
          })}
        </ul>
      </div>
    );
  }

  function handlerClick(e) {
    setNameTop(e.target.innerHTML);
    setShow(true);
  }

  return out;
}
