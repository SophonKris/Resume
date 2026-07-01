const MAX_ATTEMPTS = 2;

let remainingAttempts = MAX_ATTEMPTS;
let isSubmitting = false;

const nameInput = document.getElementById('nameInput');
const verifyBtn = document.getElementById('verifyBtn');
const attemptCount = document.getElementById('attemptCount');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');

function updateAttemptDisplay() {
    attemptCount.textContent = `剩余尝试次数：${remainingAttempts}`;
}

function showError(msg) {
    errorMessage.textContent = msg;
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
}

function showSuccess(msg) {
    successMessage.textContent = msg;
    successMessage.style.display = 'block';
    errorMessage.style.display = 'none';
}

function hideMessages() {
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';
}

async function verifyName() {
    if (isSubmitting) return;

    const name = nameInput.value.trim();
    if (!name) {
        showError('请输入姓名');
        return;
    }

    if (remainingAttempts <= 0) {
        showError('尝试次数已用完，请稍后再试');
        return;
    }

    isSubmitting = true;
    verifyBtn.disabled = true;
    verifyBtn.textContent = '验证中...';
    hideMessages();

    try {
        const res = await fetch('/api/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });

        if (res.ok) {
            showSuccess('验证通过，正在进入...');
            setTimeout(() => {
                window.location.href = '/card.html';
            }, 500);
            return;
        }

        remainingAttempts = Math.max(0, remainingAttempts - 1);
        updateAttemptDisplay();

        if (res.status === 429) {
            showError('操作过于频繁，请稍后再试');
            verifyBtn.disabled = true;
        } else if (remainingAttempts <= 0) {
            showError('验证失败次数过多，请稍后再试');
            verifyBtn.disabled = true;
        } else {
            showError(`姓名校验失败，剩余 ${remainingAttempts} 次机会`);
        }
    } catch (err) {
        showError('网络异常，请稍后重试');
    } finally {
        isSubmitting = false;
        if (remainingAttempts > 0) {
            verifyBtn.disabled = false;
            verifyBtn.textContent = '验证';
        }
    }
}

verifyBtn.addEventListener('click', verifyName);

nameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        verifyName();
    }
});

updateAttemptDisplay();
