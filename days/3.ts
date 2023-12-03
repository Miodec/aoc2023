import * as Core from "../core";

console.log("Getting input...");
const inputLines: string[] = Core.loadFileAsArray("./input/3.txt");

function parse(line: string, _: number) {
  return line.split("");
}

console.log("Parsing...");
const data = inputLines.map(parse);

function part1() {
  let currentNumber: string | null = null;
  let startingPos: [number, number] | null = null;
  let endingPos: [number, number] | null = null;

  let total = 0;

  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].length; x++) {
      const parsed = parseInt(data[y][x], 10);
      if (Number.isFinite(parsed)) {
        //still on a number
        if (startingPos === null) {
          startingPos = [x, y];
        }
        endingPos = [x, y];
        if (currentNumber === null) {
          currentNumber = data[y][x];
        } else {
          currentNumber += data[y][x];
        }
      } else {
        //no longer on a number
        if (currentNumber !== null) {
          //check all around for signs other than .
          console.log(
            `Found number ${currentNumber} starting at pos ${startingPos} and ending at ${endingPos}`,
          );

          console.log("Getting min and max position values...");
          //corners
          const minX = Math.min(startingPos[0], endingPos[0]);
          const maxX = Math.max(startingPos[0], endingPos[0]);
          const minY = Math.min(startingPos[1], endingPos[1]);
          const maxY = Math.max(startingPos[1], endingPos[1]);

          console.log(
            `Min max values found: minx ${minX} miny ${minY} maxX ${maxX} maxY ${maxY}`,
          );

          console.log("Looking for symbols...");
          for (let x = minX - 1; x <= maxX + 1; x++) {
            for (let y = minY - 1; y <= maxY + 1; y++) {
              const symbol = data?.[y]?.[x] ?? ".";
              // console.log(
              //   `Checking for symbol at position ${x} ${y} (${symbol})...`,
              // );
              if (/[^\d.]/gi.test(symbol)) {
                total += parseInt(currentNumber, 10);
                console.log(
                  `Symbol ${symbol} found. Adding ${currentNumber} to total. New total is ${total}...`,
                );
                continue;
              }
            }
          }

          currentNumber = null;
          startingPos = null;
          endingPos = null;
        }
      }
    }
  }

  return total;
}

function expandSelectionAndReturnNumber(x, y): number {
  let string = data[y][x];

  if (/\d/gi.test(string)) {
    //starting from a number, continue to expand
    let left = x;
    let right = x;

    while (/\d/.test(data[y][left - 1])) {
      const charToCheck = data[y][left - 1];
      if (/\d/.test(charToCheck)) {
        string = charToCheck + string;
      }
      left--;
    }

    while (/\d/.test(data[y][right + 1])) {
      const charToCheck = data[y][right + 1];
      if (/\d/.test(charToCheck)) {
        string = string + charToCheck;
      }
      right++;
    }

    return parseInt(string, 10);
  } else {
    return 0;
  }
}

console.log(" -------- Expand test", expandSelectionAndReturnNumber(6, 2));

function part2() {
  console.log("Running part 2...");
  let total = 0;
  for (let y = 0; y < data.length; y++) {
    // const row = 5;

    // for (let y = row; y < row + 1; y++) {
    for (let x = 0; x < data[y].length; x++) {
      const char = data[y][x];

      if (/\*/gi.test(char)) {
        console.log(
          `Char at position ${[x, y]} is a *, looking for numbers around it...`,
        );

        //check above, left right and below
        const found = {
          above: false,
          below: false,
          left: false,
          right: false,
        };
        const double = {
          above: false,
          below: false,
        };
        if (
          [data[y - 1][x - 1], data[y - 1][x], data[y - 1][x + 1]].some((c) =>
            /\d/.test(c),
          )
        ) {
          if (
            data[y - 1][x] === "." &&
            /\d/.test(data[y - 1][x - 1]) &&
            /\d/.test(data[y - 1][x + 1])
          )
            double.above = true;
          found.above = true;
        }
        if (
          [data[y + 1][x - 1], data[y + 1][x], data[y + 1][x + 1]].some((c) =>
            /\d/.test(c),
          )
        ) {
          if (
            data[y + 1][x] === "." &&
            /\d/.test(data[y + 1][x - 1]) &&
            /\d/.test(data[y + 1][x + 1])
          )
            double.below = true;
          found.below = true;
        }
        if (/\d/.test(data[y][x - 1])) {
          found.left = true;
        }
        if (/\d/.test(data[y][x + 1])) {
          found.right = true;
        }

        // console.log(found);
        // console.log(double);

        const foundCount =
          Object.values(found).filter((a) => a).length +
          Object.values(double).filter((a) => a === true).length;
        console.log(`Found ${foundCount} numbers around the *...`);

        if (foundCount > 2) {
          throw new Error("More than 2 gear numbers not supported!");
        } else if (foundCount === 2) {
          console.log("Expanding selection...");

          let numbers: number[] = [];

          for (const ab of ["above", "below"]) {
            const abi = ab === "above" ? y - 1 : y + 1;

            if (double[ab]) {
              numbers.push(expandSelectionAndReturnNumber(x - 1, abi));
              numbers.push(expandSelectionAndReturnNumber(x + 1, abi));
            } else {
              let alreadyPushed = false;
              for (let xc = x - 1; xc < x + 2; xc++) {
                if (alreadyPushed) continue;
                const n = expandSelectionAndReturnNumber(xc, abi);
                if (n) {
                  alreadyPushed = true;
                  numbers.push(n);
                }
              }
            }
          }

          //left
          numbers.push(expandSelectionAndReturnNumber(x - 1, y));

          //right
          numbers.push(expandSelectionAndReturnNumber(x + 1, y));

          numbers = numbers.filter((a) => a > 0);

          if (numbers.length > 2) {
            throw new Error("More than 2 numbers! " + numbers);
          }

          console.log(
            `Found ${numbers[0]} and ${numbers[1]} around the *. Multiplying and adding to total...`,
          );

          total += numbers.reduce((prev, curr) => curr * prev);
        }
      }
    }
  }

  return total;
}

const p1 = part1();
const p2 = part2();

console.log("Part 1:", p1);
console.log("Part 2:", p2);
