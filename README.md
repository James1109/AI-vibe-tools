# AI Developer Docs｜AI 工具與軟體開發手冊

一個由 `AGENTS.md` 規則驅動的個人知識庫靜態網站，主題是 AI 輔助開發（Vibe Coding、Cursor、Prompt 工程、AGENTS.md、GitHub Pages）。

## 特色
- 暗色 Slate 主題，Tailwind CSS + FontAwesome（CDN），響應式設計。
- 文章資料集中於 `js/data.js`，首頁與總覽頁自動渲染，並支援分類篩選。
- `docs/template.html` + `AGENTS.md` 讓 AI 能依同一套規則快速新增文章。

## 專案結構
詳見 [AGENTS.md](AGENTS.md)。

## 本機預覽
```bash
python -m http.server 8000
# 開啟 http://localhost:8000
```

## 部署
推送到 GitHub 後，於 Settings → Pages 選擇 `main` 分支、`/ (root)` 即可。

## 新增文章
複製 `docs/template.html` → 在 `js/data.js` 註冊 → 依 `AGENTS.md` 的 Checklist 檢查。
