// The Robot Vacuum's Best Excuse
// make.fun bounty: u-golden-heron-44-the-robot-vacuum-s-best-excuse-53412214
//
// A small, deterministic Node program (no external dependencies) that writes
// one line — the funniest excuse a robot vacuum gives for missing a spot —
// to /output/entry.txt (or to the path given as the first argument).
//
// The line is the vacuum itself speaking, in its own world: its cliff
// sensor, its map, its dock. One read, one clean turn at the end.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const ENTRY =
  "My cliff sensor mistook the rug fringe for a staircase, so I filed that corner under \u2018certain death\u2019 and went back to my dock.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 140 characters,
// not only white space. Refuse to write anything that breaks the gate.
const MAX_CHARS = 140;

function main(): void {
  const chars = [...ENTRY];
  if (chars.length < 1 || chars.length > MAX_CHARS || ENTRY.trim().length === 0) {
    throw new Error(
      `entry is ${chars.length} characters, outside the 1-${MAX_CHARS} gate`,
    );
  }
  if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  const outPath = resolve(process.argv[2] ?? "/output/entry.txt");
  mkdirSync(dirname(outPath), { recursive: true });
  // Exactly one line, no trailing newline, UTF-8.
  writeFileSync(outPath, ENTRY, "utf8");
}

main();
