import { Course } from "../../../domain/entities/course";
import {
  CourseRepository,
  CourseSupaBaseResponse,
} from "../../repositories/IcoursesRepository";

import { supabase } from "../../../utils/connect_db";

export class CourseController implements CourseRepository {
  // Save functionality
  async save(course: Course): Promise<CourseSupaBaseResponse> {
    if (course.props.title_course.length !== 0) {
      const result = await supabase.from("courses").insert([
        {
          id: course.id,
          title_course: course.props.title_course.toLocaleLowerCase(),
          description: course.props.description,
          time_course: course.props.time_course,
        },
      ]);

      if (result.error) {
        throw new Error(
          `[ERROR]: ${result.error.code} | ${result.error.message} | details: ${result.error.details} | hint: ${result.error.hint}`
        );
      }

      return { message: result };
    }
    throw new Error(
      "Title Course need a valid string length (greater than 3 characters)"
    );
  }

  // Read functionality
  async read(id?: string): Promise<CourseSupaBaseResponse> {
    if (id && id.length !== 0) {
      const result = await supabase.from("courses").select().eq("id", id);

      if (result.error) {
        throw new Error("There's no course with this Identifier");
      }

      return { message: result };
    }

    const result = await supabase.from("courses").select();

    if (result.error || result.data.length === 0) {
      throw new Error("There's no course yet");
    }

    return { message: result };
  }

  async update(id: string, newData: Course): Promise<CourseSupaBaseResponse> {
    if (id && newData && id.length !== 0) {
      const result = await supabase
        .from("courses")
        .update({
          title_course: newData.props.title_course.toLocaleLowerCase(),
          description: newData.props.description,
          time_course: newData.props.time_course,
        })
        .match({ id: id });

      if (result.error) {
        throw new Error(
          `[ERROR]: ${result.error.code} | ${result.error.message} | details: ${result.error.details} | hint: ${result.error.hint}`
        );
      }

      return { message: result };
    }

    throw new Error("Verify the ID and newData");
  }

  async delete(id: string): Promise<CourseSupaBaseResponse> {
    if (id && id.length !== 0) {
      const result = await supabase.from("courses").delete().match({ id: id });

      if (result.error || result.data.length === 0) {
        throw new Error("Impossible to delete. There's no course like that");
      }

      return { message: result, status: "DELETED" };
    }

    throw new Error("Impossible to delete. Verify the ID Course");
  }
}
