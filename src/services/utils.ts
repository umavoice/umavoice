const fs = require("fs");

export default class Utils {
  path: String = "./build/src/uploads/";

  compareTwoArrays(array1: string[], array2: string[]): boolean {
    return (
      array1.length === array2.length &&
      array1
        .sort()
        .every((value: string, index: number) => value === array2.sort()[index])
    );
  }

  readFile(filename: string): string {
    const path: string = this.path + filename;
    let dataString: string = "";

    try {
      dataString = fs.readFileSync(path);
    } catch (err) {
      console.error(err);
    }
    return dataString;
  }

  deleteFile(filename: string): void {
    const path: string = this.path + filename;
    try {
      fs.unlinkSync(path);
    } catch (err) {
      console.error(err);
    }
  }
}
