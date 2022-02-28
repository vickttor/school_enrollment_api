import { Teacher } from "../../../domain/entities/teacher";
import {
  TeacherSupaBaseResponse,
  TeacherRepository,
} from "../../repositories/IteacherRepository";

import { supabase } from "../../../utils/connect_db";

export class TeacherController implements TeacherRepository {
  // Save functionality
  async save(teacher: Teacher): Promise<TeacherSupaBaseResponse> {
    const theresSomeStudent = await supabase
      .from("students")
      .select()
      .eq("cpf", teacher.props.cpf);

    if (theresSomeStudent.error || theresSomeStudent.data.length === 0) {
      if (teacher.props.cpf.length === 11) {
        const result = await supabase.from("teachers").insert([
          {
            id: teacher.id,
            name: teacher.props.full_name,
            birthday: teacher.props.birthday,
            email: teacher.props.email,
            phone: teacher.props.phone,
            cpf: teacher.props.cpf,
            gender: teacher.props.gender,
            courses_id: teacher.props.courses_id,
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

      if (result.error || result.data.length === 0) {
        throw new Error("There's no teacher with this identifier");
      }

      return { message: result };
    }

    const result = await supabase.from("teachers").select();

    if (result.error || result.data.length === 0) {
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
      const theresSomeStudent = await supabase
        .from("students")
        .select()
        .eq("cpf", newData.props.cpf);

      if (theresSomeStudent.error || theresSomeStudent.data.length === 0) {
        const result = await supabase
          .from("teachers")
          .update({
            name: newData.props.full_name,
            birthday: newData.props.birthday,
            email: newData.props.email,
            phone: newData.props.phone,
            cpf: newData.props.cpf,
            gender: newData.props.gender,
            courses_id: newData.props.courses_id,
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
