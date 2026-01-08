/**
 * 简化版验证系统
 * 规则：
 * 1. 验证名字只有两次机会，精确匹配
 * 2. 网站任何页面每分钟仅支持访问3次
 * 3. 取消所有其他复杂限制
 */
class SimpleAuthManager {
    constructor() {
        this.maxAttempts = 2;
        this.maxAccessPerMinute = 5;
        this.correctName = '田智宇';
        this.init();
    }

    init() {
        // 检查访问频率
        if (!this.checkAccessLimit()) {
            this.showAccessLimitMessage();
            return;
        }

        // 记录本次访问
        this.recordAccess();

        // 检查是否已验证
        if (this.isVerified()) {
            this.redirectToResume();
            return;
        }

        // 绑定事件
        this.bindEvents();
        this.updateAttemptDisplay();
    }

    bindEvents() {
        const verifyBtn = document.getElementById('verifyBtn');
        const nameInput = document.getElementById('nameInput');

        if (verifyBtn) {
            verifyBtn.addEventListener('click', () => this.handleVerify());
        }

        if (nameInput) {
            nameInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleVerify();
                }
            });
        }
    }

    handleVerify() {
        const nameInput = document.getElementById('nameInput');
        const inputName = nameInput ? nameInput.value.trim() : '';

        if (!inputName) {
            this.showMessage('请输入姓名', 'error');
            return;
        }

        // 精确匹配验证
        if (inputName === this.correctName) {
            this.setVerified();
            this.showMessage('验证成功，正在跳转...', 'success');
            setTimeout(() => {
                this.redirectToResume();
            }, 1000);
        } else {
            this.handleFailedAttempt();
        }
    }

    handleFailedAttempt() {
        const currentAttempts = this.getAttemptCount();
        const newAttempts = currentAttempts + 1;
        
        localStorage.setItem('auth_attempts', newAttempts.toString());
        
        const remainingAttempts = this.maxAttempts - newAttempts;
        
        if (remainingAttempts <= 0) {
            // 设置10分钟冷却期
            const now = Date.now();
            const tenMinutes = 10 * 60 * 1000;
            localStorage.setItem('simple_cooldown', (now + tenMinutes).toString());
            localStorage.removeItem('auth_attempts');
            this.showCooldownMessage(tenMinutes);
        } else {
            this.showMessage(`验证失败，还有 ${remainingAttempts} 次机会`, 'error');
            this.updateAttemptDisplay();
        }
    }

    checkAccessLimit() {
        const now = Date.now();
        const oneMinute = 60 * 1000;
        const tenMinutes = 10 * 60 * 1000;
        const accessKey = 'simple_access_log';
        const cooldownKey = 'simple_cooldown';
        
        // 检查是否在冷却期
        const cooldownEnd = localStorage.getItem(cooldownKey);
        if (cooldownEnd && now < parseInt(cooldownEnd)) {
            this.showCooldownMessage(parseInt(cooldownEnd) - now);
            return false;
        }
        
        // 获取访问记录
        const accessLog = JSON.parse(localStorage.getItem(accessKey) || '[]');
        
        // 清理超过1分钟的记录
        const recentAccess = accessLog.filter(time => now - time < oneMinute);
        
        // 检查是否超过限制
        if (recentAccess.length >= this.maxAccessPerMinute) {
            // 设置10分钟冷却期
            localStorage.setItem(cooldownKey, (now + tenMinutes).toString());
            this.showCooldownMessage(tenMinutes);
            return false;
        }
        
        return true;
    }

    recordAccess() {
        const now = Date.now();
        const accessKey = 'simple_access_log';
        
        // 获取访问记录
        const accessLog = JSON.parse(localStorage.getItem(accessKey) || '[]');
        
        // 添加当前访问时间
        accessLog.push(now);
        
        // 只保留最近1分钟的记录
        const oneMinute = 60 * 1000;
        const recentAccess = accessLog.filter(time => now - time < oneMinute);
        
        // 保存更新后的记录
        localStorage.setItem(accessKey, JSON.stringify(recentAccess));
    }

    showCooldownMessage(remainingTime) {
        const minutes = Math.ceil(remainingTime / (60 * 1000));
        document.body.innerHTML = `
            <div style="display: flex; justify-content: center; align-items: center; min-height: 100vh; background-color: #f5f5f5; font-family: Arial, sans-serif;">
                <div style="text-align: center; padding: 40px; background: white; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); max-width: 500px;">
                    <h2 style="color: #e74c3c; margin-bottom: 20px;">⏰ 访问限制</h2>
                    <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                        您的操作过于频繁或验证失败次数过多。
                    </p>
                    <p style="color: #666; font-size: 14px; margin-bottom: 30px;">
                        请等待约 ${minutes} 分钟后再试。
                    </p>
                    <p style="color: #999; font-size: 12px; margin-bottom: 20px;">
                        限制规则：每分钟最多访问 ${this.maxAccessPerMinute} 次
                    </p>
                    <button onclick="location.reload()" style="
                        background-color: #3498db;
                        color: white;
                        border: none;
                        padding: 12px 24px;
                        border-radius: 5px;
                        cursor: pointer;
                        font-size: 16px;
                    ">刷新页面</button>
                </div>
            </div>
        `;
    }

    getAttemptCount() {
        return parseInt(localStorage.getItem('auth_attempts') || '0');
    }

    updateAttemptDisplay() {
        const attemptElement = document.getElementById('attemptCount');
        if (attemptElement) {
            const currentAttempts = this.getAttemptCount();
            const remaining = this.maxAttempts - currentAttempts;
            attemptElement.textContent = `剩余尝试次数：${remaining}`;
        }
    }

    isVerified() {
        return localStorage.getItem('simple_verified') === 'true';
    }

    setVerified() {
        localStorage.setItem('simple_verified', 'true');
        localStorage.removeItem('auth_attempts'); // 清除尝试记录
    }

    redirectToResume() {
        window.location.href = 'resume.html';
    }

    showMessage(message, type) {
        const errorElement = document.getElementById('errorMessage');
        const successElement = document.getElementById('successMessage');
        
        // 隐藏所有消息
        if (errorElement) errorElement.style.display = 'none';
        if (successElement) successElement.style.display = 'none';
        
        // 显示对应类型的消息
        if (type === 'error' && errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        } else if (type === 'success' && successElement) {
            successElement.textContent = message;
            successElement.style.display = 'block';
        }
        
        // 3秒后自动隐藏
        setTimeout(() => {
            if (errorElement) errorElement.style.display = 'none';
            if (successElement) successElement.style.display = 'none';
        }, 3000);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    new SimpleAuthManager();
});