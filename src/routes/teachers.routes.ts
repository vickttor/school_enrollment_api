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

  try {
    const result = await createTeacher.execute(req.body);
    res.json(result.message).send();
  } catch (error: any) {
    res.json({ error: error?.message }).send();
  }
});

// GET ALL TEACHER
teacherRoutes.get("/", async (_, res) => {
  const readTeacher = new ReadTeacherUseCase(createTeacherController);

  try {
    const result = await readTeacher.execute();
    return res.json(result.message).send();
  } catch (error: any) {
    res.json({ error: error?.message }).send();
  }
});

// GET SPECIFIC TEACHER
teacherRoutes.get("/:cpf", async (req, res) => {
  const readTeacher = new ReadTeacherUseCase(createTeacherController);

  const { cpf } = req.params;

  try {
    const result = await readTeacher.execute("cpf", cpf);
    return res.json(result.message).send();
  } catch (error: any) {
    res.json({ error: error?.message }).send();
  }
});

//UPDATE TEACHER
teacherRoutes.put("/:cpf", async (req, res) => {
  const updateTeacher = new UpdateTeacherUseCase(createTeacherController);

  const { cpf } = req.params;

  try {
    const result = await updateTeacher.execute(req.body, cpf);
    return res.json(result.message).send();
  } catch (error: any) {
    res.json({ error: error?.message }).send();
  }
});

//DELETE TEACHER
teacherRoutes.delete("/:cpf", async (req, res) => {
  const deleteTeacher = new DeleteTeacherUseCase(createTeacherController);

  const { cpf } = req.params;

  try {
    const result = await deleteTeacher.execute(cpf);
    return res.json({ message: result.message, status: result.status }).send();
  } catch (error: any) {
    res.json({ error: error?.message }).send();
  }
});

export { teacherRoutes };
