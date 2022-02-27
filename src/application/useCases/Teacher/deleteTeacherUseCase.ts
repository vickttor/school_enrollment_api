import { TeacherRepository } from "../../repositories/IteacherRepository";

export class DeleteTeacherUseCase {
  constructor(private teachersRepository: TeacherRepository) {}

  // Will read the Teacher
  async execute(cpf: string) {
    const result = await this.teachersRepository.delete(cpf);

    return result;
  }
}
