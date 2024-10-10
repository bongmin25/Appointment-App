import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Appointment } from "./Appointment";
import { Credential } from "./Credential";

@Entity({
  name: "users",
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  birthdate: string;

  @Column()
  nDni: number;

  @OneToOne(() => Credential)
  @JoinColumn()
  credentials: Credential;

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointment: Appointment[];
}
