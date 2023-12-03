import * as Core from "../core";

console.log("Running day {{day}}...");

console.log("Getting input...");
const inputLines: string[] = Core.loadFileAsArray("./input/{{day}}.txt");

console.log("Getting example...");
let exampleLines: string[] | null = null;
if (Core.fileExists("./input/{{day}}_ex.txt")) {
  exampleLines = Core.loadFileAsArray("./input/{{day}}_ex.txt") ?? [];
} else {
  console.error("Example input not found");
}

function parse(line: string, index: number): unknown {
  return;
}

console.log("Parsing input...");
const inputData = inputLines.map(parse);

if (exampleLines !== null) console.log("Parsing example...");
const exampleData = exampleLines !== null ? exampleLines!.map(parse) : null;

//
// example targets
const targetExamplePart1: number | undefined = undefined;
const targetExamplePart2: number | undefined = undefined;
//

//
// extra functions

//

function part1(example = false): number {
  const withExample = example && exampleData !== null;
  const data = withExample ? exampleData : inputData;
  console.log(`Running part 1${withExample ? " with example data" : ""}...`);
  let solution = 0;
  //
  // part 1

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

  //
  return solution;
}

const p1 = part1();
const p2 = part2();

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

console.log("Part 1 solution:", p1);
console.log("Part 2 solution:", p2);
