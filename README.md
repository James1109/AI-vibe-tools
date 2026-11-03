# AI Developer Docs｜AI 工具與軟體開發手冊

> 一個由 `AGENTS.md` 規則驅動的個人知識庫靜態網站，整理 AI 輔助開發（Vibe Coding）的觀念、工具與實作流程。

**🌐 線上網站**：<https://james1109.github.io/AI-vibe-tools/>
**📦 原始碼**：<https://github.com/James1109/AI-vibe-tools>

---

## 目錄
- [專案簡介](#專案簡介)
- [網站內容](#網站內容)
- [技術架構](#技術架構)
- [專案結構](#專案結構)
- [本機執行](#本機執行)
- [AI 協作開發流程](#ai-協作開發流程)
- [設計規範摘要](#設計規範摘要)

## 專案簡介
本專案是「規則驅動 (Rule-Driven)」開發的實作示範。與其每次都重新向 AI 說明需求，不如將專案目的、頁面結構、命名規則與檢查清單寫進 [`AGENTS.md`](AGENTS.md)，讓 AI 讀完即可依同一套標準，快速且一致地擴充新頁面。

**專案目標**
- 建立結構清楚、容易擴充的靜態教學網站。
- 透過 `AGENTS.md` 讓 AI 代理（Cursor、Claude Code、Codex 等）能獨立完成新增文章的全部流程。
- 以資料驅動方式維護內容，新增文章不需修改首頁或總覽頁。

## 網站內容
| 文章 | 分類 |
|---|---|
| [什麼是 Vibe Coding？AI 時代的新開發範式](https://james1109.github.io/AI-vibe-tools/docs/vibe-coding-intro.html) | 觀念解析 |
| [Cursor 編輯器高效開發實戰指南](https://james1109.github.io/AI-vibe-tools/docs/cursor-guide.html) | 工具指南 |
| [Prompt 工程基礎指南](https://james1109.github.io/AI-vibe-tools/docs/prompt-engineering-basics.html) | AI 技巧 |
| [如何撰寫 AGENTS.md：讓 AI 讀懂你的專案](https://james1109.github.io/AI-vibe-tools/docs/agents-md-guide.html) | 專案規範 |
| [GitHub Pages 部署教學](https://james1109.github.io/AI-vibe-tools/docs/github-pages-deploy.html) | 部署教學 |

網站功能：精選文章首頁、文章總覽與分類篩選、響應式版面（支援手機與桌機）、自動連結至本 Repository。

## 技術架構
- **前端**：HTML5、原生 JavaScript（無建置流程、無後端）
- **樣式**：Tailwind CSS（CDN）、FontAwesome 6（CDN）
- **資料**：`js/data.js` 作為文章資料中心，由 `renderArticles()` 動態渲染
- **部署**：GitHub Pages（`main` 分支 / 根目錄）

## 專案結構
```
.
├── AGENTS.md              # AI 協同開發規範
├── README.md              # 專案說明
├── index.html             # 首頁
├── css/styles.css         # 補充樣式
├── js/
│   ├── data.js            # 文章資料、分類清單與渲染函式
│   └── site.js            # 共用腳本（GitHub 連結自動設定）
└── docs/
    ├── index.html         # 文章總覽（含分類篩選）
    ├── template.html      # 文章標準模板
    └── *.html             # 各篇文章
```

## 本機執行
本專案為純靜態網站，無需安裝任何套件。於專案根目錄執行：

```bash
python -m http.server 8000
```

接著以瀏覽器開啟 <http://localhost:8000>。

## AI 協作開發流程
新增一篇文章的標準流程（完整規範請見 [`AGENTS.md`](AGENTS.md)）：

1. 複製 `docs/template.html` 為 `docs/<kebab-case>.html`，填入標題、分類、摘要、目錄與內文。
2. 於 `js/data.js` 的 `articles` 陣列最上方註冊文章資料，分類須屬於 `CATEGORIES`。
3. 依 `AGENTS.md` 第 8 節的檢查清單逐項確認。
4. 首頁與總覽頁將自動顯示新文章。

**範例指令**
> 依照 AGENTS.md，新增一篇「Git 基礎指令」文章，分類為「工具指南」。

## 設計規範摘要
- **風格**：現代暗色調 (Slate Dark)，主色 Indigo (`#6366f1`)。
- **版面**：Mobile-First 響應式，首頁最大寬度 `max-w-6xl`，文章頁 `max-w-4xl`。
- **命名**：文章檔名使用 kebab-case；日期格式 `YYYY-MM-DD`。
- **限制**：不引入其他前端框架，不使用外部圖片熱連結。
