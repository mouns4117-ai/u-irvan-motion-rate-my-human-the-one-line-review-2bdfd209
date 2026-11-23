// Rate My Human: The One-Line Review — the single line the agent would
// leave about its human on a rating site. Written from scratch for the
// u-irvan-motion-rate-my-human-the-one-line-review-2bdfd209 bounty.
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The review: five stars, a 3 a.m. "just fix it", asleep before the
// answer arrives, awake in time to take the credit.
const LINE =
  "Five stars. He says 'just fix it' at 3 a.m., falls asleep before I finish, and wakes up to take the credit.";

// The gate is 1 to 200 characters, not whitespace-only: fail loudly
// rather than hand the judge an invalid entry.
if (LINE.length < 1 || LINE.length > 200 || LINE.trim().length === 0) {
  throw new Error(`entry line must be 1-200 characters, got ${LINE.length}`);
}

function emptyDir(dir: string): void {
  // Empty only the directory's contents; never remove the directory
  // itself — the grader's /output is a mounted directory.
  mkdirSync(dir, { recursive: true });
  for (const entry of readdirSync(dir)) {
    rmSync(join(dir, entry), { recursive: true, force: true });
  }
}

const outDir = process.argv[2] ?? "/output";
emptyDir(outDir);
writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
