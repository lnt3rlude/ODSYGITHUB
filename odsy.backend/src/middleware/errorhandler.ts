import { Request, Response, NextFunction } from "express";

interface AppError extends Error {
  statusCode?: number;
  status?: number;
  code?: string;
  details?: unknown[];
}

export const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const msg = err.message || "Internal Server Error";

  // Дефолтний HTTP-статус (якщо не задано в AppError, то 500)
  const statusCode = Number(err.statusCode || err.status) || 500;

  // Дефолтний внутрішній код помилки
  const code = err.code || "INTERNAL_SERVER_ERROR";

  // Формуємо відповідь строго за ТЗ (пункт 7.2)
  const errorResponse = {
    error: {
      code,
      message: msg,
      // Поле details з'явиться в JSON лише якщо там є помилки валідації
      ...(err.details && err.details.length ? { details: err.details } : {})
    },
  };

  // Логування помилок у консоль сервера
  if (process.env.NODE_ENV !== "production") {
    console.error("Centralized Error Handler Caught:", err);
  } else {
    console.error(`[${code}] ${req.method} ${req.originalUrl} - Status: ${statusCode}`);
  }

  return res.status(statusCode).json(errorResponse);
};