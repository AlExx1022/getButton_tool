# 🚀 getButton

一個輕量級的 Line/電話 浮動按鈕組件，支援 QR Code 彈窗顯示，可輕鬆嵌入任何網站。

## ✨ 特色

- 🚀 輕量級，無依賴，使用 IIFE 避免全域污染
- 📱 支援 Line QR Code 和電話撥號兩種模式
- 🎨 Line 官方風格設計，可自訂顏色
- 🔧 一行 `<script>` 即可使用
- 🌐 跨瀏覽器支援，響應式設計
- 🎯 支援多按鈕同時使用
- 📍 可調整位置（固定或內嵌）

## 🎯 快速開始

### 方法一：單一按鈕（Line）

```html
<!DOCTYPE html>
<html>
<head>
    <title>我的網站</title>
</head>
<body>
    <!-- 你的網站內容 -->
  
    <!-- 1. 設定配置 -->
    <script>
        window.getButtonConfig = {
            qrCodeImage: './assets/line-qr.png',
            lineUrl: 'https://lin.ee/your-line-id'
        };
    </script>
  
    <!-- 2. 引入腳本 -->
   [ <script src="https://your-server.com/path/to/getButton.js"></script>](https://cdn.jsdelivr.net/gh/AlExx1022/getButton_tool@main/src/core/getButton.js)
</body>
</html>
```

### 方法二：多按鈕（Line + 電話）

```html
<script>
    window.getButtonConfigs = [
        {
            type: 'line',
            qrCodeImage: './assets/line-qr.png',
            lineUrl: 'https://lin.ee/your-line-id',
            buttonColor: '#00c300',
            headerColor: '#00c300'
        },
        {
            type: 'phone',
            phoneNumber: '+886-2-1234-5678',
            buttonColor: '#e74c3c',
            headerColor: '#e74c3c'
        }
    ];
</script>
[<script src="https://your-server.com/path/to/getButton.js"></script>](https://cdn.jsdelivr.net/gh/AlExx1022/getButton_tool@main/src/core/getButton.js)
```

## ⚙️ 配置選項

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

## 📱 使用範例

### Line 按鈕（預設綠色）

```javascript
window.getButtonConfig = {
    type: 'line',
    qrCodeImage: './assets/company-line-qr.png',
    lineUrl: 'https://lin.ee/company-line-id',
    buttonColor: '#00c300',
    headerColor: '#00c300'
};
```

### 電話按鈕（紅色主題）

```javascript
window.getButtonConfig = {
    type: 'phone',
    phoneNumber: '+886-2-1234-5678',
    buttonColor: '#e74c3c',
    headerColor: '#e74c3c'
};
```

### 多按鈕垂直排列

```javascript
window.getButtonConfigs = [
    {
        type: 'line',
        qrCodeImage: './assets/line-qr.png',
        lineUrl: 'https://lin.ee/your-line-id'
    },
    {
        type: 'phone',
        phoneNumber: '+886-2-1234-5678',
        buttonColor: '#e74c3c',
        headerColor: '#e74c3c'
    }
];
```

> 💡 多按鈕會自動垂直排列，第一個在最下方，第二個在上方，以此類推。

### 自訂位置

```javascript
window.getButtonConfig = {
    type: 'line',
    position: 'fixed',
    bottom: '30px',    // 距離底部 30px
    right: '30px',     // 距離右側 30px
    qrCodeImage: './assets/line-qr.png',
    lineUrl: 'https://lin.ee/your-line-id'
};
```

## 🎨 客製化

### 修改 QR Code 圖片

1. 準備你的 QR Code 圖片（建議 200x200px）
2. 上傳到伺服器
3. 在配置中指定路徑：

```javascript
window.getButtonConfig = {
    qrCodeImage: './assets/my-custom-qr.png'
};
```

### 修改按鈕顏色

```javascript
window.getButtonConfig = {
    buttonColor: '#ff6b6b',    // 按鈕背景色
    headerColor: '#4ecdc4'     // 彈窗標題背景色
};
```
