import * as Core from "../core";

console.log("Running day 11...");

console.log("Getting input...");
const inputStringData: string = Core.loadFileAsString("./input/11.txt");

console.log("Getting example...");
let exampleStringData: string | null = null;
if (Core.fileExists("./input/11_ex.txt")) {
  exampleStringData = Core.loadFileAsString("./input/11_ex.txt") ?? [];
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
const targetExamplePart1: number | undefined = 374;
const targetExamplePart2: number | undefined = 8410;
//

//
// extra functions

function displayData(data: string[]): void {
  console.log(data.join("\n"));
}

function applyExpansionVertically(data: string[], factor: number): string[] {
  const out: string[] = [];
  //vertical
  for (let i = 0; i < data.length; i++) {
    out.push(data[i]);
    if ([...data[i]].every((c) => c === ".")) {
      for (let j = 0; j < factor - 1; j++) {
        out.push(data[i]);
      }
    }
  }
  return out;
}

function rotate2dArray(data: string[]): string[] {
  const out: string[] = [];
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    for (let j = 0; j < row.length; j++) {
      console.log(i, j);
      if (out[j] === undefined) out[j] = "";
      out[j] += row[j];
    }
  }
  return out;
}

function applyExpansion(data: string[], factor = 2): string[] {
  console.log("Applying expansion...");
  console.log("Expainding vertically...");
  let out = applyExpansionVertically(data, factor);
  console.log("Rotating...");
  out = rotate2dArray(out);
  console.log("Expanding vertically again...");
  out = applyExpansionVertically(out, factor);
  console.log("Rotating 3 more times...");
  out = rotate2dArray(out);
  out = rotate2dArray(out);
  out = rotate2dArray(out);
  return out;
}

interface Galaxy {
  id: number;
  x: number;
  y: number;
}

function findGalaxies(data: string[]): Galaxy[] {
  console.log("Finding galaxies...");
  const out: Galaxy[] = [];
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    for (let j = 0; j < row.length; j++) {
      if (row[j] === "#") {
        out.push({ id: out.length + 1, x: j, y: i });
      }
    }
  }
  return out;
}

//

function part1(example = false): number {
  const withExample = example && exampleData !== null;
  const data = withExample ? exampleData : inputData;
  console.log(`Running part 1${withExample ? " with example data" : ""}...`);
  let solution = 0;
  //
  // part 1
  const expanded = applyExpansion(data);
  const galaxies = findGalaxies(expanded);
  const distances: { [key: string]: number } = {};
  for (let i = 0; i < galaxies.length; i++) {
    for (let j = 0; j < galaxies.length; j++) {
      if (i === j) continue;
      const g1 = galaxies[i];
      const g2 = galaxies[j];
      const dx = Math.abs(g1.x - g2.x);
      const dy = Math.abs(g1.y - g2.y);
      const d = dx + dy;
      const key = `${g1.id}-${g2.id}`;
      const key2 = `${g2.id}-${g1.id}`;
      if (distances[key] === undefined && distances[key2] === undefined) {
        distances[key] = d;
      }
    }
  }
  solution = Object.values(distances).reduce((a, b) => a + b);
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
  const expanded = applyExpansion(data, 1000000);
  const galaxies = findGalaxies(expanded);
  console.log("Finding distances...");
  const distances: { [key: string]: number } = {};
  for (let i = 0; i < galaxies.length; i++) {
    for (let j = 0; j < galaxies.length; j++) {
      if (i === j) continue;
      const g1 = galaxies[i];
      const g2 = galaxies[j];
      const dx = Math.abs(g1.x - g2.x);
      const dy = Math.abs(g1.y - g2.y);
      const d = dx + dy;
      const key = `${g1.id}-${g2.id}`;
      const key2 = `${g2.id}-${g1.id}`;
      if (distances[key] === undefined && distances[key2] === undefined) {
        distances[key] = d;
      }
    }
  }
  solution = Object.values(distances).reduce((a, b) => a + b);
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
