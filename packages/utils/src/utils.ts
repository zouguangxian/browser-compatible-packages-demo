import fs from "fs";
import * as path from 'path';
import * as process from 'process';

export function readFile(filename: string): string {
  return fs.readFileSync(filename, "utf-8");
}

export function hello(): string {
  return "Hello, world!";
}

export function abspath(filename: string):string {
  return path.resolve(filename);
}

export function cwd():string {
  return process.cwd();
}