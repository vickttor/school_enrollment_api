import { Teacher } from "../../domain/entities/teacher";

export interface TeacherRepository {
  save(student: Teacher): Promise<Object>;
  read(field?: string, identifier?: string): Promise<Object>;
  update(cpf: string, newData: Teacher): Promise<Object>;
  delete(cpf: string): Promise<Object>;
}
