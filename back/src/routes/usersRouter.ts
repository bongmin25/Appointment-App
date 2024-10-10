import { Router } from "express";
import {
  getAllUsers,
  getUser,
  registerUser,
  logInUser,
} from "../controllers/usersController";


const usersRouter: Router = Router();

usersRouter.get("/", getAllUsers);
usersRouter.get("/:id", getUser);
usersRouter.post("/register", registerUser);
usersRouter.post("/login", logInUser);

export default usersRouter;
