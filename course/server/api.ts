// Dev/preview middleware that mirrors the learner's progress to course/progress/<chapter>.json,
// so the next chapter can be planned around what was missed.
import type { Connect, Plugin } from "vite";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "progress");
const MAX_BODY = 1_000_000;

function body(req: Connect.IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks: Buffer[] = [];
    req.on("data", (c: Buffer) => {
      size += c.length;
      if (size > MAX_BODY) {
        reject(new Error("too large"));
        req.destroy();
      } else chunks.push(c);
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

const handler: Connect.NextHandleFunction = async (req, res, next) => {
  const m = req.url?.match(/^\/api\/progress\/(ch\d{2})$/);
  if (!m) return next();
  const file = join(DIR, `${m[1]}.json`);
  res.setHeader("Content-Type", "application/json");
  try {
    if (req.method === "GET") {
      const text = await readFile(file, "utf8").catch(() => "null");
      res.end(text);
    } else if (req.method === "PUT") {
      const text = await body(req);
      JSON.parse(text);
      await mkdir(DIR, { recursive: true });
      const tmp = `${file}.${process.pid}.${Date.now()}.${Math.random().toString(36).slice(2)}.tmp`;
      await writeFile(tmp, text);
      await rename(tmp, file);
      res.end('{"ok":true}');
    } else {
      res.statusCode = 405;
      res.end('{"error":"method"}');
    }
  } catch (e) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: String(e) }));
  }
};

export function courseApi(): Plugin {
  return {
    name: "course-api",
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    },
  };
}
