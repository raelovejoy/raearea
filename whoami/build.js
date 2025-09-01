// whoami/build.js
import fs from "fs";
import path from "path";
import { marked } from "marked";

// --- format today's date in America/Los_Angeles ---
const today = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Los_Angeles",
  year: "numeric",
  month: "long",
  day: "numeric",
}).format(new Date());

const root = path.resolve(process.cwd(), "whoami");
const mdPath = path.join(root, "whoami.md");
const tplPath = path.join(root, "page.html");
const outPath = path.join(root, "index.html");

// read markdown and inject {{ today }}
const mdRaw = fs.readFileSync(mdPath, "utf8");
const mdWithDate = mdRaw.replace(/\{\{\s*today\s*\}\}/g, today);

// render markdown → HTML
const htmlBody = marked.parse(mdWithDate, { mangle: false, headerIds: true });

// load template
const tpl = fs.readFileSync(tplPath, "utf8");

// add a build stamp so the HTML always changes
const stamp = `\n<!-- built: ${new Date().toISOString()} -->\n`;
const out = tpl.replace("<!--CONTENT-->", htmlBody + stamp);

// write final HTML
fs.writeFileSync(outPath, out);
console.log("[whoami] built", outPath, "with date", today);
