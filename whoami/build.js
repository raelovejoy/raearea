// whoami/build.js
import fs from "fs";
import path from "path";
import { marked } from "marked";

const root = path.resolve(process.cwd(), "whoami");
const mdPath = path.join(root, "whoami.md");
const tplPath = path.join(root, "page.html");
const outPath = path.join(root, "index.html"); // ensure /whoami/ serves this

const md = fs.readFileSync(mdPath, "utf8");
const htmlBody = marked.parse(md, { mangle: false, headerIds: true });

const tpl = fs.readFileSync(tplPath, "utf8");
// ⬇️ inject Markdown at the placeholder
const out = tpl.replace("<!--CONTENT-->", htmlBody);

fs.writeFileSync(outPath, out);
console.log("[whoami] built", outPath);
