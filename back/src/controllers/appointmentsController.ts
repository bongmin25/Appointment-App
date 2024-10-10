import { Request, Response } from "express";
import {
  getAppointmentService,
  getAppointmentByIdService,
  createAppointmentService,
  cancelAppointmentService,
} from "../services/appointmentsService";
import { Appointment } from "../entities/Appointment";

export const getAppointments = async (req: Request, res: Response) => {
  try {
    const appointments: Appointment[] = await getAppointmentService();
    res.status(200).json(appointments);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
export const getAppointmentsById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const appointments: Appointment = await getAppointmentByIdService(
      Number(id)
    );
    res.status(200).json(appointments);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
export const createAppointment = async (req: Request, res: Response) => {
  try {
    const { date, time, userId, description } = req.body;
    const newAppointment: Appointment = await createAppointmentService({
      date,
      time,
      userId,
      description,
    });
    res.status(200).json(newAppointment);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
export const cancelAppointment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const appointment: Appointment = await cancelAppointmentService(Number(id));
    res.status(200).json(appointment);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
