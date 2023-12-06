import * as Core from "../core";

console.log("Running day 6...");

console.log("Getting input...");
const inputLines: string[] = Core.loadFileAsArray("./input/6.txt");

console.log("Getting example...");
let exampleLines: string[] | null = null;
if (Core.fileExists("./input/6_ex.txt")) {
  exampleLines = Core.loadFileAsArray("./input/6_ex.txt") ?? [];
} else {
  console.error("Example input not found");
}

interface Race {
  time: number;
  distance: number;
}

function parse(lines: string[]): Race[] {
  let out: Race[] = [];

  const temp = lines.map((l) =>
    l
      .replace(/ +/gi, " ")
      .split(": ")[1]
      .trim()
      .split(" ")
      .map((n) => parseInt(n, 10)),
  );

  for (const [index, time] of temp[0].entries()) {
    const distance = temp[1][index];
    out.push({
      time,
      distance,
    });
  }
  return out;
}

console.log("Parsing input...");
const inputData = parse(inputLines);

if (exampleLines !== null) console.log("Parsing example...");
const exampleData = exampleLines !== null ? parse(exampleLines) : null;

console.log(exampleData);

//
// example targets
const targetExamplePart1: number | undefined = 288;
const targetExamplePart2: number | undefined = undefined;
//

//
// extra functions
function findHoldToWinDurations(race: Race): number[] {
  const out = [];
  for (let t = 0; t < race.time; t++) {
    const timeLeft = race.time - t;
    const speed = t;
    const distance = timeLeft * speed;
    if (distance > race.distance) out.push(t);
  }
  return out;
}
//

function part1(example = false): number {
  const withExample = example && exampleData !== null;
  const data = withExample ? exampleData : inputData;
  console.log(`Running part 1${withExample ? " with example data" : ""}...`);
  const solution: number[] = [];
  //
  // part 1
  for (const [index, race] of data.entries()) {
    console.log(
      `Finding winning hold durations for race #${index + 1} (time: ${
        race.time
      }, distance ${race.distance})`,
    );
    const durCount = findHoldToWinDurations(race).length;
    console.log(`Found ${durCount} possibilities`);
    solution.push(durCount);
  }
  //
  return solution.reduce((prev, curr) => prev * curr);
}

function part2(example = false): number {
  const withExample = example && exampleData !== null;
  const data = withExample ? exampleData : inputData;
  console.log(`Running part 2${withExample ? " with example data" : ""}...`);
  const solution: number[] = [];
  //
  // part 2

  let timeStr = "";
  let distStr = "";

  for (const [_index, race] of data.entries()) {
    timeStr += `${race.time}`;
    distStr += `${race.distance}`;
  }

  const part2race: Race = {
    time: parseInt(timeStr, 10),
    distance: parseInt(distStr, 10),
  };

  console.log(
    `Finding winning hold durations for race (time: ${part2race.time}, distance ${part2race.distance})`,
  );
  const durCount = findHoldToWinDurations(part2race).length;
  console.log(`Found ${durCount} possibilities`);
  solution.push(durCount);
  //
  return solution.reduce((prev, curr) => prev * curr);
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
