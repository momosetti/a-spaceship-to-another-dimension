import { configureStore } from "@reduxjs/toolkit";
import KF96Reducer from "./features/KF96/KF96Slice";
export const store = configureStore({
  reducer: { KF96: KF96Reducer },
  devTools: process.env.NODE_ENV !== "production",
});
