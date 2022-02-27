import express from "express";
import { courseRoutes } from "./routes/courses.routes";
import { studentRoutes } from "./routes/students.routes";
import { teacherRoutes } from "./routes/teachers.routes";

const app = express();

app.use(express.json());

app.use("/students", studentRoutes);
app.use("/teachers", teacherRoutes);
app.use("/courses", courseRoutes);

export { app };
