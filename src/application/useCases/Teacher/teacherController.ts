import { Teacher } from "../../../domain/entities/teacher";
import { TeacherRepository } from "../../repositories/IteacherRepository";

import { supabase } from "../../../utils/connect_db";

export class TeacherController implements TeacherRepository {
  // Save functionality
  async save(teacher: Teacher): Promise<Object> {
    const result = await supabase.from("teachers").insert([
      {
        id: teacher,
        name: teacher.props.full_name,
        birthday: teacher.props.birthday,
        email: teacher.props.email,
        phone: teacher.props.phone,
        cpf: teacher.props.cpf,
        gender: teacher.props.gender,
        course_id: teacher.props.courses_id,
      },
    ]);

    return result;
  }

  // Read functionality
  async read(field?: string, identifier?: string): Promise<Object> {
    if (identifier && identifier.length !== 0) {
      const result = await supabase
        .from("teachers")
        .select()
        .eq(`${field}`, identifier);
      return result;
    }

    const result = await supabase.from("teachers").select();

    return result;
  }

  // update functionality
  async update(cpf: string, newData: Teacher): Promise<Object> {
    if (cpf && cpf.length === 11 && newData) {
      const result = await supabase
        .from("teachers")
        .update({
          name: newData.props.full_name,
          birthday: newData.props.birthday,
          email: newData.props.email,
          phone: newData.props.phone,
          cpf: newData.props.cpf,
          gender: newData.props.gender,
          //course: student.props.courseId,
        })
        .match({ cpf: cpf });

      return result;
    }

    return { error: "Something wrong ocurred" };
  }

  // delete functionality
  async delete(cpf: string): Promise<Object> {
    if (cpf && cpf.length === 11) {
      const result = await supabase
        .from("teachers")
        .delete()
        .match({ cpf: cpf });

      return result;
    }

    return { error: "Impossible to delete. Verify the CPF" };
  }
}
