import { Course } from "../../domain/entities/course";

export interface CourseRepository {
  save(course: Course): Promise<Object>;
  read(id?: string): Promise<Object>;
  update(id: string, newData: Course): Promise<Object>;
  delete(id: string): Promise<Object>;
}
