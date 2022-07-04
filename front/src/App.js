import "./App.css";
import Topics from "./topics/Topics";
import Form from "./form/Form";
import { useState, useEffect } from "react";

export default function App() {
  let [topics, setTopics] = useState([]);
  let [show, setShow] = useState(false);
  let [nameTop, setNameTop] = useState("");

  useEffect(() => {
    fetch("/topics")
      .then((res) => (res = res.json()))
      .then((res) => setTopics(res));
  }, []);

  let out = (
    <>
      <h2 className="head">Forum</h2>
      <div className="App">
        <Form
          setTopics={setTopics}
          topics={topics}
          show={show}
          setShow={setShow}
          nameTop={nameTop}
          setNameTop={setNameTop}
        />
        <Topics
          topics={topics}
          show={show}
          setShow={setShow}
          nameTop={nameTop}
          setNameTop={setNameTop}
        />
      </div>
    </>
  );

  return out;
}
