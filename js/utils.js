// 工具函数
class Utils {
    // 防抖函数
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // 节流函数
    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // 获取设备唯一标识
    static getDeviceId() {
        let deviceId = localStorage.getItem('deviceId');
        if (!deviceId) {
            deviceId = 'device_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('deviceId', deviceId);
        }
        return deviceId;
    }

    // 检查访问频率
    static checkAccessFrequency() {
        const deviceId = this.getDeviceId();
        const now = Date.now();
        const accessKey = `access_${deviceId}`;
        const lastAccess = localStorage.getItem(accessKey);
        
        if (lastAccess && (now - parseInt(lastAccess)) < 1000) {
            return false; // 访问过于频繁
        }
        
        localStorage.setItem(accessKey, now.toString());
        return true;
    }

    // 获取尝试次数
    static getAttemptCount() {
        const deviceId = this.getDeviceId();
        const attemptKey = `attempts_${deviceId}`;
        const attempts = localStorage.getItem(attemptKey);
        return attempts ? parseInt(attempts) : 0;
    }

    // 增加尝试次数
    static incrementAttemptCount() {
        const deviceId = this.getDeviceId();
        const attemptKey = `attempts_${deviceId}`;
        const currentAttempts = this.getAttemptCount();
        const newAttempts = currentAttempts + 1;
        localStorage.setItem(attemptKey, newAttempts.toString());
        return newAttempts;
    }

    // 检查是否已验证通过
    static isVerified() {
        const deviceId = this.getDeviceId();
        const verifyKey = `verified_${deviceId}`;
        return localStorage.getItem(verifyKey) === 'true';
    }

    // 设置验证状态
    static setVerified(status) {
        const deviceId = this.getDeviceId();
        const verifyKey = `verified_${deviceId}`;
        localStorage.setItem(verifyKey, status.toString());
    }

    // 检查是否被禁止访问
    static isBanned() {
        const deviceId = this.getDeviceId();
        const banKey = `banned_${deviceId}`;
        const banTime = localStorage.getItem(banKey);
        
        if (!banTime) return false;
        
        const now = Date.now();
        const banExpiry = parseInt(banTime) + (24 * 60 * 60 * 1000); // 24小时后解禁
        
        if (now < banExpiry) {
            return true;
        } else {
            localStorage.removeItem(banKey);
            return false;
        }
    }

    // 设置禁止访问
    static setBanned() {
        const deviceId = this.getDeviceId();
        const banKey = `banned_${deviceId}`;
        localStorage.setItem(banKey, Date.now().toString());
    }

    // 显示消息
    static showMessage(elementId, message, type = 'error', duration = 3000) {
        const element = document.getElementById(elementId);
        if (!element) return;

        element.textContent = message;
        element.className = `${type}-message`;
        element.style.display = 'block';

        if (duration > 0) {
            setTimeout(() => {
                element.style.display = 'none';
            }, duration);
        }
    }

    // 隐藏消息
    static hideMessage(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.style.display = 'none';
        }
    }

    // 页面跳转
    static redirect(url, delay = 0) {
        if (delay > 0) {
            setTimeout(() => {
                window.location.href = url;
            }, delay);
        } else {
            window.location.href = url;
        }
    }

    // 格式化时间
    static formatTime(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString('zh-CN');
    }

    // 清理过期数据
    static cleanExpiredData() {
        const keys = Object.keys(localStorage);
        const now = Date.now();
        
        keys.forEach(key => {
            if (key.startsWith('access_')) {
                const timestamp = localStorage.getItem(key);
                if (timestamp && (now - parseInt(timestamp)) > (24 * 60 * 60 * 1000)) {
                    localStorage.removeItem(key);
                }
            }
        });
    }
}

// 页面加载时清理过期数据
document.addEventListener('DOMContentLoaded', () => {
    Utils.cleanExpiredData();
});