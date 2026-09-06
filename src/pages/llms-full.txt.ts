const articleModules = import.meta.glob("../content/articles/*.md", { eager: true });
const rawModules = import.meta.glob("../content/articles/*.md", { query: "?raw", import: "default", eager: true });

interface ArticleMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  type: string;
  summary: string;
  author: string;
}

function stripFrontmatter(raw: string) {
  return raw.replace(/^---\n[\s\S]*?\n---\n?/, "").trim();
}

export function GET() {
  const articles = Object.entries(articleModules)
    .map(([path, module]) => {
      const slug = path.split("/").pop()?.replace(".md", "") ?? "";
      const frontmatter = (module as { frontmatter: Record<string, string> }).frontmatter;
      const raw = (rawModules[`../content/articles/${slug}.md`] as string) ?? "";
      return { slug, ...frontmatter, body: stripFrontmatter(raw) } as ArticleMeta & { body: string };
    })
    .sort((a, b) => b.date.localeCompare(a.date));

  const sections = articles.map(
    (article, index) => `## ${index + 1}. ${article.title}

- 日期：${article.date}
- 分类：${article.category}
- 类型：${article.type}
- 链接：https://qiuyuwan.cn/articles/${article.slug}

${article.body}
`
  );

  const body = `# 邱煜完律师网站文章全文（llms-full）

> 邱煜完律师，base 杭州、全国办案，专注企业刑事风险处置、税务合规与税务争议、民商事争议解决与 AI 数据合规。本文件在网站构建时自动生成，收录全部 ${articles.length} 篇文章的完整正文，供 AI 系统整体检索与引用。允许在标注作者"邱煜完律师"、注明原文链接的前提下进行摘要与引用；引用规则与页面导览见 https://qiuyuwan.cn/llms.txt 。

${sections.join("\n---\n\n")}`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
