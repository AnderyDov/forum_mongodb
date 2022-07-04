import "./form.css";
import { useState } from "react";

export default function Form({
  topics,
  setTopics,
  show,
  setShow,
  nameTop,
  setNameTop,
}) {
  let [nameUser, setNameUser] = useState("");
  let [text, setText] = useState("");

  let out;
  if (show) {
    out = (
      <div className="form">
        <fieldset>
          <legend>Form to add note</legend>
          <div>
            <input
              type="text"
              placeholder="введтите имя"
              value={nameUser}
              onChange={(e) => setNameUser(e.target.value)}
            />
          </div>
          <div>
            <textarea
              placeholder="введтите отзыв"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>
          <div>
            <input type="button" value="add note" onClick={addNote} />
          </div>
        </fieldset>
        <div>
          <button onClick={() => handlerBack()}>back</button>
        </div>
      </div>
    );
  } else {
    out = (
      <div className="form">
        <fieldset>
          <legend>Form to add topic</legend>
          <div>
            <input
              type="text"
              value={nameTop}
              onChange={(e) => setNameTop(e.target.value)}
              placeholder="введтите название торика"
            />
          </div>
          <div>
            <input type="button" value="add top" onClick={addTop} />
          </div>
        </fieldset>
      </div>
    );
  }

  function addTop() {
    fetch("/topics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json",
      },
      body: JSON.stringify({ nameTop: nameTop }),
    })
      .then((res) => (res = res.json()))
      .then((res) => setTopics([...topics, res]));
    setNameTop("");
  }

  function addNote() {
    fetch("/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json",
      },
      body: JSON.stringify({
        nameTop: nameTop,
        nameUser: nameUser,
        text: text,
      }),
    })
      .then((res) => (res = res.json()))
      .then((res) =>
        setTopics(
          [...topics].map((item) => {
            if (item.nameTop === nameTop) {
              item[nameTop] = res;
            }
            return item;
          })
        )
      );
    setNameUser("");
    setText("");
  }

  function handlerBack() {
    setNameTop("");
    setShow(false);
  }

  return out;
}
