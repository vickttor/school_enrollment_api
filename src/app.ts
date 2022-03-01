import express from "express";
import { courseRoutes } from "./routes/courses.routes";
import { studentRoutes } from "./routes/students.routes";
import { teacherRoutes } from "./routes/teachers.routes";

import cors from "cors";

const app = express();

app.use((req, res, next) => {
  //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
  res.setHeader("Access-Control-Allow-Origin", "*");
  //Quais são os métodos que a conexão pode realizar na API
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  app.use(cors());
  next();
});

app.use(express.json());

app.use("/students", studentRoutes);
app.use("/teachers", teacherRoutes);
app.use("/courses", courseRoutes);

export { app };
