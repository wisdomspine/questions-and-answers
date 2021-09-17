export class AppException extends Error {
  body!: object;
  constructor(args: { body?: object; message?: string }) {
    super(args?.message);
    Object.assign(this, args ?? {});
  }
}
