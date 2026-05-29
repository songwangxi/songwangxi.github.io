(function() {
    const navHTML = `
    <nav class="navbar">
        <a href="/" class="logo"><i class="fa fa-globe"></i> 我的网站</a>
        <div class="nav-links">
            <a href="/"><i class="fa fa-home"></i> 主页</a>
            <a href="/share/"><i class="fa fa-share-alt"></i> 分享留言</a>
            <a href="https://songwangxi.freeflarum.com"><i class="fa fa-comments"></i> 论坛</a>
        </div>
    </nav>`;
    document.body.insertAdjacentHTML('afterbegin', navHTML);
})();
