"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointmentsController_1 = require("../controllers/appointmentsController");
const appointmentsRouter = (0, express_1.Router)();
appointmentsRouter.get("/", appointmentsController_1.getAppointments);
appointmentsRouter.get("/:id", appointmentsController_1.getAppointmentsById);
appointmentsRouter.post("/schedule", appointmentsController_1.createAppointment);
appointmentsRouter.put("/cancel", appointmentsController_1.cancelAppointment);
exports.default = appointmentsRouter;
