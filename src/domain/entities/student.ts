import { Entity } from "../../core/entity/Entity";

type StudentProps = {
  full_name: string;
  birthday: Date;
  phone: string;
  email: string;
  gender: string;
  course_id: string;
  deficiency: boolean;
  deficiency_description?: string;
  cpf: string;
};

export class Student extends Entity<StudentProps> {
  // private constructor isn't instantiated from external
  private constructor(props: StudentProps) {
    super(props);
  }
  // Static because the method need to be called without instantiate the class
  static create(Props: StudentProps) {
    const student = new Student(Props);

    return student;
  }
}
