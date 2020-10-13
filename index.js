const express = require("express");
const bodyParser = require("body-parser");

const clientRoute = require("./route/Client.route");

const app = express();
const port = process.env.PORT || 5000;

//Acesso à BD
const mongoose = require("mongoose");
let url = "mongodb://localhost:27017/teste_backend";
let mongoDB = process.env.MONGODB_URI || url;
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error", console.error.bind(console, "Erro na Ligação ao MongoDB"));

//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/client", clientRoute);

app.listen(port, () => console.log(`Listening on port ${port}`));