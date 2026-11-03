/**
 * 文章數據中心與動態渲染腳本
 * Last Updated: 2026-11-03
 * 規則：新增 docs/*.html 後，必須在 articles 陣列「最上方」註冊一筆資料（最新文章在前）。
 */

// 允許的分類（category 只能使用這裡的值）
const CATEGORIES = ["觀念解析", "工具指南", "AI 技巧", "專案規範", "部署教學"];

const articles = [
    {
        id: "github-pages-deploy",
        title: "GitHub Pages 部署教學：三分鐘公開你的靜態網站",
        description: "從建立 Repository、推送程式碼到開啟 Pages，一步一步讓網站上線。",
        category: "部署教學",
        date: "2026-11-03",
        url: "docs/github-pages-deploy.html",
        icon: "fa-brands fa-github",
        featured: false
    },
    {
        id: "agents-md-guide",
        title: "如何撰寫 AGENTS.md：讓 AI 讀懂你的專案",
        description: "拆解一份好的 AGENTS.md 應包含的章節，並說明為什麼規則能讓 AI 穩定擴充專案。",
        category: "專案規範",
        date: "2026-11-03",
        url: "docs/agents-md-guide.html",
        icon: "fa-solid fa-file-lines",
        featured: true
    },
    {
        id: "prompt-engineering-basics",
        title: "Prompt 工程基礎指南",
        description: "學習如何精確撰寫提示詞：角色、任務、限制與輸出格式，發揮 LLM 的最大潛能。",
        category: "AI 技巧",
        date: "2026-11-03",
        url: "docs/prompt-engineering-basics.html",
        icon: "fa-solid fa-terminal",
        featured: true
    },
    {
        id: "cursor-guide",
        title: "Cursor 編輯器高效開發實戰指南",
        description: "探索 Cursor 核心功能：Composer、AI Command K 與專案級上下文 Indexing，倍增程式開發效率。",
        category: "工具指南",
        date: "2026-11-03",
        url: "docs/cursor-guide.html",
        icon: "fa-solid fa-code",
        featured: true
    },
    {
        id: "vibe-coding-intro",
        title: "什麼是 Vibe Coding？AI 時代的新開發範式",
        description: "深入了解如何從語法工程師轉型為思考架構師，利用自然語言與 AI 協同快速構建應用。",
        category: "觀念解析",
        date: "2026-11-03",
        url: "docs/vibe-coding-intro.html",
        icon: "fa-solid fa-brain",
        featured: true
    }
];

/**
 * 渲染文章卡片至指定容器
 * @param {string} containerId - 目標 HTML 容器 ID
 * @param {boolean} featuredOnly - 是否僅渲染精選文章
 * @param {string|null} category - 僅渲染指定分類（null 代表全部）
 */
function renderArticles(containerId, featuredOnly = false, category = null) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const isSubDir = window.location.pathname.includes('/docs/');
    let filteredArticles = featuredOnly ? articles.filter(a => a.featured) : articles;
    if (category) filteredArticles = filteredArticles.filter(a => a.category === category);

    container.innerHTML = filteredArticles.map(article => {
        const articleUrl = isSubDir ? article.url.replace('docs/', '') : article.url;
        return `
            <a href="${articleUrl}" class="block group bg-slate-800/60 hover:bg-slate-800 rounded-xl p-6 border border-slate-700/60 hover:border-indigo-500/50 transition-all duration-200 card-hover-effect">
                <div class="flex items-center justify-between mb-3">
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        <i class="${article.icon}"></i> ${article.category}
                    </span>
                    <span class="text-xs text-slate-400 font-mono">${article.date}</span>
                </div>
                <h3 class="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors mb-2">
                    ${article.title}
                </h3>
                <p class="text-sm text-slate-400 line-clamp-2 mb-4">
                    ${article.description}
                </p>
                <div class="text-xs font-semibold text-indigo-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    閱讀全文 <i class="fa-solid fa-arrow-right"></i>
                </div>
            </a>
        `;
    }).join('');
}