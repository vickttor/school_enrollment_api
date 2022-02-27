import { TeacherRepository } from "../../repositories/IteacherRepository";

export class ReadTeacherUseCase {
  constructor(private teachersRepository: TeacherRepository) {}

  // Will read the Teacher
  async execute(field?: string, identifier?: string) {
    const result = await this.teachersRepository.read(field, identifier);

    return result;
  }
}
