import ICredentials from "../interfaces/ICredentials";

interface UserDto {
    name: string,
    email: string,
    birthdate: string,
    nDni: number,
    active: boolean,
    credentials: ICredentials
}

export default UserDto;