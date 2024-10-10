import ICreateUserDTO from "../dto/ICreateUserDTO";
import { UserModel } from "../config/data-source";
import { User } from "../entities/User";
import { Credential } from "../entities/Credential";
import { createCredential } from "./credentialsService";

export const getAllUsersService = async (): Promise<User[]> => {
  const allUsers = await UserModel.find({
    relations: { credentials: true, appointment: true },
  });

  return allUsers;
};

export const getUserService = async (id: number): Promise<User> => {
  const foundUser: User | null = await UserModel.findOne({
    where: { id },
    relations: ["appointment", "credentials"],
  });
  if (!foundUser) {
    throw Error("Usuario no encontrado");
  }
  return foundUser;
};
export const createUserService = async (createUser: ICreateUserDTO) => {
  const user: User = await UserModel.create(createUser);
  await UserModel.save(user);

  const newCredential: Credential = await createCredential({
    username: createUser.username,
    password: createUser.password,
  });
  user.credentials = newCredential;
  UserModel.save(user);
  return user;
};

export const findUserByCredentialId = async (
  credentialId: number
): Promise<User | null> => {
  const user: User | null = await UserModel.findOneBy({
    credentials: { id: credentialId },
  });
  return user;
};
