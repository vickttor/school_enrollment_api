import { StudentsRepository } from "../../repositories/IstudentsRepository";

export class ReadStudentUseCase {
  constructor(private studentsRepository: StudentsRepository) {}

  // Will read the Student
  async execute(field?: string, identfier?: string) {
    const result = await this.studentsRepository.read(field, identfier);

    return result;
  }
}
