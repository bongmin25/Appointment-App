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
exports.cancelAppointment = exports.createAppointment = exports.getAppointmentsById = exports.getAppointments = void 0;
const appointmentsService_1 = require("../services/appointmentsService");
const getAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield (0, appointmentsService_1.getAppointmentService)();
        res.status(200).json(appointments);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getAppointments = getAppointments;
const getAppointmentsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const appointments = yield (0, appointmentsService_1.getAppointmentByIdService)(Number(id));
        res.status(200).json(appointments);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getAppointmentsById = getAppointmentsById;
const createAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date, time, userId, description } = req.body;
        const newAppointment = yield (0, appointmentsService_1.createAppointmentService)({
            date,
            time,
            userId,
            description,
        });
        res.status(200).json(newAppointment);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.createAppointment = createAppointment;
const cancelAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const appointment = yield (0, appointmentsService_1.cancelAppointmentService)(Number(id));
        res.status(200).json(appointment);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.cancelAppointment = cancelAppointment;
