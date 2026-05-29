// ========== 1. 自定义渐变色（文字 + 链接下划线） ==========
function applyCustomGradients() {
    document.querySelectorAll('.gradient').forEach(el => {
        const color1 = el.getAttribute('color1');
        const color2 = el.getAttribute('color2');
        if (color1 && color2) {
            el.style.background = `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
            el.style.webkitBackgroundClip = 'text';
            el.style.backgroundClip = 'text';
            el.style.webkitTextFillColor = 'transparent';
            el.style.color = 'transparent';
        }
    });

    document.querySelectorAll('.link-underline').forEach(link => {
        const color1 = link.getAttribute('color1');
        const color2 = link.getAttribute('color2');
        if (color1 && color2) {
            link.style.setProperty('--underline-color1', color1);
            link.style.setProperty('--underline-color2', color2);
            link.classList.add('custom-underline');
        }
    });

    if (!document.getElementById('dynamic-underline-style')) {
        const styleTag = document.createElement('style');
        styleTag.id = 'dynamic-underline-style';
        styleTag.textContent = `.link-underline.custom-underline::after { background: linear-gradient(135deg, var(--underline-color1) 0%, var(--underline-color2) 100%) !important; }`;
        document.head.appendChild(styleTag);
    }
}

// ========== 2. 自定义按钮颜色 ==========
function applyButtonColors() {
    document.querySelectorAll('.toggle-btn[color1][color2]').forEach(btn => {
        const color1 = btn.getAttribute('color1');
        const color2 = btn.getAttribute('color2');
        btn.style.background = `linear-gradient(135deg, ${color1}, ${color2})`;
    });
}

// ========== 3. 加载偏好设置 ==========
function loadGradientPreference() {
    const body = document.body;
    const saved = localStorage.getItem('gradientPreference');
    if (saved === 'off') {
        body.classList.add('no-gradient');
    } else {
        body.classList.remove('no-gradient');
    }
    const btn = document.getElementById('gradientToggle');
    if (btn) {
        if (saved === 'off') {
            btn.textContent = '开启文字渐变';
            btn.classList.add('active');
        } else {
            btn.textContent = '关闭文字渐变';
            btn.classList.remove('active');
        }
    }
}

function loadUnderlinePreference() {
    const body = document.body;
    const saved = localStorage.getItem('underlinePreference');
    if (saved === 'off') {
        body.classList.add('no-underline');
    } else {
        body.classList.remove('no-underline');
    }
    const btn = document.getElementById('underlineToggle');
    if (btn) {
        if (saved === 'off') {
            btn.textContent = '开启下划线渐变';
            btn.classList.add('active');
        } else {
            btn.textContent = '关闭下划线渐变';
            btn.classList.remove('active');
        }
    }
}

function loadButtonGradientPreference() {
    const body = document.body;
    const saved = localStorage.getItem('buttonGradientPreference');
    if (saved === 'off') {
        body.classList.add('no-button-gradient');
    } else {
        body.classList.remove('no-button-gradient');
    }
    const btn = document.getElementById('buttonGradientToggle');
    if (btn) {
        if (saved === 'off') {
            btn.textContent = '开启按钮渐变';
            btn.classList.add('active');
        } else {
            btn.textContent = '关闭按钮渐变';
            btn.classList.remove('active');
        }
    }
}

function syncPreferences() {
    const body = document.body;
    localStorage.setItem('gradientPreference', body.classList.contains('no-gradient') ? 'off' : 'on');
    localStorage.setItem('underlinePreference', body.classList.contains('no-underline') ? 'off' : 'on');
    localStorage.setItem('buttonGradientPreference', body.classList.contains('no-button-gradient') ? 'off' : 'on');
}

// ========== 4. 绑定开关按钮事件 ==========
function bindToggleButtons() {
    const gradientToggle = document.getElementById('gradientToggle');
    const underlineToggle = document.getElementById('underlineToggle');
    const buttonGradientToggle = document.getElementById('buttonGradientToggle');
    const body = document.body;

    if (gradientToggle) {
        gradientToggle.addEventListener('click', () => {
            body.classList.toggle('no-gradient');
            if (body.classList.contains('no-gradient')) {
                gradientToggle.textContent = '开启文字渐变';
                gradientToggle.classList.add('active');
            } else {
                gradientToggle.textContent = '关闭文字渐变';
                gradientToggle.classList.remove('active');
            }
            syncPreferences();
        });
    }

    if (underlineToggle) {
        underlineToggle.addEventListener('click', () => {
            body.classList.toggle('no-underline');
            if (body.classList.contains('no-underline')) {
                underlineToggle.textContent = '开启下划线渐变';
                underlineToggle.classList.add('active');
            } else {
                underlineToggle.textContent = '关闭下划线渐变';
                underlineToggle.classList.remove('active');
            }
            syncPreferences();
        });
    }

    if (buttonGradientToggle) {
        buttonGradientToggle.addEventListener('click', () => {
            body.classList.toggle('no-button-gradient');
            if (body.classList.contains('no-button-gradient')) {
                buttonGradientToggle.textContent = '开启按钮渐变';
                buttonGradientToggle.classList.add('active');
            } else {
                buttonGradientToggle.textContent = '关闭按钮渐变';
                buttonGradientToggle.classList.remove('active');
            }
            syncPreferences();
        });
    }
}

// ========== 5. 导航栏高亮 ==========
function highlightNav() {
    const currentPath = window.location.pathname;
    let matchedLink = null;

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === currentPath) {
            matchedLink = link;
        }
    });

    if (!matchedLink) {
        let longestMatch = '';
        document.querySelectorAll('.nav-links a').forEach(link => {
            const href = link.getAttribute('href');
            if (href !== '/' && currentPath.startsWith(href) && href.length > longestMatch.length) {
                matchedLink = link;
                longestMatch = href;
            }
        });
    }

    if (matchedLink) {
        matchedLink.classList.add('active');
    }
}

// ========== 6. 分享页面功能（纯链接分享，无需后端） ==========
function bindShareFunction() {
    const messageInput = document.getElementById('messageInput');
    const shareBtn = document.getElementById('shareBtn');
    const shareArea = document.getElementById('shareArea');
    const shareLink = document.getElementById('shareLink');
    const copyBtn = document.getElementById('copyBtn');
    const messageList = document.getElementById('messageList');

    if (!shareBtn) return;

    // 生成分享链接
    shareBtn.addEventListener('click', () => {
        const text = messageInput.value.trim();
        if (!text) return alert('请先输入内容！');
        const encodedText = btoa(unescape(encodeURIComponent(text)));
        const currentUrl = window.location.href.split('?')[0];
        const shareUrl = `${currentUrl}?msg=${encodedText}`;
        shareLink.textContent = shareUrl;
        shareArea.classList.remove('hidden');
    });

    // 复制链接
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(shareLink.textContent).then(() => alert('链接已复制！'));
        });
    }

    // 从链接加载留言
    function loadSharedMessage() {
        const urlParams = new URLSearchParams(window.location.search);
        const encodedMsg = urlParams.get('msg');
        if (encodedMsg) {
            try {
                const decodedText = decodeURIComponent(escape(atob(encodedMsg)));
                messageList.innerHTML = `<li>${escapeHtml(decodedText)}</li>`;
            } catch (e) {
                messageList.innerHTML = '<li>链接中的留言无法解析。</li>';
            }
        }
    }

    function escapeHtml(text) {
        return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    loadSharedMessage();
}
// 滚动动画
function initScrollAnimation() {
    const targets = document.querySelectorAll('.card-animate, .text-animate');
    if (targets.length === 0) return;

    function updateAnimations() {
        const windowHeight = window.innerHeight;

        targets.forEach(el => {
            // 从元素属性读取动画区间，没有则用默认值
            const start = parseFloat(el.getAttribute('data-start')) || 1.0;
            const end = parseFloat(el.getAttribute('data-end')) || 0.3;

            const rect = el.getBoundingClientRect();
            const elTop = rect.top;
            const percent = elTop / windowHeight;

            let progress = (start - percent) / (start - end);
            progress = Math.max(0, Math.min(1, progress));

            el.style.opacity = progress;

            const tx = parseFloat(el.style.getPropertyValue('--tx')) || 0;
            const ty = parseFloat(el.style.getPropertyValue('--ty')) || 0;
            const sc = parseFloat(el.style.getPropertyValue('--sc')) || 1;

            const currentTx = tx * (1 - progress);
            const currentTy = ty * (1 - progress);
            const currentSc = sc + (1 - sc) * progress;

            el.style.transform = `translateX(${currentTx}px) translateY(${currentTy}px) scale(${currentSc})`;
        });
    }

    window.addEventListener('scroll', updateAnimations);
    updateAnimations();
}

    window.addEventListener('scroll', updateAnimations);
    updateAnimations(); // 初始调用
}
// ========== 卡片倾斜效果 ==========
function initTiltCards() {
    const cards = document.querySelectorAll('.card-tilt');
    if (cards.length === 0) return;

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;   // 鼠标在卡片内的水平位置
            const y = e.clientY - rect.top;    // 鼠标在卡片内的垂直位置
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // 计算倾斜角度（最大 8 度）
            const rotateY = ((x - centerX) / centerX) * 12;
            const rotateX = ((centerY - y) / centerY) * 12;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    });
}
// ========== 初始化 ==========
window.addEventListener('DOMContentLoaded', () => {
    applyCustomGradients();
    applyButtonColors();
    loadGradientPreference();
    loadUnderlinePreference();
    loadButtonGradientPreference();
    bindToggleButtons();
    highlightNav();
    bindShareFunction();
    initScrollAnimation();
    initTiltCards();
});
