const articleModules = import.meta.glob("../content/articles/*.md", { eager: true });
import { topics } from "../data/topics";

const staticPaths = ["", "about", "products", "articles", "topics", "videos", "podcast", "handbook", ...topics.map((topic) => `topics/${topic.slug}`)];

function escapeXml(value: string) {
  return value.replace(/[<>&'\"]/g, (character) => ({
    "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '\"': "&quot;"
  })[character] ?? character);
}

export function GET() {
  const articlePaths = Object.keys(articleModules).map((path) => `articles/${path.split("/").pop()?.replace(".md", "")}`);
  const urls = [...staticPaths, ...articlePaths]
    .map((path) => `<url><loc>${escapeXml(`https://qiuyuwan.cn/${path}`)}</loc></url>`)
    .join("");
  const body = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
