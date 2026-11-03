# AGENTS.md - AI Developer Docs 專案協同開發規範

> 給 AI 代理（Cursor、Claude Code、Codex、ChatGPT 等）閱讀。開始任何修改前，請先完整讀完本文件。

## 1. 專案目的 (Project Purpose)
本專案是「AI 工具與軟體開發手冊」個人知識庫網站，內容為 AI 輔助開發的教學文章。
目標是建立一套**規則驅動**的靜態網站：AI 只要照本文件操作，就能快速新增文章，且風格、結構、路徑都保持一致。

- 類型：純靜態網站（HTML + Tailwind CDN + 少量原生 JavaScript），無建置流程、無後端。
- 語言：繁體中文（`lang="zh-TW"`），程式碼與檔名使用英文。
- 部署：GitHub Pages（`main` 分支、根目錄）。
- 預覽：在專案根目錄執行 `python -m http.server 8000`，開啟 `http://localhost:8000`。

## 2. 目錄結構 (Directory Structure)
```
/
├── AGENTS.md                      # 本文件（AI 協同規範）
├── README.md                      # 專案簡介（給人看）
├── .nojekyll                      # 讓 GitHub Pages 不經 Jekyll 處理
├── index.html                     # 首頁：Hero + 精選文章 + AGENTS 規則摘要
├── css/styles.css                 # 補充樣式（捲軸、程式碼字型、卡片 hover）
├── js/
│   ├── data.js                    # 資料中心：CATEGORIES、articles、renderArticles()
│   └── site.js                    # 共用腳本：自動設定 GitHub 連結
└── docs/
    ├── index.html                 # 文章總覽（含分類篩選，自動讀取 data.js）
    ├── template.html              # 文章標準模板（新文章一律由此複製）
    └── <article-name>.html        # 各篇文章
```
目前文章：`cursor-guide`、`vibe-coding-intro`、`prompt-engineering-basics`、`agents-md-guide`、`github-pages-deploy`。

## 3. 設計規範 (Design System)
- **風格**：現代暗色調 (Slate Dark)。
- **配色**：背景 `bg-slate-900`；卡片 `bg-slate-800`／`bg-slate-950`；主色 Indigo（`text-indigo-400`、`bg-indigo-600`，色碼 `#6366f1`）；標題 `text-slate-100`／`text-white`，內文 `text-slate-300`，輔助文字 `text-slate-400`。
- **框架與圖示**：Tailwind CSS（`https://cdn.tailwindcss.com`）、FontAwesome 6.4.0（cdnjs）。**不得引入其他 CSS／JS 框架。**
- **版面**：Mobile-First，使用 `sm:` `md:` `lg:`；首頁與總覽頁最大寬度 `max-w-6xl`，文章頁 `max-w-4xl`，皆 `mx-auto`。
- **H2 樣式**：`text-2xl font-bold text-white border-l-4 border-indigo-500 pl-3`。
- **補充樣式**需要時才加到 `css/styles.css`，不要在頁面內寫大量 `<style>`。

## 4. 命名規則 (Naming)
| 對象 | 規則 | 範例 |
|---|---|---|
| 文章檔名 | `docs/` 下、kebab-case、全小寫英文與數字 | `prompt-engineering-basics.html` |
| 文章 `id` | 與檔名（不含 `.html`）相同 | `prompt-engineering-basics` |
| 日期 | `YYYY-MM-DD`，使用實際撰寫日期 | `2026-11-03` |
| 分類 | 只能使用 `js/data.js` 中 `CATEGORIES` 的值 | `AI 技巧` |
| 錨點 id | `section-1`、`section-2`…，與 TOC 連結對應 | `#section-1` |

**分類清單**：`觀念解析`、`工具指南`、`AI 技巧`、`專案規範`、`部署教學`。需要新分類時，先在 `CATEGORIES` 加入，再使用；文章總覽頁的篩選按鈕會自動更新，不需改 HTML。

## 5. 新增文章 SOP (Add an Article)
### 步驟 1：建立文章檔
1. 複製 `docs/template.html` 為 `docs/<kebab-case>.html`。
2. 替換 `<title>`（格式：`文章標題 | AI Dev Docs`）、分類 Badge、`<h1>`、摘要、發布日期、TOC、內文、Key Takeaways。
3. 每篇文章必須保留六大區塊，順序固定：
   1. **Header 導覽列**（首頁、文章總覽、GitHub 連結）
   2. **Hero 標題區**（分類 Badge、日期、H1、1-2 句摘要）
   3. **Table of Contents**（連結對應各 `section-N`）
   4. **Main Article Body**（`<h2>` 分章節；程式碼用 `<pre><code>` 區塊，樣式 `bg-slate-950 border border-slate-800 rounded-xl p-4 overflow-x-auto`）
   5. **Key Takeaways**（Indigo 重點卡片，3-5 點）
   6. **Footer**
4. 文章末尾必須引入 `<script src="../js/site.js"></script>`（模板已包含，不可刪除）。
5. 程式碼區塊內的 `<`、`>`、`&` 需跳脫為 `&lt;`、`&gt;`、`&amp;`。

### 步驟 2：註冊到 `js/data.js`
在 `articles` 陣列**最上方**加入（最新文章在前）：
```javascript
{
    id: "prompt-engineering-basics",
    title: "Prompt 工程基礎指南",
    description: "學習如何精確撰寫提示詞，發揮 LLM 的最大潛能。",  // 一句話，約 30–50 字
    category: "AI 技巧",                                           // 必須在 CATEGORIES 內
    date: "2026-11-03",
    url: "docs/prompt-engineering-basics.html",                    // 一律以 docs/ 開頭
    icon: "fa-solid fa-terminal",                                  // FontAwesome 6 免費版圖示
    featured: false                                                // 是否顯示在首頁
}
```
- `featured: true` 代表顯示在首頁「精選文章」，**同時最多 4 篇**；超過時把較舊的改為 `false`。
- `icon` 建議：觀念解析 `fa-brain`、工具指南 `fa-code`、AI 技巧 `fa-terminal`、專案規範 `fa-file-lines`、部署教學 `fa-brands fa-github`。
- 首頁與 `docs/index.html` 會自動渲染新卡片，**不需要手動修改這兩個檔案**。

## 6. 路徑規則 (Paths)
- 根目錄頁面（`index.html`）：`css/styles.css`、`js/data.js`、`docs/xxx.html`。
- `docs/` 內頁面：`../css/styles.css`、`../js/data.js`、`../index.html`；同資料夾文章直接寫 `xxx.html`。
- 一律使用**相對路徑**，不可寫死 `/` 開頭或完整網址（網站部署在 `/<repo>/` 子路徑下）。
- GitHub 連結用 `<a data-github href="https://github.com">`，由 `js/site.js` 自動指向本 repo；要連到 repo 內檔案時加 `data-github-path="blob/main/AGENTS.md"`。**不要手動寫死個人帳號網址。**

## 7. AI 操作守則 (Rules for AI Assistants)
**必須做：**
1. 修改前先讀本文件與 `docs/template.html`，新內容要與既有文章風格一致。
2. 新增或修改文章後，同步更新 `js/data.js`（含 `date`）。
3. 重要區塊保留簡短 HTML／JS 註解。
4. 內容須正確、可實作；不確定的事實請不要編造，改為說明限制。
5. 完成後回報：新增／修改了哪些檔案、各自的路徑。

**禁止：**
1. 不得更動既有文章的內容或檔名，除非使用者明確要求。
2. 不得引入 React／Vue／jQuery 等其他框架，或新增建置工具（npm、webpack 等）。
3. 不得更改配色系統、版面最大寬度、導覽列結構。
4. 不得使用外部圖片熱連結；需要圖片時放在 `assets/img/`（kebab-case 檔名）並以相對路徑引用。
5. 不得在頁面中寫入個人敏感資訊或金鑰。

## 8. 完成檢查清單 (Checklist)
新增文章後，逐項確認：
- [ ] 檔案位於 `docs/`，檔名為 kebab-case
- [ ] 由 `template.html` 複製，六大區塊齊全，無殘留 `[分類名稱]`、`[請填寫…]` 等模板文字
- [ ] `<title>`、H1、`data.js` 的 `title` 一致
- [ ] 分類在 `CATEGORIES` 內，日期為 `YYYY-MM-DD`
- [ ] `data.js` 已註冊，`url` 與實際檔案一致，`featured` 不超過 4 篇
- [ ] TOC 連結與各 `section-N` 對應
- [ ] 路徑使用 `../` 相對路徑，且包含 `../js/site.js`
- [ ] 本機預覽首頁、總覽頁、新文章皆正常顯示，手機寬度排版正常

## 9. 範例指令 (Example Prompts)
- 「依照 AGENTS.md，新增一篇『Git 基礎指令』文章，分類為『工具指南』。」
- 「依照 AGENTS.md，新增分類『資料科學』，並寫一篇 Pandas 入門文章。」
- 「依照 AGENTS.md，檢查所有文章是否符合 Checklist，並列出不合規的地方。」
