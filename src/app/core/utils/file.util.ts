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

  static downloadTextFile(filename: string, content: string) {
    const element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(content)
    );

    // set the filename
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    return;
  }
}
