import { CredentialModel } from "../config/data-source";
import ICredentialDto from "../dto/ICredentialDto";
import { Credential } from "../entities/Credential";

export const createCredential = async (
  credential: ICredentialDto
): Promise<Credential> => {
  const newCredential: Credential = CredentialModel.create(credential);
  await CredentialModel.save(newCredential);
  return newCredential;
};

export const validateCredential = async (
  credential: ICredentialDto
): Promise<Credential> => {
  const foundCredential: Credential | null = await CredentialModel.findOneBy({
    username: credential.username,
  });

  if (!foundCredential) {
    throw new Error("No existe el usuario");
  }

  if (foundCredential.password !== credential.password) {
    throw new Error("La contraseña no coincide");
  }

  return foundCredential;
};
