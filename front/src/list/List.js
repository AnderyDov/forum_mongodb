import "./list.css";

export default function List({ topics, nameTop, setNameTop }) {
  let out = (
    <div className="list">
      <ul>
        {topics.map((item) => {
          if (item.nameTop === nameTop) {
            return (
              <li>
                <h3>{item.nameTop}</h3>
                {item[nameTop].map((item) => {
                  return (
                    <>
                      <div className="name">
                        <span>{item.name}</span>
                        <span>{item.date}</span>
                      </div>
                      <div className="text">{item.text}</div>
                      <hr />
                    </>
                  );
                })}
              </li>
            );
          }
        })}
      </ul>
    </div>
  );

  return out;
}
