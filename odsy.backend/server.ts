import app from "./app";

// Порт береться з розширення середовища або за замовчуванням 3000
const PORT = process.env.PORT || 3000;

function bootstrap() {
  try {
    app.listen(PORT, () => {
      console.log("==================================================");
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`Storage: Local Database`);
      console.log("==================================================");
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

bootstrap();