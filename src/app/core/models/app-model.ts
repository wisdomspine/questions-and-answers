export class AppModel<T = any> {
  constructor(args?: Partial<T>) {
    Object.assign(this, args ?? {});
  }
}
