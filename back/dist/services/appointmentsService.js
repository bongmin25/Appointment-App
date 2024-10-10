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
exports.cancelAppointmentService = exports.createAppointmentService = exports.getAppointmentByIdService = exports.getAppointmentService = void 0;
const data_source_1 = require("../config/data-source");
const getAppointmentService = () => __awaiter(void 0, void 0, void 0, function* () {
    const allAppointments = yield data_source_1.AppointmentModel.find();
    return allAppointments;
});
exports.getAppointmentService = getAppointmentService;
const getAppointmentByIdService = (appointmentId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundAppointment = yield data_source_1.AppointmentModel.findOneBy({
        id: appointmentId,
    });
    if (!foundAppointment) {
        throw Error("Agenda no encontrada");
    }
    return foundAppointment;
});
exports.getAppointmentByIdService = getAppointmentByIdService;
const createAppointmentService = (createNewAppointment) => __awaiter(void 0, void 0, void 0, function* () {
    const appointment = yield data_source_1.AppointmentModel.create(createNewAppointment);
    yield data_source_1.AppointmentModel.save(appointment);
    const user = yield data_source_1.UserModel.findOneBy({
        id: createNewAppointment.userId,
    });
    if (!user)
        throw Error("Usuario no existe");
    appointment.user = user;
    yield data_source_1.AppointmentModel.save(appointment);
    return appointment;
});
exports.createAppointmentService = createAppointmentService;
const cancelAppointmentService = (appointmentId) => __awaiter(void 0, void 0, void 0, function* () {
    const appointment = yield data_source_1.AppointmentModel.findOneBy({
        id: appointmentId,
    });
    if (!appointment)
        throw Error("Turno no existe");
    appointment.status = "canceled";
    yield data_source_1.AppointmentModel.save(appointment);
    return appointment;
});
exports.cancelAppointmentService = cancelAppointmentService;
