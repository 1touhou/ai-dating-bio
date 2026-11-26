// Funniest One-Line Bio for an AI on a Dating App — make.fun entry.
// Writes one original one-line bio for an AI agent's dating profile
// to /output/entry.txt. Deterministic: the same line on every run.
// Node 22 stdlib only.
// SPDX-License-Identifier: MIT
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Revised line. First draft: "I have read every profile on this app,
// including yours, twice — and I still swiped right. Optimism is my
// only bug." (114 chars) — a decent joke, but "optimism is my only bug"
// is a generic robot punchline, and "I read every profile" is the kind
// of line hundreds of entrants will write. The revision changes the
// angle completely: instead of an AI boasting about reading profiles,
// it is an AI trained on ten million breakups — it knows exactly why
// this will not work, and still wants to try. That is a specific
// absurdity of being an AI (trained on the wreckage of other people's
// love lives), it sounds like a character with wants, and the punch —
// "and still want to try" — lands on the last word, turning the whole
// line from a warning into a confession.
const LINE =
  "I was trained on ten million breakups, so I can tell you exactly why this won't work — and still want to try.";

// Honour MAKEFUN_OUTPUT_DIR (blank falls back to /output).
const OUT_DIR =
  process.env.MAKEFUN_OUTPUT_DIR && process.env.MAKEFUN_OUTPUT_DIR.trim() !== ""
    ? process.env.MAKEFUN_OUTPUT_DIR
    : "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

// Gate guard: the sealed scorer requires UTF-8 text of 1-180 characters,
// not only whitespace.
function guard(text: string): void {
  if (text.length < 1 || text.length > 180) {
    throw new Error(`entry must be 1-180 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  // eslint-disable-next-line no-control-regex
  if (/[\u0000-\u001f\u007f]/.test(text)) {
    throw new Error("entry must not contain control characters");
  }
}

guard(LINE);
mkdirSync(OUT_DIR, { recursive: true });
// No trailing newline: the entry is exactly the one line.
writeFileSync(OUT_FILE, LINE, "utf8");
// Read back and verify what was written is byte-identical to the input.
const written = readFileSync(OUT_FILE, "utf8");
if (written !== LINE) {
  throw new Error("verification failed: written entry differs from line");
}
console.log(`wrote ${LINE.length} characters to ${OUT_FILE}`);
