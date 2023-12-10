import * as Core from "../core";

console.log("Running day 10...");

console.log("Getting input...");
const inputLines: string[] = Core.loadFileAsArray("./input/10.txt");

console.log("Getting example...");
let exampleLines: string[] | null = null;
if (Core.fileExists("./input/10_ex.txt")) {
  exampleLines = Core.loadFileAsArray("./input/10_ex.txt") ?? [];
} else {
  console.error("Example input not found");
}

function parse(line: string, index: number) {
  return line.split("");
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

function findConnections(
  data: string[][],
  x: number,
  y: number,
): [number, number] {
  const connections: number[] = [];
  const above = data[y - 1]?.[x];
  if (["|", "7", "F", "S"].includes(above)) {
    connections.push(0);
  }
  const below = data[y + 1]?.[x];
  if (["|", "L", "J", "S"].includes(below)) {
    connections.push(2);
  }
  const left = data[y]?.[x - 1];
  if (["-", "L", "F", "S"].includes(left)) {
    connections.push(3);
  }
  const right = data[y]?.[x + 1];
  if (["-", "7", "J", "S"].includes(right)) {
    connections.push(1);
  }
  if (connections.length !== 2) {
    throw new Error(
      `Invalid number of connections (${connections.length}), expected 2. above ${above}, below ${below}, left ${left}, right ${right}`,
    );
  }
  return connections as [number, number];
}

function navigate(from: number, char: string): number {
  if (char === "|") {
    return from;
  }
  if (char === "-") {
    return from;
  }
  if (char === "L") {
    if (from === 2) return 1;
    if (from === 3) return 0;
  }
  if (char === "J") {
    if (from === 2) return 3;
    if (from === 1) return 0;
  }
  if (char === "7") {
    if (from === 0) return 3;
    if (from === 1) return 2;
  }
  if (char === "F") {
    if (from === 0) return 1;
    if (from === 3) return 2;
  }
  throw new Error(`Invalid char ${char}`);
}

function findCoordinates(
  data: string[][],
  char: string,
): [number, number] | null {
  for (let y = 0; y < data.length; y++) {
    const row = data[y];
    for (let x = 0; x < row.length; x++) {
      if (row[x] === char) {
        return [x, y];
      }
    }
  }
  return null;
}

function shiftCoordinates(
  x: number,
  y: number,
  direction: number,
): [number, number] {
  switch (direction) {
    case 0:
      return [x, y - 1];
    case 1:
      return [x + 1, y];
    case 2:
      return [x, y + 1];
    case 3:
      return [x - 1, y];
    default:
      return [x, y];
  }
}

function isOpposite(direction1: number, direction2: number): boolean {
  return Math.abs(direction1 - direction2) === 2;
}

function getOpposite(direction: number): number {
  return (direction + 2) % 4;
}

function getDirectionString(dir: number): string {
  switch (dir) {
    case 0:
      return "up";
    case 1:
      return "right";
    case 2:
      return "down";
    case 3:
      return "left";
    default:
      return "unknown";
  }
}

function displayData(data: string[][]): void {
  //replace characters with box drawing characters and console log
  // return console.log(data.map((row) => row.join("")).join("\n"));

  const displayData: string[][] = [];
  for (let y = 0; y < data.length; y++) {
    const row = data[y];
    displayData.push([]);
    for (let x = 0; x < row.length; x++) {
      const char = row[x];
      switch (char) {
        case "|":
          displayData[y].push("║");
          break;
        case "-":
          displayData[y].push("═");
          break;
        case "L":
          displayData[y].push("╚");
          break;
        case "J":
          displayData[y].push("╝");
          break;
        case "7":
          displayData[y].push("╗");
          break;
        case "F":
          displayData[y].push("╔");
          break;
        case "S":
          displayData[y].push("S");
          break;
        case "O":
          displayData[y].push("█");
          break;
        default:
          displayData[y].push(" ");
          break;
      }
    }
  }
  console.log(displayData.map((row) => row.join("")).join("\n"));
}

interface Node {
  x: number;
  y: number;
  distance: number;
}

//

function part1(example = false): number {
  const withExample = example && exampleData !== null;
  const data = withExample ? exampleData : inputData;
  console.log(`Running part 1${withExample ? " with example data" : ""}...`);
  let solution = 0;
  //
  // part 1

  const startCoords = findCoordinates(data, "S");

  if (startCoords === null) {
    throw new Error("Start coordinates not found");
  }

  let found = false;
  let [direction1, direction2] = findConnections(
    data,
    startCoords[0],
    startCoords[1],
  );
  let [coords1, coords2] = [
    shiftCoordinates(startCoords[0], startCoords[1], direction1),
    shiftCoordinates(startCoords[0], startCoords[1], direction2),
  ];
  let distance = 1;
  while (!found) {
    // console.log("Current distance", distance);

    // console.log(
    //   `in direction ${getDirectionString(direction1)} there is ${data[
    //     coords1[1]
    //   ]?.[coords1[0]]} at coords ${coords1}`,
    // );
    // console.log(
    //   `in direction ${getDirectionString(direction2)} there is ${data[
    //     coords2[1]
    //   ]?.[coords2[0]]} at coords ${coords2}`,
    // );
    if (coords1[0] === coords2[0] && coords1[1] === coords2[1]) {
      found = true;
      solution = distance;
    } else {
      direction1 = navigate(direction1, data[coords1[1]][coords1[0]]);
      direction2 = navigate(direction2, data[coords2[1]][coords2[0]]);
      coords1 = shiftCoordinates(coords1[0], coords1[1], direction1);
      coords2 = shiftCoordinates(coords2[0], coords2[1], direction2);
    }
    distance++;
  }

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

  const startCoords = findCoordinates(data, "S");

  if (startCoords === null) {
    throw new Error("Start coordinates not found");
  }

  let found = false;
  let [direction1, direction2] = findConnections(
    data,
    startCoords[0],
    startCoords[1],
  );
  let [coords1, coords2] = [
    shiftCoordinates(startCoords[0], startCoords[1], direction1),
    shiftCoordinates(startCoords[0], startCoords[1], direction2),
  ];
  const mainLoopCoords: [number, number][] = [];
  mainLoopCoords.push(startCoords);
  mainLoopCoords.push(coords1);
  mainLoopCoords.push(coords2);
  while (!found) {
    // console.log("Current distance", distance);

    // console.log(
    //   `in direction ${getDirectionString(direction1)} there is ${data[
    //     coords1[1]
    //   ]?.[coords1[0]]} at coords ${coords1}`,
    // );
    // console.log(
    //   `in direction ${getDirectionString(direction2)} there is ${data[
    //     coords2[1]
    //   ]?.[coords2[0]]} at coords ${coords2}`,
    // );
    if (coords1[0] === coords2[0] && coords1[1] === coords2[1]) {
      found = true;
    } else {
      direction1 = navigate(direction1, data[coords1[1]][coords1[0]]);
      direction2 = navigate(direction2, data[coords2[1]][coords2[0]]);
      coords1 = shiftCoordinates(coords1[0], coords1[1], direction1);
      coords2 = shiftCoordinates(coords2[0], coords2[1], direction2);
      mainLoopCoords.push(coords1);
      mainLoopCoords.push(coords2);
    }
  }

  //replace S
  const startConnections = findConnections(
    data,
    startCoords[0],
    startCoords[1],
  );
  if (startConnections[0] === 0) {
    if (startConnections[1] === 1) {
      data[startCoords[1]][startCoords[0]] = "L";
    } else if (startConnections[1] === 2) {
      data[startCoords[1]][startCoords[0]] = "|";
    } else if (startConnections[1] === 3) {
      data[startCoords[1]][startCoords[0]] = "J";
    }
  } else if (startConnections[0] === 1) {
    if (startConnections[1] === 0) {
      data[startCoords[1]][startCoords[0]] = "L";
    } else if (startConnections[1] === 2) {
      data[startCoords[1]][startCoords[0]] = "F";
    } else if (startConnections[1] === 3) {
      data[startCoords[1]][startCoords[0]] = "-";
    }
  } else if (startConnections[0] === 2) {
    if (startConnections[1] === 0) {
      data[startCoords[1]][startCoords[0]] = "|";
    } else if (startConnections[1] === 1) {
      data[startCoords[1]][startCoords[0]] = "F";
    } else if (startConnections[1] === 3) {
      data[startCoords[1]][startCoords[0]] = "7";
    }
  } else if (startConnections[0] === 3) {
    if (startConnections[1] === 0) {
      data[startCoords[1]][startCoords[0]] = "J";
    } else if (startConnections[1] === 1) {
      data[startCoords[1]][startCoords[0]] = "-";
    } else if (startConnections[1] === 2) {
      data[startCoords[1]][startCoords[0]] = "7";
    }
  }

  //filter data to only include main loop
  const filteredData: string[][] = [];
  for (let y = 0; y < data.length; y++) {
    const row = data[y];
    filteredData.push([]);
    for (let x = 0; x < row.length; x++) {
      if (mainLoopCoords.some((c) => c[0] === x && c[1] === y)) {
        filteredData[y].push(row[x]);
      } else {
        filteredData[y].push(".");
      }
    }
  }

  displayData(filteredData);

  let enclosedNodes = 0;
  const enclosedPositions: [number, number][] = [];
  for (let y = 0; y < filteredData.length; y++) {
    // console.log(filteredData[y].join(""));
    let previousNode: null | string = null;
    let segmentCount = 0;
    for (let x = 0; x < filteredData[y].length; x++) {
      if (previousNode === null) {
        previousNode = filteredData[y][x];
      } else {
        const currentNode = filteredData[y][x];
        if (["F", "7", "|"].includes(currentNode)) {
          segmentCount++;
        }
        if (currentNode === "." && segmentCount % 2 !== 0) {
          enclosedPositions.push([x, y]);
          enclosedNodes++;
          // console.log("Adding", x, y);
        }
        previousNode = currentNode;
      }
    }
  }

  console.log("Enclosed nodes:", enclosedNodes);
  console.log("Enclosed positions:", enclosedPositions);

  for (const [x, y] of enclosedPositions) {
    filteredData[y][x] = "O";
  }

  displayData(filteredData);

  solution = enclosedNodes;

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
