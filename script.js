// Portfolio items
const portfolioItems = [
  // Promotion Videos
  {
    id: '1',
    type: 'video',
    category: 'promotions',
    src: 'public/videos/v1c044g50000d4sp5a7og65q5kbc7pig.mp4',
    title: 'ANKER',
    description: 'Soundcore Aeroclip プロモーション動画',
  },
  {
    id: '2',
    type: 'video',
    category: 'promotions',
    src: 'public/videos/cf21ed8f748b46d9b8d1d70b39d0ab10.mp4',
    title: '株式会社アデランス',
    description: 'AWANIST プロモーション動画',
  },
  {
    id: '3',
    type: 'video',
    category: 'promotions',
    src: 'public/videos/v1c044g50000cqr2h47og65v2hl27ep0.mp4',
    title: 'RIZAP 株式会社',
    description: 'chocoZAP プロモーション動画',
  },
  {
    id: '4',
    type: 'video',
    category: 'promotions',
    src: 'public/videos/v14044g50000cut92rfog65ln4l58sv0.mp4',
    title: 'ロート製薬株式会社',
    description: 'メラノCC プロモーション動画',
  },
  {
    id: '5',
    type: 'video',
    category: 'promotions',
    src: 'public/videos/ac6477c43f59444b97bad6e5c6f347e7.mp4',
    title: '株式会社ベガコーポレーション',
    description: '家具ブランド LOWYA プロモーション動画',
  },
  {
    id: '6',
    type: 'video',
    category: 'promotions',
    src: 'public/videos/a479a4f1dc50484597f5a3cb2f9efc84.mp4',
    title: 'DoctorPetit クリニック',
    description: '韓国美容施術 プロモーション動画',
  },
  {
    id: '7',
    type: 'video',
    category: 'promotions',
    src: 'public/videos/v10025g50000clssb1vog65lfm5pmh5g.mp4',
    title: 'FIRST ARTMAKE 銀座店',
    description: '眉アートメイク プロモーション動画',
  },
  // Model
  {
    id: 'model-1',
    type: 'image',
    category: 'model',
    src: 'public/images/IMG_1390.JPG',
    title: 'モデル撮影',
    description: 'プロフィール撮影',
  },
  // Original (自主制作)
  {
    id: 'original-1',
    type: 'video',
    category: 'original',
    src: 'public/videos/original-1.mp4',
    title: '自主制作',
    description: '自主制作動画',
  },
];

// State
let activeTab = 'promotions';
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

  // Load initial items
  loadItems();
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

  isLoading = true;
  loadingEl.style.display = 'flex';
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
      endMessageEl.textContent = 'すべての作品を表示しました';
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
          <p>コンテンツがありません</p>
        </div>
      `;
    }
  }, 300);
}

function createCard(item, index) {
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
