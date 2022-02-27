import { Entity } from "../../core/entity/Entity";

type CourseProps = {
  title_course: string;
  description?: string;
  time_course: string;
};

export class Course extends Entity<CourseProps> {
  // private constructor isn't instantiated from external
  private constructor(props: CourseProps) {
    super(props);
  }

  // Static because the method need to be called without instantiate the class
  static create(props: CourseProps) {
    const school = new Course(props);

    return school;
  }
}
