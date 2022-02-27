import { Student } from "../../domain/entities/student";

export interface StudentsRepository {
  save(student: Student): Promise<Object>;
  read(field?: string, identfier?: string): Promise<Object>;
  update(cpf: string, newData: Student): Promise<Object>;
  delete(cpf: string): Promise<Object>;
}
