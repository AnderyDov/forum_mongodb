import express from "express";
import mongodb from "mongodb";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import path from "path";

let __dirname = dirname(fileURLToPath(import.meta.url));
__dirname = __dirname.split("back")[0];

const server = express();

const mongoClient = new mongodb.MongoClient("mongodb://localhost:27017", {
  useUnifiedTopology: true,
});

server.use(bodyParser.json());

server.use(express.static(path.resolve(__dirname, "front/build")));

mongoClient.connect(async (err, mongo) => {
  if (!err) {
    let coll = mongo.db("gestbook").collection("topics");
    console.log("connect");

    server.get("/", async (req, res) => {
      res.sendFile(__dirname + "front/build/index.html");
    });

    server.get("/topics", async (req, res) => {
      let topics = await coll.find().toArray();
      res.send(topics);
    });

    server.post("/topics", async (req, res) => {
      let topic = {};
      topic["nameTop"] = req.body.nameTop;
      topic[req.body.nameTop] = [];
      if (req.body.nameTop !== "") {
        await coll.insertOne(topic);
        res.send(topic);
      }
    });

    server.post("/notes", async (req, res) => {
      let date = `${new Date().getDate()} ${
        new Date().toDateString().split(" ")[1]
      } ${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;

      let obj = await coll.findOne({ nameTop: req.body.nameTop });
      let notesTop = obj[req.body.nameTop];

      notesTop = [
        ...notesTop,
        {
          name: req.body.nameUser,
          text: req.body.text,
          date: date,
        },
      ];

      await coll.updateOne(
        { nameTop: req.body.nameTop },
        { $set: { [req.body.nameTop]: notesTop } }
      );
      res.send(notesTop);
    });

    server.use((req, res) => {
      res.send("error");
    });
  } else {
  }
});

server.listen(3000, () => {
  console.log("http://localhost:3000");
});
