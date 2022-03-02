import { Teacher } from "../../../domain/entities/teacher";
import { TeacherRepository } from "../../repositories/IteacherRepository";

export type CreateTeacherUseCaseRequest = {
  full_name: string;
  birthday: Date;
  phone: string;
  email: string;
  gender: string;
  course_id: string;
  cpf: string;
};

export class CreateTeacherUseCase {
  constructor(private teacherRepository: TeacherRepository) {}

  // Will create a new Teacher
  async execute(props: CreateTeacherUseCaseRequest) {
    const teacher = Teacher.create({
      ...props,
    });

    const result = await this.teacherRepository.save(teacher);

    return result;
  }
}
