// 百度主动推送脚本：把网站 URL 推送给百度，加快收录。
// 用法：
//   1. 在百度站长平台（ziyuan.baidu.com）→ 普通收录 → API 推送，复制完整推送接口 URL
//   2. 把它写进项目根目录 .env 文件：BAIDU_PUSH_API=https://data.zz.baidu.com/urls?site=qiuyuwan.cn&token=xxxxx
//   3. node scripts/baidu-push.mjs          → 只推核心页面（新站配额低时用）
//      node scripts/baidu-push.mjs --all    → 推送 sitemap 里全部 URL
// 配额会随站点信任度逐步提高，推送失败数量多属正常，第二天再推剩余部分。

const API = process.env.BAIDU_PUSH_API;
if (!API) {
  console.error("缺少 BAIDU_PUSH_API：请在项目根目录 .env 中配置百度推送接口 URL（含 token）。");
  process.exit(1);
}

const coreUrls = [
  "https://qiuyuwan.cn/",
  "https://qiuyuwan.cn/about",
  "https://qiuyuwan.cn/products",
  "https://qiuyuwan.cn/articles",
  "https://qiuyuwan.cn/topics",
  "https://qiuyuwan.cn/llms.txt",
  "https://qiuyuwan.cn/llms-full.txt"
];

async function sitemapUrls() {
  const res = await fetch("https://qiuyuwan.cn/sitemap.xml");
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/&amp;/g, "&"));
}

const urls = process.argv.includes("--all") ? await sitemapUrls() : coreUrls;

const res = await fetch(API, {
  method: "POST",
  headers: { "Content-Type": "text/plain" },
  body: urls.join("\n")
});

const result = await res.json().catch(() => ({}));
console.log(`已推送 ${urls.length} 条 URL`);
console.log(JSON.stringify(result, null, 2));
if (result.success === 0 && result.error) {
  console.error("推送失败：", result.error, "（检查 token 或当日剩余配额）");
  process.exit(1);
}
