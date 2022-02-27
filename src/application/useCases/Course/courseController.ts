import { Course } from "../../../domain/entities/course";
import { CourseRepository } from "../../repositories/IcoursesRepository";
import { supabase } from "../../../utils/connect_db";
import { ReadStudentUseCase } from "../Student/readStudentUseCase";
import { StudentController } from "../Student/studentController";

export class CourseController implements CourseRepository {
  // Save functionality
  async save(course: Course): Promise<Object> {
    const result = await supabase.from("courses").insert([
      {
        id: course.id,
        title_course: course.props.title_course,
        description: course.props.description,
        time_course: course.props.time_course,
      },
    ]);

    return result;
  }

  // Read functionality
  async read(id?: string): Promise<Object> {
    if (id) {
      const result = await supabase.from("courses").select().eq("id", id);
      return result;
    }

    const result = await supabase.from("courses").select();

    return result;
  }

  async update(id: string, newData: Course): Promise<Object> {
    if (id && newData) {
      const result = await supabase
        .from("courses")
        .update({
          id: newData.id,
          title_course: newData.props.title_course,
          description: newData.props.description,
          time_course: newData.props.time_course,
        })
        .match({ id: id });

      return result;
    }

    return { error: "Something wrong ocurred" };
  }

  async delete(id: string): Promise<Object> {
    if (id) {
      const result = await supabase.from("courses").delete().match({ id: id });

      return result;
    }

    return { error: "Impossible to delete. Verify the ID Course" };
  }
}
