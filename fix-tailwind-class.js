#!/usr/bin/env node
const fs = require("fs").promises;
const path = require("path");
const readline = require("readline");

const TARGET_DIR = path.join(__dirname, "app");
const FILE_EXTENSIONS = [".ts", ".tsx", ".js", ".jsx"];

const REPLACEMENTS = [
  { from: /\bborder-gray-\d+\b/g, to: "border-border" },
  { from: /\btext-gray-\d+\b/g, to: "text-muted-foreground" },
  { from: /\bbg-gray-\d+\b/g, to: "bg-muted" },
  { from: /\bhover:bg-gray-\d+\b/g, to: "hover:bg-muted" },
  { from: /\bhover:text-gray-\d+\b/g, to: "hover:text-muted-foreground" },
  { from: /\bhover:border-gray-\d+\b/g, to: "hover:border-border" },
  { from: /\btext-(black|white)\b/g, to: "text-foreground" },
  { from: /\bbg-(black|white)\b/g, to: "bg-background" },
  { from: /\btext-blue-(500|600|700)\b/g, to: "text-primary" },
  { from: /\bbg-blue-(100|200)\b/g, to: "bg-primary" },
  { from: /\btext-red-(500|600|700)\b/g, to: "text-destructive" },
  { from: /\bbg-red-(100|200)\b/g, to: "bg-destructive" },
  { from: /\btext-green-(500|600|700)\b/g, to: "text-accent" },
  { from: /\bbg-green-(100|200)\b/g, to: "bg-accent" },
];

const fixedFiles = [];

/** Process a single file */
async function processFile(filePath) {
  const ext = path.extname(filePath);
  if (!FILE_EXTENSIONS.includes(ext)) return;

  let content = await fs.readFile(filePath, "utf8");
  let newContent = content;

  for (const { from, to } of REPLACEMENTS) {
    newContent = newContent.replace(from, to);
  }

  if (newContent !== content) {
    const newFilePath = filePath.replace(ext, `.fixed${ext}`);
    await fs.writeFile(newFilePath, newContent, "utf8");
    console.log(`✅ Created: ${newFilePath}`);
    fixedFiles.push({ original: filePath, fixed: newFilePath });
  }
}

/** Walk through directories */
async function walk(dir) {
  const files = await fs.readdir(dir, { withFileTypes: true });
  for (const file of files) {
    const fullPath = path.join(dir, file.name);

    if (file.isDirectory()) {
      if (["node_modules", ".next", "public", "out"].includes(file.name)) continue;
      await walk(fullPath);
    } else {
      await processFile(fullPath);
    }
  }
}

/** Ask user whether to overwrite original files */
function askOverwrite() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("⚡ Overwrite original files with .fixed versions? (y/N): ", async (answer) => {
      if (answer.trim().toLowerCase() === "y") {
        for (const { original, fixed } of fixedFiles) {
          await fs.copyFile(fixed, original);
          await fs.unlink(fixed);
          console.log(`📝 Overwritten: ${original}`);
        }
        console.log("🎉 All files overwritten and .fixed files deleted!");
      } else {
        console.log("🚫 Not overwritten. .fixed files remain for review.");
      }
      rl.close();
      resolve();
    });
  });
}

/** Main */
(async () => {
  console.log("🚀 Starting Tailwind class scanning & fixing...");
  await walk(TARGET_DIR);

  if (fixedFiles.length > 0) {
    console.log("✅ .fixed files created successfully!");
    await askOverwrite();
  } else {
    console.log("👍 No files needed fixing.");
  }
})();
