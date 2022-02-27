import { CourseRepository } from "../../repositories/IcoursesRepository";

export class DeleteCourseUseCase {
  constructor(private courseRepository: CourseRepository) {}

  // Will read the course
  async execute(id: string) {
    const result = await this.courseRepository.delete(id);

    return result;
  }
}
