import { Student } from "../../../domain/entities/student";
import { StudentsRepository } from "../../repositories/IstudentsRepository";

export type CreateStudentUseCaseRequest = {
  full_name: string;
  birthday: Date;
  phone: string;
  email: string;
  gender: string;
  course_id: string;
  deficiency: boolean;
  deficiency_description?: string;
  cpf: string;
};

export class CreateStudentUseCase {
  constructor(private studentsRepository: StudentsRepository) {}

  // Will create a new Student
  async execute(props: CreateStudentUseCaseRequest) {
    const student = Student.create({
      ...props,
    });

    const result = await this.studentsRepository.save(student);

    return result;
  }
}
