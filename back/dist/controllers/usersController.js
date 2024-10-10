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
exports.logInUser = exports.registerUser = exports.getUser = exports.getAllUsers = void 0;
const usersService_1 = require("../services/usersService");
const credentialsService_1 = require("../services/credentialsService");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, usersService_1.getAllUsersService)();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getAllUsers = getAllUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield (0, usersService_1.getUserService)(Number(id));
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getUser = getUser;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, birthdate, nDni, username, password } = req.body;
        const newUser = yield (0, usersService_1.createUserService)({
            name,
            email,
            birthdate,
            nDni,
            username,
            password
        });
        res.status(200).json(newUser);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.registerUser = registerUser;
const logInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        yield (0, credentialsService_1.validateCredential)({
            username,
            password,
        });
        res.status(200).json({
            message: "Usuario Logeado"
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.logInUser = logInUser;
