import IAppointmentsDTO from "../dto/IAppoitmentDto";
import { AppointmentModel, UserModel } from "../config/data-source";
import { Appointment } from "../entities/Appointment";
import { User } from "../entities/User";

export const getAppointmentService = async (): Promise<Appointment[]> => {
  const allAppointments: Appointment[] = await AppointmentModel.find();
  return allAppointments;
};
export const getAppointmentByIdService = async (
  appointmentId: number
): Promise<Appointment> => {
  const foundAppointment: Appointment | null = await AppointmentModel.findOneBy(
    {
      id: appointmentId,
    }
  );
  if (!foundAppointment) {
    throw Error("Agenda no encontrada");
  }
  return foundAppointment;
};

export const createAppointmentService = async (
  createNewAppointment: IAppointmentsDTO
): Promise<Appointment> => {
  const appointment: Appointment = await AppointmentModel.create(
    createNewAppointment
  );
  await AppointmentModel.save(appointment);

  const user: User | null = await UserModel.findOneBy({
    id: createNewAppointment.userId,
  });
  if (!user) throw Error("Usuario no existe");
  appointment.user = user;

  await AppointmentModel.save(appointment);
  return appointment;
};

export const cancelAppointmentService = async (
  appointmentId: number
): Promise<Appointment> => {
  const appointment: Appointment | null = await AppointmentModel.findOneBy({
    id: appointmentId,
  });
  if (!appointment) throw Error("Turno no existe");
  appointment.status = "canceled";
  await AppointmentModel.save(appointment);
  return appointment;
};
