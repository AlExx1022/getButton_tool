# getButton - Line QR Code 按鈕組件

## 功能需求

### 核心功能
- 建立一個可點擊的按鈕組件
- 點擊後顯示 Line 品牌風格的彈窗
- 彈窗包含：
  - Line QR Code 圖片（從檔案載入）
  - 對應的 Line 連結 URL
  - Line 品牌色彩和樣式

### 技術需求
- 使用 IIFE（立即執行函式）模式
- 避免全域命名空間汙染
- 單一 JavaScript 檔案，可直接引入
- 不依賴外部函式庫
- 支援現代瀏覽器

### 使用方式
使用者只需在 HTML 中加入：
```html
<script src="getButton.js"></script>
```

然後在頁面中加入：
```html
<div id="line-button"></div>
```

### 設定選項
支援自訂設定：
- QR Code 圖片路徑
- Line 連結 URL
- 按鈕樣式
- 彈窗位置

## 檔案結構

```
getButton/
├── src/
│   ├── core/
│   │   └── getButton.js          # 核心功能
│   ├── ui/
│   │   ├── modal.js              # 彈窗組件
│   │   └── button.js             # 按鈕組件
│   ├── styles/
│   │   ├── button.css            # 按鈕樣式
│   │   └── modal.css             # 彈窗樣式
│   └── assets/
│       └── line-qr.png           # QR Code 圖片
├── dist/
│   └── getButton.min.js          # 打包後的檔案
├── examples/
│   ├── basic.html                # 基本使用範例
│   └── custom.html               # 自訂設定範例
└── tests/
    └── test.html                 # 測試頁面
```

## API 設計

```javascript
// 全域設定
window.getButtonConfig = {
  qrCodeImage: './assets/line-qr.png',
  lineUrl: 'https://lin.ee/mk5SfVU',
  buttonText: 'Line',
  theme: 'green' // green, white
};
```
