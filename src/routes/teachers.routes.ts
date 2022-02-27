import { Router } from "express";
import { TeacherController } from "../application/useCases/Teacher/teacherController";
import { CreateTeacherUseCase } from "../application/useCases/Teacher/createTeacherUseCase";
import { DeleteTeacherUseCase } from "../application/useCases/Teacher/deleteTeacherUseCase";
import { ReadTeacherUseCase } from "../application/useCases/Teacher/readTeacherUseCase";
import { UpdateTeacherUseCase } from "../application/useCases/Teacher/updateTeacherUseCase";

// routes
const teacherRoutes = Router();

// Teacher controller
const createTeacherController = new TeacherController();

// POST
teacherRoutes.post("/", async (req, res) => {
  const createTeacher = new CreateTeacherUseCase(createTeacherController);

  const result = await createTeacher.execute(req.body);

  res.json({ message: result }).end();
});

// GET ALL TEACHER
teacherRoutes.get("/", async (_, res) => {
  const readTeacher = new ReadTeacherUseCase(createTeacherController);

  const result = await readTeacher.execute();

  res.json(result).end();
});

// GET SPECIFIC TEACHER
teacherRoutes.get("/:cpf", async (req, res) => {
  const readTeacher = new ReadTeacherUseCase(createTeacherController);

  const { cpf } = req.params;

  const result = await readTeacher.execute("cpf", cpf);

  res.json(result).end();
});

//UPDATE TEACHER
teacherRoutes.put("/:cpf", async (req, res) => {
  const updateTeacher = new UpdateTeacherUseCase(createTeacherController);

  const { cpf } = req.params;

  const result = await updateTeacher.execute(req.body, cpf);

  return res.json(result).end();
});

//DELETE TEACHER
teacherRoutes.delete("/:cpf", async (req, res) => {
  const deleteStudent = new DeleteTeacherUseCase(createTeacherController);

  const { cpf } = req.params;

  const result = await deleteStudent.execute(cpf);

  return res.json(result).end();
});

export { teacherRoutes };
