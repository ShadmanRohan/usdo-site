import { cpSync, rmSync, existsSync } from "node:fs";

const builtHtml = ["dist/index.html", "dist/index.vite.html"].find(existsSync);
if (!builtHtml) {
  console.error("Run npm run build first.");
  process.exit(1);
}

cpSync(builtHtml, "index.html");
rmSync("assets", { recursive: true, force: true });
rmSync("images", { recursive: true, force: true });
cpSync("dist/assets", "assets", { recursive: true });
cpSync("dist/images", "images", { recursive: true });
cpSync("dist/.nojekyll", ".nojekyll");
console.log("Synced dist/ → repo root for GitHub Pages.");
