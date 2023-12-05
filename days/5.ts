import * as Core from "../core";

console.log("Running day 5...");

console.log("Getting input...");
const inputLines: string[] = Core.loadFileAsArray("./input/5.txt");

console.log("Getting example...");
let exampleLines: string[] | null = null;
if (Core.fileExists("./input/5_ex.txt")) {
  exampleLines = Core.loadFileAsArray("./input/5_ex.txt") ?? [];
} else {
  console.error("Example input not found");
}

function parseLine(line: string, index: number) {
  return;
}

interface Range {
  sourceStart: number;
  destinationStart: number;
  rangeLength: number;
}

interface Step {
  description: string;
  ranges: Range[];
}

function fullParse(inputLines: string[]) {
  let mid = {
    seeds: [] as number[],
    rest: [] as string[],
  };

  mid.seeds = inputLines
    .splice(0, 1)[0]
    .split(": ")[1]
    .split(" ")
    .map((x) => parseInt(x));

  mid.rest = inputLines.splice(1);

  let currentDesc = "";
  let currentRanges = [] as Range[];
  const outSteps: Step[] = [];

  for (const line of mid.rest) {
    if (line === "") continue;
    if (line.includes("map:")) {
      //new step - first, insert current step
      if (currentDesc !== "") {
        outSteps.push({
          description: currentDesc,
          ranges: currentRanges,
        });

        //reset
        currentDesc = "";
        currentRanges = [];
      }
      //build step
      currentDesc = line.split(" map:")[0];
    } else {
      //line is full of numbers
      const numbers = line.split(" ").map((x) => parseInt(x));

      currentRanges.push({
        sourceStart: numbers[1],
        destinationStart: numbers[0],
        rangeLength: numbers[2],
      });
    }
  }

  outSteps.push({
    description: currentDesc,
    ranges: currentRanges,
  });

  return {
    seeds: mid.seeds,
    steps: outSteps,
  };
}

console.log("Parsing input...");
const inputData = fullParse(inputLines);

if (exampleLines !== null) console.log("Parsing example...");
const exampleData = exampleLines !== null ? fullParse(exampleLines) : null;

//
// example targets
const targetExamplePart1: number | undefined = 35;
const targetExamplePart2: number | undefined = 46;
//

//
// extra functions
function mapSourceToDestination(source: number, ranges: Range[]): number {
  //check if number is within any of the ranges
  let mappedNumber = -1;

  for (const range of ranges) {
    if (mappedNumber !== -1) continue;
    if (
      range.sourceStart <= source &&
      source < range.sourceStart + range.rangeLength
    ) {
      const offset = source - range.sourceStart;
      mappedNumber = range.destinationStart + offset;
    }
  }

  return mappedNumber === -1 ? source : mappedNumber;
}
//

function part1(example = false): number {
  const withExample = example && exampleData !== null;
  const data = withExample ? exampleData : inputData;
  console.log(`Running part 1${withExample ? " with example data" : ""}...`);
  const locations: number[] = [];
  //
  // part 1
  for (const seed of data.seeds) {
    console.log(`Checking seed ${seed}...`);
    let out = seed;
    for (const step of data.steps) {
      console.log(`Mapping ${out} in step ${step.description}...`);
      out = mapSourceToDestination(out, step.ranges);
    }
    console.log(`Final location for seed ${seed} is ${out}.`);
    locations.push(out);
  }
  //
  return Math.min(...locations);
}

function part2(example = false): number {
  const withExample = example && exampleData !== null;
  const data = withExample ? exampleData : inputData;
  console.log(`Running part 2${withExample ? " with example data" : ""}...`);
  let smallestSoFar: number | null = null;

  //
  // part 2
  for (let s = 0; s < data.seeds.length; s += 2) {
    console.log(
      `Checking range ${data.seeds[s]} - ${data.seeds[s] + data.seeds[s + 1]}`,
    );
    console.log(
      `${s / 2} seed ranges done. ${
        data.seeds.length / 2 - s / 2
      } ranges to go...`,
    );
    for (let si = 0; si < data.seeds[s + 1]; si++) {
      const seed = data.seeds[s] + si;
      let out = seed;
      for (const step of data.steps) {
        out = mapSourceToDestination(out, step.ranges);
      }
      // console.log(`Final location for seed ${seed} is ${out}.`);
      if (smallestSoFar === null || out < smallestSoFar) {
        smallestSoFar = out;
      }
    }
  }
  //
  return smallestSoFar as number;
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
