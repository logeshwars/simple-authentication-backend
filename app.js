import express, { json } from "express";
import { fileURLToPath } from "url";
import user from "./routers/user.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import path, { dirname } from "path";
const app = express();
const port = process.env.PORT || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static("./build"));
app.use(json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
dotenv.config();
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use("/user", user);
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.get("*", (req, res) => {
  res.send("404 Page not found");
});

app.listen(port, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(`Server is listening on port ${port}`);
  }
});
