export type MediaType = 'image' | 'video';
export type CategoryType = 'works' | 'model';

export interface PortfolioItem {
  id: string;
  type: MediaType;
  category: CategoryType;
  src: string;
  thumbnail?: string;
  title: string;
  description?: string;
  tags?: string[];
  date?: string;
  aspectRatio?: '9:16' | '16:9' | '1:1' | '4:5';
  affiliateLink?: string;
  affiliateProduct?: string;
}

export const portfolioItems: PortfolioItem[] = [
  // 制作物 (Works)
  {
    id: '1',
    type: 'video',
    category: 'works',
    src: '/videos/lowya.mov',
    title: 'LOWYA',
    description: '家具ブランドのプロモーション動画',
    tags: ['インテリア', 'プロモーション'],
    date: '2025-04',
    aspectRatio: '9:16',
    affiliateProduct: 'LOWYA 北欧デザインソファ',
    affiliateLink: 'https://www.lowya.com/',
  },
  {
    id: '2',
    type: 'video',
    category: 'works',
    src: '/videos/soundcore.mov',
    title: 'Soundcore Aeroclip',
    description: 'オーディオ製品のプロモーション動画',
    tags: ['プロダクト', 'テック'],
    date: '2025-04',
    aspectRatio: '9:16',
    affiliateProduct: 'Soundcore Aeroclip オープンイヤーイヤホン',
    affiliateLink: 'https://www.soundcore.com/',
  },
  {
    id: '3',
    type: 'video',
    category: 'works',
    src: '/videos/post3.mov',
    title: 'ショート動画',
    description: 'SNS向けショート動画制作',
    tags: ['ショート', 'SNS'],
    date: '2024-10',
    aspectRatio: '9:16',
  },
  {
    id: '4',
    type: 'video',
    category: 'works',
    src: '/videos/video1.mov',
    title: 'ライフスタイル',
    description: 'ライフスタイル動画制作',
    tags: ['ライフスタイル', 'Vlog'],
    date: '2024-12',
    aspectRatio: '9:16',
  },
  {
    id: '5',
    type: 'video',
    category: 'works',
    src: '/videos/video2.mov',
    title: 'プロモーション',
    description: 'ブランドプロモーション動画',
    tags: ['プロモーション', 'ブランディング'],
    date: '2025-02',
    aspectRatio: '9:16',
  },
  {
    id: '6',
    type: 'video',
    category: 'works',
    src: '/videos/video3.mov',
    title: 'コンテンツ制作',
    description: 'SNSコンテンツ制作',
    tags: ['SNS', 'コンテンツ'],
    date: '2024-12',
    aspectRatio: '9:16',
  },
  {
    id: '7',
    type: 'video',
    category: 'works',
    src: '/videos/video4.mov',
    title: 'クリエイティブ',
    description: 'クリエイティブ動画制作',
    tags: ['クリエイティブ', '映像'],
    date: '2024-08',
    aspectRatio: '9:16',
  },
  {
    id: '8',
    type: 'video',
    category: 'works',
    src: '/videos/video5.mov',
    title: 'ブランド動画',
    description: 'ブランド向け映像制作',
    tags: ['ブランド', 'プロモーション'],
    date: '2024-12',
    aspectRatio: '9:16',
  },
  {
    id: '9',
    type: 'video',
    category: 'works',
    src: '/videos/video6.mov',
    title: 'ショート動画',
    description: 'ショートフォーム動画制作',
    tags: ['ショート', 'SNS'],
    date: '2025-05',
    aspectRatio: '9:16',
  },
  {
    id: '10',
    type: 'video',
    category: 'works',
    src: '/videos/video7.mov',
    title: 'コンテンツ',
    description: 'オリジナルコンテンツ制作',
    tags: ['コンテンツ', '映像'],
    date: '2024-08',
    aspectRatio: '9:16',
  },
  // モデル (Model) - サンプルデータ（画像・動画を追加してください）
  {
    id: 'model-1',
    type: 'image',
    category: 'model',
    src: '/images/IMG_1390.JPG',
    title: 'モデル撮影',
    description: 'プロフィール撮影',
    tags: ['モデル', 'ポートレート'],
    date: '2024-12',
    aspectRatio: '9:16',
  },
];

export const profile = {
  name: 'Emi Hamamoto',
  bio: '日本を拠点に活動するフォトグラファー＆ビデオグラファー',
  avatar: '/images/IMG_1390.JPG',
  social: {
    instagram: 'https://www.instagram.com/xemooradx/',
    tiktok: 'https://www.tiktok.com/@xemi511x',
    twitter: 'https://twitter.com/',
    email: 'hello@example.com',
  },
};
