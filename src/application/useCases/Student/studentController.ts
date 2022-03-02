// Entity
import { Student } from "../../../domain/entities/student";

// Types and Interfaces
import {
  StudentsRepository,
  StudentSupaBaseResponse,
} from "../../repositories/IstudentsRepository";

// Supabase client
import { supabase } from "../../../utils/connect_db";

export type titleCourseRequest = {
  data: Array<{
    title_course: string;
  }> | null;
};

export class StudentController implements StudentsRepository {
  // Save functionality
  async save(student: Student): Promise<StudentSupaBaseResponse> {
    // Verify if there's some teacher with the same CPF
    const theresSomeTeacher = await supabase
      .from("teachers")
      .select()
      .eq("cpf", student.props.cpf);

    // Get the title course in databse by filtering id
    const get_title_course: titleCourseRequest = await supabase
      .from("courses")
      .select("title_course")
      .eq("id", student.props.course_id);

    if (theresSomeTeacher.error || theresSomeTeacher.data.length === 0) {
      const result = await supabase.from("students").insert([
        {
          id: student.id,
          full_name: student.props.full_name,
          birthday: student.props.birthday,
          email: student.props.email,
          phone: student.props.phone,
          cpf: student.props.cpf,
          gender: student.props.gender,
          deficiency: student.props.deficiency,
          deficiency_description: student.props.deficiency_description,
          course_id: student.props.course_id,
          title_course: get_title_course.data
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

    throw new Error("There's already a Teacher with this CPF.");
  }

  // Read functionality
  async read(
    field?: string,
    identifier?: string
  ): Promise<StudentSupaBaseResponse> {
    if (field && identifier && field.length !== 0 && identifier.length !== 0) {
      const result = await supabase
        .from("students")
        .select()
        .eq(`${field}`, identifier);

      if (result.error) {
        throw new Error("There's no student with this identifier");
      }

      return { message: result };
    }

    const result = await supabase.from("students").select();

    if (result.error) {
      throw new Error("There's no students");
    }

    return { message: result };
  }

  // Update functionality
  async update(
    cpf: string,
    newData: Student
  ): Promise<StudentSupaBaseResponse> {
    if (cpf.length === 11 && newData && newData.props.cpf.length === 11) {
      const theresSomeTeacher = await supabase
        .from("teachers")
        .select()
        .eq("cpf", newData.props.cpf);

      if (theresSomeTeacher.error || theresSomeTeacher.data.length === 0) {
        const result = await supabase
          .from("students")
          .update({
            full_name: newData.props.full_name,
            birthday: newData.props.birthday,
            email: newData.props.email,
            phone: newData.props.phone,
            cpf: newData.props.cpf,
            gender: newData.props.gender,
            deficiency: newData.props.deficiency,
            deficiency_description: newData.props.deficiency_description,
            course_id: newData.props.course_id,
          })
          .match({ cpf: cpf });

        if (result.error) {
          throw new Error(
            `[ERROR]: ${result.error.code} | ${result.error.message} \n details: ${result.error.details} / hint: ${result.error.hint}`
          );
        }

        return { message: result };
      }

      throw new Error("There's already a Teacher with this CPF.");
    }

    throw new Error("You need to pass the correct CPF and new data");
  }

  // delete functionality
  async delete(cpf: string): Promise<StudentSupaBaseResponse> {
    if (cpf && cpf.length === 11) {
      const result = await supabase
        .from("students")
        .delete()
        .match({ cpf: cpf });

      if (result.error || result.data.length === 0) {
        throw new Error(
          "Impossible to delete. There's no student with this CPF"
        );
      }

      return { message: result, status: "DELETED" };
    }

    throw new Error("Impossible to delete. Verify the CPF");
  }
}
