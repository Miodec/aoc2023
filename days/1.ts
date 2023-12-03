import * as Core from "../core";

const lines = Core.loadFileAsArray("./input/1.txt");

let part1 = 0;
let part2 = 0;

const numbers = [
  {
    string: "zero",
    number: "0",
  },
  {
    string: "one",
    number: "1",
  },
  {
    string: "two",
    number: "2",
  },
  {
    string: "three",
    number: "3",
  },
  {
    string: "four",
    number: "4",
  },
  {
    string: "five",
    number: "5",
  },
  {
    string: "six",
    number: "6",
  },
  {
    string: "seven",
    number: "7",
  },
  {
    string: "eight",
    number: "8",
  },
  {
    string: "nine",
    number: "9",
  },
];

for (const line of lines) {
  let left1: string | null = null;
  let right1: string | null = null;
  let left2: string | null = null;
  let right2: string | null = null;

  for (let i = 0; i < line.length; i++) {
    const sliced = line.slice(i);
    const stringNumber = numbers.find((n) => sliced.startsWith(n.string))
      ?.number;

    if ("0123456789".includes(line[i])) {
      if (left1 === null) {
        left1 = line[i];
      } else {
        right1 = line[i];
      }
    }

    if ("0123456789".includes(line[i]) || stringNumber !== undefined) {
      if (left2 === null) {
        left2 = stringNumber ?? line[i];
      } else {
        right2 = stringNumber ?? line[i];
      }
    }
  }
  if (left1 === null) {
    throw new Error("No left1");
  }
  if (left2 === null) {
    throw new Error("No left2");
  }
  if (right1 === null) {
    right1 = left1;
  }
  if (right2 === null) {
    right2 = left2;
  }
  part1 += parseInt(`${left1}${right1}`);
  part2 += parseInt(`${left2}${right2}`);
}

console.log(part1);
console.log(part2);
