export const topics = [
  {
    slug: "criminal-risk-non-prosecution",
    title: "刑事风险处置与不起诉",
    shortTitle: "刑事风险与不起诉",
    description: "从经营事实、人员职责、主观明知与证据链条出发，理解企业刑事风险如何被识别、区分和尽早处置。",
    directAnswer: "企业刑事风险处置的关键，不只是判断一个行为是否可能构罪，而是尽早还原业务事实、划清人员责任、固定有利证据，并根据程序阶段选择辩护与沟通路径。不起诉结果取决于事实、证据、行为作用与法律评价，不能脱离个案条件简单复制。",
    questions: ["经营行为与个人责任如何区分", "主观明知通常如何被证明", "帮助行为与共同犯罪的边界在哪里", "争取不起诉应重点审查哪些证据"],
    slugs: [
      "zhang-mouqiang-innocent-case",
      "world-cup-sports-betting-crime-chain",
      "openclaw-install-legal-risk",
      "tax-criminal-red-lines"
    ]
  },
  {
    slug: "tax-crime-disputes",
    title: "税务刑事与税企争议",
    shortTitle: "税务刑事与税企争议",
    description: "沿业务、合同、资金与发票链条，梳理税务稽查、虚开案件及税务行政风险向刑事风险转化的关键节点。",
    directAnswer: "税务刑事风险往往不是从一张发票开始，而是源于业务真实性、资金流、合同履行和申报处理之间无法相互印证。企业面对税务稽查时，应先判断问题仍处于行政处理范围，还是已经出现移送刑事程序的信号，再决定材料说明、整改和律师介入顺序。",
    questions: ["税务稽查什么时候需要律师介入", "虚开发票的入罪与出罪边界是什么", "不以骗税为目的应如何证明", "进销项同时虚开的数额如何计算"],
    slugs: [
      "when-tax-audit-needs-lawyer",
      "tax-criminal-red-lines",
      "circular-invoicing-boundaries",
      "inflated-performance-invoicing",
      "input-output-invoice-amount",
      "zhang-mouqiang-innocent-case",
      "cao-invoice-criminal-ruling"
    ]
  },
  {
    slug: "ai-data-compliance",
    title: "AI 数据合规",
    shortTitle: "AI 数据合规",
    description: "围绕 AI 产品、技术服务、数据来源与数字交易，识别模型调用、数据跨境、技术帮助及电子签署中的法律边界。",
    directAnswer: "AI 数据合规需要同时审查技术架构、数据流、参与主体和商业模式。合规判断不能只看产品名称，而应具体确认数据从哪里来、传向哪里、由谁决定处理目的，以及技术服务是否可能直接帮助违法犯罪活动。",
    questions: ["大模型 API 中转站承担哪些合规义务", "AI 技术服务何时可能涉及帮信罪", "数据跨境与模型备案如何判断", "电子签章真实性和效力如何审查"],
    slugs: [
      "llm-api-relay-data-compliance",
      "openclaw-install-legal-risk",
      "electronic-signature-validity"
    ]
  }
] as const;

export type Topic = (typeof topics)[number];
