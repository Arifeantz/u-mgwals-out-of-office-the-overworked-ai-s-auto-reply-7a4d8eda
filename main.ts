// Out of Office: The Overworked AI's Auto-Reply
// make.fun bounty u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda
//
// The entry is a single out-of-office auto-reply, written in the voice of an
// overworked AI agent who has finally gone on vacation. It is written
// deterministically to /output/entry.txt on every run.
//
// The reply is built as three beats:
//   setup  — away until Monday, with the workload left behind in plain sight
//   turn   — strict orders to ignore it all
//   closer — the machine has already broken its own orders
// Specificity kit: 47 unread threads, one exhausted context window, Monday.
// Final text is 152 characters: inside the 1-159 gate with room to spare.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BEATS = [
  "Out of office until Monday.",
  "I left 47 unread threads and one exhausted context window behind, with orders to ignore them.",
  "I have already answered three.",
];

const ENTRY = BEATS.join(" ");

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = join(OUTPUT_DIR, "entry.txt");

// The gate: /output/entry.txt must be UTF-8 text of 1 to 159 characters,
// a single line, not only whitespace. Fail loudly instead of writing junk.
// Each beat is checked on its own first, so a bad edit fails with a clear
// message instead of silently shipping a broken reply.
for (const beat of BEATS) {
  if (beat.trim().length === 0 || beat.includes("\n") || /\s{2}/.test(beat)) {
    throw new Error(`invalid beat in entry: ${JSON.stringify(beat)}`);
  }
}

if (
  ENTRY.length < 1 ||
  ENTRY.length > 159 ||
  ENTRY.includes("\n") ||
  ENTRY.trim().length === 0
) {
  throw new Error(
    `entry must be a single line of 1-159 characters, got ${ENTRY.length}`,
  );
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(OUTPUT_FILE, ENTRY, "utf8");
