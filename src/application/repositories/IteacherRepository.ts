import { Teacher } from "../../domain/entities/teacher";

export type TeacherSupaBaseResponse = {
  message?: {
    error: null | {
      message: string;
      code: string;
      hint: string;
      details: string;
    };
    data: Array<Teacher> | null;
  };
  status?: string;
};

export interface TeacherRepository {
  save(student: Teacher): Promise<TeacherSupaBaseResponse>;
  read(field?: string, identifier?: string): Promise<TeacherSupaBaseResponse>;
  update(cpf: string, newData: Teacher): Promise<TeacherSupaBaseResponse>;
  delete(cpf: string): Promise<TeacherSupaBaseResponse>;
}
