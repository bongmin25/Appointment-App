"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserService = exports.getUserService = exports.getAllUsersService = void 0;
const data_source_1 = require("../config/data-source");
const credentialsService_1 = require("./credentialsService");
const getAllUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield data_source_1.UserModel.find();
    return allUsers;
});
exports.getAllUsersService = getAllUsersService;
const getUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield data_source_1.UserModel.findOne({
        where: { id },
        relations: ["appointments"],
    });
    if (!foundUser) {
        throw Error("Usuario no encontrado");
    }
    return foundUser;
});
exports.getUserService = getUserService;
const createUserService = (createUser) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield data_source_1.UserModel.create(createUser);
    yield data_source_1.UserModel.save(user);
    const newCredential = yield (0, credentialsService_1.createCredential)({
        username: createUser.username,
        password: createUser.password,
    });
    user.credentials = newCredential;
    data_source_1.UserModel.save(user);
    return user;
});
exports.createUserService = createUserService;
