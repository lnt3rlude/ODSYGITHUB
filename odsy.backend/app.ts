import express from "express";
import cors from "cors";

// Імпорт маршрутів (Ресурси у множині відповідно до REST)
import userRoutes from "./src/routes/user.odsy.routes.ts";
import productRoutes from "./src/routes/product.odsy.routes.ts";
import orderRoutes from "./src/routes/order.odsy.routes.ts";
import categoryRoutes from "./src/routes/category.odsy.routes.ts";
import orderItemRoutes from "./src/routes/orderItem.odsy.routes.ts";

// Імпорт централізованих middleware
import { loggingMiddleware } from "./src/middleware/logging.middleware.ts";
import { globalErrorHandler } from "./src/middleware/errorhandler.ts";

const app = express();

// Глобальні middleware
app.use(cors());
app.use(express.json()); // Формат обміну – JSON (Content-Type: application/json)
app.use(loggingMiddleware); // Мінімальне логування кожного запиту

// HEALTH CHECK (Перевірка працездатності API)
app.get("/health", (req, res) => {
  res.status(200).json({ ok: true, timestamp: new Date().toISOString() });
});

// РЕЄСТРАЦІЯ ЕНДПОЙНТІВ (REST API)
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/order-items", orderItemRoutes);

// ЦЕНТРАЛІЗОВАНА ОБРОБКА ПОМИЛОК (Обов'язково останнім)
app.use(globalErrorHandler);

export default app;