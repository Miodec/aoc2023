import * as Core from "../core";

console.log("Running day 8...");

console.log("Getting input...");
const inputLines = Core.loadFileAsString("./input/8.txt");

console.log("Getting example...");
let exampleLines: string | null = null;
if (Core.fileExists("./input/8_ex.txt")) {
  exampleLines = Core.loadFileAsString("./input/8_ex.txt") ?? [];
} else {
  console.error("Example input not found");
}

interface Locations {
  [key: string]: {
    left: string;
    right: string;
  };
}

interface Data {
  directions: string;
  locations: Locations;
}

function parseFile(file: string): Data {
  let [directions, map] = file.split("\n\n");

  map = map.split("\n").map((l) => l.split(" = "));

  const locations: Locations = {};

  for (const n of map) {
    locations[n[0]] = {
      left: n[1].replace(/[()]/gi, "").split(", ")[0],
      right: n[1].replace(/[()]/gi, "").split(", ")[1],
    };
  }

  return {
    directions,
    locations,
  };
}

console.log("Parsing input...");
const inputData = parseFile(inputLines);

if (exampleLines !== null) console.log("Parsing example...");
const exampleData = exampleLines !== null ? parseFile(exampleLines) : null;

//
// example targets
const targetExamplePart1: number | undefined = undefined;
const targetExamplePart2: number | undefined = undefined;
//

//
// extra functions
function part2finished(locations: string[]): boolean {
  let out = true;
  for (const loc of locations) {
    if (!loc.endsWith("Z")) {
      out = false;
      break;
    }
  }
  return out;
}

function findLCM(numbers: number[]): number {
  let out = 1;

  for (const n of numbers) {
    out = (out * n) / findGCD(out, n);
  }

  return out;
}

function findGCD(a: number, b: number): number {
  if (b === 0) return a;
  return findGCD(b, a % b);
}

//

function part1(example = false): number {
  const withExample = example && exampleData !== null;
  const data = withExample ? exampleData : inputData;
  console.log(`Running part 1${withExample ? " with example data" : ""}...`);
  //
  // part 1

  let currentLoc = "AAA";
  let stepCount = 0;
  let currentDirectionIndex = 0;

  while (currentLoc !== "ZZZ") {
    const direction = data.directions[currentDirectionIndex];

    console.log(`Current location is ${currentLoc}, going ${direction}`);

    currentLoc =
      data.locations[currentLoc][direction === "L" ? "left" : "right"];

    stepCount++;
    currentDirectionIndex++;
    if (currentDirectionIndex >= data.directions.length) {
      currentDirectionIndex = 0;
    }
  }

  //
  return stepCount;
}

function part2(example = false): number {
  const withExample = example && exampleData !== null;
  const data = withExample ? exampleData : inputData;
  console.log(`Running part 2${withExample ? " with example data" : ""}...`);
  //
  // part 2

  const currentLocs: string[] = [];

  for (const [loc, _lr] of Object.entries(data.locations)) {
    if (loc.endsWith("A")) currentLocs.push(loc);
  }

  const cycleStats = [];
  for (const loc of currentLocs) {
    console.log(`checking stats for ${loc}`);
    let currentLoc = loc;
    let stepCount = 0;
    let currentDirectionIndex = 0;

    while (!currentLoc.endsWith("Z")) {
      const direction = data.directions[currentDirectionIndex];

      currentLoc =
        data.locations[currentLoc][direction === "L" ? "left" : "right"];

      stepCount++;
      currentDirectionIndex++;
      if (currentDirectionIndex >= data.directions.length) {
        currentDirectionIndex = 0;
      }
    }
    cycleStats.push({
      locStart: loc,
      locEnd: currentLoc,
      steps: stepCount,
    });
  }

  return findLCM(cycleStats.map((s) => s.steps));

  console.log(currentLocs);

  let stepCount = 0;
  let currentDirectionIndex = 0;

  const start = performance.now();

  while (!part2finished(currentLocs)) {
    const direction = data.directions[currentDirectionIndex];

    if (stepCount % 10000000 === 0) {
      const end = performance.now();
      const time = end - start;
      console.log(
        `\nTook ${time}ms to get to ${stepCount} steps. Target step count is [SPOILER]`,
      );
      console.log(`We are ${stepCount / 14616363770447}% of the way there`);
      const finalTimeMs = Math.round(time * (14616363770447 / stepCount));
      const finalTimeHours = Math.round(finalTimeMs / 1000 / 60 / 60);
      const finalTimeDays = Math.round(finalTimeHours / 24);
      console.log(
        `That means this will take around ${finalTimeMs} ms or ${finalTimeHours} hours or ${finalTimeDays} days to complete`,
      );
    }

    for (const [index, currentLoc] of currentLocs.entries()) {
      currentLocs[index] =
        data.locations[currentLoc][direction === "L" ? "left" : "right"];
    }

    stepCount++;
    currentDirectionIndex++;
    if (currentDirectionIndex >= data.directions.length) {
      currentDirectionIndex = 0;
    }
  }

  //
  return stepCount;
}

//
// in case real input takes a long time to run
const onlyRunExamples = false;
//

// const p1 = onlyRunExamples ? undefined : part1();
const p2 = onlyRunExamples ? undefined : part2();

if (exampleLines === null) {
  console.error("Example data missing, can't check targets");
} else {
  // const p1ex = part1(true);
  const p2ex = part2(true);

  // if (targetExamplePart1 === undefined) {
  //   console.error(
  //     "Part 1 target not set. Can't determine if solution is correct for example data",
  //   );
  //   console.log("Part 1 example solution:", p1ex);
  // } else {
  //   if (p1ex !== targetExamplePart1) {
  //     console.error(
  //       `Part 1 example not matching target (${p1ex} !== ${targetExamplePart1})`,
  //     );
  //   } else {
  //     console.log(`Part 1 example matching target (${targetExamplePart1})`);
  //   }
  // }

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
  // console.log("Part 1 solution:", p1);
  console.log("Part 2 solution:", p2);
}
