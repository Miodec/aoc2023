import * as Core from "../core";

console.log("Running day 9...");

console.log("Getting input...");
const inputLines: string[] = Core.loadFileAsArray("./input/9.txt");

console.log("Getting example...");
let exampleLines: string[] | null = null;
if (Core.fileExists("./input/10_ex.txt")) {
  exampleLines = Core.loadFileAsArray("./input/9_ex.txt") ?? [];
} else {
  console.error("Example input not found");
}

function parse(line: string, index: number) {
  return line.split(" ").map((x) => parseInt(x, 10));
}

console.log("Parsing input...");
const inputData = inputLines.map(parse);

if (exampleLines !== null) console.log("Parsing example...");
const exampleData = exampleLines !== null ? exampleLines!.map(parse) : null;

//
// example targets
const targetExamplePart1: number | undefined = 114;
const targetExamplePart2: number | undefined = 2;
//

//
// extra functions

function areAllValuesZero(arr: number[]): boolean {
  return arr.every((x) => x === 0);
}

//

function part1(example = false): number {
  const withExample = example && exampleData !== null;
  const data = withExample ? exampleData : inputData;
  console.log(`Running part 1${withExample ? " with example data" : ""}...`);
  let solution = 0;
  //
  // part 1

  for (const numberSet of data) {
    const levels: number[][] = [];
    levels.push(numberSet);
    while (!areAllValuesZero(levels[levels.length - 1])) {
      //while all values are not zero, push the differences in
      const last = levels[levels.length - 1];
      const out: number[] = [];

      for (let i = 1; i < last.length; i++) {
        out.push(last[i] - last[i - 1]);
      }
      levels.push(out);
    }

    //add zero to the last level
    levels[levels.length - 1].push(0);

    //extrapolate up
    for (let i = levels.length - 1; i > 0; i--) {
      const currentLevel = levels[i];
      const currentLastValue = currentLevel[currentLevel.length - 1];
      const previousLevel = levels[i - 1];
      const previousLevelLastValue = previousLevel[previousLevel.length - 1];
      previousLevel.push(currentLastValue + previousLevelLastValue);
    }
  }

  //get all values from the first level
  solution = data.map((ns) => ns[ns.length - 1]).reduce((a, b) => a + b, 0);

  //
  return solution;
}

function part2(example = false): number {
  const withExample = example && exampleData !== null;
  const data = withExample ? exampleData : inputData;
  console.log(`Running part 2${withExample ? " with example data" : ""}...`);
  let solution = 0;
  //
  // part 2

  const reversed: number[][] = data.map((ns) => ns.toReversed());
  for (const numberSet of reversed) {
    const levels: number[][] = [];
    levels.push(numberSet);
    while (!areAllValuesZero(levels[levels.length - 1])) {
      //while all values are not zero, push the differences in
      const last = levels[levels.length - 1];
      const out: number[] = [];

      for (let i = 1; i < last.length; i++) {
        out.push(last[i] - last[i - 1]);
      }
      levels.push(out);
    }

    //add zero to the last level
    levels[levels.length - 1].push(0);

    //extrapolate up
    for (let i = levels.length - 1; i > 0; i--) {
      const currentLevel = levels[i];
      const currentLastValue = currentLevel[currentLevel.length - 1];
      const previousLevel = levels[i - 1];
      const previousLevelLastValue = previousLevel[previousLevel.length - 1];
      previousLevel.push(currentLastValue + previousLevelLastValue);
    }
  }

  //get all values from the first level
  solution = reversed.map((ns) => ns[ns.length - 1]).reduce((a, b) => a + b, 0);

  //
  return solution;
}

//
// in case real input takes a long time to run
const onlyRunExamples = false;
//

const p1 = onlyRunExamples ? undefined : part1();
const p2 = onlyRunExamples ? undefined : part2();

if (exampleLines === null) {
  console.error("Example data missing, can't check targets");
} else {
  const p1ex = part1(true);
  const p2ex = part2(true);

  if (targetExamplePart1 === undefined) {
    console.error(
      "Part 1 target not set. Can't determine if solution is correct for example data",
    );
    console.log("Part 1 example solution:", p1ex);
  } else {
    if (p1ex !== targetExamplePart1) {
      console.error(
        `Part 1 example not matching target (${p1ex} !== ${targetExamplePart1})`,
      );
    } else {
      console.log(`Part 1 example matching target (${targetExamplePart1})`);
    }
  }

  if (targetExamplePart2 === undefined) {
    console.error(
      "Part 2 target not set. Can't determine if solution is correct for example data",
    );
    console.log("Part 2 example solution:", p2ex);
  } else {
    if (p2ex !== targetExamplePart2) {
      console.error(
        `Part 2 example not matching target (${p2ex} !== ${targetExamplePart2})`,
      );
    } else {
      console.log(`Part 2 example matching target (${targetExamplePart2})`);
    }
  }
}

if (!onlyRunExamples) {
  console.log("Part 1 solution:", p1);
  console.log("Part 2 solution:", p2);
}
