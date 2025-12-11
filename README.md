# Emi Hamamoto Portfolio

ポートフォリオサイトのソースコードです。

## コンテンツの追加方法

### 動画の追加

`script.js` の `portfolioItems` 配列に以下の形式で追加します：

```javascript
{
  id: 'unique-id',
  type: 'video',
  category: 'promotions',  // 'promotions' | 'model' | 'original'
  src: 'public/videos/your-video.mp4',
  title: 'タイトル',
  description: '説明文',
},
```

### 画像の追加（単体）

```javascript
{
  id: 'unique-id',
  type: 'image',
  category: 'model',
  src: 'public/images/your-image.jpg',
  title: 'タイトル',
  description: '説明文',
},
```

### 画像ギャラリーの追加（複数画像をスワイプで閲覧）

```javascript
{
  id: 'unique-id',
  type: 'gallery',
  category: 'model',
  images: [
    'public/images/image1.jpg',
    'public/images/image2.jpg',
    'public/images/image3.jpg',
  ],
  title: 'タイトル',
  description: '説明文',
},
```

### アフィリエイトリンクの追加

任意のアイテムに `affiliate` プロパティを追加できます：

```javascript
{
  id: '1',
  type: 'video',
  category: 'promotions',
  src: 'public/videos/example.mp4',
  title: 'ANKER',
  description: 'Soundcore Aeroclip プロモーション動画',
  affiliate: {
    product: 'Soundcore Aeroclip',
    url: 'https://example.com/affiliate-link'
  }
},
```

## カテゴリ

| カテゴリ値 | タブ名 |
|-----------|--------|
| `promotions` | プロモーション |
| `model` | モデル |
| `original` | 自主制作 |

## ファイル配置

- 動画ファイル: `public/videos/` に配置
- 画像ファイル: `public/images/` に配置

## 動画の推奨設定

ウェブ用に最適化するため、以下の設定を推奨します：

- **コーデック**: H.264 (libx264)
- **ビットレート**: 2-4 Mbps
- **カラー**: 8-bit (yuv420p)
- **形式**: MP4

### FFmpeg変換コマンド例

```bash
ffmpeg -i input.MOV -c:v libx264 -crf 23 -preset medium -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart output.mp4
```

## ローカルでの確認方法

```bash
# Python 3の場合
python -m http.server 8000

# ブラウザで http://localhost:8000 にアクセス
```
