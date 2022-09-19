import express, { json } from "express";
import user from "./routers/user.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
const app = express();
const port = process.env.PORT || 3001;
app.use(json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
dotenv.config();
app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/user", user);
app.get("*", (req, res) => {
  return res.status(404).send("NOT FOUND");
});

app.listen(port, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(`Server is listening on port ${port}`);
  }
});
