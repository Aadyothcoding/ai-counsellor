// backend/scripts/patchPdfParse.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Setup __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to index.js of pdf-parse
const filePath = path.join(__dirname, "../node_modules/pdf-parse/index.js");

if (fs.existsSync(filePath)) {
  let content = fs.readFileSync(filePath, "utf8");

  const startMarker = "let isDebugMode = !module.parent;";
  const testBlockRegex = /if\s*\(isDebugMode\)\s*\{[\s\S]*?\}/gm;

  if (testBlockRegex.test(content)) {
    const patchedContent = content.replace(testBlockRegex, "// 🚫 Removed debug block");
    fs.writeFileSync(filePath, patchedContent, "utf8");
    console.log("✅ Patched pdf-parse/index.js successfully.");
  } else {
    console.log("⚠️ No debug block found, already patched.");
  }
} else {
  console.error("❌ File not found:", filePath);
}
