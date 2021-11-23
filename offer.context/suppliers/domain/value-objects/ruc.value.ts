import { AppNotification } from "src/common/application/app.notification";
import { Result } from "typescript-result";

export class Ruc {
  private readonly value: string;
  private static MAX_LENGTH: number = 11;

  private constructor(value: string) {
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }

  public static create(value: string): Result<AppNotification, Ruc>
  {
    let notification: AppNotification = new AppNotification();
    value = (value ?? "").trim();
    if (value === "") {
      notification.addError('Ruc is required', null);
    }
    if (value.length != this.MAX_LENGTH) {
      notification.addError('Ruc field must have ' + Ruc.MAX_LENGTH + ' characters', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new Ruc(value));
  }
}