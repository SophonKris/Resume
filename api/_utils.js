const crypto = require('crypto');

function ensureEnv() {
    if (!process.env.JWT_SECRET) {
        throw new Error('Missing environment variable: JWT_SECRET');
    }
    if (!process.env.HASHED_NAME) {
        throw new Error('Missing environment variable: HASHED_NAME');
    }
}

function normalizeName(name) {
    return String(name || '').trim().toLowerCase().normalize('NFC');
}

function hashName(name) {
    return crypto.createHash('sha256').update(normalizeName(name)).digest('hex');
}

function base64UrlEncode(buf) {
    return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(str) {
    const padding = '='.repeat((4 - (str.length % 4)) % 4);
    return Buffer.from(str.replace(/-/g, '+').replace(/_/g, '/') + padding, 'base64');
}

function signJwt(payload, secret) {
    const header = { alg: 'HS256', typ: 'JWT' };
    const headerB64 = base64UrlEncode(Buffer.from(JSON.stringify(header)));
    const payloadB64 = base64UrlEncode(Buffer.from(JSON.stringify(payload)));
    const signingInput = `${headerB64}.${payloadB64}`;
    const signature = crypto.createHmac('sha256', secret).update(signingInput).digest();
    const signatureB64 = base64UrlEncode(signature);
    return `${signingInput}.${signatureB64}`;
}

function verifyJwt(token, secret) {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [headerB64, payloadB64, signatureB64] = parts;
    const signingInput = `${headerB64}.${payloadB64}`;
    const expectedSig = base64UrlEncode(crypto.createHmac('sha256', secret).update(signingInput).digest());

    if (!crypto.timingSafeEqual(Buffer.from(signatureB64), Buffer.from(expectedSig))) {
        return null;
    }

    try {
        const payload = JSON.parse(base64UrlDecode(payloadB64).toString('utf8'));
        if (payload.exp && Date.now() >= payload.exp * 1000) {
            return null;
        }
        return payload;
    } catch {
        return null;
    }
}

function getClientIp(req) {
    const forwarded = req.headers['x-forwarded-for'];
    if (forwarded) {
        return String(forwarded).split(',')[0].trim();
    }
    return req.socket.remoteAddress || 'unknown';
}

function parseCookies(req) {
    const cookieHeader = req.headers.cookie || '';
    const cookies = {};
    cookieHeader.split(';').forEach((part) => {
        const [key, ...rest] = part.trim().split('=');
        if (key) {
            cookies[key] = decodeURIComponent(rest.join('=') || '');
        }
    });
    return cookies;
}

function isLocalhost(req) {
    const host = req.headers.host || '';
    return host.startsWith('localhost') || host.startsWith('127.0.0.1');
}

function buildCookie(name, value, maxAge, req) {
    const secure = !isLocalhost(req) ? 'Secure;' : '';
    return `${name}=${value}; HttpOnly; ${secure} SameSite=Strict; Path=/; Max-Age=${maxAge}`;
}

function setJsonHeader(res) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
}

function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch {
                reject(new Error('Invalid JSON'));
            }
        });
        req.on('error', reject);
    });
}

// Simple in-memory rate limiting. Not strict across multiple serverless instances,
// but sufficient for a personal site on the free Hobby tier.
const MAX_FAILURES_PER_MINUTE = 10;
const rateStore = new Map();

function checkRateLimit(ip) {
    const now = Date.now();
    const entry = rateStore.get(ip);

    if (!entry || now > entry.resetAt) {
        rateStore.set(ip, { count: 0, resetAt: now + 60 * 1000 });
    }

    const current = rateStore.get(ip);
    if (current.count >= MAX_FAILURES_PER_MINUTE) {
        return { allowed: false, resetAt: current.resetAt };
    }
    return { allowed: true };
}

function recordFailure(ip) {
    const entry = rateStore.get(ip);
    if (entry) {
        entry.count += 1;
    }
}

module.exports = {
    ensureEnv,
    normalizeName,
    hashName,
    signJwt,
    verifyJwt,
    getClientIp,
    parseCookies,
    isLocalhost,
    buildCookie,
    setJsonHeader,
    parseBody,
    checkRateLimit,
    recordFailure
};
