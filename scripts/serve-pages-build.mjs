// Serves the GitHub Pages build (dist/client) the way GitHub Pages does, to test it locally:
//   - /school redirects to /school/ (301), and a folder serves its index.html;
//   - anything else that does not exist gets 404.html with status 404 (the app shell).
// Build first: GITHUB_PAGES=true PAGES_BASE_PATH="" npm run build:pages
// Then: node scripts/serve-pages-build.mjs   (http://localhost:8090)
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../dist/client/", import.meta.url));
const PORT = Number(process.env.PORT ?? 8090);
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".mp4": "video/mp4",
  ".txt": "text/plain; charset=utf-8",
};

const isFile = (path) =>
  stat(path).then(
    (s) => s.isFile(),
    () => false,
  );
const isDir = (path) =>
  stat(path).then(
    (s) => s.isDirectory(),
    () => false,
  );

createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", "http://localhost");
  const pathname = decodeURIComponent(url.pathname);
  const file = normalize(join(ROOT, pathname));
  if (!file.startsWith(ROOT.replace(/\/$/, ""))) {
    res.writeHead(403).end();
    return;
  }
  let target;
  let status = 200;
  if (await isDir(file)) {
    if (!pathname.endsWith("/")) {
      res.writeHead(301, { Location: `${pathname}/${url.search}` }).end();
      return;
    }
    if (await isFile(join(file, "index.html"))) target = join(file, "index.html");
  } else if (await isFile(file)) {
    target = file;
  }
  if (!target) {
    target = join(ROOT, "404.html");
    status = 404;
  }
  const body = await readFile(target);
  res.writeHead(status, { "Content-Type": TYPES[extname(target)] ?? "application/octet-stream" });
  res.end(body);
}).listen(PORT, () =>
  console.log(`Serving dist/client like GitHub Pages at http://localhost:${PORT}`),
);
