import * as Core from "../core";

const lines = Core.loadFileAsArray("./input/2.txt");

let part1 = 0;
let part2 = 0;

const part1Bag = {
  red: 12,
  green: 13,
  blue: 14,
};

for (const line of lines) {
  console.log(line);

  const [_, gameId, subsets] = line.match(/Game (\d+): (.+)/);

  const cubeSets = subsets.split(";");

  let allPossible = true;

  const part2Sums = {
    red: 0,
    green: 0,
    blue: 0,
  };

  for (const cubeSet of cubeSets) {
    const cubes = cubeSet.split(",");

    const sums = {
      red: 0,
      green: 0,
      blue: 0,
    };
    for (const cube of cubes) {
      const [count, color] = cube.trim().split(" ");
      sums[color] += parseInt(count);

      if (color === "red" && parseInt(count) > part2Sums.red) {
        part2Sums.red = parseInt(count);
      }
      if (color === "green" && parseInt(count) > part2Sums.green) {
        part2Sums.green = parseInt(count);
      }
      if (color === "blue" && parseInt(count) > part2Sums.blue) {
        part2Sums.blue = parseInt(count);
      }
    }

    if (
      sums.red > part1Bag.red ||
      sums.green > part1Bag.green ||
      sums.blue > part1Bag.blue
    ) {
      allPossible = false;
    }
  }

  part2 += part2Sums.red * part2Sums.green * part2Sums.blue;

  if (allPossible) {
    console.log(`Game ${gameId} is possible`);
    part1 += parseInt(gameId);
  }
}

console.log("Part 1:", part1);
console.log("Part 2:", part2);
