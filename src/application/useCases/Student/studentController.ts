import { Student } from "../../../domain/entities/student";
import { StudentsRepository } from "../../repositories/IstudentsRepository";

import { supabase } from "../../../utils/connect_db";

export class StudentController implements StudentsRepository {
  // Save functionality
  async save(student: Student): Promise<Object> {
    const result = await supabase.from("students").insert([
      {
        id: student.id,
        name: student.props.full_name,
        birthday: student.props.birthday,
        email: student.props.email,
        phone: student.props.phone,
        cpf: student.props.cpf,
        gender: student.props.gender,
        deficiency: student.props.deficiency,
        deficiency_description: student.props.deficiency_description,
        course_id: student.props.course_id,
      },
    ]);

    return result;
  }

  // Read functionality
  async read(field?: string, identifier?: string): Promise<Object> {
    if (identifier && identifier.length !== 0) {
      const result = await supabase
        .from("students")
        .select()
        .eq(`${field}`, identifier);
      return result;
    }

    const result = await supabase.from("students").select();

    return result;
  }

  async update(cpf: string, newData: Student): Promise<Object> {
    if (cpf && cpf.length === 11 && newData) {
      const result = await supabase
        .from("students")
        .update({
          name: newData.props.full_name,
          birthday: newData.props.birthday,
          email: newData.props.email,
          phone: newData.props.phone,
          cpf: newData.props.cpf,
          gender: newData.props.gender,
          deficiency: newData.props.deficiency,
          deficiency_description: newData.props.deficiency_description,
          //course: student.props.courseId,
        })
        .match({ cpf: cpf });

      return result;
    }

    return { error: "Something wrong ocurred" };
  }

  async delete(cpf: string): Promise<Object> {
    if (cpf && cpf.length === 11) {
      const result = await supabase
        .from("students")
        .delete()
        .match({ cpf: cpf });

      return result;
    }

    return { error: "Impossible to delete. Verify the CPF" };
  }
}
