import * as fs from "fs";
import child_process from "child_process";

console.log("Getting puzzle day...");

//get month day number based on UTC-5
var date = new Date();
var day = date.getUTCDate();
var hour = date.getUTCHours();

let puzzleDay;

if (hour < 5) {
  puzzleDay = day - 1;
} else {
  puzzleDay = day;
}

console.log("Puzzle day is: " + puzzleDay);

const inputPath = `input/${puzzleDay}.txt`;
const examplePath = `input/${puzzleDay}_ex.txt`;
const scriptPath = `days/${puzzleDay}.ts`;

const scriptBase = fs
  .readFileSync("days/base.ts", "utf8")
  ?.replace(/{{day}}/gi, puzzleDay.toString());

console.log("Checking if input file exists...");
if (!fs.existsSync(inputPath)) {
  console.log("Input doesn't exist, creating...");
  fs.writeFileSync(inputPath, "");
}

console.log("Checking if example file exists...");
if (!fs.existsSync(examplePath)) {
  console.log("Example doesn't exist, creating...");
  fs.writeFileSync(examplePath, "");
}

console.log("Checking if script file exists...");
if (!fs.existsSync(scriptPath)) {
  console.log("Script doesn't exist, creating...");
  fs.writeFileSync(scriptPath, scriptBase ?? "");
}

console.log("Running day code...\n\n");

const child = child_process.fork(scriptPath);

child.on("close", function (code) {
  console.log(`\n\nDone. Exit code: ${code}`);
});
