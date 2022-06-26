const express = require("express");
const mongodb = require("mongodb").MongoClient;

const app = express();
const PORT = process.env.PORT || 3001;

const connectionStringURI = `mongodb://localhost:27017/MongoNetDB`;

let db;

mongodb.connect(
  connectionStringURI,
  { useNewUrlParser: true, useUnifiedTopology: true }

  //   app.listen(port, () => {
  //     console.log(`Example app listening at http://localhost:${port}`);
  //   });
  // }
);

app.use(express.json());
