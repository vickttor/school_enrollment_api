import express from "express";
import { courseRoutes } from "./routes/courses.routes";
import { studentRoutes } from "./routes/students.routes";
import { teacherRoutes } from "./routes/teachers.routes";

import cors from "cors";

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Origin", " * ");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Request-Width, Content-Type, Accept"
  );

  app.use(cors());
  next();
});

app.use(express.json());

app.use("/students", studentRoutes);
app.use("/teachers", teacherRoutes);
app.use("/courses", courseRoutes);

export { app };
