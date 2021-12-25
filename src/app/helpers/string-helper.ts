export class StringHelper {
  public generateDateTimeBasedUID(): string {
    let now = Date();
    return new Date().toISOString().replace(' ', '-');
  }

  public unicode2ansi(str: string) : string {
    return str.replace(/[^\x00-\x7F]/g, "");
  }
}
