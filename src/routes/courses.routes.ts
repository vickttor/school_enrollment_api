import { Router } from "express";
import { CreateCourseUseCase } from "../application/useCases/Course/createCourseUseCase";
import { UpdateCourseUseCase } from "../application/useCases/Course/updateCourseUseCase";
import { ReadCourseUseCase } from "../application/useCases/Course/readCourseUseCase";
import { DeleteCourseUseCase } from "../application/useCases/Course/deleteCourseUseCase";
import { CourseController } from "../application/useCases/Course/courseController";

// routes
const courseRoutes = Router();

// student controller
const createCourseController = new CourseController();

// POST
courseRoutes.post("/", async (req, res) => {
  const createCourse = new CreateCourseUseCase(createCourseController);

  try {
    const result = await createCourse.execute(req.body);
    res.json({ message: result.message }).end();
  } catch (error: any) {
    res.json({ error: error?.message });
  }
});

// GET ALL Courses
courseRoutes.get("/", async (_, res) => {
  const readCourse = new ReadCourseUseCase(createCourseController);

  try {
    const result = await readCourse.execute();
    return res.json(result.message).end();
  } catch (error: any) {
    res.json({ error: error?.message });
  }
});

// GET SPECIFIC Course
courseRoutes.get("/:id", async (req, res) => {
  const readCourse = new ReadCourseUseCase(createCourseController);

  const { id } = req.params;

  try {
    const result = await readCourse.execute(id);
    return res.json(result.message).end();
  } catch (error: any) {
    res.json({ error: error?.message });
  }
});

//UPDATE
courseRoutes.put("/:id", async (req, res) => {
  const updateCouse = new UpdateCourseUseCase(createCourseController);

  const { id } = req.params;

  try {
    const result = await updateCouse.execute(req.body, id);
    return res.json(result.message).end();
  } catch (error: any) {
    res.json({ error: error?.message });
  }
});

//DELETE
courseRoutes.delete("/:id", async (req, res) => {
  const deleteCourse = new DeleteCourseUseCase(createCourseController);

  const { id } = req.params;

  try {
    const result = await deleteCourse.execute(id);
    return res.json({ message: result.message, status: result.status }).end();
  } catch (error: any) {
    res.json({ error: error?.message });
  }
});

export { courseRoutes };
