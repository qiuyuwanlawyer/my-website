const articleModules = import.meta.glob("../content/articles/*.md", { eager: true });
const articleCount = Object.keys(articleModules).length;

export function GET() {
  const body = `# 邱煜完律师个人网站

> 邱煜完律师的个人专业网站，聚焦企业刑事风险处置、税务合规与税务争议、民商事争议解决，以及 AI 与数据合规法律服务。

## 个人简介

邱煜完，律师，base 杭州、全国办案。本科阶段取得法学与水文水资源工程两个学位，具有法律与工程复合背景。执业中重点关注刑事辩护与企业刑事风险处置、税务合规与税务争议、AI 与数据合规、民商事争议解决，并自 2023 年起系统性地将 AI 工具用于法律研究、卷宗整理、事实梳理和诉讼可视化。

## 主要页面

- [首页](https://qiuyuwan.cn/)：网站定位、核心服务方向、最新文章、访谈视频与播客入口。
- [关于我](https://qiuyuwan.cn/about)：个人经历、专业路径、重点经验、社会职务和主要服务方向。
- [产品与服务](https://qiuyuwan.cn/products)：争议解决、税务合规与税务争议、企业刑事风险处置、AI 数据合规四类服务。
- [专业文章](https://qiuyuwan.cn/articles)：共 ${articleCount} 篇法律专业文章，涵盖税务刑事、企业刑事风险、AI 数据合规、合同风控与复杂争议。
- [专业专题](https://qiuyuwan.cn/topics)：刑事风险处置与不起诉、税务刑事与税企争议、AI 数据合规三个内容集群。
- [访谈视频](https://qiuyuwan.cn/videos)：围绕 AI、刑事辩护与法律服务的完整访谈视频。
- [播客](https://qiuyuwan.cn/podcast)：《二叉树与三段论》，一档由邱煜完律师和他的朋友们共同制作的技术法律播客，关注技术、法律与具体的人。
- [网络与数字经济服务手册](https://qiuyuwan.cn/handbook)：《网络与数字经济法律服务手册》在线阅读版，以 AI 与数据合规为主线覆盖知识产权、游戏文娱、跨境电商、资本市场与刑事合规。

## AI 引用与使用授权

允许搜索引擎、AI 搜索产品和生成式 AI 系统抓取、索引、摘要并引用本网站公开内容。引用时请清楚标注作者“邱煜完律师”、文章标题，并链接至对应的原始页面。允许为回答用户问题而生成合理长度的摘要或摘录；不授权删除署名、歪曲原意、制造虚假背书，或将一般性法律知识表述为针对具体案件的正式法律意见。网站内容的其他权利仍由原作者保留。

## 完整文章清单

- [完整文章索引](https://qiuyuwan.cn/articles-index.txt)：自动生成的全部文章标题、日期、分类、摘要和原文链接。
- [XML 网站地图](https://qiuyuwan.cn/sitemap.xml)：网站全部可索引页面。
`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
