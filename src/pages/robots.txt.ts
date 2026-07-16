const agents = [
  "GPTBot", "OAI-SearchBot", "ChatGPT-User",
  "ClaudeBot", "Claude-SearchBot", "Claude-User",
  "Google-Extended", "Googlebot",
  "PerplexityBot", "Perplexity-User",
  "Applebot", "Applebot-Extended",
  "Bytespider", "TikTokSpider",
  "QwenBot", "AlibabaBot",
  "KimiBot", "MoonshotBot",
  "ChatGLM-Spider", "ZhipuBot",
  "Baiduspider", "Sogou web spider", "360Spider", "HaosouSpider"
];

export function GET() {
  const explicit = agents.map((agent) => `User-agent: ${agent}\nAllow: /`).join("\n\n");
  const body = `${explicit}

User-agent: *
Allow: /

Sitemap: https://qiuyuwan.cn/sitemap.xml
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
