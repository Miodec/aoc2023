import * as Core from "../core";

console.log("Running day {{day}}...");

console.log("Getting input...");
const inputStringData: string = Core.loadFileAsString("./input/{{day}}.txt");

console.log("Getting example...");
let exampleStringData: string | null = null;
if (Core.fileExists("./input/{{day}}_ex.txt")) {
  exampleStringData = Core.loadFileAsString("./input/{{day}}_ex.txt") ?? [];
} else {
  console.error("Example input not found");
}

function parseData(dataString: string) {
  return dataString.split("\n").map(parseLine);
}

function parseLine(line: string, index: number) {
  return line;
}

console.log("Parsing input...");
const inputData = parseData(inputStringData);

if (exampleStringData !== null) console.log("Parsing example...");
const exampleData =
  exampleStringData !== null ? parseData(exampleStringData) : null;

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

//
// in case real input takes a long time to run
const onlyRunExamples = false;
//

const p1 = onlyRunExamples ? undefined : part1();
const p2 = onlyRunExamples ? undefined : part2();

if (exampleStringData === null) {
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
