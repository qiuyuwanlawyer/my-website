// 生成全站默认 OG 分享图（1200×630）：米色底（与 wordmark 底色一致）+ 品牌 wordmark + 域名
// 用法：node scripts/make-og.mjs（改动品牌素材后可重新生成）
import sharp from "sharp";

const W = 1200;
const H = 630;
const wordmarkWidth = 820;
// wordmark PNG 自带底色 #f7f3eb，背景必须一致才能无缝
const BG = "#f7f3eb";
const GOLD_DEEP = "#8a6500";
const NAVY = "#10223d";

const wordmark = await sharp("brand-logo/png/v2-qiu-wordmark-light.png")
  .resize({ width: wordmarkWidth })
  .png()
  .toBuffer();
const { height: wordmarkHeight } = await sharp(wordmark).metadata();

const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${BG}"/>
  <rect x="28" y="28" width="${W - 56}" height="${H - 56}" fill="none" stroke="${GOLD_DEEP}" stroke-opacity="0.75" stroke-width="2"/>
  <rect x="${(W - 120) / 2}" y="${H - 138}" width="120" height="3" fill="${GOLD_DEEP}"/>
  <text x="${W / 2}" y="${H - 80}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="28" letter-spacing="8" fill="${NAVY}">QIUYUWAN.CN</text>
</svg>`;

await sharp(Buffer.from(svg))
  .composite([
    {
      input: wordmark,
      top: Math.round((H - wordmarkHeight) / 2) - 40,
      left: Math.round((W - wordmarkWidth) / 2)
    }
  ])
  .png()
  .toFile("public/images/og-default.png");

console.log("og-default.png 已生成 (1200x630)");
