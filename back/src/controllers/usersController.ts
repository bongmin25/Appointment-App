import { Request, Response } from "express";
import {
  getAllUsersService,
  getUserService,
  createUserService,
  findUserByCredentialId,
} from "../services/usersService";

import { validateCredential } from "../services/credentialsService";
import { User } from "../entities/User";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users: User[] = await getAllUsersService();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user: User = await getUserService(Number(id));
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, birthdate, nDni, username, password } = req.body;
    const newUser: User = await createUserService({
      name,
      email,
      birthdate,
      nDni,
      username,
      password,
    });
    res.status(200).json(newUser);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
export const logInUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const credential = await validateCredential({
      username,
      password,
    });

    const user = await findUserByCredentialId(credential.id);

    res.status(200).json({
      message: "Usuario logueado",
      user,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
