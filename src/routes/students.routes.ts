import { Router } from "express";
import { StudentController } from "../application/useCases/Student/studentController";
import { CreateStudentUseCase } from "../application/useCases/Student/createStudentUseCase";
import { ReadStudentUseCase } from "../application/useCases/Student/readStudentUseCase";
import { UpdateStudentUseCase } from "../application/useCases/Student/updateStudentUseCase";
import { DeleteStudentUseCase } from "../application/useCases/Student/deleteStudentUseCase";

// routes
const studentRoutes = Router();

// student controller
const createStudentController = new StudentController();

// POST
studentRoutes.post("/", async (req, res) => {
  const createStudent = new CreateStudentUseCase(createStudentController);

  const result = await createStudent.execute(req.body);

  res.json({ message: result }).end();
});

// GET ALL USERS
studentRoutes.get("/", async (_, res) => {
  const readStudent = new ReadStudentUseCase(createStudentController);

  const result = await readStudent.execute();

  res.json(result).end();
});

// GET SPECIFIC USER
studentRoutes.get("/:cpf", async (req, res) => {
  const readStudent = new ReadStudentUseCase(createStudentController);

  const { cpf } = req.params;

  const result = await readStudent.execute("cpf", cpf);

  res.json(result).end();
});

//UPDATE
studentRoutes.put("/:cpf", async (req, res) => {
  const updateStudent = new UpdateStudentUseCase(createStudentController);

  const { cpf } = req.params;

  const result = await updateStudent.execute(req.body, cpf);

  return res.json(result).end();
});

//DELETE
studentRoutes.delete("/:cpf", async (req, res) => {
  const deleteStudent = new DeleteStudentUseCase(createStudentController);

  const { cpf } = req.params;

  const result = await deleteStudent.execute(cpf);

  return res.json(result).end();
});

export { studentRoutes };
