const express = require("express");
const cookieParser=require('cookie-parser') 
const app = express();
const mongoose = require("mongoose");
require('dotenv').config(); 
const cors = require("cors");
app.use(express.json()) 
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser()) 
const authenticationMiddleware = require("./Middleware/authenticationMiddleware");
// app.use(authenticationMiddleware);

const workflowRouter = require("./Routes/workFlow");
app.use('/api/workflow',workflowRouter);
const knowledgeBaseRouter = require("./Routes/knowledgeBase");
app.use('/api/knowledgeBaseRoutes',knowledgeBaseRouter);


app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

//const db_url = `mongodb+srv://Mariam:LW7ZrU0N8A25kWqB@cluster0.qebr03m.mongodb.net/Software`;
const db_url = 'mongodb://127.0.0.1:27017/try';


const connectionOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

mongoose
  .connect(db_url, connectionOptions)
  .then(() => console.log("mongoDB connected"))
  .catch((e) => console.log(e));

app.use(function (req, res, next) {
  return res.status(404).send("404");
});

app.listen(process.env.PORT, () => console.log("server started"));  

