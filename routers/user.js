import { Router } from "express";
import users from "../controllers/users.js";
import login from "../controllers/login.js";
import register from "../controllers/register.js";
import auth from "../middlewares/auth.js";
import token from "../controllers/token.js";
import logout from "../controllers/logout.js";
import getUserByToken from "../controllers/getUserByToken.js";
const user = Router();

user.post("/register", register);
user.post("/login", login);
user.get("/", auth, users);
user.get("/token", token);
user.post("/logout", logout);
user.post("/getuser", getUserByToken);
export default user;
