"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = (0, express_1.Router)();
router.get("/users", auth_1.default, usersController_1.getUser);
router.get("/users/:id", usersController_1.getUser);
router.post("/users/register", usersController_1.createUser);
router.post("/users/login", usersController_1.logInUser);
exports.default = router;
