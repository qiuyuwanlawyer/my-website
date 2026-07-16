const modules = import.meta.glob("../content/articles/*.md", { eager: true });

export function GET() {
  const articles = Object.entries(modules)
    .map(([path, module]) => ({
      slug: path.split("/").pop()?.replace(".md", ""),
      ...(module as { frontmatter: Record<string, string> }).frontmatter
    }))
    .sort((a, b) => b.date.localeCompare(a.date));

  const entries = articles.map((article, index) => `## ${index + 1}. ${article.title}

- 日期：${article.date}
- 分类：${article.category}
- 类型：${article.type}
- 摘要：${article.summary}
- 链接：https://qiuyuwan.cn/articles/${article.slug}
`).join("\n");

  const body = `# 邱煜完律师网站完整文章索引

本文件在网站构建时从文章元数据自动生成，共 ${articles.length} 篇。更新时间：${new Date().toISOString().slice(0, 10)}。

${entries}`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
