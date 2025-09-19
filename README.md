# 🚀 getButton

一個輕量級的 Line/電話 浮動按鈕組件，支援 QR Code 彈窗顯示，**只需一行引入即可使用**！

## ✨ 特色

- 🚀 輕量級，無依賴，使用 IIFE 避免全域污染
- 📱 支援 Line QR Code 和電話撥號兩種模式
- 🎨 Line 官方風格設計，可自訂顏色
- ⚡ **一行 `<script>` 即可使用**
- 🌐 跨瀏覽器支援，響應式設計
- 🎯 支援多按鈕同時使用
- 📍 可調整位置（固定或內嵌）

## 🎯 3 秒快速上手

### 步驟 1：複製貼上這行程式碼

```html
<script src="https://cdn.jsdelivr.net/gh/AlExx1022/getButton_tool@main/src/core/getButton.js"></script>
```

### 步驟 2：完成！

就這樣！你的網站右下角會出現綠色的 Line 按鈕。

### 步驟 3：自訂設定（可選）

```html
<!DOCTYPE html>
<html>
<head>
    <title>我的網站</title>
</head>
<body>
    <!-- 你的網站內容 -->
  
    <!-- 1. 自訂配置（可選） -->
    <script>
        window.getButtonConfig = {
            qrCodeImage: './assets/your-qr.png',
            lineUrl: 'https://lin.ee/your-line-id',
            buttonColor: '#00c300'
        };
    </script>
  
    <!-- 2. 引入 getButton -->
    <script src="https://cdn.jsdelivr.net/gh/AlExx1022/getButton_tool@main/src/core/getButton.js"></script>
</body>
</html>
```

## 📚 詳細教學

### 🟢 Line 按鈕（預設）

最簡單的使用方式：

```html
<!-- 只要這一行，立即擁有 Line 按鈕！ -->
<script src="https://cdn.jsdelivr.net/gh/AlExx1022/getButton_tool@main/src/core/getButton.js"></script>
```

自訂 Line 設定：

```html
<script>
    window.getButtonConfig = {
        qrCodeImage: './assets/company-line-qr.png',  // 你的 QR Code 圖片
        lineUrl: 'https://lin.ee/your-company-id',    // 你的 Line 官方帳號連結
        buttonColor: '#00c300',                       // 按鈕顏色
        headerColor: '#00c300'                        // 彈窗標題顏色
    };
</script>
<script src="https://cdn.jsdelivr.net/gh/AlExx1022/getButton_tool@main/src/core/getButton.js"></script>
```

### 🔴 電話按鈕

```html
<script>
    window.getButtonConfig = {
        type: 'phone',                          // 設定為電話模式
        phoneNumber: '+886-2-1234-5678',        // 你的電話號碼
        buttonColor: '#e74c3c',                 // 紅色按鈕
        headerColor: '#e74c3c'                  // 紅色標題
    };
</script>
<script src="https://cdn.jsdelivr.net/gh/AlExx1022/getButton_tool@main/src/core/getButton.js"></script>
```

### 🎯 多按鈕（Line + 電話）

```html
<script>
    window.getButtonConfigs = [
        {
            type: 'line',
            qrCodeImage: './assets/line-qr.png',
            lineUrl: 'https://lin.ee/your-line-id',
            buttonColor: '#00c300'
        },
        {
            type: 'phone',
            phoneNumber: '+886-2-1234-5678',
            buttonColor: '#e74c3c'
        }
    ];
</script>
<script src="https://cdn.jsdelivr.net/gh/AlExx1022/getButton_tool@main/src/core/getButton.js"></script>
```

## ⚙️ 完整配置選項

### 基本配置

| 選項            | 類型   | 預設值                         | 說明                                |
| --------------- | ------ | ------------------------------ | ----------------------------------- |
| `type`        | string | `'line'`                     | 按鈕類型：`'line'` 或 `'phone'` |
| `qrCodeImage` | string | `'./src/assets/line-qr.svg'` | QR Code 圖片路徑（僅 Line 類型）    |
| `lineUrl`     | string | `'url'`                      | Line 連結 URL（僅 Line 類型）       |
| `phoneNumber` | string | `'+886912345678'`            | 電話號碼（僅 Phone 類型）           |

### 外觀配置

| 選項            | 類型   | 預設值        | 說明                             |
| --------------- | ------ | ------------- | -------------------------------- |
| `buttonColor` | string | `'#00c300'` | 按鈕背景色                       |
| `headerColor` | string | `'#00c300'` | 彈窗標題背景色                   |
| `theme`       | string | `'green'`   | 主題：`'green'` 或 `'white'` |

### 位置配置

| 選項         | 類型   | 預設值      | 說明                                  |
| ------------ | ------ | ----------- | ------------------------------------- |
| `position` | string | `'fixed'` | 定位方式：`'fixed'` 或 `'inline'` |
| `bottom`   | string | `'20px'`  | 距離底部距離                          |
| `right`    | string | `'20px'`  | 距離右側距離                          |

## 🎨 客製化範例

### 自訂位置

```javascript
window.getButtonConfig = {
    position: 'fixed',
    bottom: '30px',    // 距離底部 30px
    right: '30px',     // 距離右側 30px
    buttonColor: '#ff6b6b'
};
```

### 自訂顏色

```javascript
window.getButtonConfig = {
    buttonColor: '#ff6b6b',    // 粉紅色按鈕
    headerColor: '#4ecdc4'     // 青色標題
};
```

## 🔗 CDN 網址說明

### 主要網址（推薦）

```html
<script src="https://cdn.jsdelivr.net/gh/AlExx1022/getButton_tool@main/src/core/getButton.js"></script>
```

### 壓縮版本（更快載入）

```html
<script src="https://cdn.jsdelivr.net/gh/AlExx1022/getButton_tool@main/dist/getButton.min.js"></script>
```

### 指定版本（穩定性）

```html
<script src="https://cdn.jsdelivr.net/gh/AlExx1022/getButton_tool@v1.0.0/src/core/getButton.js"></script>
```

## 💡 使用技巧

### 1. 按鈕會自動出現在右下角

- 不需要額外的 HTML 元素
- 自動適應手機和桌面版

### 2. 多按鈕會垂直排列

- 第一個按鈕在最下方
- 第二個按鈕在上方，以此類推

### 3. QR Code 彈窗

- 點擊 Line 按鈕會在按鈕上方顯示 QR Code
- 點擊外部或按 ESC 鍵可關閉

### 4. 電話撥號

- 點擊電話按鈕會直接撥號
- 支援手機和桌面版瀏覽器

## 🛡️ 安全性

- ✅ 使用 IIFE 避免全域污染
- ✅ 純前端組件，無資料收集
- ✅ 不發送網路請求（除使用者設定的連結）
- ✅ 開源透明，可自行檢視程式碼

## 🔗 相關連結

- 📁 [GitHub 儲存庫](https://github.com/AlExx1022/getButton_tool)
- 📖 [如何產生官方QRcode](https://creer-design.com/blogView.php?id=11)
