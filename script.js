// Portfolio items
const portfolioItems = [
  // Promotion Videos
  // アフィリエイトリンクを追加する場合は以下のように設定:
  // affiliate: {
  //   product: '商品名',
  //   url: 'https://affiliate-link.com/...'
  // }
  {
    id: '1',
    type: 'video',
    category: 'promotions',
    src: 'public/videos/f8fecd42a7a407ef.mp4',
    title: '株式会社Gold Star',
    description: '3D フルーツアイス プロモーション動画',
  },
  {
    id: '2',
    type: 'video',
    category: 'promotions',
    src: 'public/videos/v1c044g50000d4sp5a7og65q5kbc7pig.mp4',
    title: 'ANKER',
    description: 'Soundcore Aeroclip プロモーション動画',
    // affiliate: {
    //   product: 'Soundcore Aeroclip',
    //   url: 'https://example.com/affiliate-link'
    // }
  },
  {
    id: '3',
    type: 'video',
    category: 'promotions',
    src: 'public/videos/cf21ed8f748b46d9b8d1d70b39d0ab10.mp4',
    title: '株式会社アデランス',
    description: 'AWANIST プロモーション動画',
  },
  {
    id: '4',
    type: 'video',
    category: 'promotions',
    src: 'public/videos/v1c044g50000cqr2h47og65v2hl27ep0.mp4',
    title: 'RIZAP 株式会社',
    description: 'chocoZAP プロモーション動画',
  },
  {
    id: '5',
    type: 'video',
    category: 'promotions',
    src: 'public/videos/v14044g50000cut92rfog65ln4l58sv0.mp4',
    title: 'ロート製薬株式会社',
    description: 'メラノCC プロモーション動画',
  },
  {
    id: '6',
    type: 'video',
    category: 'promotions',
    src: 'public/videos/ac6477c43f59444b97bad6e5c6f347e7.mp4',
    title: '株式会社ベガコーポレーション',
    description: '家具ブランド LOWYA プロモーション動画',
  },
  {
    id: '7',
    type: 'video',
    category: 'promotions',
    src: 'public/videos/a479a4f1dc50484597f5a3cb2f9efc84.mp4',
    title: 'DoctorPetit クリニック',
    description: '韓国美容施術 プロモーション動画',
  },
  {
    id: '8',
    type: 'video',
    category: 'promotions',
    src: 'public/videos/v10025g50000clssb1vog65lfm5pmh5g.mp4',
    title: 'FIRST ARTMAKE 銀座店',
    description: '眉アートメイク プロモーション動画',
  },
  {
    id: '9',
    type: 'video',
    category: 'promotions',
    src: 'public/videos/29b9360e37689bf2.mp4',
    title: 'CBeauty 株式会社',
    description: '店舗紹介動画',
  },
  // Model
  {
    id: 'model-1',
    type: 'video',
    category: 'model',
    src: 'public/videos/d921e99a38732c60.mp4',
    title: 'Stage On Me 2',
    description: '日韓合同ファッションショー動画',
  },
  // {
  //   id: 'model-2',
  //   type: 'gallery',
  //   category: 'model',
  //   images: [
  //     'public/images/7c4e8b2f9a1d3e56.jpg',
  //     // 追加画像はここに追加
  //   ],
  //   title: 'モデル撮影',
  //   description: 'プロフィール撮影',
  // },
  // Original (自主制作)
  {
    id: 'original-1',
    type: 'video',
    category: 'original',
    src: 'public/videos/68b9784134dff87a.mp4',
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
  const isGallery = item.type === 'gallery';
  const thumbnailSrc = isGallery ? item.images[0] : item.src;

  // For videos, show a placeholder initially and lazy load the video
  card.innerHTML = `
    <div class="card-thumbnail">
      ${isVideo ? `
        <video class="card-media" data-src="${item.src}" muted loop playsinline preload="none" poster=""></video>
        <div class="video-placeholder"></div>
      ` : `
        <img class="card-media" src="${thumbnailSrc}" alt="${item.title}" loading="lazy">
      `}
      ${isVideo ? `
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
      ` : ''}
      ${isGallery && item.images.length > 1 ? `
        <div class="gallery-indicator">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2"/>
            <rect x="7" y="7" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2"/>
          </svg>
          <span>${item.images.length}</span>
        </div>
      ` : ''}
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
      ${item.affiliate ? `
        <div class="card-affiliate">
          <div class="card-affiliate-label">PR</div>
          <div class="card-affiliate-product">${item.affiliate.product}</div>
        </div>
      ` : ''}
    </div>
  `;

  // Lazy load video and hover preview
  if (isVideo) {
    const video = card.querySelector('video');
    const playOverlay = card.querySelector('.play-overlay');
    const placeholder = card.querySelector('.video-placeholder');
    let videoLoaded = false;

    const loadVideo = () => {
      if (!videoLoaded && video.dataset.src) {
        video.src = video.dataset.src;
        video.preload = 'metadata';
        videoLoaded = true;
        if (placeholder) {
          placeholder.style.display = 'none';
        }
      }
    };

    // Lazy load when card comes into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadVideo();
          observer.unobserve(card);
        }
      });
    }, { rootMargin: '100px' });
    observer.observe(card);

    card.addEventListener('mouseenter', () => {
      loadVideo();
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

  // Clear modal content before updating
  modalContent.innerHTML = '';

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

// Gallery state
let currentGalleryIndex = 0;

function updateModalContent() {
  const item = displayedItems[selectedIndex];
  if (!item) return;

  const isVideo = item.type === 'video' && /\.(mp4|webm|mov|m4v)$/i.test(item.src);
  const isGallery = item.type === 'gallery' && item.images && item.images.length > 0;

  // Reset gallery index when switching items
  currentGalleryIndex = 0;

  let mediaContent = '';

  if (isVideo) {
    mediaContent = `
      <video src="${item.src}" loop playsinline autoplay preload="auto"></video>
      <div class="modal-controls">
        <button class="modal-control-btn" id="mute-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
          </svg>
        </button>
      </div>
    `;
  } else if (isGallery) {
    // 画像が1枚の場合は通常の画像として表示
    if (item.images.length === 1) {
      mediaContent = `<img src="${item.images[0]}" alt="${item.title}">`;
    } else {
      // 複数画像の場合はギャラリー
      mediaContent = `
        <img src="${item.images[0]}" alt="${item.title}" id="gallery-image">
        <button class="gallery-nav gallery-nav-prev" id="gallery-prev">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <button class="gallery-nav gallery-nav-next" id="gallery-next">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
        <div class="gallery-dots" id="gallery-dots">
          ${item.images.map((_, i) => `
            <button class="gallery-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></button>
          `).join('')}
        </div>
      `;
    }
  } else {
    mediaContent = `<img src="${item.src}" alt="${item.title}">`;
  }

  modalContent.innerHTML = `
    ${mediaContent}
    <div class="modal-info">
      <h3 class="modal-title">${item.title}</h3>
      ${item.description ? `<p class="modal-description">${item.description}</p>` : ''}
      ${item.tags ? `
        <div class="modal-tags">
          ${item.tags.map(tag => `<span class="modal-tag">${tag}</span>`).join('')}
        </div>
      ` : ''}
      ${item.affiliate ? `
        <div class="modal-affiliate">
          <div class="modal-affiliate-label">PR - 商品リンク</div>
          <div class="modal-affiliate-content">
            <span class="modal-affiliate-product">${item.affiliate.product}</span>
            <a href="${item.affiliate.url}" target="_blank" rel="noopener noreferrer" class="modal-affiliate-link" onclick="event.stopPropagation();">
              購入する
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          </div>
        </div>
      ` : ''}
    </div>
  `;

  modalCounter.textContent = `${selectedIndex + 1} / ${displayedItems.length}`;

  // Set up video controls
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

    video.addEventListener('click', () => {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });
  }

  // Set up gallery controls
  if (isGallery && item.images.length > 1) {
    setupGalleryControls(item.images);
  }
}

// Store gallery images for current item
let currentGalleryImages = [];

function setupGalleryControls(images) {
  currentGalleryImages = images;
  const prevBtn = document.getElementById('gallery-prev');
  const nextBtn = document.getElementById('gallery-next');
  const dots = document.querySelectorAll('.gallery-dot');
  const galleryImage = document.getElementById('gallery-image');

  // Navigation buttons
  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navigateGallery(-1);
  });

  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navigateGallery(1);
  });

  // Dot navigation
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      const index = parseInt(dot.dataset.index);
      goToGallerySlide(index);
    });
  });

  // Touch/swipe support on image
  let touchStartX = 0;
  let touchEndX = 0;

  galleryImage.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  galleryImage.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        navigateGallery(1);
      } else {
        navigateGallery(-1);
      }
    }
  }, { passive: true });
}

function navigateGallery(direction) {
  const total = currentGalleryImages.length;
  let newIndex = currentGalleryIndex + direction;
  if (newIndex < 0) newIndex = total - 1;
  if (newIndex >= total) newIndex = 0;
  goToGallerySlide(newIndex);
}

function goToGallerySlide(index) {
  currentGalleryIndex = index;

  // Update image
  const galleryImage = document.getElementById('gallery-image');
  if (galleryImage && currentGalleryImages[index]) {
    galleryImage.src = currentGalleryImages[index];
  }

  // Update dots
  const dots = document.querySelectorAll('.gallery-dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
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

// Intro Loader
function initIntro() {
  const introLoader = document.getElementById('intro-loader');
  const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');

  if (hasSeenIntro) {
    // Skip intro if already seen in this session
    introLoader.classList.add('hidden');
    document.body.classList.remove('intro-active');
    return;
  }

  // Show intro
  document.body.classList.add('intro-active');

  // Hide intro after animation completes (3.5s animation + 0.3s buffer)
  setTimeout(() => {
    introLoader.classList.add('hidden');
    document.body.classList.remove('intro-active');
    sessionStorage.setItem('hasSeenIntro', 'true');
  }, 3800);
}

// Mobile Menu
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (!menuToggle || !navMenu) return;

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('mobile-active');
  });

  // Close menu when clicking on a link
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('mobile-active');
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Start
// Header scroll effect
function initHeaderScroll() {
  const header = document.querySelector('.header');

  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check initial state
}

document.addEventListener('DOMContentLoaded', () => {
  initIntro();
  initTheme();
  initMobileMenu();
  initHeaderScroll();
  init();
});
