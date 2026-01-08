// 简历页面逻辑
console.log("resume.js 文件已加载");

// 全屏模式功能
function openFullscreen() {
    console.log("打开全屏模式");
    
    const overlay = document.getElementById('fullscreenOverlay');
    const iframe = document.getElementById('fullscreenIframe');
    
    if (!overlay || !iframe) {
        console.error("找不到全屏覆盖层或iframe元素");
        return;
    }
    
    // 设置iframe源地址
    iframe.src = 'https://pvpj1eur84e.feishu.cn/docx/DywWdNmD3oCnAIxqbWAcQqrDnvb';
    
    // 显示全屏覆盖层
    overlay.classList.add('active');
    
    // 禁用页面滚动
    document.body.style.overflow = 'hidden';
}

function closeFullscreen() {
    console.log("关闭全屏模式");
    
    const overlay = document.getElementById('fullscreenOverlay');
    const iframe = document.getElementById('fullscreenIframe');
    
    if (!overlay || !iframe) {
        console.error("找不到全屏覆盖层或iframe元素");
        return;
    }
    
    // 隐藏全屏覆盖层
    overlay.classList.remove('active');
    
    // 恢复页面滚动
    document.body.style.overflow = '';
    
    // 清空iframe源地址以停止加载
    setTimeout(() => {
        iframe.src = '';
    }, 300);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log("页面DOM加载完成");
    
    // 添加ESC键关闭全屏功能
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const overlay = document.getElementById('fullscreenOverlay');
            if (overlay && overlay.classList.contains('active')) {
                closeFullscreen();
            }
        }
    });
    
    // 点击覆盖层背景关闭全屏
    const overlay = document.getElementById('fullscreenOverlay');
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closeFullscreen();
            }
        });
    }
    
    // 添加页面加载动画
    const cards = document.querySelectorAll('.statement-card, .prd-card');
    cards.forEach(function(card, index) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(function() {
            card.style.transition = 'all 0.6s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    console.log("resume.js 初始化完成");
});

// 确保函数在全局作用域中可用
window.openFullscreen = openFullscreen;
window.closeFullscreen = closeFullscreen;

console.log("resume.js 文件执行完毕");