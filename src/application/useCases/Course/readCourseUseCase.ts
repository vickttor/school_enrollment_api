import { CourseRepository } from "../../repositories/IcoursesRepository";

export class ReadCourseUseCase {
  constructor(private courseRepository: CourseRepository) {}

  // Will read the Course
  async execute(id?: string) {
    const result = await this.courseRepository.read(id);

    return result;
  }
}
