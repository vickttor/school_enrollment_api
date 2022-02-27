import { StudentsRepository } from "../../repositories/IstudentsRepository";

export class DeleteStudentUseCase {
  constructor(private studentsRepository: StudentsRepository) {}

  // Will read the Student
  async execute(cpf: string) {
    const result = await this.studentsRepository.delete(cpf);

    return result;
  }
}
