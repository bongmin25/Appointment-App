import { Router } from "express";
import {
  cancelAppointment,
  createAppointment,
  getAppointments,
  getAppointmentsById,
} from "../controllers/appointmentsController";

const appointmentsRouter: Router = Router();

appointmentsRouter.get("/", getAppointments);
appointmentsRouter.get("/:id", getAppointmentsById);
appointmentsRouter.post("/schedule", createAppointment);
appointmentsRouter.put("/cancel/:id", cancelAppointment);

export default appointmentsRouter;
