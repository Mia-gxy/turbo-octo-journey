// ============================================================
// 常用问题库 - Question Library
// 分类标签 + 问题列表 + 匹配牌阵推荐
// ============================================================

const QUESTION_CATEGORIES = [
  { id: 'all',       name: '全部',       count: 42, color: '#6B7DB8' },
  { id: 'ambiguous', name: '暧昧心动',   count: 6,  color: '#D4577A' },
  { id: 'love',      name: '恋爱关系',   count: 5,  color: '#E8A0BF' },
  { id: 'breakup',   name: '分手复合',   count: 3,  color: '#8C4A4A' },
  { id: 'career',    name: '事业工作',   count: 10, color: '#6B7DB8' },
  { id: 'money',     name: '金钱收入',   count: 4,  color: '#C9A227' },
  { id: 'study',     name: '学业考试',   count: 5,  color: '#7B8FBD' },
  { id: 'friendship',name: '友情人际',   count: 4,  color: '#9B83C7' },
  { id: 'family',    name: '家庭生活',   count: 4,  color: '#A67B5B' },
  { id: 'self',      name: '自我成长',   count: 2,  color: '#6B3FA0' }
];

const QUESTION_LIST = [
  // ===== 暧昧心动 =====
  {
    id: 'q001', category: 'ambiguous',
    question: '把 crush 骂了一顿，他现在是什么想法？',
    dotColor: '#D4577A',
    matchedSpreads: ['relationship', 'choice-cross'],
    template: '我和 {对方} 发生了争执，我想知道他此刻对我的真实想法，以及这段关系接下来会如何发展。'
  },
  {
    id: 'q002', category: 'ambiguous',
    question: '什么时候能和 Ta 见面？',
    dotColor: '#E8A0BF',
    matchedSpreads: ['time-flow', 'single'],
    template: '我想知道我和 {对方} 下次见面的时机，以及见面之前需要做怎样的准备。'
  },
  {
    id: 'q003', category: 'ambiguous',
    question: 'TA 还喜欢我吗？',
    dotColor: '#D4577A',
    matchedSpreads: ['relationship', 'single'],
    template: '我想知道 {对方} 对我的真实心意，他/她是否还喜欢我，以及我们关系的走向。'
  },
  {
    id: 'q004', category: 'ambiguous',
    question: 'TA 现在对我的看法是什么？',
    dotColor: '#6B8E23',
    matchedSpreads: ['body-mind-spirit', 'relationship'],
    template: '我想了解 {对方} 是如何看待我的，包括他/她对我的印象、评价以及内心的真实感受。'
  },
  {
    id: 'q005', category: 'ambiguous',
    question: '表白会被拒绝吗？',
    dotColor: '#6B3FA0',
    matchedSpreads: ['choice-cross', 'time-flow'],
    template: '我打算向 {对方} 表白，想知道表白成功的可能性，以及他/她会作何反应。'
  },
  {
    id: 'q006', category: 'ambiguous',
    question: '我们的暧昧关系能更进一步吗？',
    dotColor: '#E8A0BF',
    matchedSpreads: ['time-flow', 'relationship'],
    template: '我和 {对方} 目前处于暧昧阶段，我想知道这段关系能否更进一步，以及该如何推进。'
  },

  // ===== 恋爱关系 =====
  {
    id: 'q101', category: 'love',
    question: '我们的关系目前处于什么状态？',
    dotColor: '#D4577A',
    matchedSpreads: ['relationship', 'body-mind-spirit'],
    template: '我想了解我和 {伴侣} 的关系目前处于怎样的状态，双方的真实感受和关系的核心议题是什么。'
  },
  {
    id: 'q102', category: 'love',
    question: '他/她心里有别人吗？',
    dotColor: '#8C4A4A',
    matchedSpreads: ['relationship', 'choice-cross'],
    template: '我想知道 {伴侣} 心里是否有其他人，以及我们关系中是否存在第三者的影响。'
  },
  {
    id: 'q103', category: 'love',
    question: '这段感情值得继续投入吗？',
    dotColor: '#6B8E23',
    matchedSpreads: ['choice-cross', 'celtic-cross'],
    template: '我对和 {伴侣} 的关系感到迷茫，想知道这段感情是否值得我继续投入，未来的发展前景如何。'
  },
  {
    id: 'q104', category: 'love',
    question: '我们为什么总是吵架？',
    dotColor: '#E8A0BF',
    matchedSpreads: ['relationship', 'body-mind-spirit'],
    template: '我和 {伴侣} 最近频繁争吵，我想知道争吵的根本原因是什么，以及该如何改善这种状况。'
  },
  {
    id: 'q105', category: 'love',
    question: '他/她会向我求婚吗？',
    dotColor: '#C9A227',
    matchedSpreads: ['time-flow', 'single'],
    template: '我和 {伴侣} 在一起很久了，我想知道他/她是否有求婚的打算，以及我们关系下一步的走向。'
  },

  // ===== 分手复合 =====
  {
    id: 'q201', category: 'breakup',
    question: '我们还有复合的可能吗？',
    dotColor: '#8C4A4A',
    matchedSpreads: ['choice-cross', 'time-flow'],
    template: '我和 {前任} 已经分手了，我想知道我们还有没有复合的可能性，以及他/她现在的想法。'
  },
  {
    id: 'q202', category: 'breakup',
    question: '他/她为什么要和我分手？',
    dotColor: '#D4577A',
    matchedSpreads: ['body-mind-spirit', 'single'],
    template: ' {前任} 提出了分手，我想知道他/她真正的原因是什么，以及我是否有什么地方做得不够好。'
  },
  {
    id: 'q203', category: 'breakup',
    question: '我该放下这段感情吗？',
    dotColor: '#6B3FA0',
    matchedSpreads: ['choice-cross', 'celtic-cross'],
    template: '分手已经有一段时间了，但我还是无法完全放下 {前任}。我想知道我是否应该彻底放下这段感情，继续前行。'
  },

  // ===== 事业工作 =====
  {
    id: 'q401', category: 'career',
    question: '我该离职跳槽吗？',
    dotColor: '#6B7DB8',
    matchedSpreads: ['choice-cross', 'celtic-cross'],
    template: '我对目前的工作不太满意，在考虑是否要离职跳槽。想知道留下和离开各自的利弊，以及该如何抉择。'
  },
  {
    id: 'q402', category: 'career',
    question: '这次面试能通过吗？',
    dotColor: '#D4577A',
    matchedSpreads: ['single', 'time-flow'],
    template: '我刚刚参加了 {公司} 的面试，想知道面试结果如何，我能否顺利拿到 offer。'
  },
  {
    id: 'q403', category: 'career',
    question: '领导对我的真实评价是什么？',
    dotColor: '#C9A227',
    matchedSpreads: ['body-mind-spirit', 'relationship'],
    template: '我想知道我的领导对我的真实评价是怎样的，他/她是否认可我的工作能力，以及我在团队中的位置。'
  },
  {
    id: 'q404', category: 'career',
    question: '今年有升职加薪的机会吗？',
    dotColor: '#6B8E23',
    matchedSpreads: ['time-flow', 'single'],
    template: '我想知道今年我有没有升职加薪的机会，需要做哪些努力才能实现这个目标。'
  },
  {
    id: 'q405', category: 'career',
    question: '能争取到这份工作吗？',
    dotColor: '#D4577A',
    matchedSpreads: ['choice-cross', 'single'],
    template: '我正在争取 {某份工作}，想知道成功的可能性有多大，以及我该如何做才能增加胜算。'
  },
  {
    id: 'q406', category: 'career',
    question: '现在这个工作会马上离职吗？',
    dotColor: '#C9A227',
    matchedSpreads: ['time-flow', 'choice-cross'],
    template: '我最近在考虑要不要离职，想知道我在这份工作还能做多久，以及离职的时机是否成熟。'
  },
  {
    id: 'q407', category: 'career',
    question: '在这家公司还能涨工资吗？',
    dotColor: '#6B8E23',
    matchedSpreads: ['time-flow', 'single'],
    template: '我想知道在目前这家公司还有没有涨薪的可能，大概什么时候会有，以及我需要做些什么。'
  },
  {
    id: 'q408', category: 'career',
    question: '我适合什么样的职业？',
    dotColor: '#5B8CBE',
    matchedSpreads: ['body-mind-spirit', 'celtic-cross'],
    template: '我对职业方向感到迷茫，想知道什么样的职业最适合我，我的天赋和优势在哪里。'
  },
  {
    id: 'q409', category: 'career',
    question: '我该找什么岗位的工作？',
    dotColor: '#9B83C7',
    matchedSpreads: ['choice-cross', 'body-mind-spirit'],
    template: '我正在找工作，但不确定该投什么岗位。想知道什么样的岗位最适合我，最能发挥我的优势。'
  },
  {
    id: 'q410', category: 'career',
    question: '接下这个 offer 会不会让我后悔？',
    dotColor: '#A67B5B',
    matchedSpreads: ['choice-cross', 'time-flow'],
    template: '我收到了一个 offer，有些犹豫要不要接。想知道接下这份工作后我会不会后悔，以及需要注意什么。'
  },

  // ===== 金钱收入 =====
  {
    id: 'q301', category: 'money',
    question: '未来三个月收入增长点在哪里？',
    dotColor: '#D4577A',
    matchedSpreads: ['time-flow', 'choice-cross'],
    template: '我想知道未来三个月我的收入增长点在哪里，有哪些机会可以增加收入，以及该如何把握。'
  },
  {
    id: 'q302', category: 'money',
    question: '这份副业适合继续投入吗？',
    dotColor: '#C9A227',
    matchedSpreads: ['choice-cross', 'time-flow'],
    template: '我目前在做一份副业，想知道它是否值得我继续投入时间和精力，未来的收益前景如何。'
  },
  {
    id: 'q303', category: 'money',
    question: '现在适合做这笔大额支出吗？',
    dotColor: '#6B8E23',
    matchedSpreads: ['choice-cross', 'single'],
    template: '我正在考虑一笔大额支出，想知道现在是不是合适的时机，以及这笔支出会带来怎样的影响。'
  },
  {
    id: 'q304', category: 'money',
    question: '近期财运如何？',
    dotColor: '#2E86C1',
    matchedSpreads: ['time-flow', 'single'],
    template: '我想知道近期的整体财运如何，有没有需要注意的财务风险，以及有哪些可以把握的机会。'
  },

  // ===== 学业考试 =====
  {
    id: 'q601', category: 'study',
    question: '我的六级考试能过么？',
    dotColor: '#D4577A',
    matchedSpreads: ['single', 'time-flow'],
    template: '我即将参加六级考试，想知道通过的可能性有多大，以及我目前的准备情况如何。'
  },
  {
    id: 'q602', category: 'study',
    question: '还有5天考试啦，通过概率大吗？',
    dotColor: '#C9A227',
    matchedSpreads: ['time-flow', 'single'],
    template: '还有5天就要考试了，我很紧张，想知道通过的概率大吗，最后几天最该做什么。'
  },
  {
    id: 'q603', category: 'study',
    question: '当前最影响复习效率的是什么？',
    dotColor: '#6B8E23',
    matchedSpreads: ['body-mind-spirit', 'single'],
    template: '我感觉复习效率不高，想知道是什么在影响我的学习效率，以及该如何改善。'
  },
  {
    id: 'q604', category: 'study',
    question: '这次考试前最该补哪一块？',
    dotColor: '#5B8CBE',
    matchedSpreads: ['choice-cross', 'body-mind-spirit'],
    template: '考试临近，时间有限，我想知道在所有科目中，我最应该重点补哪一块才能提分最多。'
  },
  {
    id: 'q605', category: 'study',
    question: '申请这所学校/专业需要加强什么？',
    dotColor: '#9B83C7',
    matchedSpreads: ['body-mind-spirit', 'celtic-cross'],
    template: '我打算申请 {某学校/某专业}，想知道我目前的差距在哪里，最需要加强哪些方面才能增加录取概率。'
  },

  // ===== 友情人际 =====
  {
    id: 'q701', category: 'friendship',
    question: '朋友有没有背刺我？',
    dotColor: '#D4577A',
    matchedSpreads: ['relationship', 'single'],
    template: '我最近感觉某个朋友的行为有些奇怪，想知道他/她有没有在背后说我坏话或做对我不利的事。'
  },
  {
    id: 'q702', category: 'friendship',
    question: '朋友对我的真实看法？',
    dotColor: '#C9A227',
    matchedSpreads: ['body-mind-spirit', 'relationship'],
    template: '我想知道我的好朋友对我的真实看法是怎样的，他/她如何评价我们之间的友谊。'
  },
  {
    id: 'q703', category: 'friendship',
    question: '这段友情值得继续投入吗？',
    dotColor: '#6B8E23',
    matchedSpreads: ['choice-cross', 'relationship'],
    template: '我对一段友谊感到疲惫，想知道这段友情是否值得我继续投入和维护，还是该渐行渐远。'
  },
  {
    id: 'q704', category: 'friendship',
    question: '我们之间的误会从哪里来？',
    dotColor: '#5B8CBE',
    matchedSpreads: ['body-mind-spirit', 'time-flow'],
    template: '我和朋友之间产生了误会，想知道误会的根源是什么，以及该如何化解它。'
  },

  // ===== 家庭生活 =====
  {
    id: 'q801', category: 'family',
    question: '我和父母的关系该如何改善？',
    dotColor: '#A67B5B',
    matchedSpreads: ['relationship', 'body-mind-spirit'],
    template: '我和父母的关系最近有些紧张，想知道我们之间的矛盾根源在哪里，以及该如何改善关系。'
  },
  {
    id: 'q802', category: 'family',
    question: '家人最近的健康状况如何？',
    dotColor: '#6B8E23',
    matchedSpreads: ['body-mind-spirit', 'single'],
    template: '我很担心 {某位家人} 的健康，想知道他/她目前的身体状态如何，有没有需要特别注意的地方。'
  },
  {
    id: 'q803', category: 'family',
    question: '家里近期会有什么变动吗？',
    dotColor: '#C9A227',
    matchedSpreads: ['time-flow', 'celtic-cross'],
    template: '我感觉家里最近氛围不太一样，想知道近期家庭会不会有什么变动，以及我该如何应对。'
  },
  {
    id: 'q804', category: 'family',
    question: '我该怎么处理和亲戚之间的矛盾？',
    dotColor: '#9B83C7',
    matchedSpreads: ['choice-cross', 'relationship'],
    template: '我和某位亲戚之间有矛盾，想知道该怎么处理比较好，是主动化解还是保持距离。'
  },

  // ===== 自我成长 =====
  {
    id: 'q501', category: 'self',
    question: '我当下最需要关注的是什么？',
    dotColor: '#6B3FA0',
    matchedSpreads: ['body-mind-spirit', 'single'],
    template: '我最近感到有些迷茫，想知道我当下最需要关注的是什么，身心灵三个方面分别有什么需要觉察的。'
  },
  {
    id: 'q502', category: 'self',
    question: '我的人生方向在哪里？',
    dotColor: '#C9A227',
    matchedSpreads: ['celtic-cross', 'time-flow'],
    template: '我对人生方向感到困惑，想知道我的人生道路该往哪里走，有哪些天赋和使命等待我去发现。'
  }
];

// 按分类获取问题
function getQuestionsByCategory(categoryId) {
  if (categoryId === 'all') return QUESTION_LIST;
  return QUESTION_LIST.filter(q => q.category === categoryId);
}

// 获取分类信息
function getCategoryById(id) {
  return QUESTION_CATEGORIES.find(c => c.id === id);
}
