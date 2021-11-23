import { AppNotification } from "src/common/application/app.notification";
import { Result } from "typescript-result";

export class Phone {
  private readonly value: string;
  private static MAX_LENGTH: number = 9;

  private constructor(value: string) {
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }

  public static create(value: string): Result<AppNotification, Phone>
  {
    let notification: AppNotification = new AppNotification();
    value = (value ?? "").trim();
    if (value === "") {
      notification.addError('Phone number is required', null);
    }
    if (value.length != this.MAX_LENGTH) {
      notification.addError('Phone number field must have ' + Phone.MAX_LENGTH + ' characters', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new Phone(value));
  }
}