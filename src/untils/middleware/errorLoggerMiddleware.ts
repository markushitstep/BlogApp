import { isRejectedWithValue, Middleware } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const errorLoggerMiddleware: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    toast.error('❌ Error caught by middleware:', action.payload || action.error);
  }

  return next(action);
};