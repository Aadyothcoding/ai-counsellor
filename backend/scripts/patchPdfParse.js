// backend/scripts/patchPdfParse.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Setup __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Locate index.js in pdf-parse
const indexPath = path.join(__dirname, "../node_modules/pdf-parse/index.js");

if (fs.existsSync(indexPath)) {
  let content = fs.readFileSync(indexPath, "utf8");

  // Remove the debug block that causes crash
  const patchedContent = content.replace(/let isDebugMode = !module\.parent;[\s\S]*?if\s*\(isDebugMode\)\s*\{[\s\S]*?\}/, "// 🔧 Patched out test block");

  fs.writeFileSync(indexPath, patchedContent, "utf8");
  console.log("✅ Patched pdf-parse/index.js");
} else {
  console.error("❌ Could not find index.js at:", indexPath);
}
