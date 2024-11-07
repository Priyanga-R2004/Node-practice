const express = require("express");
const { MongoClient } = require("mongodb");
require('express-async-errors');
const employees =require('./routes/employees');

const app = express();

const mongoUrl = "mongodb://localhost";
const dbName = "mongodb"; 

app.use(express.json()); 


async function connectToDb() {
  const client = new MongoClient(mongoUrl);
  await client.connect();
  console.log("Connected to MongoDB");
  return client.db(dbName);
}

(async () => {
  const db = await connectToDb();
  app.locals.db = db; 

  app.use("/employees", employees);

  const port = 3000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
})();



