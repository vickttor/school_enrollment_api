import { Course } from "../../../domain/entities/course";
import { CourseRepository } from "../../repositories/IcoursesRepository";

export type CreateCourseUseCaseRequest = {
  title_course: string;
  description?: string;
  time_course: string;
};

export class CreateCourseUseCase {
  constructor(private coursesRepository: CourseRepository) {}

  // Will create a new Course
  async execute(props: CreateCourseUseCaseRequest) {
    const course = Course.create({
      ...props,
    });

    const result = await this.coursesRepository.save(course);

    return result;
  }
}
