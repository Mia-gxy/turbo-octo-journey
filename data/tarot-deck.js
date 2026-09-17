// ============================================================
// 塔罗牌库 - 78张完整牌组
// 22张大阿尔卡那 (Major Arcana, 0-21)
// 56张小阿尔卡那 (Minor Arcana, 4花色×14张)
// ============================================================

const TAROT_DECK = [
  // ===== 大阿尔卡那 Major Arcana (0-21) =====
  { id: 0, name: "愚者", englishName: "The Fool", arcana: "major", number: 0, roman: "0", symbol: "🌄", element: "风",
    keywords: ["新的开始", "冒险", "自由", "天真"],
    upright: "代表新的开始、无限的可能性与自由精神。你即将踏上一段未知的旅程，带着童真与勇气，拥抱一切可能。放下束缚，信任直觉。",
    reversed: "逆位暗示鲁莽行事、缺乏计划或逃避现实。可能在冲动之下做出不明智的决定，需要更加脚踏实地，三思而后行。" },

  { id: 1, name: "魔术师", englishName: "The Magician", arcana: "major", number: 1, roman: "I", symbol: "🎩", element: "水星",
    keywords: ["创造力", "意志力", "掌控", "沟通"],
    upright: "象征无限的创造力与行动力。你拥有实现目标所需的一切工具与才能，只需将意志聚焦，便能将想法化为现实。主动权在你手中。",
    reversed: "逆位可能意味着能力被误用、欺骗或缺乏自信。才华虽在却无法发挥，或利用技能操纵他人。需要回归正念，善用天赋。" },

  { id: 2, name: "女祭司", englishName: "The High Priestess", arcana: "major", number: 2, roman: "II", symbol: "🌙", element: "月亮",
    keywords: ["直觉", "潜意识", "神秘", "智慧"],
    upright: "代表内在的智慧与直觉的力量。此刻需要静心倾听内在声音，答案藏在表象之下。耐心等待，时机未到时不宜行动。",
    reversed: "逆位暗示忽视直觉、过度依赖逻辑或隐藏的秘密被揭露。情绪可能凌驾于理性之上，需要重新连接内在的智慧之光。" },

  { id: 3, name: "皇后", englishName: "The Empress", arcana: "major", number: 3, roman: "III", symbol: "👑", element: "金星",
    keywords: ["丰盛", "母性", "创造力", "自然"],
    upright: "象征丰盛、创造力与生命的滋养。一段充满繁荣与成长的时期，无论是事业还是感情都将开花结果。拥抱自然之美与感官享受。",
    reversed: "逆位可能表示过度依赖、创造力受阻或忽视自我需求。可能在照顾他人时忽略了自己，需要找回平衡与自我价值感。" },

  { id: 4, name: "皇帝", englishName: "The Emperor", arcana: "major", number: 4, roman: "IV", symbol: "👑", element: "火星",
    keywords: ["权威", "结构", "领导", "稳定"],
    upright: "代表权威、秩序与坚强的领导力。通过自律与规划建立稳固的根基，以理性的方式掌控局面。是承担责任、建立规则的时期。",
    reversed: "逆位暗示过度控制、专横或缺乏自律。可能因固执而错失机会，或在权威面前失去自我。需要学会灵活与授权。" },

  { id: 5, name: "教皇", englishName: "The Hierophant", arcana: "major", number: 5, roman: "V", symbol: "⛪", element: "木星",
    keywords: ["传统", "信仰", "教导", "归属"],
    upright: "象征传统价值、精神指引与社会规范。寻求导师或智者的建议，在既定体系中找到归属感。遵循传统可能带来安全感与成长。",
    reversed: "逆位代表挑战传统、打破常规或个人信仰的觉醒。不再盲从权威，而是寻找属于自己的道路。自由思考的时刻。" },

  { id: 6, name: "恋人", englishName: "The Lovers", arcana: "major", number: 6, roman: "VI", symbol: "💞", element: "双子",
    keywords: ["爱情", "选择", "和谐", "价值观"],
    upright: "代表深刻的连接、爱情与重要的选择。不仅是浪漫关系，更是价值观的契合与灵魂的选择。跟随内心，做出忠于自我的决定。",
    reversed: "逆位暗示关系中的不和谐、价值观冲突或艰难的抉择。可能面临诱惑或犹豫不决，需要诚实面对自己的真实感受。" },

  { id: 7, name: "战车", englishName: "The Chariot", arcana: "major", number: 7, roman: "VII", symbol: "🏎️", element: "巨蟹",
    keywords: ["意志", "胜利", "前进", "掌控"],
    upright: "象征通过意志力与自律取得的胜利。克服困难与对立力量，驾驭冲突的能量向目标前进。成功属于坚定前行者。",
    reversed: "逆位表示方向迷失、内耗或冲动行事。可能因缺乏计划而偏离目标，或内在矛盾阻碍前进。需要重新整合方向。" },

  { id: 8, name: "力量", englishName: "Strength", arcana: "major", number: 8, roman: "VIII", symbol: "🦁", element: "狮子",
    keywords: ["勇气", "耐心", "内在力量", "柔克刚"],
    upright: "代表内在的勇气与温柔的坚持。不是蛮力，而是以耐心和慈悲驯服内心的野兽。真正的力量来自自我控制与温柔的坚定。",
    reversed: "逆位暗示自我怀疑、缺乏勇气或被情绪左右。内在的恐惧阻碍了前进，需要重新找到信心与内在的平静。" },

  { id: 9, name: "隐士", englishName: "The Hermit", arcana: "major", number: 9, roman: "IX", symbol: "🏮", element: "处女",
    keywords: ["独处", "内省", "智慧", "指引"],
    upright: "象征独处、内省与寻求内在的光芒。这是退一步、静心反思的时刻。在孤独中找到真理，你的内在之光将照亮前路。",
    reversed: "逆位可能表示孤立、退缩或拒绝建议。过度封闭自己可能导致迷失，需要适度打开心扉，接受外界的帮助与指引。" },

  { id: 10, name: "命运之轮", englishName: "Wheel of Fortune", arcana: "major", number: 10, roman: "X", symbol: "🎡", element: "木星",
    keywords: ["转变", "机遇", "命运", "循环"],
    upright: "代表命运的转折与不可预测的机遇。时来运转，变化的浪潮将带来新的可能。顺应生命的循环，把握当下出现的契机。",
    reversed: "逆位暗示厄运或抗拒变化。事情可能不如预期发展，但低谷终将过去。接受现状，为下一个上升周期做好准备。" },

  { id: 11, name: "正义", englishName: "Justice", arcana: "major", number: 11, roman: "XI", symbol: "⚖️", element: "天秤",
    keywords: ["公正", "真相", "因果", "平衡"],
    upright: "象征公正、真相与因果的平衡。过去的所作所为将得到相应的回报。以客观理性的态度做出判断，真理终将浮出水面。",
    reversed: "逆位暗示不公、偏见或逃避责任。可能面临不公平的对待或需要重新审视自己的立场。诚实面对因果，承担应尽的责任。" },

  { id: 12, name: "倒吊人", englishName: "The Hanged Man", arcana: "major", number: 12, roman: "XII", symbol: "🙃", element: "水",
    keywords: ["暂停", "牺牲", "视角转换", "放下"],
    upright: "代表自愿的牺牲与视角的转换。此刻需要停下脚步，以不同的角度看待事物。看似停滞的时期蕴含着深刻的领悟与成长。",
    reversed: "逆位可能表示无谓的牺牲、抗拒改变或拖延。不愿放手导致更大的困境，需要学会顺流而下，接受暂时的不确定。" },

  { id: 13, name: "死神", englishName: "Death", arcana: "major", number: 13, roman: "XIII", symbol: "🦋", element: "天蝎",
    keywords: ["转变", "结束", "重生", "蜕变"],
    upright: "象征深刻的转变与旧有模式的终结。不是字面上的死亡，而是一个篇章的落幕与新生的开始。拥抱变化，蜕去旧壳，迎接重生。",
    reversed: "逆位暗示抗拒变化、无法放手或停滞不前。紧紧抓住已经不再服务于你的事物，只会延长痛苦。接受结束，才能开始新生。" },

  { id: 14, name: "节制", englishName: "Temperance", arcana: "major", number: 14, roman: "XIV", symbol: "👼", element: "射手",
    keywords: ["平衡", "调和", "耐心", "炼金"],
    upright: "代表平衡、调和与耐心的力量。在对立之间找到中道，将不同元素融合为和谐的整体。不急不躁，以稳健的节奏前进。",
    reversed: "逆位暗示失衡、过度或缺乏耐心。可能走极端或急于求成，需要重新校准方向，找回内在的平衡与节奏。" },

  { id: 15, name: "恶魔", englishName: "The Devil", arcana: "major", number: 15, roman: "XV", symbol: "😈", element: "摩羯",
    keywords: ["束缚", "欲望", "执着", "幻象"],
    upright: "象征物质世界的束缚与欲望的枷锁。你可能被某种执着或不良习惯困住，但锁链是松的——你有能力挣脱，只要愿意面对真相。",
    reversed: "逆位代表挣脱束缚、觉醒或重获自由。开始意识到束缚的来源，并勇敢地迈出解脱的步伐。光明正在驱散黑暗。" },

  { id: 16, name: "高塔", englishName: "The Tower", arcana: "major", number: 16, roman: "XVI", symbol: "⚡", element: "火星",
    keywords: ["突变", "崩塌", "觉醒", "释放"],
    upright: "代表突如其来的变化与虚假根基的崩塌。虽然剧烈且令人震惊，但这打破了建立在错觉上的结构。废墟之上将重建真实。",
    reversed: "逆位暗示抗拒改变、延缓不可避免的崩塌或内在的动荡。变化正在酝酿但尚未爆发，拖延只会让冲击更加强烈。" },

  { id: 17, name: "星星", englishName: "The Star", arcana: "major", number: 17, roman: "XVII", symbol: "⭐", element: "水瓶",
    keywords: ["希望", "灵感", "宁静", "信念"],
    upright: "象征希望、灵感与心灵的宁静。暴风雨过后，星光重新闪耀。这是疗愈与重生的时期，信任宇宙的指引，保持信念与乐观。",
    reversed: "逆位暗示失去希望、信心动摇或感到迷茫。暂时的灰暗遮蔽了星光，但光芒并未消失。重新连接内在的信念之源。" },

  { id: 18, name: "月亮", englishName: "The Moon", arcana: "major", number: 18, roman: "XVIII", symbol: "🌕", element: "双鱼",
    keywords: ["幻象", "潜意识", "不安", "直觉"],
    upright: "代表潜意识的幻象与深层的不安。事物并非表面所见，恐惧与焦虑可能被放大。倾听直觉，在迷雾中小心前行，真相将逐渐显现。",
    reversed: "逆位表示迷雾消散、真相浮现或释放恐惧。你开始看清事物的本来面目，不再被幻象困扰。 clarity is returning." },

  { id: 19, name: "太阳", englishName: "The Sun", arcana: "major", number: 19, roman: "XIX", symbol: "☀️", element: "太阳",
    keywords: ["喜悦", "成功", "活力", "光明"],
    upright: "象征纯粹的喜悦、成功与生命力。黑暗已经过去，光明照耀一切。这是充满快乐、自信与成就的时期，尽情绽放你的光芒。",
    reversed: "逆位可能意味着暂时的阴霾、过度乐观或自信受挫。光芒仍在但被遮蔽，需要找回内在的温暖与积极的力量。" },

  { id: 20, name: "审判", englishName: "Judgement", arcana: "major", number: 20, roman: "XX", symbol: "📯", element: "冥王",
    keywords: ["觉醒", "召唤", "重生", "宽恕"],
    upright: "代表内在的召唤与灵魂的觉醒。过去的行为被审视，一个重要的决定摆在面前。倾听内心的呼唤，迎接新生与宽恕的时刻。",
    reversed: "逆位暗示自我怀疑、无视召唤或无法宽恕。可能过于严苛地评判自己或他人，需要放下过去，给予自己宽恕与接纳。" },

  { id: 21, name: "世界", englishName: "The World", arcana: "major", number: 21, roman: "XXI", symbol: "🌍", element: "土星",
    keywords: ["完成", "成就", "圆满", "整合"],
    upright: "象征一个周期的圆满完成与终极成就。你已经走完了完整的旅程，收获了智慧与成长。庆祝此刻的圆满，新的循环即将开启。",
    reversed: "逆位暗示未完成的循环或拖延的终结。即将到达终点但仍有阻碍，需要最后的坚持与努力来完成这段旅程。" },

  // ===== 小阿尔卡那 - 权杖 Wands (22-35) =====
  { id: 22, name: "权杖一", englishName: "Ace of Wands", arcana: "minor", suit: "wands", number: 1, roman: "1", symbol: "🔥", element: "火",
    keywords: ["灵感", "新机遇", "创造火花"],
    upright: "灵感的火花迸发，一个新的创意或机遇正在萌芽。热情被点燃，是启动新项目或追求梦想的绝佳时机。",
    reversed: "灵感延迟、热情不足或新计划受阻。可能感到缺乏方向，需要重新点燃内在的火焰。" },

  { id: 23, name: "权杖二", englishName: "Two of Wands", arcana: "minor", suit: "wands", number: 2, roman: "2", symbol: "🔥", element: "火",
    keywords: ["规划", "选择", "远见"],
    upright: "站在十字路口，手中已握有计划但尚未行动。远见与战略思维帮助你看到更广阔的可能性，是做出长远决定的时刻。",
    reversed: "害怕离开舒适区或计划受阻。可能因过度犹豫而错失良机，需要勇敢迈出第一步。" },

  { id: 24, name: "权杖三", englishName: "Three of Wands", arcana: "minor", suit: "wands", number: 3, roman: "3", symbol: "🔥", element: "火",
    keywords: ["扩展", "前景", "等待回报"],
    upright: "计划已经启动，正在等待成果的到来。视野开阔，看向远方的机遇。保持耐心，你的努力即将得到回报。",
    reversed: "计划受阻或延迟回报。可能需要调整策略或重新评估方向，不要因暂时的停滞而丧失信心。" },

  { id: 25, name: "权杖四", englishName: "Four of Wands", arcana: "minor", suit: "wands", number: 4, roman: "4", symbol: "🔥", element: "火",
    keywords: ["庆祝", "稳定", "归属"],
    upright: "值得庆祝的时刻！一个里程碑已经达成，找到归属感与安全感。家庭聚会、乔迁或完成阶段的喜悦。",
    reversed: "缺乏稳定感或庆祝被打断。可能需要更多时间才能扎根，或在家与工作之间寻找平衡。" },

  { id: 26, name: "权杖五", englishName: "Five of Wands", arcana: "minor", suit: "wands", number: 5, roman: "5", symbol: "🔥", element: "火",
    keywords: ["竞争", "冲突", "磨练"],
    upright: "多方竞争与意见冲突的场景。虽然混乱，但良性竞争能激发成长。在碰撞中找到自己的立场与优势。",
    reversed: "冲突缓解或避免对抗。可能选择回避争端，但也需要直面问题才能达成真正的和谐。" },

  { id: 27, name: "权杖六", englishName: "Six of Wands", arcana: "minor", suit: "wands", number: 6, roman: "6", symbol: "🔥", element: "火",
    keywords: ["胜利", "认可", "荣耀"],
    upright: "胜利的桂冠！你的努力得到认可与赞赏。自信与荣耀伴随而来，这是享受成就感并继续前行的时刻。",
    reversed: "认可延迟或缺乏自信。可能感到努力未被发现，或害怕成功带来的关注。相信自己的价值。" },

  { id: 28, name: "权杖七", englishName: "Seven of Wands", arcana: "minor", suit: "wands", number: 7, roman: "7", symbol: "🔥", element: "火",
    keywords: ["防御", "坚持", "捍卫立场"],
    upright: "面对多方压力需要坚定立场。竞争者或反对者虽多，但你有优势位置。捍卫你的信念，不要退缩。",
    reversed: "力不从心或放弃抵抗。可能感到被压倒，需要重新评估是否值得继续这场争斗。" },

  { id: 29, name: "权杖八", englishName: "Eight of Wands", arcana: "minor", suit: "wands", number: 8, roman: "8", symbol: "🔥", element: "火",
    keywords: ["速度", "进展", "消息"],
    upright: "事情突然加速！等待已久的事情快速推进，好消息或重要信息即将到来。抓住这股势头，顺势而行。",
    reversed: "延迟或阻碍打断了节奏。需要更多耐心，或重新梳理优先级以恢复流畅的进展。" },

  { id: 30, name: "权杖九", englishName: "Nine of Wands", arcana: "minor", suit: "wands", number: 9, roman: "9", symbol: "🔥", element: "火",
    keywords: ["坚韧", "警觉", "最后坚持"],
    upright: "已经走了很远，虽然疲惫但不能放弃。最后的考验就在眼前，保持坚韧与警觉，胜利近在咫尺。",
    reversed: "精疲力竭或过度防御。可能因害怕受伤而筑起过高的墙，需要学会放下戒备，适当休息。" },

  { id: 31, name: "权杖十", englishName: "Ten of Wands", arcana: "minor", suit: "wands", number: 10, roman: "10", symbol: "🔥", element: "火",
    keywords: ["重担", "压力", "接近终点"],
    upright: "承担了太多责任与重担。虽然接近完成，但压力让你喘不过气。学会委派与放下不必要的东西。",
    reversed: "放下重担或从压力中解脱。开始学会说不，或将责任分担出去。解脱的时刻即将到来。" },

  { id: 32, name: "权杖侍从", englishName: "Page of Wands", arcana: "minor", suit: "wands", number: 11, roman: "P", symbol: "🔥", element: "火",
    keywords: ["探索", "热情新人", "好奇心"],
    upright: "充满好奇心与探索欲的新人形象。对新的冒险跃跃欲试，虽然经验不足但热情满满。勇敢探索未知。",
    reversed: "三分钟热度或缺乏方向。热情来得快去得也快，需要找到能持续激励自己的目标。" },

  { id: 33, name: "权杖骑士", englishName: "Knight of Wands", arcana: "minor", suit: "wands", number: 12, roman: "K", symbol: "🔥", element: "火",
    keywords: ["行动", "冒险", "冲劲"],
    upright: "充满冲劲与行动力的冒险者。大胆追求目标，不惧风险。热情驱动一切，勇往直前的能量。",
    reversed: "冲动鲁莽或方向混乱。行动虽快但缺乏计划，可能四处出击却难以达成目标。" },

  { id: 34, name: "权杖王后", englishName: "Queen of Wands", arcana: "minor", suit: "wands", number: 13, roman: "Q", symbol: "🔥", element: "火",
    keywords: ["自信", "魅力", "领导"],
    upright: "充满魅力与自信的女性力量。温暖而坚定，善于激励他人。以热情与魄力领导，在自己的领域中闪闪发光。",
    reversed: "嫉妒或过度强势。可能因控制欲或不安全感而影响了人际关系，需要回归内在的自信。" },

  { id: 35, name: "权杖国王", englishName: "King of Wands", arcana: "minor", suit: "wands", number: 14, roman: "K", symbol: "🔥", element: "火",
    keywords: ["领导", "远见", "果断"],
    upright: "具有远见与魄力的领袖。以明确的愿景和果断的行动引领方向。善于激发团队，将创意转化为现实。",
    reversed: "专横或冲动决策。可能因过于强势而疏远他人，或在不了解全局的情况下贸然行动。" },

  // ===== 小阿尔卡那 - 圣杯 Cups (36-49) =====
  { id: 36, name: "圣杯一", englishName: "Ace of Cups", arcana: "minor", suit: "cups", number: 1, roman: "1", symbol: "💧", element: "水",
    keywords: ["情感新生", "爱", "直觉开启"],
    upright: "情感的泉源涌出，新的关系或深层感受正在觉醒。心轮打开，爱与慈悲流动。一段充满情感丰盛的时期。",
    reversed: "情感阻塞或压抑感受。可能因为害怕受伤而关闭心扉，需要给予自己安全的空间来感受。" },

  { id: 37, name: "圣杯二", englishName: "Two of Cups", arcana: "minor", suit: "cups", number: 2, roman: "2", symbol: "💧", element: "水",
    keywords: ["契合", "伙伴关系", "互相吸引"],
    upright: "两个人之间的深层连接与互相吸引。无论是爱情还是友谊，这是灵魂层面的共鸣。平等与尊重的伙伴关系。",
    reversed: "关系失衡或分离。可能因价值观差异而产生裂痕，需要重新沟通与调整。" },

  { id: 38, name: "圣杯三", englishName: "Three of Cups", arcana: "minor", suit: "cups", number: 3, roman: "3", symbol: "💧", element: "水",
    keywords: ["友谊", "庆祝", "共享"],
    upright: "友谊的欢聚与庆祝时刻。与朋友分享喜悦，在社交中找到归属感。轻松愉快的能量，享受人际关系的温暖。",
    reversed: "社交疲劳或友谊中的误解。可能因过度社交而疲惫，或朋友之间存在暗流，需要适度保持空间。" },

  { id: 39, name: "圣杯四", englishName: "Four of Cups", arcana: "minor", suit: "cups", number: 4, roman: "4", symbol: "💧", element: "水",
    keywords: ["倦怠", "冷漠", "新机会被忽视"],
    upright: "对眼前的事物感到倦怠或不满。新的机会正在呈现，但你可能因心不在焉而错过。需要重新审视自己的态度。",
    reversed: "从冷漠中觉醒或抓住新机会。开始注意到之前被忽视的选项，重新找回对生活的热情。" },

  { id: 40, name: "圣杯五", englishName: "Five of Cups", arcana: "minor", suit: "cups", number: 5, roman: "5", symbol: "💧", element: "水",
    keywords: ["失落", "悲伤", "剩余的希望"],
    upright: "为失去感到悲伤与遗憾。但回头看看，并非全部失去——还有剩余的美好值得珍惜。允许自己哀悼，然后向前看。",
    reversed: "从悲伤中恢复或接受现实。开始专注于仍然拥有的，找到前行的力量与新的希望。" },

  { id: 41, name: "圣杯六", englishName: "Six of Cups", arcana: "minor", suit: "cups", number: 6, roman: "6", symbol: "💧", element: "水",
    keywords: ["怀旧", "纯真", "童年记忆"],
    upright: "温暖的回忆与怀旧之情。童年的纯真或旧友的重逢。从过去找到力量与安慰，但也不要沉溺其中。",
    reversed: "放下过去或过度沉溺回忆。可能需要从怀旧中走出来，面对当下的现实与未来的可能。" },

  { id: 42, name: "圣杯七", englishName: "Seven of Cups", arcana: "minor", suit: "cups", number: 7, roman: "7", symbol: "💧", element: "水",
    keywords: ["幻想", "选择", "迷惑"],
    upright: "面对众多选择感到迷惑。幻象与现实交织，难以分辨真伪。需要拨开迷雾，理性分析每个选项的真实价值。",
    reversed: "看清现实或做出明确选择。从迷惑中清醒，分辨幻想与真实，做出清醒的决定。" },

  { id: 43, name: "圣杯八", englishName: "Eight of Cups", arcana: "minor", suit: "cups", number: 8, roman: "8", symbol: "💧", element: "水",
    keywords: ["离开", "寻找更深意义", "放下"],
    upright: "主动离开不再满足你的情境。虽然已完成但不满足，追寻更深层的意义。勇敢的放下，踏上内在探索之旅。",
    reversed: "犹豫不决或逃避现实。想离开却缺乏勇气，或在多个选择间徘徊。需要明确自己真正想要什么。" },

  { id: 44, name: "圣杯九", englishName: "Nine of Cups", arcana: "minor", suit: "cups", number: 9, roman: "9", symbol: "💧", element: "水",
    keywords: ["满足", "幸福", "愿望成真"],
    upright: "心满意足的愿望之牌！情感与物质的双重满足。享受生活的美好，你的愿望正在实现。这是幸福与满足的时刻。",
    reversed: "过度放纵或表面满足。可能沉迷于享乐而忽略了更深的需求，需要找到真正的内心满足。" },

  { id: 45, name: "圣杯十", englishName: "Ten of Cups", arcana: "minor", suit: "cups", number: 10, roman: "10", symbol: "💧", element: "水",
    keywords: ["家庭幸福", "和谐", "永恒之爱"],
    upright: "终极的情感幸福！家庭和睦、关系和谐、爱意满溢。这是心灵归属与深层满足的时刻，享受这份圆满。",
    reversed: "家庭矛盾或表面的和谐。可能在外人看来完美但内在有裂痕，需要诚实面对关系中的问题。" },

  { id: 46, name: "圣杯侍从", englishName: "Page of Cups", arcana: "minor", suit: "cups", number: 11, roman: "P", symbol: "💧", element: "水",
    keywords: ["直觉萌芽", "浪漫", "消息"],
    upright: "直觉与创意的萌芽，带着纯真的情感好奇心。可能收到意想不到的情感消息或灵感的启示。保持开放的心态。",
    reversed: "情感不成熟或过度敏感。可能因小事而情绪波动，需要学会以更成熟的方式处理感受。" },

  { id: 47, name: "圣杯骑士", englishName: "Knight of Cups", arcana: "minor", suit: "cups", number: 12, roman: "K", symbol: "💧", element: "水",
    keywords: ["浪漫", "追求", "邀请"],
    upright: "带着浪漫与理想主义前行的骑士。可能收到一份邀请或提议，以温柔的方式追求目标。跟随心的指引。",
    reversed: "不切实际的幻想或情绪化。可能被浪漫想象蒙蔽，或因情绪起伏而行动反复，需要脚踏实地。" },

  { id: 48, name: "圣杯王后", englishName: "Queen of Cups", arcana: "minor", suit: "cups", number: 13, roman: "Q", symbol: "💧", element: "水",
    keywords: ["共情", "温柔", "直觉敏锐"],
    upright: "深具共情力与直觉的女性能量。温柔地倾听与理解他人，能在情感海洋中保持平静。以慈悲之心待人接物。",
    reversed: "情绪泛滥或过度依赖。可能被他人的情绪所淹没，或失去自我边界，需要找回情感的平衡。" },

  { id: 49, name: "圣杯国王", englishName: "King of Cups", arcana: "minor", suit: "cups", number: 14, roman: "K", symbol: "💧", element: "水",
    keywords: ["情感成熟", "平静", "智慧"],
    upright: "情感掌控的典范。在波涛中保持冷静与平衡，以智慧与同理心理解他人。情感的力量被善加引导。",
    reversed: "情绪压抑或操控他人。可能看似平静实则暗流涌动，或利用情感操控关系，需要诚实面对自己的感受。" },

  // ===== 小阿尔卡那 - 宝剑 Swords (50-63) =====
  { id: 50, name: "宝剑一", englishName: "Ace of Swords", arcana: "minor", suit: "swords", number: 1, roman: "1", symbol: "🌬️", element: "风",
    keywords: ["清晰", "突破", "真相"],
    upright: "思维突破与真相的利剑。迷雾被斩断，清晰的洞察力降临。是做出果断决定或获得重要领悟的时刻。",
    reversed: "混乱或错误判断。可能被错误信息误导，或思维陷入混乱，需要等待更多信息的浮现。" },

  { id: 51, name: "宝剑二", englishName: "Two of Swords", arcana: "minor", suit: "swords", number: 2, roman: "2", symbol: "🌬️", element: "风",
    keywords: ["僵局", "逃避决定", "平衡"],
    upright: "面临两难抉择而选择回避。蒙眼坐在交叉的剑前，内心的矛盾导致僵局。摘下眼罩，面对真相才能打破困局。",
    reversed: "做出决定或僵局打破。终于愿意面对被回避的问题，信息逐渐明朗，选择变得清晰。" },

  { id: 52, name: "宝剑三", englishName: "Three of Swords", arcana: "minor", suit: "swords", number: 3, roman: "3", symbol: "🌬️", element: "风",
    keywords: ["心碎", "悲伤", "痛苦的真相"],
    upright: "心灵受到刺伤，痛苦的真相或分离带来悲伤。允许自己感受这份痛苦，因为疗愈始于承认伤痛。这是暂时的。",
    reversed: "从心碎中恢复或原谅。痛苦正在消退，开始愈合与重建。释放过去的伤害，让心重新打开。" },

  { id: 53, name: "宝剑四", englishName: "Four of Swords", arcana: "minor", suit: "swords", number: 4, roman: "4", symbol: "🌬️", element: "风",
    keywords: ["休息", "恢复", "沉思"],
    upright: "需要暂停与休息的时刻。从纷争中退出来，给身心恢复的空间。这不是放弃而是必要的充电与沉思。",
    reversed: "休息结束或不愿面对现实。可能已经准备好重新出发，或过度逃避需要被唤醒。" },

  { id: 54, name: "宝剑五", englishName: "Five of Swords", arcana: "minor", suit: "swords", number: 5, roman: "5", symbol: "🌬️", element: "风",
    keywords: ["冲突", "得失", "空洞的胜利"],
    upright: "一场没有真正赢家的冲突。即使赢了也失去了更多——关系、尊重或内心的平静。反思什么才是真正值得争取的。",
    reversed: "和解或放下争斗。开始意识到冲突的代价太高，选择妥协与和解，从对峙中走出来。" },

  { id: 55, name: "宝剑六", englishName: "Six of Swords", arcana: "minor", suit: "swords", number: 6, roman: "6", symbol: "🌬️", element: "风",
    keywords: ["过渡", "远离困境", "逐渐恢复"],
    upright: "正从困难中过渡到更好的境地。虽然带着伤痕，但已经驶向平静的水域。疗愈需要时间，但方向是正确的。",
    reversed: "过渡受阻或无法放下过去。可能还在原地徘徊，或旧的模式再次浮现。需要更彻底地放下。" },

  { id: 56, name: "宝剑七", englishName: "Seven of Swords", arcana: "minor", suit: "swords", number: 7, roman: "7", symbol: "🌬️", element: "风",
    keywords: ["策略", "暗中行事", "谨慎"],
    upright: "以策略与智慧应对局面。可能需要低调行事或寻找非常规的解决方案。但注意不要越过诚信的底线。",
    reversed: "秘密暴露或回归正道。隐藏的事物浮出水面，或决定以坦诚的方式处理局面。是时候面对真相。" },

  { id: 57, name: "宝剑八", englishName: "Eight of Swords", arcana: "minor", suit: "swords", number: 8, roman: "8", symbol: "🌬️", element: "风",
    keywords: ["受限", "自我束缚", "恐惧"],
    upright: "感到被困住，但束缚多半来自自己的恐惧与信念。仔细看看，绑绳其实是松的——你有能力自由，只需迈出那一步。",
    reversed: "挣脱束缚或视角转变。开始意识到限制是自己制造的，勇敢迈出第一步，自由的出口就在眼前。" },

  { id: 58, name: "宝剑九", englishName: "Nine of Swords", arcana: "minor", suit: "swords", number: 9, roman: "9", symbol: "🌬️", element: "风",
    keywords: ["焦虑", "噩梦", "过度担忧"],
    upright: "深夜的焦虑与恐惧。担忧的事情往往被放大了，实际的危险远比想象中小。黎明即将来临， fears will fade in daylight.",
    reversed: "从焦虑中恢复或面对恐惧。开始理性看待担忧的来源，发现实际情况没有想象中那么可怕。" },

  { id: 59, name: "宝剑十", englishName: "Ten of Swords", arcana: "minor", suit: "swords", number: 10, roman: "10", symbol: "🌬️", element: "风",
    keywords: ["终结", "谷底", "黎明前"],
    upright: "最痛苦的结束，但也是最彻底的释放。已经到达谷底，唯一的方向是向上了。旧篇章彻底结束，新篇章即将开始。",
    reversed: "从谷底恢复或避免最坏情况。正在慢慢疗愈，最艰难的时期已经过去，重建的道路在脚下展开。" },

  { id: 60, name: "宝剑侍从", englishName: "Page of Swords", arcana: "minor", suit: "swords", number: 11, roman: "P", symbol: "🌬️", element: "风",
    keywords: ["好奇", "警觉", "新想法"],
    upright: "充满求知欲与好奇心的学习者。敏锐地观察周围，渴望获取新知识与信息。保持这份求知的热忱。",
    reversed: "过于好奇或沟通不当。可能因窥探他人隐私或言语不当而引起麻烦，需要注意沟通的方式。" },

  { id: 61, name: "宝剑骑士", englishName: "Knight of Swords", arcana: "minor", suit: "swords", number: 12, roman: "K", symbol: "🌬️", element: "风",
    keywords: ["果断", "直率", "快速行动"],
    upright: "以迅猛的行动直冲目标。果敢而直接，不留犹豫。适合需要快速决策与执行的时机，但要注意不要伤及他人。",
    reversed: "鲁莽或攻击性过强。行动虽快但缺乏考虑，可能因言语犀利或冲动而引发冲突。" },

  { id: 62, name: "宝剑王后", englishName: "Queen of Swords", arcana: "minor", suit: "swords", number: 13, roman: "Q", symbol: "🌬️", element: "风",
    keywords: ["理性", "独立", "公正"],
    upright: "以理性与清晰的判断力著称的女性能量。独立而公正，善于在复杂局面中看清真相。以智慧与边界感守护自己与他人。",
    reversed: "冷酷或过于苛刻。可能因过度理性而忽略了情感，或以尖锐的言辞伤害他人，需要找回温度。" },

  { id: 63, name: "宝剑国王", englishName: "King of Swords", arcana: "minor", suit: "swords", number: 14, roman: "K", symbol: "🌬️", element: "风",
    keywords: ["权威", "理性", "公正判断"],
    upright: "以理性与公正著称的领袖。清晰的思维与坚定的原则，善于做出公正的判断与决策。以智慧引领方向。",
    reversed: "专断或不近人情。可能过于苛刻或利用权力压制他人，需要在理性与人情之间找到平衡。" },

  // ===== 小阿尔卡那 - 星币 Pentacles (64-77) =====
  { id: 64, name: "星币一", englishName: "Ace of Pentacles", arcana: "minor", suit: "pentacles", number: 1, roman: "1", symbol: "🌍", element: "土",
    keywords: ["丰盛", "新机遇", "物质基础"],
    upright: "一颗丰盛的种子已经种下。新的财务机会、工作或投资正在萌芽。好好培育这份礼物，它将带来长远的繁荣。",
    reversed: "错失机会或财务延迟。可能因犹豫而错过良机，或计划需要更多时间才能落地。不要急于求成。" },

  { id: 65, name: "星币二", englishName: "Two of Pentacles", arcana: "minor", suit: "pentacles", number: 2, roman: "2", symbol: "🌍", element: "土",
    keywords: ["平衡", "灵活", "多任务"],
    upright: "在多个责任之间灵活周旋。需要保持弹性与平衡，在有限的时间和资源中做出最优安排。节奏感是关键。",
    reversed: "失衡或过度负荷。可能因接了太多事情而难以兼顾，需要适当减负或重新排列优先级。" },

  { id: 66, name: "星币三", englishName: "Three of Pentacles", arcana: "minor", suit: "pentacles", number: 3, roman: "3", symbol: "🌍", element: "土",
    keywords: ["协作", "技能", "建设"],
    upright: "团队合作的力量。不同技能的组合创造出超越个体的成果。尊重每个人的专长，共同努力实现目标。",
    reversed: "合作不顺或技能不匹配。可能因意见分歧或能力不均而影响进展，需要重新协调团队关系。" },

  { id: 67, name: "星币四", englishName: "Four of Pentacles", arcana: "minor", suit: "pentacles", number: 4, roman: "4", symbol: "🌍", element: "土",
    keywords: ["守财", "安全", "控制"],
    upright: "紧握已拥有的东西，追求安全感。适度的储蓄是明智的，但过度紧抓可能限制了流动与成长。在安全与开放间找平衡。",
    reversed: "放手或过度挥霍。可能开始放松对资源的控制，或走向另一个极端——需要找到适度的消费观。" },

  { id: 68, name: "星币五", englishName: "Five of Pentacles", arcana: "minor", suit: "pentacles", number: 5, roman: "5", symbol: "🌍", element: "土",
    keywords: ["匮乏", "困境", "被排斥"],
    upright: "物质或精神上的匮乏感。感到被排斥在温暖之外，但帮助其实就在不远处——不要因为骄傲而不愿求助。",
    reversed: "从困境中恢复或找到援助。困难逐渐缓解，开始重新站稳脚跟。最艰难的时期已经过去。" },

  { id: 69, name: "星币六", englishName: "Six of Pentacles", arcana: "minor", suit: "pentacles", number: 6, roman: "6", symbol: "🌍", element: "土",
    keywords: ["慷慨", "给予与接受", "平衡"],
    upright: "慷慨的给予与接受。在丰盈与需要之间建立健康的流动。无论你是给予者还是接受者，都怀着感恩的心。",
    reversed: "不平等的给予或附带条件。可能帮助他人时有所图，或因欠人情而感到不安，需要审视给予的动机。" },

  { id: 70, name: "星币七", englishName: "Seven of Pentacles", arcana: "minor", suit: "pentacles", number: 7, roman: "7", symbol: "🌍", element: "土",
    keywords: ["耐心", "评估", "等待收获"],
    upright: "辛勤耕耘后的暂停与评估。种子已经种下，正在等待丰收。耐心是此刻的美德，审视进展并调整方向。",
    reversed: "缺乏耐心或回报不如预期。可能因看不到即时成果而沮丧，需要坚持或调整策略。" },

  { id: 71, name: "星币八", englishName: "Eight of Pentacles", arcana: "minor", suit: "pentacles", number: 8, roman: "8", symbol: "🌍", element: "土",
    keywords: ["专注", "精进", "匠心"],
    upright: "全身心投入精进与打磨的时刻。专注于提升技能，以匠人精神对待每一个细节。努力终将结出硕果。",
    reversed: "缺乏专注或技能不足。可能因心不在焉而影响质量，或需要更多练习才能达到期望的水平。" },

  { id: 72, name: "星币九", englishName: "Nine of Pentacles", arcana: "minor", suit: "pentacles", number: 9, roman: "9", symbol: "🌍", element: "土",
    keywords: ["富足", "独立", "享受成果"],
    upright: "享受自己亲手创造的丰盛与独立。不依赖他人，靠自己的努力获得了物质与精神的满足。为你的成就感到骄傲。",
    reversed: "过度追求物质或自给自足的表面下隐藏不安全感。需要审视真正的满足感来自哪里。" },

  { id: 73, name: "星币十", englishName: "Ten of Pentacles", arcana: "minor", suit: "pentacles", number: 10, roman: "10", symbol: "🌍", element: "土",
    keywords: ["传承", "家族", "长久财富"],
    upright: "长久的财富与家族的传承。不仅是物质上的丰盛，更是精神与价值的代际传递。根基深厚，世代繁荣。",
    reversed: "家族纠纷或财务问题。可能因遗产或家庭事务产生矛盾，需要以公正和长远的眼光处理。" },

  { id: 74, name: "星币侍从", englishName: "Page of Pentacles", arcana: "minor", suit: "pentacles", number: 11, roman: "P", symbol: "🌍", element: "土",
    keywords: ["学习", "务实", "新的开始"],
    upright: "带着求知欲踏实地学习的新人。对物质世界的运作充满好奇，愿意从头学起。稳扎稳打的学徒精神。",
    reversed: "缺乏进展或好高骛远。可能因不够踏实而影响学习，或对基础不耐烦，需要回归耐心。" },

  { id: 75, name: "星币骑士", englishName: "Knight of Pentacles", arcana: "minor", suit: "pentacles", number: 12, roman: "K", symbol: "🌍", element: "土",
    keywords: ["勤勉", "可靠", "稳步前进"],
    upright: "最可靠而勤勉的骑士。虽然速度不快，但从不偏离方向。以耐心和毅力一步步靠近目标，值得信赖。",
    reversed: "停滞或过于保守。可能因害怕变化而拒绝前进，或过度追求完美而拖延，需要适度灵活。" },

  { id: 76, name: "星币王后", englishName: "Queen of Pentacles", arcana: "minor", suit: "pentacles", number: 13, roman: "Q", symbol: "🌍", element: "土",
    keywords: ["滋养", "丰盛", "实际"],
    upright: "将丰盛与关爱结合的女性力量。既能创造物质安全，又懂得滋养心灵。在事业与家庭之间找到平衡的智慧。",
    reversed: "忽视自我或过度牺牲。可能在照顾他人的同时忘了照顾自己，或过度关注物质而忽略了情感需求。" },

  { id: 77, name: "星币国王", englishName: "King of Pentacles", arcana: "minor", suit: "pentacles", number: 14, roman: "K", symbol: "🌍", element: "土",
    keywords: ["成就", "稳重", "富足"],
    upright: "物质成就的巅峰象征。以稳健和远见创造了丰盈的生活，善于管理与投资。享受成果的同时也慷慨分享。",
    reversed: "贪婪或过度控制。可能因追求财富而忽略了生活的其他面向，或以金钱控制关系，需要找回平衡。" }
];

// 花色信息
const SUITS = {
  wands:     { name: "权杖", element: "火", symbol: "🔥", domain: "行动力、激情、创造力" },
  cups:      { name: "圣杯", element: "水", symbol: "💧", domain: "情感、关系、直觉" },
  swords:    { name: "宝剑", element: "风", symbol: "🌬️", domain: "思维、沟通、冲突" },
  pentacles: { name: "星币", element: "土", symbol: "🌍", domain: "物质、工作、财富" }
};

// 花色中文名映射
const SUIT_NAMES = {
  wands: "权杖",
  cups: "圣杯",
  swords: "宝剑",
  pentacles: "星币"
};

// 牌面朝向
const ORIENTATION = {
  UPRIGHT: "upright",
  REVERSED: "reversed"
};
