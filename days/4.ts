import * as Core from "../core";

console.log("Running day 4...");

console.log("Getting input...");
const inputLines: string[] = Core.loadFileAsArray("./input/4.txt");

console.log("Getting example...");
let exampleLines: string[] | null = null;
if (Core.fileExists("./input/4_ex.txt")) {
  exampleLines = Core.loadFileAsArray("./input/4_ex.txt") ?? [];
} else {
  console.error("Example input not found");
}

function parse(line: string, _: number) {
  const [leftSide, rightSide] = line.split(": ");
  const cardId = parseInt(leftSide.split("Card ")[1], 10);

  const [w, a] = rightSide.replace(/ +/gi, " ").trim().split(" | ");

  const winners = w.split(" ").map((n) => parseInt(n, 10));
  const allNumbers = a.split(" ").map((n) => parseInt(n, 10));

  const ret = {
    cardId,
    winningNumbers: winners,
    allNumbers,
  };

  return ret;
}

console.log("Parsing input...");
const inputData = inputLines.map(parse);

if (exampleLines !== null) console.log("Parsing example...");
const exampleData = exampleLines !== null ? exampleLines!.map(parse) : null;

//
// example targets
const targetExamplePart1: number | undefined = 13;
const targetExamplePart2: number | undefined = 30;
//

//
// extra functions
function increaseCardScore(currentScore: number): number {
  if (currentScore === 0) {
    return 1;
  } else {
    return currentScore * 2;
  }
}
//

function part1(example = false): number {
  const withExample = example && exampleData !== null;
  const data = withExample ? exampleData : inputData;
  console.log(`Running part 1${withExample ? " with example data" : ""}...`);
  let solution = 0;
  //
  // part 1

  for (const card of data) {
    let cardScore = 0;
    for (const winningNumber of card.winningNumbers) {
      if (card.allNumbers.includes(winningNumber)) {
        cardScore = increaseCardScore(cardScore);
      }
    }
    solution += cardScore;
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

  const cardMultipliers: number[] = [];

  for (let i = 0; i < data.length; i++) {
    cardMultipliers[i] = 1;
  }

  for (const card of data) {
    const multiplier = cardMultipliers[card.cardId - 1] ?? 1;
    // console.log(`Card ${card.cardId} has a multiplier of ${multiplier}.`);
    for (let i = 0; i < multiplier; i++) {
      let matchCount = 0;
      for (const winningNumber of card.winningNumbers) {
        if (card.allNumbers.includes(winningNumber)) {
          matchCount++;
        }
      }

      // console.log(`Card ${card.cardId} has ${matchCount} matching numbers.`);

      if (matchCount > 0) {
        for (let i = card.cardId; i < card.cardId + matchCount; i++) {
          if (cardMultipliers[i] !== undefined) {
            cardMultipliers[i] += 1;
          } else {
            cardMultipliers[i] = 1;
          }
        }
      }
    }

    // console.log(cardMultipliers);
  }

  solution = cardMultipliers.reduce((prev, current) => prev + current);

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
