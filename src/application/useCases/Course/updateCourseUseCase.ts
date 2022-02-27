import { Course } from "../../../domain/entities/course";
import { CourseRepository } from "../../repositories/IcoursesRepository";
import { CreateCourseUseCaseRequest } from "./createCourseUseCase";

export class UpdateCourseUseCase {
  constructor(private studentsRepository: CourseRepository) {}

  // Will read the Student
  async execute(props: CreateCourseUseCaseRequest, id: string) {
    const newData = Course.create({
      ...props,
    });

    const result = await this.studentsRepository.update(id, newData);

    return result;
  }
}
