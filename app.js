// ============================================================
// 塔罗牌在线占卜 · 核心交互逻辑
// 功能：抽牌 / 翻牌 / 牌阵渲染 / 结果展示 / AI 解读
// ============================================================

// ===== AI API 配置 =====
const AI_CONFIG = {
  apiKey: 'sk-b168dcd71dee4847933e2fd1ed0c80db',
  baseUrl: 'https://api.deepseek.com/v1',
  model: 'deepseek-chat',
  timeout: 30000,
  useMockFallback: true
};

// ============ 全局状态 ============
const State = {
  currentPage: 'home',
  selectedSpread: null,
  drawMode: 'auto',        // 'auto' | 'manual'
  drawnCards: [],          // [{ card, orientation, position, flipped }]
  currentSlot: 0,         // 当前正在抽的位置索引
  isDrawing: false,
  sessionId: null,
  aiReading: null,
  aiLoading: false,
  manualDeck: [],         // 手动模式下的洗牌后牌堆 [{uid, card, orientation}]
  questionText: ''        // 求问者输入的问题文本
};

// ============ 首页今日推荐问题 ============

const DAILY_QUESTION_COUNT = 5;

function shuffleDailyQuestions() {
  const list = document.getElementById("daily-questions-list");
  if (!list) return;

  const shuffled = [...QUESTION_LIST];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  const picks = shuffled.slice(0, DAILY_QUESTION_COUNT);

  list.innerHTML = picks.map(q => `
    <div class="daily-question-item" onclick="onDailyQuestionClick('${q.id}')">
      <span class="daily-question-dot" style="background:${q.dotColor}"></span>
      <span class="daily-question-text">${q.question}</span>
      <span class="daily-question-arrow">›</span>
    </div>
  `).join("");
}

function onDailyQuestionClick(questionId) {
  const q = QUESTION_LIST.find(item => item.id === questionId);
  if (!q) return;

  const template = q.template.replace(/\{[^}]+\}/g, "____");
  State.questionText = template;

  if (q.matchedSpreads && q.matchedSpreads.length > 0) {
    selectSpread(q.matchedSpreads[0]);
  } else {
    selectSpread("time-flow");
  }

  navigateTo("draw");
}

function renderDailyQuestions() {
  shuffleDailyQuestions();
}
// ============ 工具函数 ============

// Fisher-Yates 洗牌
function shuffleDeck(deck) {
  const arr = [...deck];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// 随机决定正逆位（约 40% 逆位）
function randomOrientation() {
  return Math.random() < 0.4 ? 'reversed' : 'upright';
}

// 格式化日期
function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const h = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  return `${y}-${m}-${d} ${h}:${min}`;
}

// 生成会话 ID
function generateSessionId() {
  return 'tarot_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
}

// ============ 页面导航 ============

function navigateTo(pageId) {
  // 进入抽牌页但未选牌阵 → 回退到牌阵选择
  if (pageId === 'draw' && !State.selectedSpread) {
    pageId = 'spreads';
  }

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + pageId);
  if (target) {
    target.classList.add('active');
    State.currentPage = pageId;
    window.scrollTo(0, 0);
  }

  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === pageId);
  });

  // 首页 - 渲染今日推荐问题
  if (pageId === 'home') {
    renderDailyQuestions();
  }

  // 抽牌页需要重新渲染
  if (pageId === 'draw' && State.selectedSpread) {
    renderDrawPage();
  }

  // 常用问题页
  if (pageId === 'questions') {
    renderQuestionPage();
  }
}

// ============ 牌阵选择 ============

function renderSpreadSelection() {
  const grid = document.getElementById('spread-grid');
  if (!grid) return;

  grid.innerHTML = SPREADS.map(spread => `
    <div class="spread-card" data-spread-id="${spread.id}" onclick="selectSpread('${spread.id}')">
      <div class="spread-preview" id="preview-${spread.id}"></div>
      <div class="spread-card-name">${spread.name}</div>
      <div class="spread-card-en">${spread.englishName}</div>
      <div class="spread-card-desc">${spread.description}</div>
      <div class="spread-card-meta">
        <span>🎴 ${spread.cardCount} 张</span>
        <span>${spread.recommendedFor}</span>
      </div>
    </div>
  `).join('');

  SPREADS.forEach(spread => renderSpreadPreview(spread));
}

// 渲染牌阵预览图（迷你版）
function renderSpreadPreview(spread) {
  const container = document.getElementById('preview-' + spread.id);
  if (!container) return;

  // 根据牌数决定缩放比例，确保所有牌都在预览区域内
  const baseScale = spread.cardCount > 7 ? 0.55 : spread.cardCount > 4 ? 0.7 : 0.85;

  container.innerHTML = spread.positions.map(pos => {
    // 将 0-10 的坐标映射到预览区域内，留边距避免越界
    // 映射到 15%-85% 范围（留15%边距）
    const left = 15 + (pos.x / 10) * 70;
    const top = 12 + (pos.y / 10) * 76;
    const rotate = pos.rotated ? 'rotate(90deg)' : '';
    const overlay = pos.overlay ? 'opacity:0.75;z-index:2;' : '';
    const transform = `translate(-50%, -50%) ${rotate} scale(${baseScale})`;

    return `<div class="mini-card" style="left:${left}%;top:${top}%;transform:${transform};${overlay}"></div>`;
  }).join('');
}

function selectSpread(spreadId) {
  State.selectedSpread = getSpreadById(spreadId);
  State.drawnCards = [];
  State.currentSlot = 0;
  State.aiReading = null;
  State.fanStartIndex = 0;

  // 初始化手动模式牌堆：洗牌 + 随机正逆位
  const shuffled = shuffleDeck([...TAROT_DECK]);
  State.manualDeck = shuffled.map((card, idx) => ({
    uid: 'm_' + idx + '_' + card.id,
    card: card,
    orientation: randomOrientation()
  }));

  document.querySelectorAll('.spread-card').forEach(c => {
    c.classList.toggle('selected', c.dataset.spreadId === spreadId);
  });

  setTimeout(() => {
    navigateTo('draw');
    renderDrawPage();
  }, 300);
}

// ============ 抽牌页面 ============

// 首页快速占卜：直接输入问题，使用三张时间流牌阵
function quickStartDivination() {
  const inputEl = document.getElementById('home-question-input');
  const question = inputEl ? inputEl.value.trim() : '';

  State.questionText = question;

  // 使用三张时间流作为默认牌阵
  selectSpread('time-flow');

  // 跳转到抽牌页
  navigateTo('draw');
}

function renderDrawPage() {
  const spread = State.selectedSpread;
  if (!spread) {
    navigateTo('spreads');
    return;
  }

  document.getElementById('draw-spread-name').textContent = spread.name;
  document.getElementById('draw-spread-desc').textContent = spread.description;

  // 渲染牌阵槽位
  renderSpreadCanvas();

  // 渲染抽牌进度
  renderDrawProgress();

  // 设置模式
  setDrawMode(State.drawMode);

  // 渲染牌堆
  renderDrawDeck();

  // 填充问题输入框（从首页快速占卜或常用问题带入）
  const questionInput = document.getElementById('question-input');
  const questionCount = document.getElementById('question-count');
  if (questionInput && State.questionText) {
    questionInput.value = State.questionText;
    if (questionCount) questionCount.textContent = State.questionText.length;
  }
}

function renderSpreadCanvas() {
  const canvas = document.getElementById('spread-canvas');
  const spread = State.selectedSpread;
  if (!canvas || !spread) return;

  const isLarge = spread.cardCount > 6;
  const cardScale = isLarge ? 0.7 : 0.9;

  canvas.innerHTML = spread.positions.map((pos, i) => {
    // 坐标映射到画布安全区域内
    const left = 12 + (pos.x / 10) * 76;
    const top = 10 + (pos.y / 10) * 72;
    const rotate = pos.rotated ? 'rotate(90deg)' : '';
    const card = State.drawnCards[i];

    // 底部的牌，标签放上方
    const labelOnTop = pos.y > 6.5;
    const labelStyle = labelOnTop ? 'bottom:auto;top:-28px;' : '';

    let content;
    if (card) {
      content = renderTarotCard(card, i, true);
    } else {
      content = `<div class="card-slot-empty"><span class="card-slot-empty-icon">✦</span></div>`;
    }

    return `
      <div class="card-slot" style="left:${left}%;top:${top}%;transform:translate(-50%,-50%) ${rotate} scale(${cardScale});">
        ${content}
        <div class="card-slot-label" style="${labelStyle}">${pos.name}</div>
      </div>
    `;
  }).join('');
}

function renderDrawProgress() {
  const spread = State.selectedSpread;
  if (!spread) return;

  const dots = Array.from({ length: spread.cardCount }, (_, i) => {
    let cls = 'progress-dot';
    if (i < State.currentSlot) cls += ' filled';
    if (i === State.currentSlot) cls += ' current';
    return `<span class="${cls}"></span>`;
  }).join('');

  document.getElementById('draw-progress-text').textContent =
    `${State.currentSlot} / ${spread.cardCount}`;
  document.getElementById('progress-dots').innerHTML = dots;
}

function renderDrawDeck() {
  const deckEl = document.getElementById('draw-deck');
  if (!deckEl) return;

  const remaining = State.selectedSpread.cardCount - State.currentSlot;
  if (remaining <= 0) {
    deckEl.innerHTML = '';
    document.getElementById('draw-action-btn').textContent = '查看解读结果';
    document.getElementById('draw-action-btn').classList.add('btn-primary');
    return;
  }

  const deckCount = Math.min(3, remaining);
  let html = '';
  for (let i = 0; i < deckCount; i++) {
    html += `<div class="tarot-card ${State.drawMode === 'manual' ? 'selectable' : ''}" onclick="onDeckClick()">
      <div class="tarot-card-inner">
        <div class="tarot-card-back">
          <span class="tarot-card-back-symbol">✦</span>
        </div>
      </div>
    </div>`;
  }
  deckEl.innerHTML = html;
}

// 问题输入
function onQuestionInput() {
  const inputEl = document.getElementById('question-input');
  const countEl = document.getElementById('question-count');
  if (inputEl) {
    State.questionText = inputEl.value.trim();
    if (countEl) countEl.textContent = inputEl.value.length;
  }
}

// 从常用问题进入时自动填充问题
function setQuestionFromTemplate(questionObj) {
  const inputEl = document.getElementById('question-input');
  const countEl = document.getElementById('question-count');
  if (inputEl && questionObj) {
    // 使用模板但替换占位符为空白提示
    const text = questionObj.template.replace(/\{[^}]+\}/g, '____');
    inputEl.value = text;
    State.questionText = text;
    if (countEl) countEl.textContent = text.length;
  }
}

function setDrawMode(mode) {
  State.drawMode = mode;
  document.querySelectorAll('.draw-mode-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.mode === mode);
  });

  const fanDeck = document.getElementById('fan-deck');
  const deckEl = document.getElementById('draw-deck');
  const actionBtn = document.getElementById('draw-action-btn');

  if (mode === 'manual') {
    if (fanDeck) fanDeck.classList.remove('hidden');
    if (deckEl) deckEl.classList.add('hidden');
    renderFanDeck();
    if (actionBtn) {
      const remaining = State.selectedSpread.cardCount - State.currentSlot;
      if (remaining <= 0) {
        actionBtn.textContent = '查看解读结果';
        actionBtn.classList.add('btn-primary');
        actionBtn.disabled = false;
      } else {
        actionBtn.textContent = '点击牌堆中的牌进行选择';
        actionBtn.disabled = false;
      }
    }
  } else {
    if (fanDeck) fanDeck.classList.add('hidden');
    if (deckEl) deckEl.classList.remove('hidden');
    renderDrawDeck();
    if (actionBtn) {
      actionBtn.textContent = State.currentSlot < State.selectedSpread.cardCount ? '抽一张牌' : '查看解读结果';
      actionBtn.disabled = false;
    }
  }
}

// 手动模式牌堆 — 15张扇形叠放，连续平滑轮换
const FAN_VISIBLE = 15;
const FAN_TOTAL_ANGLE = 120;
const FAN_RADIUS = 520;
const FAN_TRANSITION_MS = 320;
State.fanStartIndex = 0;
State.fanIsSliding = false;

function getFanAngle(slot) {
  const step = FAN_TOTAL_ANGLE / (FAN_VISIBLE - 1);
  return -FAN_TOTAL_ANGLE / 2 + slot * step;
}

function renderFanDeck() {
  const fanDeck = document.getElementById('fan-deck');
  if (!fanDeck) return;

  const remaining = State.selectedSpread.cardCount - State.currentSlot;
  if (remaining <= 0) {
    fanDeck.innerHTML = '<p class="text-muted text-center" style="margin:auto;">所有牌已抽取完毕</p>';
    return;
  }

  const deck = State.manualDeck;
  if (deck.length === 0) {
    fanDeck.innerHTML = '<p class="text-muted text-center" style="margin:auto;">牌堆已空</p>';
    return;
  }

  if (State.fanStartIndex === undefined) State.fanStartIndex = 0;
  if (State.fanStartIndex >= deck.length) State.fanStartIndex = 0;
  State.fanIsSliding = false;

  const canSlide = deck.length > FAN_VISIBLE;

  const cardsHtml = [];
  for (let slot = 0; slot < FAN_VISIBLE; slot++) {
    const deckIdx = (State.fanStartIndex + slot) % deck.length;
    const item = deck[deckIdx];
    const angle = getFanAngle(slot);
    cardsHtml.push(`
      <div class="fan-card-item" data-slot="${slot}" data-uid="${item.uid}"
           style="transform: rotate(${angle}deg); --radius: ${FAN_RADIUS}px; --i: ${slot};"
           onclick="onFanCardClick('${item.uid}')">
        <div class="tarot-card selectable">
          <div class="tarot-card-inner">
            <div class="tarot-card-back">
              <span class="tarot-card-back-symbol">✦</span>
            </div>
          </div>
        </div>
      </div>
    `);
  }

  fanDeck.innerHTML = `
    <div class="fan-deck-container">
      <button class="fan-nav-btn fan-nav-prev ${!canSlide ? 'disabled' : ''}"
              onclick="fanSlideLeft()" ${!canSlide ? 'disabled' : ''}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="fan-deck-stage" id="fan-deck-stage">
        <div class="fan-arc" style="--radius: ${FAN_RADIUS}px;">
          ${cardsHtml.join('')}
        </div>
      </div>
      <button class="fan-nav-btn fan-nav-next ${!canSlide ? 'disabled' : ''}"
              onclick="fanSlideRight()" ${!canSlide ? 'disabled' : ''}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
    </div>
    <div class="fan-deck-hint">
      <span>剩余 ${deck.length} 张</span>
      <span class="fan-deck-hint-sub">← 左右滑动轮换浏览 →</span>
    </div>
  `;

  initFanSwipe();
}

function fanSlideRight() {
  if (State.fanIsSliding) return;
  const deck = State.manualDeck;
  if (deck.length <= FAN_VISIBLE) return;

  State.fanIsSliding = true;
  const leftmostCard = document.querySelector('.fan-card-item[data-slot="0"]');

  // Phase 1: Shift all cards left by 1 slot (smooth transition)
  document.querySelectorAll('.fan-card-item').forEach(card => {
    const oldSlot = parseInt(card.dataset.slot);
    const newSlot = oldSlot - 1;
    card.dataset.slot = newSlot;
    card.style.setProperty('--i', newSlot);
    card.style.transform = `rotate(${getFanAngle(newSlot)}deg)`;
  });

  // Phase 2 (after transition): teleport leftmost card to right end with new data
  setTimeout(() => {
    State.fanStartIndex = (State.fanStartIndex + 1) % deck.length;

    leftmostCard.dataset.slot = FAN_VISIBLE - 1;
    leftmostCard.style.setProperty('--i', FAN_VISIBLE - 1);
    leftmostCard.style.transition = 'none';
    leftmostCard.style.transform = `rotate(${getFanAngle(FAN_VISIBLE - 1)}deg)`;

    // 恢复可见性（回收已抽走的隐藏元素）
    leftmostCard.classList.remove('picked', 'fan-picked-gone');
    leftmostCard.style.opacity = '';
    leftmostCard.style.pointerEvents = '';

    const deckIdx = (State.fanStartIndex + FAN_VISIBLE - 1) % deck.length;
    const newItem = deck[deckIdx];
    leftmostCard.setAttribute('data-uid', newItem.uid);
    leftmostCard.setAttribute('onclick', `onFanCardClick('${newItem.uid}')`);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        leftmostCard.style.transition = '';
        State.fanIsSliding = false;
      });
    });
  }, FAN_TRANSITION_MS);
}

function fanSlideLeft() {
  if (State.fanIsSliding) return;
  const deck = State.manualDeck;
  if (deck.length <= FAN_VISIBLE) return;

  State.fanIsSliding = true;
  const rightmostCard = document.querySelector(`.fan-card-item[data-slot="${FAN_VISIBLE - 1}"]`);

  // Phase 1: Shift all cards right by 1 slot (smooth transition)
  document.querySelectorAll('.fan-card-item').forEach(card => {
    const oldSlot = parseInt(card.dataset.slot);
    const newSlot = oldSlot + 1;
    card.dataset.slot = newSlot;
    card.style.setProperty('--i', newSlot);
    card.style.transform = `rotate(${getFanAngle(newSlot)}deg)`;
  });

  // Phase 2 (after transition): teleport rightmost card to left end with new data
  setTimeout(() => {
    State.fanStartIndex = (State.fanStartIndex - 1 + deck.length) % deck.length;

    rightmostCard.dataset.slot = 0;
    rightmostCard.style.setProperty('--i', 0);
    rightmostCard.style.transition = 'none';
    rightmostCard.style.transform = `rotate(${getFanAngle(0)}deg)`;

    // 恢复可见性（回收已抽走的隐藏元素）
    rightmostCard.classList.remove('picked', 'fan-picked-gone');
    rightmostCard.style.opacity = '';
    rightmostCard.style.pointerEvents = '';

    const newItem = deck[State.fanStartIndex % deck.length];
    rightmostCard.setAttribute('data-uid', newItem.uid);
    rightmostCard.setAttribute('onclick', `onFanCardClick('${newItem.uid}')`);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        rightmostCard.style.transition = '';
        State.fanIsSliding = false;
      });
    });
  }, FAN_TRANSITION_MS);
}

// 手势滑动（触摸 + 鼠标拖拽）
function initFanSwipe() {
  const stage = document.getElementById('fan-deck-stage');
  if (!stage) return;

  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  let moved = false;

  function onDragStart(x) {
    startX = x;
    currentX = x;
    isDragging = true;
    moved = false;
  }

  function onDragMove(x) {
    if (!isDragging) return;
    currentX = x;
    if (Math.abs(x - startX) > 5) moved = true;
  }

  function onDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    const dx = currentX - startX;
    if (Math.abs(dx) > 30) {
      moved = true;
      if (dx > 0) fanSlideLeft();
      else fanSlideRight();
    }
  }

  stage.addEventListener('touchstart', (e) => {
    onDragStart(e.touches[0].pageX);
  }, { passive: true });

  stage.addEventListener('touchmove', (e) => {
    onDragMove(e.touches[0].pageX);
  }, { passive: true });

  stage.addEventListener('touchend', () => onDragEnd());

  stage.addEventListener('mousedown', (e) => {
    onDragStart(e.pageX);
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => onDragMove(e.pageX));
  document.addEventListener('mouseup', () => onDragEnd());

  stage.addEventListener('click', (e) => {
    if (moved) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);
}


function onFanCardClick(uid) {
  if (State.isDrawing) return;
  if (State.fanIsSliding) return;
  const spread = State.selectedSpread;
  if (!spread || State.currentSlot >= spread.cardCount) return;

  const cardIndex = State.manualDeck.findIndex(item => item.uid === uid);
  if (cardIndex === -1) return;

  const selectedItem = State.manualDeck[cardIndex];

  const cardEl = document.querySelector(`.fan-card-item[data-uid="${uid}"]`);
  if (cardEl) {
    cardEl.classList.add('picked');
  }

  State.isDrawing = true;

  State.manualDeck.splice(cardIndex, 1);

  const cardData = {
    card: selectedItem.card,
    orientation: selectedItem.orientation,
    position: spread.positions[State.currentSlot],
    flipped: false
  };

  State.drawnCards.push(cardData);

  setTimeout(() => {
    State.currentSlot++;
    State.isDrawing = false;

    // 隐藏被抽走的牌，保留缺口，不重新渲染
    if (cardEl) {
      cardEl.style.opacity = '0';
      cardEl.style.pointerEvents = 'none';
      cardEl.classList.add('fan-picked-gone');
    }

    // 更新剩余张数
    const hintEl = document.querySelector('.fan-deck-hint span');
    if (hintEl) hintEl.textContent = `剩余 ${State.manualDeck.length} 张`;

    renderSpreadCanvas();
    renderDrawProgress();

    const actionBtn = document.getElementById('draw-action-btn');
    if (actionBtn) {
      if (State.currentSlot >= spread.cardCount) {
        actionBtn.textContent = '查看解读结果';
        actionBtn.classList.add('btn-primary');
        actionBtn.disabled = false;
      }
    }
  }, 500);
}

// ============ 抽牌逻辑 ============

function onDeckClick() {
  if (State.drawMode === 'manual') return;
  drawCardForSlot();
}

function drawCardForSlot(fanIndex) {
  const spread = State.selectedSpread;
  if (!spread) return;
  if (State.currentSlot >= spread.cardCount) return;
  if (State.isDrawing) return;

  State.isDrawing = true;

  // 从剩余牌中随机抽取
  const usedIds = State.drawnCards.map(d => d.card.id);
  const available = TAROT_DECK.filter(c => !usedIds.includes(c.id));
  const drawnCard = available[Math.floor(Math.random() * available.length)];
  const orientation = randomOrientation();

  const cardData = {
    card: drawnCard,
    orientation: orientation,
    position: spread.positions[State.currentSlot],
    flipped: false
  };

  State.drawnCards.push(cardData);

  // 动画延迟后更新 UI
  setTimeout(() => {
    State.currentSlot++;
    State.isDrawing = false;

    renderSpreadCanvas();
    renderDrawProgress();

    if (State.drawMode === 'manual') {
      renderFanDeck();
    } else {
      renderDrawDeck();
    }

    const actionBtn = document.getElementById('draw-action-btn');
    if (actionBtn) {
      if (State.currentSlot >= spread.cardCount) {
        actionBtn.textContent = '查看解读结果';
        actionBtn.classList.add('btn-primary');
        actionBtn.disabled = false;
      } else {
        actionBtn.textContent = State.drawMode === 'auto' ? '抽一张牌' : '从上方牌中选取';
      }
    }
  }, 400);
}

// 自动连续抽牌
function autoDrawAll() {
  const spread = State.selectedSpread;
  if (!spread) return;

  function drawNext() {
    if (State.currentSlot >= spread.cardCount) {
      const actionBtn = document.getElementById('draw-action-btn');
      if (actionBtn) {
        actionBtn.textContent = '查看解读结果';
        actionBtn.classList.add('btn-primary');
        actionBtn.disabled = false;
      }
      return;
    }
    drawCardForSlot();
    setTimeout(drawNext, 600);
  }
  drawNext();
}

// ============ 翻牌 ============

function flipCard(slotIndex) {
  if (State.drawnCards[slotIndex]) {
    State.drawnCards[slotIndex].flipped = true;
    if (State.currentPage === 'draw') {
      renderSpreadCanvas();
    } else if (State.currentPage === 'result') {
      renderResultSpread();
    }
  }
}

function flipAllCards() {
  State.drawnCards.forEach((c, i) => {
    setTimeout(() => {
      c.flipped = true;
      renderSpreadCanvas();
    }, i * 200);
  });
}

// ============ 结果展示 ============

function showResults() {
  // 翻开所有牌
  State.drawnCards.forEach(c => c.flipped = true);

  navigateTo('result');
  renderResultPage();
}

function renderResultPage() {
  const spread = State.selectedSpread;
  if (!spread) return;

  document.getElementById('result-spread-name').textContent = spread.name;
  document.getElementById('result-date').textContent = formatDate(new Date());

  // 渲染牌阵
  renderResultSpread();

  // 渲染逐牌解读
  renderReadingCards();

  // 初始化 AI 解读
  loadAIReading();
}

function renderResultSpread() {
  const canvas = document.getElementById('result-spread-canvas');
  const spread = State.selectedSpread;
  if (!canvas || !spread) return;

  const isLarge = spread.cardCount > 6;
  const cardScale = isLarge ? 0.95 : 1.2;

  canvas.innerHTML = spread.positions.map((pos, i) => {
    // 坐标映射到画布安全区域内：左右留12%，上留10%，下留18%（给标签空间）
    const left = 12 + (pos.x / 10) * 76;
    const top = 10 + (pos.y / 10) * 72;
    const rotate = pos.rotated ? 'rotate(90deg)' : '';
    const card = State.drawnCards[i];

    // 如果牌在画布下半部分，标签放在牌的上方
    const labelOnTop = pos.y > 6.5;
    const labelStyle = labelOnTop
      ? 'bottom:auto;top:-34px;'
      : '';

    return `
      <div class="card-slot" style="left:${left}%;top:${top}%;transform:translate(-50%,-50%) ${rotate} scale(${cardScale});">
        ${card ? renderTarotCard(card, i, true) : ''}
        <div class="card-slot-label" style="${labelStyle}">${pos.name}</div>
      </div>
    `;
  }).join('');
}

function renderReadingCards() {
  const grid = document.getElementById('reading-grid');
  const spread = State.selectedSpread;
  if (!grid || !spread) return;

  grid.innerHTML = State.drawnCards.map((entry, i) => {
    const card = entry.card;
    const isReversed = entry.orientation === 'reversed';
    const meaning = isReversed ? card.reversed : card.upright;
    const suitKey = card.arcana === 'major' ? 'major' : card.suit;
    const orientationText = isReversed ? '逆位' : '正位';
    const orientationClass = isReversed ? 'orientation-badge-reversed' : 'orientation-badge-upright';

    return `
      <div class="reading-card">
        <div class="reading-card-mini">
          ${renderTarotCardMini(card, isReversed)}
        </div>
        <div class="reading-card-info">
          <div class="reading-card-position">位置 ${i + 1} · ${entry.position.name}</div>
          <div class="reading-card-name">${card.name} · ${card.englishName}</div>
          <div class="reading-card-orientation">
            <span class="${orientationClass}">${isReversed ? '↓' : '↑'} ${orientationText}</span>
          </div>
          <div class="reading-card-keywords">
            ${card.keywords.map(k => `<span class="keyword-tag">${k}</span>`).join('')}
          </div>
          <div class="reading-card-text">${meaning}</div>
        </div>
      </div>
    `;
  }).join('');
}

// ============ 塔罗牌渲染 ============

function renderTarotCard(cardData, slotIndex, isFlipped) {
  const card = cardData.card;
  const isReversed = cardData.orientation === 'reversed';
  const flippedClass = cardData.flipped ? 'flipped' : '';
  const reversedClass = isReversed ? 'reversed' : '';
  const suitKey = card.arcana === 'major' ? 'major' : card.suit;

  return `
    <div class="tarot-card ${flippedClass} ${reversedClass}" onclick="flipCard(${slotIndex})">
      <span class="card-orientation-badge">R</span>
      <div class="tarot-card-inner">
        <div class="tarot-card-back">
          <span class="tarot-card-back-symbol">✦</span>
        </div>
        <div class="tarot-card-face">
          <img class="card-face-image" src="data/cards/card-${String(card.id).padStart(3, '0')}.jpg" alt="${card.name}" loading="lazy" />
          <div class="card-face-label">
            <span class="card-face-roman">${card.roman}</span>
            <span class="card-face-name">${card.name}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderTarotCardMini(card, isReversed) {
  return `
    <div class="tarot-card ${isReversed ? 'reversed' : ''} flipped" style="width: var(--card-w-lg); height: var(--card-h-lg);">
      <div class="tarot-card-inner">
        <div class="tarot-card-back">
          <span class="tarot-card-back-symbol">✦</span>
        </div>
        <div class="tarot-card-face">
          <img class="card-face-image" src="data/cards/card-${String(card.id).padStart(3, '0')}.jpg" alt="${card.name}" loading="lazy" />
          <div class="card-face-label">
            <span class="card-face-roman">${card.roman}</span>
            <span class="card-face-name">${card.name}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ============ AI 解读 ============

function loadAIReading() {
  State.aiLoading = true;
  const loadingEl = document.getElementById('ai-reading-loading');
  const contentEl = document.getElementById('ai-reading-content');
  const actionBtn = document.getElementById('ai-action-btn');

  if (loadingEl) loadingEl.classList.remove('hidden');
  if (contentEl) contentEl.classList.add('hidden');
  if (actionBtn) actionBtn.classList.add('hidden');

  // 调用真实 API
  callTarotAI()
    .then(reading => {
      State.aiReading = reading;
      State.aiLoading = false;

      if (loadingEl) loadingEl.classList.add('hidden');
      if (contentEl) {
        contentEl.innerHTML = formatAIReading(reading);
        contentEl.classList.remove('hidden');
      }
      if (actionBtn) actionBtn.classList.remove('hidden');
    })
    .catch(err => {
      console.warn('AI API 调用失败，使用备用解读：', err);
      if (AI_CONFIG.useMockFallback) {
        const reading = generateMockAIReading();
        State.aiReading = reading;
        State.aiLoading = false;

        if (loadingEl) loadingEl.classList.add('hidden');
        if (contentEl) {
          contentEl.innerHTML = reading;
          contentEl.classList.remove('hidden');
        }
        if (actionBtn) actionBtn.classList.remove('hidden');
      } else {
        State.aiLoading = false;
        if (loadingEl) loadingEl.classList.add('hidden');
        if (contentEl) {
          contentEl.innerHTML = `<p style="color: var(--c-error);">解读生成失败，请稍后重试。</p>`;
          contentEl.classList.remove('hidden');
        }
        if (actionBtn) actionBtn.classList.remove('hidden');
      }
    });
}

// 构建 AI 提示词并调用
async function callTarotAI() {
  const spread = State.selectedSpread;
  const cards = State.drawnCards;
  const question = State.questionText || '求问者没有提出具体问题，希望获得一般性的指引。';

  // 构建牌面信息
  const cardInfo = cards.map((c, i) => {
    const orient = c.orientation === 'reversed' ? '逆位' : '正位';
    const meaning = c.orientation === 'reversed' ? c.card.reversed : c.card.upright;
    return `第${i+1}张 - 【${c.position.name}】：${c.card.name}（${orient}）
关键词：${c.card.keywords.join('、')}
牌意：${meaning}`;
  }).join('\n\n');

  const systemPrompt = `你是一位资深的塔罗牌解读师，拥有十年以上的占卜经验和深厚的心理学功底。
你擅长用温暖、富有洞察力的语言为求问者解读牌面，帮助他们看清内心、找到方向。

【重要原则】
1. 塔罗牌是映照内心的镜子，不是预言命运的工具。始终强调求问者的自由意志。
2. 解读要具体、有温度，避免空洞的套话。结合每张牌的位置和正逆位进行分析。
3. 语言风格：温暖、神秘、有深度，带一点仪式感，但不故弄玄虚。
4. 从不给出绝对化的判断（如"一定会分手""肯定能考上"），而是描述能量趋势和可能性。
5. 始终以鼓励和支持的态度结尾，给予求问者力量。

【输出格式要求】
请使用 HTML 格式输出，包含以下结构：
<p><strong>整体能量</strong></p>
<p>...</p>

<p><strong>牌阵脉络</strong></p>
<p>逐张分析每张牌在对应位置的含义，以及它们之间的关联。</p>

<p><strong>核心建议</strong></p>
<p>...</p>

<p><strong>结语</strong></p>
<p>温暖有力的总结。</p>

不要使用 markdown，直接输出 HTML 片段。`;

  const userPrompt = `【牌阵】${spread.name}
牌阵说明：${spread.description}

【求问者的问题】
${question}

【抽到的牌】
${cardInfo}

请根据以上信息，为求问者进行一次完整、深入的塔罗牌解读。`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), AI_CONFIG.timeout);

  try {
    const response = await fetch(`${AI_CONFIG.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AI_CONFIG.apiKey}`
      },
      body: JSON.stringify({
        model: AI_CONFIG.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.8,
        max_tokens: 2000
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      throw new Error(`API 返回 ${response.status}: ${errText}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) throw new Error('API 返回内容为空');

    return content;
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

// 格式化 AI 返回的内容
function formatAIReading(text) {
  // 如果已经包含 HTML 标签，直接包裹
  if (text.includes('<p>') || text.includes('<br>')) {
    return `<div class="ai-reading-text">${text}</div>`;
  }
  // 纯文本按段落分割
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim());
  return `<div class="ai-reading-text">${paragraphs.map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('')}</div>`;
}

function generateMockAIReading() {
  const spread = State.selectedSpread;
  const cards = State.drawnCards;

  const cardList = cards.map((c, i) => {
    const name = c.card.name;
    const orient = c.orientation === 'reversed' ? '（逆位）' : '（正位）';
    return `${i + 1}. ${c.position.name}：${name}${orient}`;
  }).join('\n');

  const firstCard = cards[0];
  const firstMeaning = firstCard.orientation === 'reversed'
    ? firstCard.card.reversed : firstCard.card.upright;

  const lastCard = cards[cards.length - 1];
  const lastMeaning = lastCard.orientation === 'reversed'
    ? lastCard.card.reversed : lastCard.card.upright;

  const allKeywords = cards.flatMap(c => c.card.keywords).slice(0, 5);

  return `
    <div class="ai-reading-text">
      <p>本次占卜使用<strong>${spread.name}</strong>牌阵，共抽取 ${cards.length} 张牌。以下是综合解读：</p>

      <p><strong>整体能量</strong></p>
      <p>从牌面来看，"${firstCard.card.name}"出现在"${firstCard.position.name}"的位置，${firstCard.orientation === 'reversed' ? '逆位' : '正位'}显示${firstMeaning.substring(0, 60)}...这为整次占卜奠定了基调。</p>

      <p><strong>牌阵脉络</strong></p>
      <p>${cardList}</p>

      <p>各个位置之间形成了内在的叙事脉络。关键词包括：${allKeywords.map(k => `<strong>${k}</strong>`).join('、')}。这些能量的交织暗示着一个正在展开的故事，需要你以觉察之心去感受其中的节奏。</p>

      <p><strong>核心建议</strong></p>
      <p>综合所有牌面的信息，当下的能量指向一个转变的节点。${lastCard.position.name}位置的"${lastCard.card.name}"${lastCard.orientation === 'reversed' ? '逆位' : '正位'}提醒你：${lastMeaning.substring(0, 80)}...</p>

      <p><strong>结语</strong></p>
      <p>塔罗牌是映照内心的一面镜子，而非决定命运的预言。牌面所呈现的是当下的能量趋势与可能的走向。你始终拥有自由意志去选择自己的道路。带着这份觉察，勇敢地迈出下一步吧。</p>
    </div>
  `;
}

function regenerateAIReading() {
  loadAIReading();
}

// ============ 抽牌操作按钮 ============

function onDrawAction() {
  const spread = State.selectedSpread;
  if (!spread) {
    navigateTo('spreads');
    return;
  }

  // 所有牌已抽完，跳转结果
  if (State.currentSlot >= spread.cardCount) {
    showResults();
    return;
  }

  // 自动模式：抽一张
  if (State.drawMode === 'auto') {
    drawCardForSlot();
  }
  // 手动模式：提示用户点击扇形牌
  else {
    const btn = document.getElementById('draw-action-btn');
    if (btn) {
      const orig = btn.textContent;
      btn.textContent = '请点击上方牌堆中的牌 ↓';
      setTimeout(() => { btn.textContent = orig; }, 1500);
    }
  }
}

// ============ 常用问题页 ============

let currentQCategory = 'all';

function renderQuestionPage() {
  renderCategoryTabs();
  renderQuestionList();
}

function renderCategoryTabs() {
  const tabsEl = document.getElementById('q-category-tabs');
  if (!tabsEl) return;

  tabsEl.innerHTML = QUESTION_CATEGORIES.map(cat => {
    const activeClass = cat.id === currentQCategory ? 'active' : '';
    return `<button class="q-tab ${activeClass}" onclick="selectQCategory('${cat.id}')">
      <span>${cat.name}</span>
      <span class="q-tab-count">${cat.count}</span>
    </button>`;
  }).join('');
}

function selectQCategory(categoryId) {
  currentQCategory = categoryId;
  renderCategoryTabs();
  renderQuestionList();
}

function renderQuestionList() {
  const listEl = document.getElementById('q-list-container');
  if (!listEl) return;

  const questions = getQuestionsByCategory(currentQCategory);

  // 如果是"全部"分类，按分类分组显示
  if (currentQCategory === 'all') {
    const categories = QUESTION_CATEGORIES.filter(c => c.id !== 'all');
    listEl.innerHTML = categories.map(cat => {
      const catQuestions = questions.filter(q => q.category === cat.id);
      if (catQuestions.length === 0) return '';
      return `
        <div class="q-category-section">
          <div class="q-category-header">
            <span class="q-category-title">${cat.name}</span>
            <span class="q-category-count">${catQuestions.length} 个问题</span>
          </div>
          ${catQuestions.map(q => renderQuestionItem(q)).join('')}
        </div>
      `;
    }).join('');
  } else {
    // 单个分类直接列出所有问题
    const cat = getCategoryById(currentQCategory);
    listEl.innerHTML = `
      <div class="q-category-section">
        <div class="q-category-header">
          <span class="q-category-title">${cat ? cat.name : ''}</span>
          <span class="q-category-count">${questions.length} 个问题</span>
        </div>
        ${questions.map(q => renderQuestionItem(q)).join('')}
      </div>
    `;
  }
}

function renderQuestionItem(question) {
  const spreadCount = question.matchedSpreads.length;
  return `
    <div class="q-item" onclick="showQuestionDetail('${question.id}')">
      <span class="q-item-dot" style="background:${question.dotColor};color:${question.dotColor};"></span>
      <div class="q-item-body">
        <div class="q-item-question">${question.question}</div>
        <div class="q-item-meta">匹配 ${spreadCount} 个牌阵</div>
      </div>
      <span class="q-item-arrow">›</span>
    </div>
  `;
}

let selectedQuestion = null;

function showQuestionDetail(questionId) {
  const question = QUESTION_LIST.find(q => q.id === questionId);
  if (!question) return;

  selectedQuestion = question;

  const matchedSpreads = question.matchedSpreads
    .map(id => getSpreadById(id))
    .filter(s => s);

  const spreadItems = matchedSpreads.map(s => `
    <div class="q-detail-spread-item" onclick="startFromQuestion('${s.id}')">
      <span class="q-detail-spread-icon">🎴</span>
      <div class="q-detail-spread-info">
        <div class="q-detail-spread-name">${s.name}</div>
        <div class="q-detail-spread-desc">${s.cardCount} 张 · ${s.recommendedFor}</div>
      </div>
      <span class="q-detail-spread-arrow">›</span>
    </div>
  `).join('');

  const cat = getCategoryById(question.category);

  const modalHtml = `
    <div class="q-detail-modal" id="q-detail-modal" onclick="closeQDetail(event)">
      <div class="q-detail-panel" onclick="event.stopPropagation()">
        <button class="q-detail-close" onclick="closeQDetail()">✕</button>
        <div class="q-detail-title">${question.question}</div>
        <div class="q-detail-label">${cat ? cat.name : ''}</div>

        <div class="q-detail-section">
          <div class="q-detail-section-title">提问模板</div>
          <div class="q-detail-template">「${question.template}」</div>
        </div>

        <div class="q-detail-section">
          <div class="q-detail-section-title">推荐牌阵</div>
          <div class="q-detail-spreads">
            ${spreadItems}
          </div>
        </div>

        <div class="q-detail-actions">
          <button class="btn btn-ghost" onclick="closeQDetail()">返回</button>
          <button class="btn btn-primary" onclick="startFromQuestion('${matchedSpreads[0] ? matchedSpreads[0].id : ''}')">立即占卜</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
  document.body.style.overflow = 'hidden';
}

function closeQDetail(event) {
  if (event && event.target && event.target.id !== 'q-detail-modal') return;
  const modal = document.getElementById('q-detail-modal');
  if (modal) {
    modal.remove();
    document.body.style.overflow = '';
    selectedQuestion = null;
  }
}

function startFromQuestion(spreadId) {
  closeQDetail();
  selectSpread(spreadId);
  // 自动填充问题
  setTimeout(() => {
    if (selectedQuestion) {
      setQuestionFromTemplate(selectedQuestion);
    }
  }, 50);
}

// ============ 初始化 ============

document.addEventListener('DOMContentLoaded', () => {
  renderDailyQuestions();
  renderSpreadSelection();
});