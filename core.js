import * as fs from "fs";

export function fileExists(path) {
  return fs.existsSync(path);
}

export function loadFileAsString(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

export function loadFileAsArray(filePath) {
  return fs.readFileSync(filePath, "utf8").split("\n");
}

export function splitArrayOnElement(array, element) {
  const res = [];
  let current = [];
  for (const item of array) {
    if (item === element) {
      res.push(current);
      current = [];
    } else {
      current.push(item);
    }
  }
  res.push(current);
  return res;
}

export function intersect(a, b, removeDuplicates = false) {
  let t;
  if (b.length > a.length) (t = b), (b = a), (a = t); // indexOf to loop over shorter
  const filtered = a.filter(function (e) {
    return b.indexOf(e) > -1;
  });
  return removeDuplicates ? [...new Set(filtered)] : filtered;
}
