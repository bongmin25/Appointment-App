import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userActive: {},
  userAppointments: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.userActive = action.payload;
    },
    addAppointments: (state, action) => {
      state.userAppointments = action.payload;
    },
    cancelAppointment: (state, action) => {
      const id = action.payload;
      state.userAppointments = state.userAppointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: "CANCELED" }
          : appointment
      );
    },
  },
});

export const { addUser, addAppointments, cancelAppointment } =
  userSlice.actions;
export default userSlice.reducer;
