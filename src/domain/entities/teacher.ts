import { Entity } from "../../core/domain/Entity";

type TeacherProps = {
  full_name: string;
  birthday: Date;
  phone: string;
  email: string;
  gender: string;
  course_id: string;
  cpf: string;
};

export class Teacher extends Entity<TeacherProps> {
  // private constructor isn't instantiated from external
  private constructor(props: TeacherProps) {
    super(props);
  }

  // Static because the method need to be called without instantiate the class
  static create(Props: TeacherProps) {
    const teacher = new Teacher(Props);

    return teacher;
  }
}
