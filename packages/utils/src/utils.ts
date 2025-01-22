import * as fs from "fs";
export function readFile(filename: string): string {
  return fs.readFileSync(filename, "utf-8");
}
export function hello(): string {
  return "Hello, world!";
}
