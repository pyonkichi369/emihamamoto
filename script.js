// Translations
const translations = {
  ja: {
    // Header & Profile
    freelance: 'フリーランス',
    japan: 'Japan',
    skills: 'スキル・得意分野',
    specialty: '専門',
    specialtyValue: '縦型動画 / ショートムービー制作',
    bio: 'TikTok、Instagram Reels、YouTube Shortsなど、各プラットフォームに最適化した縦型動画を制作しています。',

    // Experience
    experience: '経歴',
    exp1Year: '2024 - 現在',
    exp1Title: 'フリーランス ビデオクリエイター',
    exp1Desc: '縦型動画・ショートムービーを中心とした映像制作',
    exp2Year: '2023',
    exp2Title: '映像制作会社',
    exp2Desc: 'プロモーション動画の企画・撮影・編集',
    exp3Year: '2022',
    exp3Title: 'クリエイティブ活動開始',
    exp3Desc: 'TikTok、Instagram Reelsでの動画投稿を開始',

    // Tabs
    tabWorks: '制作物',
    tabModel: 'モデル',

    // Portfolio Items
    item1Title: 'LOWYA',
    item1Desc: '家具ブランドのプロモーション動画',
    item1Tags: ['インテリア', 'プロモーション'],
    item1Affiliate: 'LOWYA 北欧デザインソファ',

    item2Title: 'Soundcore Aeroclip',
    item2Desc: 'オーディオ製品のプロモーション動画',
    item2Tags: ['プロダクト', 'テック'],
    item2Affiliate: 'Soundcore Aeroclip オープンイヤーイヤホン',

    item3Title: 'ショート動画',
    item3Desc: 'SNS向けショート動画制作',
    item3Tags: ['ショート', 'SNS'],

    item4Title: 'ライフスタイル',
    item4Desc: 'ライフスタイル動画制作',
    item4Tags: ['ライフスタイル', 'Vlog'],

    item5Title: 'プロモーション',
    item5Desc: 'ブランドプロモーション動画',
    item5Tags: ['プロモーション', 'ブランディング'],

    item6Title: 'コンテンツ制作',
    item6Desc: 'SNSコンテンツ制作',
    item6Tags: ['SNS', 'コンテンツ'],

    item7Title: 'クリエイティブ',
    item7Desc: 'クリエイティブ動画制作',
    item7Tags: ['クリエイティブ', '映像'],

    item8Title: 'ブランド動画',
    item8Desc: 'ブランド向け映像制作',
    item8Tags: ['ブランド', 'プロモーション'],

    item9Title: 'ショート動画',
    item9Desc: 'ショートフォーム動画制作',
    item9Tags: ['ショート', 'SNS'],

    item10Title: 'コンテンツ',
    item10Desc: 'オリジナルコンテンツ制作',
    item10Tags: ['コンテンツ', '映像'],

    modelTitle: 'モデル撮影',
    modelDesc: 'プロフィール撮影',
    modelTags: ['モデル', 'ポートレート'],

    // UI
    loading: '読み込み中...',
    allLoaded: 'すべての作品を表示しました',
    noContent: 'コンテンツがありません',
    recommended: 'おすすめ商品',
    details: '詳細',

    // Footer
    footerRights: 'All rights reserved.',
  },
  en: {
    // Header & Profile
    freelance: 'Freelance',
    japan: 'Japan',
    skills: 'Skills',
    specialty: 'Specialty',
    specialtyValue: 'Vertical Video / Short Movie Production',
    bio: 'Creating vertical videos optimized for TikTok, Instagram Reels, YouTube Shorts and other platforms.',

    // Experience
    experience: 'Experience',
    exp1Year: '2024 - Present',
    exp1Title: 'Freelance Video Creator',
    exp1Desc: 'Video production focused on vertical videos and short movies',
    exp2Year: '2023',
    exp2Title: 'Video Production Company',
    exp2Desc: 'Planning, shooting, and editing promotional videos',
    exp3Year: '2022',
    exp3Title: 'Started Creative Activities',
    exp3Desc: 'Started posting videos on TikTok and Instagram Reels',

    // Tabs
    tabWorks: 'Works',
    tabModel: 'Model',

    // Portfolio Items
    item1Title: 'LOWYA',
    item1Desc: 'Furniture brand promotion video',
    item1Tags: ['Interior', 'Promotion'],
    item1Affiliate: 'LOWYA Nordic Design Sofa',

    item2Title: 'Soundcore Aeroclip',
    item2Desc: 'Audio product promotion video',
    item2Tags: ['Product', 'Tech'],
    item2Affiliate: 'Soundcore Aeroclip Open-Ear Earphones',

    item3Title: 'Short Video',
    item3Desc: 'SNS short video production',
    item3Tags: ['Short', 'SNS'],

    item4Title: 'Lifestyle',
    item4Desc: 'Lifestyle video production',
    item4Tags: ['Lifestyle', 'Vlog'],

    item5Title: 'Promotion',
    item5Desc: 'Brand promotion video',
    item5Tags: ['Promotion', 'Branding'],

    item6Title: 'Content Creation',
    item6Desc: 'SNS content creation',
    item6Tags: ['SNS', 'Content'],

    item7Title: 'Creative',
    item7Desc: 'Creative video production',
    item7Tags: ['Creative', 'Video'],

    item8Title: 'Brand Video',
    item8Desc: 'Brand video production',
    item8Tags: ['Brand', 'Promotion'],

    item9Title: 'Short Video',
    item9Desc: 'Short form video production',
    item9Tags: ['Short', 'SNS'],

    item10Title: 'Content',
    item10Desc: 'Original content production',
    item10Tags: ['Content', 'Video'],

    modelTitle: 'Model Shooting',
    modelDesc: 'Profile photography',
    modelTags: ['Model', 'Portrait'],

    // UI
    loading: 'Loading...',
    allLoaded: 'All items loaded',
    noContent: 'No content available',
    recommended: 'Recommended',
    details: 'Details',

    // Footer
    footerRights: 'All rights reserved.',
  }
};

// Get translated portfolio items
function getPortfolioItems(lang) {
  const t = translations[lang];
  return [
    // Works
    {
      id: '1',
      type: 'video',
      category: 'works',
      src: 'public/videos/lowya.mov',
      title: t.item1Title,
      description: t.item1Desc,
      tags: t.item1Tags,
      affiliateProduct: t.item1Affiliate,
      affiliateLink: 'https://www.lowya.com/',
    },
    {
      id: '2',
      type: 'video',
      category: 'works',
      src: 'public/videos/soundcore.mov',
      title: t.item2Title,
      description: t.item2Desc,
      tags: t.item2Tags,
      affiliateProduct: t.item2Affiliate,
      affiliateLink: 'https://www.soundcore.com/',
    },
    {
      id: '3',
      type: 'video',
      category: 'works',
      src: 'public/videos/post3.mov',
      title: t.item3Title,
      description: t.item3Desc,
      tags: t.item3Tags,
    },
    {
      id: '4',
      type: 'video',
      category: 'works',
      src: 'public/videos/video1.mov',
      title: t.item4Title,
      description: t.item4Desc,
      tags: t.item4Tags,
    },
    {
      id: '5',
      type: 'video',
      category: 'works',
      src: 'public/videos/video2.mov',
      title: t.item5Title,
      description: t.item5Desc,
      tags: t.item5Tags,
    },
    {
      id: '6',
      type: 'video',
      category: 'works',
      src: 'public/videos/video3.mov',
      title: t.item6Title,
      description: t.item6Desc,
      tags: t.item6Tags,
    },
    {
      id: '7',
      type: 'video',
      category: 'works',
      src: 'public/videos/video4.mov',
      title: t.item7Title,
      description: t.item7Desc,
      tags: t.item7Tags,
    },
    {
      id: '8',
      type: 'video',
      category: 'works',
      src: 'public/videos/video5.mov',
      title: t.item8Title,
      description: t.item8Desc,
      tags: t.item8Tags,
    },
    {
      id: '9',
      type: 'video',
      category: 'works',
      src: 'public/videos/video6.mov',
      title: t.item9Title,
      description: t.item9Desc,
      tags: t.item9Tags,
    },
    {
      id: '10',
      type: 'video',
      category: 'works',
      src: 'public/videos/video7.mov',
      title: t.item10Title,
      description: t.item10Desc,
      tags: t.item10Tags,
    },
    // Model
    {
      id: 'model-1',
      type: 'image',
      category: 'model',
      src: 'public/images/IMG_1390.JPG',
      title: t.modelTitle,
      description: t.modelDesc,
      tags: t.modelTags,
    },
  ];
}

// State
let currentLang = localStorage.getItem('lang') || 'ja';
let portfolioItems = getPortfolioItems(currentLang);
let activeTab = 'works';
let displayedItems = [];
let currentPage = 0;
let isLoading = false;
let hasMore = true;
let selectedIndex = null;
const ITEMS_PER_PAGE = 4;

// DOM Elements
let portfolioGrid, loadingEl, endMessageEl, modal, modalContent, modalCounter, modalClose, modalPrev, modalNext, tabs, yearEl;

// Initialize
function init() {
  // Get DOM elements
  portfolioGrid = document.getElementById('portfolio-grid');
  loadingEl = document.getElementById('loading');
  endMessageEl = document.getElementById('end-message');
  modal = document.getElementById('modal');
  modalContent = document.getElementById('modal-content');
  modalCounter = document.getElementById('modal-counter');
  modalClose = document.getElementById('modal-close');
  modalPrev = document.getElementById('modal-prev');
  modalNext = document.getElementById('modal-next');
  tabs = document.querySelectorAll('.tab');
  yearEl = document.getElementById('year');

  // Set current year
  yearEl.textContent = new Date().getFullYear();

  // Set up language switcher
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      switchLanguage(lang);
    });
  });

  // Set up tabs
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabId = tab.dataset.tab;
      switchTab(tabId);
    });
  });

  // Set up modal
  modalClose.addEventListener('click', closeModal);
  modalPrev.addEventListener('click', showPrev);
  modalNext.addEventListener('click', showNext);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Keyboard navigation
  document.addEventListener('keydown', handleKeydown);

  // Intersection Observer for infinite scroll
  setupInfiniteScroll();

  // Apply initial language
  applyLanguage(currentLang);

  // Load initial items
  loadItems();
}

function switchLanguage(lang) {
  if (lang === currentLang) return;

  currentLang = lang;
  localStorage.setItem('lang', lang);

  // Update portfolio items with new language
  portfolioItems = getPortfolioItems(lang);

  // Apply language to UI
  applyLanguage(lang);

  // Reload portfolio
  currentPage = 0;
  displayedItems = [];
  hasMore = true;
  portfolioGrid.innerHTML = '';
  loadItems();
}

function applyLanguage(lang) {
  const t = translations[lang];

  // Update HTML lang attribute
  document.documentElement.lang = lang;

  // Update language buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Update all translatable elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key]) {
      el.textContent = t[key];
    }
  });

  // Update tab labels
  document.querySelector('[data-tab="works"] span').textContent = t.tabWorks;
  document.querySelector('[data-tab="model"] span').textContent = t.tabModel;
}

function switchTab(tabId) {
  activeTab = tabId;
  currentPage = 0;
  displayedItems = [];
  hasMore = true;

  // Update tab UI
  tabs.forEach(tab => {
    tab.classList.toggle('active', tab.dataset.tab === tabId);
  });

  // Clear grid
  portfolioGrid.innerHTML = '';

  // Load items
  loadItems();
}

function getFilteredItems() {
  return portfolioItems.filter(item => item.category === activeTab);
}

function loadItems() {
  if (isLoading || !hasMore) return;

  const t = translations[currentLang];
  isLoading = true;
  loadingEl.style.display = 'flex';
  loadingEl.querySelector('span').textContent = t.loading;
  endMessageEl.style.display = 'none';

  // Simulate loading delay
  setTimeout(() => {
    const filtered = getFilteredItems();
    const start = currentPage * ITEMS_PER_PAGE;
    const newItems = filtered.slice(start, start + ITEMS_PER_PAGE);

    newItems.forEach(item => {
      displayedItems.push(item);
      const card = createCard(item, displayedItems.length - 1);
      portfolioGrid.appendChild(card);
    });

    currentPage++;
    hasMore = start + ITEMS_PER_PAGE < filtered.length;
    isLoading = false;
    loadingEl.style.display = hasMore ? 'flex' : 'none';

    if (!hasMore && displayedItems.length > 0) {
      endMessageEl.textContent = t.allLoaded;
      endMessageEl.style.display = 'block';
    } else {
      endMessageEl.style.display = 'none';
    }

    // Show empty state if no items
    if (displayedItems.length === 0) {
      portfolioGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="23 7 16 12 23 17 23 7"/>
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
          </svg>
          <p>${t.noContent}</p>
        </div>
      `;
    }
  }, 300);
}

function createCard(item, index) {
  const t = translations[currentLang];
  const card = document.createElement('div');
  card.className = 'video-card';
  card.addEventListener('click', () => openModal(index));

  const isVideo = item.type === 'video' && /\.(mp4|webm|mov|m4v)$/i.test(item.src);

  card.innerHTML = `
    <div class="card-thumbnail">
      ${isVideo ? `
        <video class="card-media" src="${item.src}" muted loop playsinline preload="metadata"></video>
      ` : `
        <img class="card-media" src="${item.src}" alt="${item.title}">
      `}
      <div class="play-overlay">
        <div class="play-button">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
        </div>
      </div>
      <div class="hover-overlay">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5 3 19 12 5 21 5 3"/>
        </svg>
      </div>
      ${item.tags && item.tags[0] ? `<span class="card-tag">${item.tags[0]}</span>` : ''}
    </div>
    <div class="card-info">
      <h4 class="card-title">${item.title}</h4>
      ${item.description ? `<p class="card-description">${item.description}</p>` : ''}
      ${item.tags ? `
        <div class="card-tags">
          ${item.tags.slice(0, 2).map(tag => `<span>#${tag}</span>`).join('')}
        </div>
      ` : ''}
      ${item.affiliateProduct ? `
        <div class="card-affiliate">
          <p class="card-affiliate-label">${t.recommended}</p>
          <p class="card-affiliate-product">${item.affiliateProduct}</p>
        </div>
      ` : ''}
    </div>
  `;

  // Hover video preview
  if (isVideo) {
    const video = card.querySelector('video');
    const playOverlay = card.querySelector('.play-overlay');

    card.addEventListener('mouseenter', () => {
      video.play().catch(() => {});
      playOverlay.style.display = 'none';
    });

    card.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
      playOverlay.style.display = 'flex';
    });
  }

  return card;
}

function setupInfiniteScroll() {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && hasMore && !isLoading) {
      loadItems();
    }
  }, { threshold: 0.1 });

  observer.observe(loadingEl);
}

// Modal Functions
function openModal(index) {
  // Stop all card videos before opening modal
  document.querySelectorAll('.video-card video').forEach(video => {
    video.pause();
    video.currentTime = 0;
  });

  selectedIndex = index;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  updateModalContent();
}

function closeModal() {
  // Stop any playing video first
  const video = modalContent.querySelector('video');
  if (video) {
    video.pause();
    video.src = '';
  }

  // Clear modal content
  modalContent.innerHTML = '';

  modal.classList.remove('active');
  document.body.style.overflow = '';
  selectedIndex = null;
}

function showPrev() {
  if (selectedIndex !== null) {
    // Stop current video before switching
    const video = modalContent.querySelector('video');
    if (video) {
      video.pause();
      video.src = '';
    }
    selectedIndex = selectedIndex === 0 ? displayedItems.length - 1 : selectedIndex - 1;
    updateModalContent();
  }
}

function showNext() {
  if (selectedIndex !== null) {
    // Stop current video before switching
    const video = modalContent.querySelector('video');
    if (video) {
      video.pause();
      video.src = '';
    }
    selectedIndex = selectedIndex === displayedItems.length - 1 ? 0 : selectedIndex + 1;
    updateModalContent();
  }
}

function updateModalContent() {
  const t = translations[currentLang];
  const item = displayedItems[selectedIndex];
  if (!item) return;

  const isVideo = item.type === 'video' && /\.(mp4|webm|mov|m4v)$/i.test(item.src);

  modalContent.innerHTML = `
    ${isVideo ? `
      <video src="${item.src}" loop playsinline autoplay></video>
      <div class="modal-controls">
        <button class="modal-control-btn" id="mute-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
          </svg>
        </button>
      </div>
    ` : `
      <img src="${item.src}" alt="${item.title}">
    `}
    <div class="modal-info">
      <h3 class="modal-title">${item.title}</h3>
      ${item.description ? `<p class="modal-description">${item.description}</p>` : ''}
      ${item.tags ? `
        <div class="modal-tags">
          ${item.tags.map(tag => `<span class="modal-tag">${tag}</span>`).join('')}
        </div>
      ` : ''}
      ${item.affiliateProduct ? `
        <div class="modal-affiliate">
          <p class="modal-affiliate-label">${t.recommended}</p>
          <div class="modal-affiliate-content">
            <p class="modal-affiliate-product">${item.affiliateProduct}</p>
            ${item.affiliateLink ? `
              <a href="${item.affiliateLink}" target="_blank" rel="noopener noreferrer" class="modal-affiliate-link">
                ${t.details}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            ` : ''}
          </div>
        </div>
      ` : ''}
    </div>
  `;

  modalCounter.textContent = `${selectedIndex + 1} / ${displayedItems.length}`;

  // Set up mute button
  if (isVideo) {
    const video = modalContent.querySelector('video');
    const muteBtn = document.getElementById('mute-btn');

    muteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      video.muted = !video.muted;
      muteBtn.innerHTML = video.muted ? `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
          <line x1="23" y1="9" x2="17" y2="15"/>
          <line x1="17" y1="9" x2="23" y2="15"/>
        </svg>
      ` : `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
        </svg>
      `;
    });

    // Click video to toggle play/pause
    video.addEventListener('click', () => {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });
  }
}

function handleKeydown(e) {
  if (!modal.classList.contains('active')) return;

  switch (e.key) {
    case 'Escape':
      closeModal();
      break;
    case 'ArrowLeft':
      showPrev();
      break;
    case 'ArrowRight':
      showNext();
      break;
    case ' ':
      e.preventDefault();
      const video = modalContent.querySelector('video');
      if (video) {
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
      }
      break;
  }
}

// Theme Functions
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Apply saved theme or system preference
  if (savedTheme) {
    document.documentElement.dataset.theme = savedTheme;
  } else if (prefersDark) {
    document.documentElement.dataset.theme = 'dark';
  }

  themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.dataset.theme;
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.dataset.theme = newTheme;
  localStorage.setItem('theme', newTheme);
}

// Start
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  init();
});
