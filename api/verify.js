const {
    ensureEnv,
    hashName,
    signJwt,
    getClientIp,
    buildCookie,
    setJsonHeader,
    parseBody,
    checkRateLimit,
    recordFailure
} = require('./_utils');

const TOKEN_MAX_AGE = 60 * 60; // 1 hour

module.exports = async (req, res) => {
    try {
        ensureEnv();
    } catch (err) {
        setJsonHeader(res);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Server configuration error' }));
        return;
    }

    if (req.method !== 'POST') {
        setJsonHeader(res);
        res.statusCode = 405;
        res.end(JSON.stringify({ error: 'Method not allowed' }));
        return;
    }

    const ip = getClientIp(req);
    const limit = checkRateLimit(ip);
    if (!limit.allowed) {
        setJsonHeader(res);
        res.statusCode = 429;
        res.end(JSON.stringify({ error: 'Too many attempts. Please try again later.' }));
        return;
    }

    let body;
    try {
        body = await parseBody(req);
    } catch {
        setJsonHeader(res);
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Invalid request body' }));
        return;
    }

    const name = body.name;
    if (!name || typeof name !== 'string') {
        setJsonHeader(res);
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Name is required' }));
        return;
    }

    const inputHash = hashName(name);
    if (inputHash !== process.env.HASHED_NAME) {
        recordFailure(ip);
        setJsonHeader(res);
        res.statusCode = 403;
        res.end(JSON.stringify({ error: 'Invalid name' }));
        return;
    }

    const now = Math.floor(Date.now() / 1000);
    const token = signJwt({ iat: now, exp: now + TOKEN_MAX_AGE }, process.env.JWT_SECRET);

    res.setHeader('Set-Cookie', buildCookie('resume_token', token, TOKEN_MAX_AGE, req));
    setJsonHeader(res);
    res.statusCode = 200;
    res.end(JSON.stringify({ success: true }));
};
