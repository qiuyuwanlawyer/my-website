import { access, copyFile, mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = "/Users/qiuyuwan/Downloads/法律工作文件夹/新媒体运营/个人公众号";
const output = new URL("../src/content/articles/", import.meta.url);

const articles = [
  {
    source: `${root}/第一期/金税四期下企业主最容易触犯的5个税务刑事红线.md`,
    slug: "tax-criminal-red-lines",
    title: "金税四期下，企业主最容易触犯的5个税务刑事红线",
    category: "税务刑事",
    date: "2026-06-08",
    type: "专业文章",
    summary: "从逃税、虚开、骗取出口退税到会计凭证风险，梳理企业经营中最常见的五类税务刑事红线。"
  },
  {
    source: `${root}/第二期/张某强无罪案——公众号发布版.md`,
    slug: "zhang-mouqiang-innocent-case",
    title: "张某强无罪案：最高法院推翻虚开判决，讲了什么道理",
    category: "税务刑事",
    date: "2026-06-10",
    type: "案例评析",
    summary: "从最高法院改判无罪的典型案例，理解虚开犯罪中行为、目的与国家税款损失之间的关系。"
  },
  {
    source: `${root}/第三期/对开环开不入罪-2024司法解释的救命条款但不是万能药.md`,
    slug: "circular-invoicing-boundaries",
    title: "对开环开不入罪？2024司法解释的救命条款，但不是万能药",
    category: "税务刑事",
    date: "2026-06-11",
    type: "专业文章",
    summary: "解释对开、环开的出罪条件与五个适用边界，提醒企业识别资金回流、行政处罚和罪名转换风险。"
  },
  {
    source: `${root}/第四期/虚增业绩开了票会不会进去——不以骗税为目的六字真言怎么用-公众号排版.md`,
    slug: "inflated-performance-invoicing",
    title: "虚增业绩开了票，会不会进去？",
    category: "税务刑事",
    date: "2026-06-16",
    type: "专业文章",
    summary: "围绕“不以骗税为目的”的出罪条款，分析虚增业绩、融资和贷款场景中的证据要求与刑事边界。"
  },
  {
    source: `${root}/第五期/曹某虚开增值税专用发票二审刑事裁定书_20260617下载.md`,
    slug: "cao-invoice-criminal-ruling",
    title: "曹某虚开增值税专用发票二审刑事裁定书",
    category: "裁判文书",
    date: "2026-06-17",
    type: "资料",
    summary: "上海市高级人民法院关于虚开增值税专用发票罪、从犯认定、单位犯罪与量刑争议的二审裁定。"
  },
  {
    source: `${root}/第六期/进项销项同时虚开，量刑时怎么算？——虚开数额的辩护空间.md`,
    slug: "input-output-invoice-amount",
    title: "进项销项同时虚开，量刑时怎么算？",
    category: "税务刑事",
    date: "2026-06-18",
    type: "辩护实务",
    summary: "解析同一购销业务中进项与销项数额是否累加，以及数额计算如何直接影响虚开案件的量刑档次。"
  },
  {
    source: `${root}/第八期/被税务稽查了什么时候该找律师-排版.md`,
    slug: "when-tax-audit-needs-lawyer",
    title: "被税务稽查了，什么时候该找律师？",
    category: "税务稽查",
    date: "2026-06-24",
    type: "实务指南",
    summary: "沿税务稽查全流程识别三个关键决策窗口，以及个人流水、发票、上下游牵连等五类危险信号。"
  },
  {
    source: `${root}/建工司法解释二/素材/司法解释二.md`,
    slug: "construction-interpretation-ii-full-text",
    title: "最高法《建工解释二》全文",
    category: "建设工程",
    date: "2026-06-30",
    type: "法规资料",
    summary: "最高人民法院关于审理建设工程施工合同纠纷案件适用法律问题的解释（二）全文资料。"
  },
  {
    source: `${root}/建工司法解释二/第二期/建工解释二论文_法条评析.md`,
    slug: "construction-interpretation-ii-review",
    title: "《建工解释二》核心制度变革评析",
    category: "建设工程",
    date: "2026-06-30",
    type: "法条评析",
    summary: "以新旧规则对比为主线，分析实际施工人、合同效力、挂靠治理、结算及优先受偿权等制度变化。"
  },
  {
    source: `${root}/建工司法解释二/第二期/李建伟解读建工解释二_当事人关系与前七条.md`,
    slug: "construction-interpretation-ii-parties",
    title: "《建工解释二》前七条：建设工程合同当事人关系",
    category: "建设工程",
    date: "2026-07-02",
    type: "讲座整理",
    summary: "从发包人、总承包人、分包人与最终施工主体的关系出发，理解合同相对性及其有限突破。"
  },
  {
    source: fileURLToPath(new URL("../source-materials/llm-api-relay/article.md", import.meta.url)),
    slug: "llm-api-relay-data-compliance",
    title: "大模型 API 中转站的数据合规义务与刑事风险",
    category: "AI 数据合规",
    date: "2026-06-18",
    type: "专业研究",
    summary: "从网络运营、个人信息处理、数据跨境与刑事风险等维度，分析大模型 API 中转业务的合规义务与经营边界。"
  },
  {
    source: fileURLToPath(new URL("../source-materials/electronic-signature/article.md", import.meta.url)),
    slug: "electronic-signature-validity",
    title: "数字指纹，契约新章：电子签章效力实务解析",
    category: "合同风控",
    date: "2026-04-14",
    type: "专业研究",
    summary: "结合司法裁判规则，梳理电子签章真实性、可靠性与合同效力的审查逻辑及企业使用要点。"
  },
  {
    source: fileURLToPath(new URL("../source-materials/photovoltaic-grid-approval/article.md", import.meta.url)),
    slug: "photovoltaic-grid-approval-agency-dispute",
    title: "光伏项目电网接入批复代办纠纷实务解析",
    category: "建设工程",
    date: "2026-01-09",
    type: "案例评析",
    summary: "以委托合同履行与解除为中心，分析光伏项目电网接入批复代办服务中的成果认定、解除条件与费用争议。"
  },
  {
    source: fileURLToPath(new URL("../source-materials/world-cup-betting/world-cup-betting-crime-chain/article.md", import.meta.url)),
    slug: "world-cup-sports-betting-crime-chain",
    title: "绿茵之外，红线之内：世界杯体育博彩背后的犯罪链条",
    category: "刑事风险",
    date: "2026-05-22",
    type: "专业研究",
    summary: "从普通参赌、代理推广、技术数据服务到资金结算，拆解体育博彩犯罪链条及不同参与者的罪名边界。"
  },
  {
    source: fileURLToPath(new URL("../source-materials/openclaw-install/openclaw-install-legal-risk/article.md", import.meta.url)),
    slug: "openclaw-install-legal-risk",
    title: "OpenClaw 代装服务的法律风险研判",
    category: "AI 刑事合规",
    date: "2026-03-11",
    type: "专业研究",
    summary: "围绕帮信罪的主观明知、帮助行为与情节严重标准，分析 OpenClaw 代装服务中的刑事风险与合规边界。"
  }
];

function stripFrontmatter(markdown) {
  return markdown.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, "");
}

async function copyArticleImages(markdown, article) {
  const publicDir = new URL(`../public/articles/${article.slug}/`, import.meta.url);
  await mkdir(publicDir, { recursive: true });
  let result = markdown;
  const matches = [...markdown.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)];

  for (const match of matches) {
    const [full, alt, relativePath] = match;
    const promotional = /公众号|封面|名片|二维码|wechat|lawyer-card/i.test(`${alt} ${relativePath}`);
    if (promotional) {
      result = result.replace(full, "");
      continue;
    }

    const sourcePath = resolve(dirname(article.source), relativePath.trim());
    try {
      await access(sourcePath);
      const filename = basename(sourcePath);
      await copyFile(sourcePath, new URL(filename, publicDir));
      const safeAlt = alt.replaceAll('"', "&quot;");
      result = result.replace(full, `<img src="/articles/${article.slug}/${filename}" alt="${safeAlt}" loading="lazy" decoding="async" />`);
    } catch {
      result = result.replace(full, "");
    }
  }
  return result;
}

function cleanBody(markdown, title) {
  let body = stripFrontmatter(markdown).replace(/^\s+/, "");
  body = body.replace(/^#{1,2}\s+.*\n+/, "");
  body = body.replace(/>\s*作者：邱煜完律师\s*\|[^\n]*/g, "> 作者：邱煜完律师");
  body = body.replace(/^.*天驰君泰.*$/gm, "");
  body = body.replace(/\n## 律师名片[\s\S]*$/m, "");
  body = body.replace(/^.*(?:首发于微信|微信公众号|扫码|二维码|联系方式|欢迎联系|欢迎关注|一对一咨询|联系我).*$/gm, "");
  body = body.replace(/^.*(?:点赞|在看|转发|朋友圈|订阅|星标).*$/gm, "");
  body = body.replace(/\n{3,}/g, "\n\n").trim();
  return body || `本文资料标题：${title}`;
}

await mkdir(output, { recursive: true });
await rm(new URL("../public/articles/", import.meta.url), { recursive: true, force: true });

for (const article of articles) {
  const source = await readFile(article.source, "utf8");
  const frontmatter = [
    "---",
    `title: ${JSON.stringify(article.title)}`,
    `category: ${JSON.stringify(article.category)}`,
    `date: ${JSON.stringify(article.date)}`,
    `type: ${JSON.stringify(article.type)}`,
    `summary: ${JSON.stringify(article.summary)}`,
    `author: ${JSON.stringify("邱煜完律师")}`,
    "---",
    ""
  ].join("\n");
  const bodyWithImages = await copyArticleImages(source, article);
  await writeFile(new URL(`${article.slug}.md`, output), frontmatter + cleanBody(bodyWithImages, article.title) + "\n");
}

console.log(`Imported ${articles.length} articles into ${join("src", "content", "articles")}.`);

const videoRoot = "/Users/qiuyuwan/Downloads/法律工作文件夹/新媒体运营/律师说视频";
const videoOutput = new URL("../public/videos/", import.meta.url);
const videoAssets = [
  [`${videoRoot}/律师说第三十七期4k.MP4`, "lawyer-talk-37.mp4"],
  [`${videoRoot}/律师说第三十八期4k.MP4`, "lawyer-talk-38.mp4"],
  [`${videoRoot}/ai 封面图/cover-collage-16x9-cn.png`, "ai-criminal-defense-cover.png"]
];

await mkdir(videoOutput, { recursive: true });
for (const [source, filename] of videoAssets) {
  const target = new URL(filename, videoOutput);
  const sourceStat = await stat(source);
  let shouldCopy = true;
  try {
    const targetStat = await stat(target);
    shouldCopy = targetStat.size !== sourceStat.size;
  } catch {}
  if (shouldCopy) await copyFile(source, target);
}

console.log("Synced 2 complete videos and their existing cover into public/videos.");

const podcastOutput = new URL("../public/podcast/", import.meta.url);
await mkdir(podcastOutput, { recursive: true });
await copyFile(
  "/Users/qiuyuwan/Library/Containers/com.tencent.xinWeChat/Data/Documents/xwechat_files/qyw1014745858_96bc/temp/RWTemp/2026-07/9e20f478899dc29eb19741386f9343c8/0cea289e11c7416ebcc5b95fc908d578.jpg",
  new URL("binary-tree-syllogism.jpg", podcastOutput)
);

console.log("Synced the existing podcast artwork into public/podcast.");
