// backend/scripts/patchPdfParse.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get current dir path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to pdf-parse
const pdfParsePath = path.join(__dirname, "../node_modules/pdf-parse/index.js");

// Read and patch file
if (fs.existsSync(pdfParsePath)) {
  let content = fs.readFileSync(pdfParsePath, "utf8");

  const regex = /if\s*\(isDebugMode\)\s*\{[\s\S]*?debugger;\s*\}/gm;

  if (regex.test(content)) {
    const patched = content.replace(
      regex,
      `// 🛠 Patched out debug block for production use`
    );
    fs.writeFileSync(pdfParsePath, patched, "utf8");
    console.log("✅ Successfully patched pdf-parse/index.js");
  } else {
    console.log("✅ pdf-parse already patched or no debug block found.");
  }
} else {
  console.error("❌ Could not find pdf-parse/index.js to patch.");
}
