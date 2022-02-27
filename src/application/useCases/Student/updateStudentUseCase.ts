import { Student } from "../../../domain/entities/student";
import { StudentsRepository } from "../../repositories/IstudentsRepository";
import { CreateStudentUseCaseRequest } from "./createStudentUseCase";

export class UpdateStudentUseCase {
  constructor(private studentsRepository: StudentsRepository) {}

  // Will read the Student
  async execute(props: CreateStudentUseCaseRequest, cpf: string) {
    const newData = Student.create({
      ...props,
    });

    const result = await this.studentsRepository.update(cpf, newData);

    return result;
  }
}
