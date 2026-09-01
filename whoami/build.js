import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.cwd(), "whoami");
const mdPath = path.join(root, "whoami.md");
const templatePath = path.join(root, "page.html");
const outputPath = path.join(root, "index.html");

function inline(text) {
  return text
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

function renderMarkdown(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const out = [];
  let paragraph = [];
  let inList = false;

  const flushParagraph = () => {
    if (paragraph.length) {
      out.push(`<p>${inline(paragraph.join(" "))}</p>`);
      paragraph = [];
    }
  };

  const closeList = () => {
    if (inList) {
      out.push("</ul>");
      inList = false;
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      closeList();
      continue;
    }

    if (trimmed === "---") {
      flushParagraph();
      closeList();
      out.push("<hr>");
      continue;
    }

    const heading = /^(#{1,6})\s+(.+)$/.exec(trimmed);
    if (heading) {
      flushParagraph();
      closeList();
      const level = heading[1].length;
      out.push(`<h${level}>${inline(heading[2])}</h${level}>`);
      continue;
    }

    const listItem = /^-\s+(.+)$/.exec(trimmed);
    if (listItem) {
      flushParagraph();
      if (!inList) {
        out.push("<ul>");
        inList = true;
      }
      out.push(`  <li>${inline(listItem[1])}</li>`);
      continue;
    }

    const disclosureTag =
      /^<\/?details(?:\s[^>]*)?>$/.test(trimmed) ||
      /^<summary>.*<\/summary>$/.test(trimmed);
    if (disclosureTag) {
      flushParagraph();
      closeList();
      out.push(trimmed);
      continue;
    }

    if (/^<sub>.*<\/sub>$/.test(trimmed)) {
      flushParagraph();
      closeList();
      out.push(trimmed);
      continue;
    }

    paragraph.push(trimmed);
  }

  flushParagraph();
  closeList();
  return out.join("\n");
}

const markdown = fs.readFileSync(mdPath, "utf8");
const template = fs.readFileSync(templatePath, "utf8");

if (!template.includes("<!--CONTENT-->")) {
  throw new Error("whoami/page.html is missing the <!--CONTENT--> marker");
}

const output = template.replace("<!--CONTENT-->", renderMarkdown(markdown));
fs.writeFileSync(outputPath, output);
console.log(`[whoami] built ${path.relative(process.cwd(), outputPath)}`);
