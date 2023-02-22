import { createSlice } from "@reduxjs/toolkit";

export interface INotification {
  msg: string;
  type: "error" | "success";
}
export interface RootState {
  notification: INotification;
}

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    msg: "",
    type: "",
  },
  reducers: {
    setNotification(state, action: { payload: INotification }) {
      return { msg: action.payload.msg, type: action.payload.type };
    },
  },
});

const reducer = { notification: notificationSlice.reducer };
export default reducer;

export const { setNotification } = notificationSlice.actions;
