// Entity
import { Teacher } from "../../../domain/entities/teacher";

// Types and Interfaces
import {
  TeacherSupaBaseResponse,
  TeacherRepository,
} from "../../repositories/IteacherRepository";

// Supabase client
import { supabase } from "../../../utils/connect_db";

// title course type
import { titleCourseRequest } from "../Student/studentController";

export class TeacherController implements TeacherRepository {
  // Save functionality
  async save(teacher: Teacher): Promise<TeacherSupaBaseResponse> {
    // Verify if there's some students with the same CPF
    const theresSomeStudent = await supabase
      .from("students")
      .select()
      .eq("cpf", teacher.props.cpf);

    // Get the title course in databse by filtering id
    const title_course: titleCourseRequest = await supabase
      .from("courses")
      .select("title_course")
      .eq("id", teacher.props.course_id);

    if (theresSomeStudent.error || theresSomeStudent.data.length === 0) {
      if (teacher.props.cpf.length === 11) {
        const result = await supabase.from("teachers").insert([
          {
            id: teacher.id,
            full_name: teacher.props.full_name,
            birthday: teacher.props.birthday,
            email: teacher.props.email,
            phone: teacher.props.phone,
            cpf: teacher.props.cpf,
            gender: teacher.props.gender,
            course_id: teacher.props.course_id,
            title_course: title_course.data
              ?.map((data) => data.title_course)
              .join(""),
          },
        ]);

        if (result.error) {
          throw new Error(
            `[ERROR]: ${result.error.code} | ${result.error.message} \n details: ${result.error.details} / hint: ${result.error.hint}`
          );
        }

        return { message: result };
      }
      throw new Error("You need to pass a valid CPF that contains 11 digits");
    }

    throw new Error("There's already a Student with this CPF");
  }

  // Read functionality
  async read(
    field?: string,
    identifier?: string
  ): Promise<TeacherSupaBaseResponse> {
    if (identifier && field && identifier.length !== 0 && field.length !== 0) {
      const result = await supabase
        .from("teachers")
        .select()
        .eq(`${field}`, identifier);

      if (result.error) {
        throw new Error("There's no teacher with this identifier");
      }

      return { message: result };
    }

    const result = await supabase.from("teachers").select();

    if (result.error) {
      throw new Error("There's no teachers");
    }

    return { message: result };
  }

  // update functionality
  async update(
    cpf: string,
    newData: Teacher
  ): Promise<TeacherSupaBaseResponse> {
    if (cpf.length === 11 && newData && newData.props.cpf.length === 11) {
      // Verify if there's some students with the same CPF
      const theresSomeStudent = await supabase
        .from("students")
        .select()
        .eq("cpf", newData.props.cpf);

      // Get the title course in databse by filtering id
      const title_course: titleCourseRequest = await supabase
        .from("courses")
        .select("title_course")
        .eq("id", newData.props.course_id);

      if (theresSomeStudent.error || theresSomeStudent.data.length === 0) {
        const result = await supabase
          .from("teachers")
          .update({
            full_name: newData.props.full_name,
            birthday: newData.props.birthday,
            email: newData.props.email,
            phone: newData.props.phone,
            cpf: newData.props.cpf,
            gender: newData.props.gender,
            course_id: newData.props.course_id,
            title_course: title_course.data
              ?.map((data) => data.title_course)
              .join(""),
          })
          .match({ cpf: cpf });

        if (result.error) {
          throw new Error(
            `[ERROR]: ${result.error.code} | ${result.error.message} \n details: ${result.error.details} / hint: ${result.error.hint}`
          );
        }

        return { message: result };
      }
      throw new Error("There's already a student with this CPF.");
    }

    throw new Error("You need to pass the correct CPF and new data");
  }

  // delete functionality
  async delete(cpf: string): Promise<TeacherSupaBaseResponse> {
    if (cpf && cpf.length === 11) {
      const result = await supabase
        .from("teachers")
        .delete()
        .match({ cpf: cpf });

      if (result.error || result.data.length === 0) {
        throw new Error(
          "Impossible to delete. There's no teacher with this CPF"
        );
      }

      return { message: result, status: "DELETED" };
    }

    throw new Error("Impossible to delete. Verify the CPF");
  }
}
