// 自动生成导航栏
(function() {
    const currentPath = window.location.pathname;

    // 定义导航项：链接地址, 图标, 文字
    const navItems = [
        { href: '/', icon: 'fa-home', text: '主页' },
        { href: '/share/', icon: 'fa-share-alt', text: '分享留言' },
        { href: 'https://songwangxi.freeflarum.com', icon: 'fa-comments', text: '论坛', external: true }
    ];

    // 生成 HTML
    let linksHTML = '';
    navItems.forEach(item => {
        const isActive = (currentPath === item.href);
        const activeClass = isActive ? ' active' : '';
        const targetAttr = item.external ? ' target="_blank"' : '';
        linksHTML += `<a href="${item.href}"${targetAttr} class="${activeClass}"><i class="fa ${item.icon}"></i> ${item.text}</a>`;
    });

    const navbarHTML = `
    <nav class="navbar">
        <a href="/" class="logo"><i class="fa fa-globe"></i> 我的网站</a>
        <div class="nav-links">
            ${linksHTML}
        </div>
    </nav>`;

    // 插入到页面最顶部
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);

    // 高亮当前页面对应的导航项
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
})();
