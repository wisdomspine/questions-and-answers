export class FileUtil {
  constructor() {
    throw new Error("[FileUtil can't be called]");
  }

  static fileToBase64(file: File): Promise<string | ArrayBuffer | null> {
    const promise: Promise<string | ArrayBuffer | null> = new Promise(
      (resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.addEventListener('load', (res) => {
          resolve(fileReader.result);
        });
        fileReader.addEventListener('error', (error) => {
          reject(error);
        });
        fileReader.readAsDataURL(file);
      }
    );
    return promise;
  }
}
