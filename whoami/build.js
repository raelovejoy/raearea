import fs from "fs";
import path from "path";
import { marked } from "marked";

const root = path.resolve(process.cwd(), "whoami");      // adjust if you run from repo root
const mdPath = path.join(root, "whoami.md");
const tplPath = path.join(root, "page.html");
const outPath = path.join(root, "index.html");          // or index.html if you prefer /whoami/

const md = fs.readFileSync(mdPath, "utf8");
const htmlBody = marked.parse(md, { mangle: false, headerIds: true });

const tpl = fs.readFileSync(tplPath, "utf8");
const out = tpl.replace("<!--CONTENT-->", htmlBody);

fs.writeFileSync(outPath, out);
console.log("[whoami] built", path.relative(process.cwd(), outPath));
