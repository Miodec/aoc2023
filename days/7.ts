import * as Core from "../core";

console.log("Running day 7...");

console.log("Getting input...");
const inputLines: string[] = Core.loadFileAsArray("./input/7.txt");

console.log("Getting example...");
let exampleLines: string[] | null = null;
if (Core.fileExists("./input/7_ex.txt")) {
  exampleLines = Core.loadFileAsArray("./input/7_ex.txt") ?? [];
} else {
  console.error("Example input not found");
}

function parse(line: string) {
  const [left, right] = line.split(" ");
  return {
    hand: left,
    bid: parseInt(right, 10),
  };
}

console.log("Parsing input...");
const inputData = inputLines.map(parse);

if (exampleLines !== null) console.log("Parsing example...");
const exampleData = exampleLines !== null ? exampleLines!.map(parse) : null;

//
// example targets
const targetExamplePart1: number | undefined = 6440;
const targetExamplePart2: number | undefined = undefined;
//

//
// extra functions

const cards: string[] = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
];

const cards2: string[] = [
  "A",
  "K",
  "Q",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "J",
];

interface Hand {
  type: number;
  typeString: string;
  string: string;
  bid: number;
}

interface CardStats {
  card: string;
  count: number;
}

function countOccurencesInHandString(hs: string): CardStats[] {
  const out: CardStats[] = [];
  for (const card of hs) {
    const cardStats = {
      card,
      count: [...hs].filter((c) => c === card).length,
    };
    if (!out.map((cs) => cs.card).includes(card)) out.push(cardStats);
  }
  return out;
}

function handTypeToString(type: number): string {
  return [
    "5 of a kind",
    "4 of a kind",
    "full house",
    "3 of a kind",
    "2 pair",
    "1 pair",
    "high card",
  ][type];
}

function parseHandString(hs: string, bid: number, withJokers = false): Hand {
  let counts = countOccurencesInHandString(hs);

  // console.log(`Counts for ${hs} are ${JSON.stringify(counts)}`);

  const jokerCount = withJokers
    ? counts.filter((cs) => cs.card === "J")[0]?.count ?? 0
    : 0;

  if (withJokers) {
    counts = counts.filter((cs) => cs.card !== "J");
  }

  // console.log(counts);
  // console.log("jokercount", jokerCount);
  // console.log(counts.filter((cs) => cs.count + jokerCount === 2).length);

  const fhTriple = counts.filter((cs) => cs.count + jokerCount === 3);

  const fhc = counts.filter((cs) => cs.card !== fhTriple[0]?.card);

  const fhDouble = fhc.filter((cs) => cs.count === 2);

  let type = -1;
  if (jokerCount === 5) {
    type = 0;
  } else if (counts.filter((cs) => cs.count + jokerCount === 5).length >= 1) {
    //5 of a kind
    type = 0;
  } else if (counts.filter((cs) => cs.count + jokerCount === 4).length >= 1) {
    //4 of a kind
    type = 1;
  } else if (fhTriple.length >= 1 && fhDouble.length === 1) {
    // full house
    type = 2;
  } else if (counts.filter((cs) => cs.count + jokerCount === 3).length >= 1) {
    //3 of a kind
    type = 3;
  } else if (counts.filter((cs) => cs.count + jokerCount === 2).length == 2) {
    //2 pair
    type = 4;
  } else if (counts.filter((cs) => cs.count + jokerCount === 2).length >= 1) {
    //1 pair
    type = 5;
  } else {
    //high card
    type = 6;
  }

  return {
    type,
    typeString: handTypeToString(type),
    string: hs,
    bid,
  };
}

//

function part1(example = false): number {
  const withExample = example && exampleData !== null;
  const data = withExample ? exampleData : inputData;
  console.log(`Running part 1${withExample ? " with example data" : ""}...`);
  const hands: Hand[] = [];
  //
  // part 1
  for (const { hand: inputHand, bid: inputBid } of data) {
    const parsed = parseHandString(inputHand, inputBid);
    hands.push(parsed);
    // console.log(
    //   `Hand ${inputHand} got parsed into ${JSON.stringify(parsed, null, 2)}`,
    // );
  }

  const ordered = hands.sort(
    (a, b) =>
      a.type - b.type ||
      cards.indexOf(a.string[0]) - cards.indexOf(b.string[0]) ||
      cards.indexOf(a.string[1]) - cards.indexOf(b.string[1]) ||
      cards.indexOf(a.string[2]) - cards.indexOf(b.string[2]) ||
      cards.indexOf(a.string[3]) - cards.indexOf(b.string[3]) ||
      cards.indexOf(a.string[4]) - cards.indexOf(b.string[4]),
  );

  // console.log(ordered);

  let solution = 0;

  for (const [index, hand] of ordered.entries()) {
    const rank = ordered.length - index;
    solution += hand.bid * rank;
    if (index < 100) console.log(rank, hand);
  }

  //
  return solution;
}

function part2(example = false): number {
  const withExample = example && exampleData !== null;
  const data = withExample ? exampleData : inputData;
  console.log(`Running part 2${withExample ? " with example data" : ""}...`);
  //
  // part 2
  const hands: Hand[] = [];
  //
  // part 1
  for (const { hand: inputHand, bid: inputBid } of data) {
    const parsed = parseHandString(inputHand, inputBid, true);
    hands.push(parsed);
    // console.log(
    //   `Hand ${inputHand} got parsed into ${JSON.stringify(parsed, null, 2)}`,
    // );
  }

  const ordered = hands.sort(
    (a, b) =>
      a.type - b.type ||
      cards2.indexOf(a.string[0]) - cards2.indexOf(b.string[0]) ||
      cards2.indexOf(a.string[1]) - cards2.indexOf(b.string[1]) ||
      cards2.indexOf(a.string[2]) - cards2.indexOf(b.string[2]) ||
      cards2.indexOf(a.string[3]) - cards2.indexOf(b.string[3]) ||
      cards2.indexOf(a.string[4]) - cards2.indexOf(b.string[4]),
  );

  // console.log(ordered);

  let solution = 0;

  for (const [index, hand] of ordered.entries()) {
    const rank = ordered.length - index;
    solution += hand.bid * rank;
    if (index < 100) console.log(rank, hand);
  }

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

//249629358 weird message
//249629357 again
