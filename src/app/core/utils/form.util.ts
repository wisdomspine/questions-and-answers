export class FormUtil {
  constructor() {
    throw new Error("FormUtil can't be instantiated");
  }

  static formDataFromMap(map: { [key: string]: any }): FormData {
    const formData = new FormData();
    for (const key in map ?? {}) {
      formData.append(key, map[key]);
    }
    return formData;
  }
}
