import { Course } from "../../domain/entities/course";

export type CourseSupaBaseResponse = {
  message?: {
    error: null | {
      message: string;
      code: string;
      hint: string;
      details: string;
    };
    data: Array<Course> | null;
  };
  status?: string;
};

export interface CourseRepository {
  save(course: Course): Promise<CourseSupaBaseResponse>;
  read(id?: string): Promise<CourseSupaBaseResponse>;
  update(id: string, newData: Course): Promise<CourseSupaBaseResponse>;
  delete(id: string): Promise<CourseSupaBaseResponse>;
}
