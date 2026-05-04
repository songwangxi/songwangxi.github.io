const WORKER_URL = 'https://songwangxigithubio.songwei315.workers.dev/';
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
    // 按钮更新独立处理，不存在就跳过
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

        // 1. 优先完全匹配
        if (href === currentPath) {
            matchedLink = link;
        }
    });

    // 2. 如果没有完全匹配，寻找最长的前缀匹配（父级菜单高亮）
    if (!matchedLink) {
        let longestMatch = '';
        document.querySelectorAll('.nav-links a').forEach(link => {
            const href = link.getAttribute('href');
            // 必须以 / 结尾的父路径，避免 /share 误匹配 /shareholder
            if (href !== '/' && currentPath.startsWith(href) && href.length > longestMatch.length) {
                matchedLink = link;
                longestMatch = href;
            }
        });
    }

    // 应用高亮
    if (matchedLink) {
        matchedLink.classList.add('active');
    }
}

// ========== 6. 分享留言功能 ==========
function bindShareFunction() {
    const messageInput = document.getElementById('messageInput');
    const shareBtn = document.getElementById('shareBtn');
    const shareArea = document.getElementById('shareArea');
    const shareLink = document.getElementById('shareLink');
    const copyBtn = document.getElementById('copyBtn');
    const messageList = document.getElementById('messageList');

    if (!shareBtn) return;
const sendBtn = document.getElementById('sendBtn');
if (sendBtn) {
    sendBtn.addEventListener('click', sendMessage);
}
    // 生成分享链接（保留原有功能）
    shareBtn.addEventListener('click', () => {
        const text = messageInput.value.trim();
        if (!text) return alert('请先输入内容！');
        const encodedText = btoa(unescape(encodeURIComponent(text)));
        const currentUrl = window.location.href.split('?')[0];
        const shareUrl = `${currentUrl}?msg=${encodedText}`;
        shareLink.textContent = shareUrl;
        shareArea.classList.remove('hidden');
    });

    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(shareLink.textContent).then(() => alert('链接已复制！'));
        });
    }

    // 加载留言（从 Cloudflare Worker 获取）
    async function loadMessages() {
        try {
            const res = await fetch(WORKER_URL);
            const messages = await res.json();
            if (messages.length === 0) {
                messageList.innerHTML = '<li>还没有留言，来写第一条吧！</li>';
                return;
            }
            messageList.innerHTML = messages.map(msg => 
                `<li>${escapeHtml(msg.text)}</li>`
            ).join('');
        } catch (e) {
            messageList.innerHTML = '<li>加载失败，请稍后再试。</li>';
        }
    }

    // 发送留言到 Cloudflare Worker
    async function sendMessage() {
        const text = messageInput.value.trim();
        if (!text) return;
        try {
            await fetch(WORKER_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: text })
            });
            messageInput.value = '';
            loadMessages();
        } catch (e) {
            alert('发送失败，请稍后再试。');
        }
    }

    // 给输入框绑定回车键发送
    messageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // 每3秒自动刷新
    setInterval(loadMessages, 3000);
    loadMessages();
}

function escapeHtml(text) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ========== 初始化 ==========
window.addEventListener('DOMContentLoaded', () => {
    applyCustomGradients();
    applyButtonColors();
    loadGradientPreference();
    loadUnderlinePreference();
    loadButtonGradientPreference();   // ← 加上
    bindToggleButtons();
    highlightNav();
    bindShareFunction();
});
