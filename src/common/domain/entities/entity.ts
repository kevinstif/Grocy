import { AggregateRoot } from '@nestjs/cqrs';

export class Entity extends AggregateRoot {
  protected id: number;

  protected constructor(id: number) {
    super();
    this.id = id;
  }

  public changeId(id: number): void {
    this.id = id;
  }

  public getId(): number {
    return this.id;
  }
}