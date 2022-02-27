import { Entity } from "../../core/entity/Entity";

type TeacherProps = {
  full_name: string;
  birthday: Date;
  phone: string;
  email: string;
  gender: string;
  courses_id: Array<string>;
  cpf: string;
};

export class Teacher extends Entity<TeacherProps> {
  // private constructor isn't instantiated from external
  private constructor(props: TeacherProps) {
    super(props);
  }

  // Static because the method need to be called without instantiate the class
  static create(Props: TeacherProps) {
    const student = new Teacher(Props);

    return student;
  }
}
