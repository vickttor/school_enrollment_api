import crypto from "crypto";

export class Entity<T> {
  public id: string;
  public props: T;

  constructor(props: T) {
    this.props = props;
    this.id = crypto.randomUUID();
  }
}
