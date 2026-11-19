export type Whitepaper = {
  slug: string;
  title: string;
  subtitle: string;
  eyebrow: string;
  pages: number;
  published: string;
  org: string;
  description: string;
  highlights: string[];
  toc: { no: string; label: string }[];
  pdf: string;
};

export const whitepapers: Whitepaper[] = [
  {
    slug: "ai-litigation",
    title: "人工智能诉讼白皮书",
    subtitle: "企业人工智能应用法律风险研究",
    eyebrow: "WHITE PAPER · 人工智能",
    pages: 64,
    published: "2026 年 11 月",
    org: "网络与数字经济专业委员会",
    description:
      "按照企业应用人工智能的业务流程展开：先说明不同业务形态对应的强制性合规义务，再依次讨论采购接入、训练数据、AI 生产、内容经营、人格权与收费、争议应对六个环节的诉讼与裁判规则。每一站配典型案例卡片与企业自查清单。",
    highlights: ["六站式业务流程拆解", "典型案例卡片", "企业自查清单", "一页风险总图"],
    toc: [
      { no: "01", label: "前言" },
      { no: "02", label: "阅读导引" },
      { no: "03", label: "一页风险总图" },
      { no: "04", label: "第一站　采购、委托开发与接入" },
      { no: "05", label: "第二站　喂数据：训练数据来源与授权" },
      { no: "06", label: "第三站　AI 生成的成果物归谁、能不能用" },
      { no: "07", label: "第四站　AI 生成内容发布、营销、带货" },
      { no: "08", label: "第五站　面对人和钱：人格权、会员、退费" },
      { no: "09", label: "第六站　证据、禁令、刑事红线" },
      { no: "10", label: "结语与专项核查" }
    ],
    pdf: "/whitepapers/download/ai-litigation-white-paper-2026.pdf"
  },
  {
    slug: "overseas-employment",
    title: "中国企业出海用工合规白皮书",
    subtitle: "跨境用工的模式、认定、财税与争议处置",
    eyebrow: "WHITE PAPER · 出海用工",
    pages: 115,
    published: "2026 年 11 月",
    org: "劳动与人力资源专业委员会 · 国际业务法律专业委员会",
    description:
      "面向出海企业，把跨境用工放在劳动、税务、移民、数据四条相互独立的监管条线下综合考察：从用工模式选型、劳动关系认定与法律适用，到财税负担、用工文本与竞业限制、第三方用工服务商管理、员工个人信息跨境、争议处置与重点国别规则。",
    highlights: ["四条监管条线", "八章体系化梳理", "重点国别规则", "跨境用工自查清单"],
    toc: [
      { no: "01", label: "导言" },
      { no: "02", label: "出海用工模式与选择" },
      { no: "03", label: "跨境用工劳动关系认定与法律适用" },
      { no: "04", label: "跨境用工的税务风险识别与管控" },
      { no: "05", label: "用工文本、竞业限制与知识产权" },
      { no: "06", label: "第三方用工服务商管理" },
      { no: "07", label: "员工个人信息的跨境提供与本地合规" },
      { no: "08", label: "争议应对与员工突发事件处置" },
      { no: "09", label: "重点国别用工规则与合规要点" },
      { no: "10", label: "附录：法规索引 / 术语表 / 自查清单" }
    ],
    pdf: "/whitepapers/download/overseas-employment-compliance-2026.pdf"
  }
];
