# Expense Tracker (老爸的私房錢)

一個使用 Express + node.js 建立的記帳工具

![Login Page](/public/images/login.png)
![Register Page](/public/images/register.png)
![Home Page](/public/images/home.png)
![Add Page](/public/images/add.png)

### 功能描述 (features)：

- 使用者可以在首頁看到所有帳目與它們的簡單資料：
  帳目圖片--分類 / 帳目名稱 / 帳目日期 / 帳目金額 / 帳目總金額
- 使用者可以透過 "全部支出" 來找到特定的帳目與特定的帳目的總金額
- 使用者可以透過 "月份" 來找到特定的帳目與特定的帳目的總金額
- 使用者可以透過 "新增支出" 來建立特定的帳目
- 使用者可以透過 "修改" 變更帳目內容
- 使用者可以透過 "刪除" 移除不想要的帳目
- 使用者可以透過 "家庭記帳本" 連結回去首頁的帳目表
- 可以透過 Facebook Login 直接登入

供一組帳密供測試：

- email: 'root@example.com', password: '12345678'

### 安裝

0.安裝 MongoDB/安裝 Robo 3T/啟動、連線 MongoDB 資料庫

1.開啟終端機(Terminal)cd 到存放專案本機位置並執行:

```
git clone https://github.com/Goater1095/expense-tracker.git
```

2.初始

```
cd Restaurant-List  //切至專案資料夾
```

```
npm install  //安裝套件
```

3.開啟程式

```
npm run dev  //執行程式
```

終端顯示 This Server start on http://localhost:3000
即啟動完成，請至 http://localhost:3000 開始使用程式

### 使用工具

- Visual Studio Code - 開發環境
- Node.js - 執行環境
- Express - 應用程式架構

#### 相關插件

- "bcryptjs": "^2.4.3",
- "body-parser": "^1.19.0",
- "connect-flash": "^0.1.1",
- "dotenv": "^8.2.0",
- "express": "^4.17.1",
- "express-handlebars": "^5.1.0",
- "express-session": "^1.17.1",
- "method-override": "^3.0.0",
- "mongoose": "^5.10.9",
- "passport": "^0.4.1",
- "passport-facebook": "^3.0.0",
- "passport-local": "^1.0.0"
