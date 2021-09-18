export class ObjectUtil {
  constructor() {
    throw 'Not implementable';
  }

  static deepSearch<T extends Object>(searchPhrase: string, objects: T[]) {
    let re = new RegExp(searchPhrase.trim().split(/\s+/).join('|'), 'i');
    return objects.filter((object) => {
      let matched = false;
      for (const key in object) {
        matched =
          Object.prototype.hasOwnProperty.call(object, key) &&
          //   we're doing only a one-level search because of this project. nested object are converted to string using default
          //  toString() implicitly called via  `${object[key]}` below
          re.test(`${object[key]}`);
        if (matched) break;
      }
      return matched;
    });
  }
}
