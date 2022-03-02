// Student Entity
import { Student } from "../../domain/entities/student";

// Type of the supabase response
export type StudentSupaBaseResponse = {
  message?: {
    error: null | {
      message: string;
      code: string;
      hint: string;
      details: string;
    };
    data: Array<Student> | null;
  };
  status?: string;
};

// Interface to be implemented
export interface StudentsRepository {
  save(student: Student): Promise<StudentSupaBaseResponse>;
  read(field?: string, identfier?: string): Promise<StudentSupaBaseResponse>;
  update(cpf: string, newData: Student): Promise<StudentSupaBaseResponse>;
  delete(cpf: string): Promise<StudentSupaBaseResponse>;
}
