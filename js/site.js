/**
 * 全站共用腳本：自動把標記 data-github 的連結指向本專案的 GitHub Repository。
 * - 部署在 GitHub Pages（<user>.github.io/<repo>/）時，自動推算 repo 網址。
 * - 在本機或其他網域瀏覽時，退回 https://github.com。
 * 用法：<a data-github>、<a data-github data-github-path="blob/main/AGENTS.md">
 */
(function () {
    function repoUrl() {
        var host = window.location.hostname;
        if (host.endsWith('.github.io')) {
            var user = host.split('.')[0];
            var repo = window.location.pathname.split('/').filter(Boolean)[0];
            if (repo && repo.indexOf('.html') === -1) return 'https://github.com/' + user + '/' + repo;
            return 'https://github.com/' + user;
        }
        return 'https://github.com';
    }
    document.addEventListener('DOMContentLoaded', function () {
        var base = repoUrl();
        document.querySelectorAll('a[data-github]').forEach(function (a) {
            var path = a.getAttribute('data-github-path');
            a.href = path && base !== 'https://github.com' ? base + '/' + path : base;
        });
    });
})();
