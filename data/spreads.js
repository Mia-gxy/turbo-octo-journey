// ============================================================
// 牌阵布局 - 6种预设牌阵
// 坐标系：x ∈ [0,10] 水平，y ∈ [0,10] 垂直
// 原点(0,0)在左上角，(5,5)为画布中心
// ============================================================

const SPREADS = [
  {
    id: "single",
    name: "单张指引",
    englishName: "Single Card Guidance",
    description: "最简洁的占卜方式，抽取一张牌作为当下的指引。适合日常冥想或快速获取方向感。",
    recommendedFor: "每日指引 · 快速洞察",
    cardCount: 1,
    layout: "single",
    positions: [
      { index: 0, name: "当前指引", description: "此刻你最需要知道的信息或能量", x: 5, y: 5, rotated: false }
    ]
  },

  {
    id: "time-flow",
    name: "三张时间流",
    englishName: "Three Card Time Flow",
    description: "经典三牌阵，以时间线解读过去、现在与未来的能量流向。简洁而深刻。",
    recommendedFor: "事件发展 · 时间脉络",
    cardCount: 3,
    layout: "horizontal",
    positions: [
      { index: 0, name: "过去", description: "影响当前局势的过往能量与事件", x: 2.5, y: 5, rotated: false },
      { index: 1, name: "现在", description: "此刻正在发生或即将显化的能量", x: 5, y: 5, rotated: false },
      { index: 2, name: "未来", description: "如果保持当前方向，将要到来的趋势", x: 7.5, y: 5, rotated: false }
    ]
  },

  {
    id: "body-mind-spirit",
    name: "身心灵",
    englishName: "Body-Mind-Spirit",
    description: "从身体、心智、灵性三个维度审视自我的整体状态。适合自我探索与内在整合。",
    recommendedFor: "自我探索 · 内在整合",
    cardCount: 3,
    layout: "triangle",
    positions: [
      { index: 0, name: "身体", description: "物质层面的状态：健康、能量、身体感受", x: 5, y: 2.5, rotated: false },
      { index: 1, name: "心智", description: "思维层面的状态：想法、信念、心理模式", x: 2.5, y: 7, rotated: false },
      { index: 2, name: "灵性", description: "灵性层面的状态：直觉、连接、更高指引", x: 7.5, y: 7, rotated: false }
    ]
  },

  {
    id: "choice-cross",
    name: "抉择十字",
    englishName: "Choice Cross",
    description: "面临重要选择时的决策牌阵。中心为现状，上下为两个选项，左右为建议与可能结果。",
    recommendedFor: "面临抉择 · 决策分析",
    cardCount: 5,
    layout: "cross",
    positions: [
      { index: 0, name: "现状", description: "当前面临的情境与核心议题", x: 5, y: 5, rotated: false },
      { index: 1, name: "选择 A", description: "一个可选的方向及其能量", x: 5, y: 2, rotated: false },
      { index: 2, name: "选择 B", description: "另一个可选的方向及其能量", x: 5, y: 8, rotated: false },
      { index: 3, name: "建议", description: "在抉择中需要注意的要点", x: 2, y: 5, rotated: false },
      { index: 4, name: "可能结果", description: "无论选择哪条路，潜在的趋势走向", x: 8, y: 5, rotated: false }
    ]
  },

  {
    id: "relationship",
    name: "关系牌阵",
    englishName: "Relationship Spread",
    description: "探索两人之间的关系动态。展示各自的状态、连接、优势、挑战与关系建议。",
    recommendedFor: "关系探索 · 情感分析",
    cardCount: 6,
    layout: "relationship",
    positions: [
      { index: 0, name: "你", description: "你在这段关系中的状态与能量", x: 2, y: 3, rotated: false },
      { index: 1, name: "对方", description: "对方在这段关系中的状态与能量", x: 8, y: 3, rotated: false },
      { index: 2, name: "连接", description: "你们之间的核心连接与互动模式", x: 5, y: 4.5, rotated: false },
      { index: 3, name: "优势", description: "这段关系中的积极力量与资源", x: 2, y: 7, rotated: false },
      { index: 4, name: "挑战", description: "需要面对的课题与成长空间", x: 8, y: 7, rotated: false },
      { index: 5, name: "建议", description: "对这段关系的指引与建议", x: 5, y: 8.5, rotated: false }
    ]
  },

  {
    id: "celtic-cross",
    name: "凯尔特十字",
    englishName: "Celtic Cross",
    description: "塔罗牌阵中最经典、最全面的牌阵。十张牌从过去、现在、未来、内在、外在等多维度构建完整的命运图景。适合深入解读重要议题。",
    recommendedFor: "深度解读 · 全景分析",
    cardCount: 10,
    layout: "celtic",
    positions: [
      { index: 0, name: "现状", description: "当下的核心处境与自我状态", x: 5, y: 5, rotated: false },
      { index: 1, name: "挑战", description: "横亘在前的主要阻碍或对立力量", x: 5, y: 5, rotated: true, overlay: true },
      { index: 2, name: "根基", description: "深层的根源与潜意识影响", x: 5, y: 7.5, rotated: false },
      { index: 3, name: "近期过去", description: "刚刚过去的、仍在影响你的事件", x: 3, y: 5, rotated: false },
      { index: 4, name: "可能未来", description: "如果保持当前方向，可能到来的趋势", x: 5, y: 2.5, rotated: false },
      { index: 5, name: "近期未来", description: "即将到来的能量与发展", x: 7, y: 5, rotated: false },
      { index: 6, name: "自我态度", description: "你对此议题的内在态度与立场", x: 9, y: 8.5, rotated: false },
      { index: 7, name: "外部环境", description: "周围人与环境对你的影响", x: 9, y: 6.3, rotated: false },
      { index: 8, name: "希望与恐惧", description: "内心最深处的渴望与担忧", x: 9, y: 4.1, rotated: false },
      { index: 9, name: "最终结果", description: "如果遵循指引，最终的走向", x: 9, y: 1.9, rotated: false }
    ]
  }
];

// 获取牌阵数据
function getSpreadById(id) {
  return SPREADS.find(s => s.id === id);
}

// 获取所有牌阵
function getAllSpreads() {
  return SPREADS;
}
