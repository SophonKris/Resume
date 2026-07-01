const { ensureEnv, parseCookies, setJsonHeader, verifyJwt } = require('./_utils');

module.exports = async (req, res) => {
    try {
        ensureEnv();
    } catch (err) {
        setJsonHeader(res);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Server configuration error' }));
        return;
    }

    if (req.method !== 'GET') {
        setJsonHeader(res);
        res.statusCode = 405;
        res.end(JSON.stringify({ error: 'Method not allowed' }));
        return;
    }

    const cookies = parseCookies(req);
    const token = cookies.resume_token;

    if (!token || !verifyJwt(token, process.env.JWT_SECRET)) {
        setJsonHeader(res);
        res.statusCode = 401;
        res.end(JSON.stringify({ error: 'Unauthorized' }));
        return;
    }

    setJsonHeader(res);
    res.statusCode = 200;
    res.end(JSON.stringify({ valid: true }));
};
