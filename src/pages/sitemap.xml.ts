const articleModules = import.meta.glob("../content/articles/*.md", { eager: true });
import { topics } from "../data/topics";

const staticPaths = ["", "about", "products", "articles", "topics", "videos", "podcast", "handbook", ...topics.map((topic) => `topics/${topic.slug}`)];
const buildDate = new Date().toISOString().slice(0, 10);

function escapeXml(value: string) {
  return value.replace(/[<>&'\"]/g, (character) => ({
    "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '\"': "&quot;"
  })[character] ?? character);
}

export function GET() {
  const staticUrls = staticPaths.map((path) => `<url><loc>${escapeXml(`https://qiuyuwan.cn/${path}`)}</loc><lastmod>${buildDate}</lastmod></url>`);
  const articleUrls = Object.entries(articleModules).map(([path, module]) => {
    const date = (module as { frontmatter?: { date?: string } }).frontmatter?.date ?? buildDate;
    const slug = path.split("/").pop()?.replace(".md", "");
    return `<url><loc>${escapeXml(`https://qiuyuwan.cn/articles/${slug}`)}</loc><lastmod>${escapeXml(date)}</lastmod></url>`;
  });
  const body = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${[...staticUrls, ...articleUrls].join("")}</urlset>`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
