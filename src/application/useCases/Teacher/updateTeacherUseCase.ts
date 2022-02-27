import { Teacher } from "../../../domain/entities/teacher";
import { TeacherRepository } from "../../repositories/IteacherRepository";
import { CreateTeacherUseCaseRequest } from "./createTeacherUseCase";

export class UpdateTeacherUseCase {
  constructor(private teachersRepository: TeacherRepository) {}

  // Will read the Teacher
  async execute(props: CreateTeacherUseCaseRequest, cpf: string) {
    const newData = Teacher.create({
      ...props,
    });

    const result = await this.teachersRepository.update(cpf, newData);

    return result;
  }
}
