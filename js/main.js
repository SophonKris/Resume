/* ========== 数据配置 ========== */
const SITE_DATA = {
    card: {
        name: '田智宇',
        titles: ['曾任SHEIN、网易', '高级产品经理', '现为OPC PE 独立产品工程师'],
        badge: '',
        footer: 'AI时代，从不缺coding能力，缺的是真正懂用户，会产品，理解AI应用边界的能力。',
        services: [
            '企业数字化定制',
            '现有业务AI + FDE陪跑',
            '展示型/工具型小程序产品设计+开发+运营全链路支持',
            '轻SaaS / 行业垂直工具定制（灵活适配形态）'
        ],
        advantages: [
            { label: '产品先行', desc: '有别于常见IT外包，产品设计先行，需求拆解清晰，真正把软件做成价值资产' },
            { label: '成本务实', desc: '懂大厂更懂小企业，按需定制方案，避免冗余功能，控制项目预算' },
            { label: '全栈闭环', desc: '具备从设计、开发到运营的全流程操盘能力' }
        ],
        stats: [
            { number: '亿级', label: '用户量产品经验' },
            { number: '5+', label: '自有小程序上线' },
            { number: '1万+', label: '单项目最高日活' }
        ],
        experienceTags: [
            '在大中小厂均做过产品与项目管理工作，熟知企业在每个规模段的业务与数字化方案设计。',
            '在SHEIN（全国最大跨境电商公司）设计千万级大数据聚合营销系统、参与设计亿级用户量的网易云音乐业务系统，熟知大规模和超大规模的常见业务架构与产品设计。',
            '累计上线 5款自有小程序，单项目最高日活 1万+，具备独立产品设计、开发与运营全套理论和实践能力。',
            '为10+企业或个人提供业务数字化与产品架构设计咨询，业务覆盖电商、AI agent、SaaS、小程序等。'
        ]
    },
    portfolios: [
        {
            id: 1,
            title: '某AI工具型小程序',
            tags: ['微信小程序', 'AI工具'],
            folder: 'work1',
            intro: [
                '面向某细分场景的工具产品，高性能前后端架构设计，并实现动画渲染、会员体系搭建等高级功能',
                'AI赋能，在超低token消耗前提下，实现AI智能意图识别与自动执行、ASR语音识别，AI洞察报告等同行业前沿能力',
                '最高日活1w+，用户100%好评，同品类小程序第一'
            ],
            highlights: [
                '产品驱动设计，有别于常见码农的简单功能堆砌，本产品UX交互体验同品类TOP',
                '同品类工具中唯一原生AI驱动设计，且结合传统用户使用习惯的项目',
                '独立cover从概念设计到最后的运营迭代，真正的OPC全栈项目'
            ],
            detailUrl: ''
        },
        {
            id: 2,
            title: '某AI知识库分身项目',
            tags: ['多端部署', 'AI工具', '无向量架构'],
            folder: 'work2',
            intro: [
                '面向职场、KOL等多场景的个人 AI知识分身项目，同时兼备知识库、数字分身、多端部署等优点',
                '自研架构，基于双轨知识表征和karpathy三层wiki理论构建，原文语料库事实级溯源，有效解决传统知识库幻觉问题',
                '内置多锚点主动洞察与滚动记忆流机制，支持跨文档知识一致性校验与长周期知识关联与偏好演化'
            ],
            highlights: [
                '轻量纯自研架构：无向量RAG轻量化方案、不基于目前任意主流框架暗改（如Dify）',
                '平衡效果与成本：两层知识蒸馏抽取方案，并发粗筛+全局认知精抽，大幅降低Token成本',
                '可支持微信云原生 Serverless 部署，缓存友好型 Prompt 设计，多租户数据隔离，低成本快速定制落地'
            ],
            detailUrl: ''
        },
        {
            id: 3,
            title: '某司跨境营销业务设计项目',
            tags: ['电商营销系统', '全流程数据资产梳理'],
            folder: 'work3',
            intro: [
                '面向某公司电商营销场景的IT系统支持，包括联盟、KOL、广告投流等渠道建设',
                '从站外引流到最终成单支付全流程数据梳理，重建埋点体系',
                '设计多渠道归因模型并接入多渠道整合营销机制，并重构相关数据报表'
            ],
            highlights: [
                '定制基于客观情况，根据公司实际业务调研，不套模版只做最合适的设计',
                '设计架构支持百万级订单全链路数据埋点、业务计算、模型归因',
                '超前规划，各模块标准化且解耦性强，支持业务快速迭代扩展'
            ],
            detailUrl: 'https://my.feishu.cn/docx/DywWdNmD3oCnAIxqbWAcQqrDnvb'
        },
        {
            id: 4,
            title: 'ERP小工单管理中间件',
            tags: ['ERP-MES集成', '工单扫码作业', '数据溯源'],
            folder: 'work4',
            intro: [
                '某工厂 ERP 的生产订单与制造现场结合的中间件，支持工人扫码开工、扫码完工，合格报废情况记录，数据实时同步回ERP'
            ],
            highlights: [
                '灵活定制，性价比高：从0到1调研客户实际业务场景，方案完全量身定制同时比同类标品价格更低',
                '支持断网作业：车间网络经常不稳定，工人扫码后先存本地，网络恢复自动补传，不影响生产节奏'
            ],
            detailUrl: ''
        },
        {
            id: 5,
            title: '某司AI招标管理系统',
            tags: ['标书分析', '标书稽核', '企业知识库'],
            folder: 'work5',
            intro: [
                '面向某司内部的招投标场景的AI支持，包括招标解读、制作和稽核等流程',
                '梳理企业内部旧有的招投标知识资产，形成相对标准的知识库',
                '实际跑测效果：商务标人时节省80%，技术标节省50%以上'
            ],
            highlights: [
                '基于公司内部需求要求按需定制，拒绝通用模版，打造适配业务的系统方案',
                '因地制宜，不搞复杂严密的知识库系统，综合考虑公司当前条件下人机协同的效率甜点'
            ],
            detailUrl: ''
        }
    ]
};

/* ========== 主页逻辑 ========== */
function initHomePage() {
    renderCard();
    renderPortfolioList();
}

function renderPortfolioList() {
    const list = document.querySelector('#portfolio-section .portfolio-list');
    if (!list) return;

    list.innerHTML = SITE_DATA.portfolios.filter(item => item.folder !== 'work5').map(item => {
        const images = discoverImages(item.folder);
        const detailBtn = item.detailUrl
            ? `<a href="${item.detailUrl}" target="_blank" class="portfolio-detail">查看详情 →</a>`
            : '';
        const navBtns = images.length > 1
            ? `<button class="gallery-nav prev" aria-label="上一张">‹</button><button class="gallery-nav next" aria-label="下一张">›</button>`
            : '';

        return `
            <div class="portfolio-card">
                <div class="portfolio-gallery">
                    <div class="gallery-track">
                        ${images.map(src => `<img src="${src}" alt="${item.title}" loading="lazy">`).join('')}
                    </div>
                    ${navBtns}
                    ${images.length > 1 ? `<div class="gallery-dots">${images.map((_, i) => `<span class="dot${i === 0 ? ' active' : ''}"></span>`).join('')}</div>` : ''}
                </div>
                <div class="portfolio-info">
                    <div class="portfolio-title">${item.title}</div>
                    <div class="portfolio-tags">
                        ${item.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                    </div>
                    <div class="portfolio-section-title">项目介绍</div>
                    <ul class="portfolio-list-items">
                        ${item.intro.map(t => `<li>${t}</li>`).join('')}
                    </ul>
                    <div class="portfolio-section-title">优势亮点</div>
                    <ul class="portfolio-list-items">
                        ${item.highlights.map(t => `<li>${t}</li>`).join('')}
                    </ul>
                    ${detailBtn}
                </div>
            </div>
        `;
    }).join('');

    initGalleryControls();
}

function discoverImages(folder) {
    const knownCounts = { work1: 3, work2: 2, work3: 1, work4: 1, work5: 2 };
    const ext = (folder === 'work3' || folder === 'work4' || folder === 'work5') ? 'png' : 'jpg';
    const count = knownCounts[folder] || 0;
    return Array.from({ length: count }, (_, i) => `image/${folder}/${i + 1}.${ext}`);
}

function initGalleryControls() {
    document.querySelectorAll('.portfolio-gallery').forEach(gallery => {
        const track = gallery.querySelector('.gallery-track');
        const prevBtn = gallery.querySelector('.gallery-nav.prev');
        const nextBtn = gallery.querySelector('.gallery-nav.next');
        const dots = gallery.querySelectorAll('.gallery-dots .dot');
        const imgs = track.querySelectorAll('img');
        let index = 0;

        function updateNavState() {
            if (prevBtn) {
                prevBtn.disabled = index === 0;
                prevBtn.style.opacity = index === 0 ? '0.35' : '1';
                prevBtn.style.cursor = index === 0 ? 'not-allowed' : 'pointer';
            }
            if (nextBtn) {
                nextBtn.disabled = index === imgs.length - 1;
                nextBtn.style.opacity = index === imgs.length - 1 ? '0.35' : '1';
                nextBtn.style.cursor = index === imgs.length - 1 ? 'not-allowed' : 'pointer';
            }
        }

        function show(i) {
            index = Math.max(0, Math.min(i, imgs.length - 1));
            track.style.transform = `translateX(-${index * 100}%)`;
            dots.forEach((d, j) => d.classList.toggle('active', j === index));
            updateNavState();
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', e => { e.stopPropagation(); show(index - 1); });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', e => { e.stopPropagation(); show(index + 1); });
        }

        updateNavState();

        gallery.addEventListener('touchstart', function (e) {
            this.startX = e.touches[0].clientX;
        }, { passive: true });

        gallery.addEventListener('touchend', function (e) {
            const diff = this.startX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 40) show(index + (diff > 0 ? 1 : -1));
        }, { passive: true });

        imgs.forEach(img => {
            img.addEventListener('click', () => openLightbox(gallery));
        });
    });
}

function openLightbox(gallery) {
    const track = gallery.querySelector('.gallery-track');
    const imgs = Array.from(track.querySelectorAll('img'));
    let current = 0;

    const lightbox = document.createElement('div');
    lightbox.className = 'image-lightbox';
    lightbox.innerHTML = `
        <button class="lightbox-close" aria-label="关闭">&times;</button>
        ${imgs.length > 1 ? '<button class="lightbox-nav prev" aria-label="上一张">&#8249;</button>' : ''}
        <img src="${imgs[0].src}" alt="${imgs[0].alt || ''}">
        ${imgs.length > 1 ? '<button class="lightbox-nav next" aria-label="下一张">&#8250;</button>' : ''}
    `;
    document.body.appendChild(lightbox);

    const imgEl = lightbox.querySelector('img');

    function update(i) {
        current = (i + imgs.length) % imgs.length;
        imgEl.src = imgs[current].src;
    }

    lightbox.querySelector('.lightbox-close').addEventListener('click', close);
    lightbox.addEventListener('click', e => {
        if (e.target === lightbox) close();
    });

    const prev = lightbox.querySelector('.lightbox-nav.prev');
    const next = lightbox.querySelector('.lightbox-nav.next');
    if (prev) prev.addEventListener('click', () => update(current - 1));
    if (next) next.addEventListener('click', () => update(current + 1));

    document.addEventListener('keydown', handleKey);

    requestAnimationFrame(() => lightbox.classList.add('active'));

    function close() {
        lightbox.classList.remove('active');
        document.removeEventListener('keydown', handleKey);
        setTimeout(() => lightbox.remove(), 200);
    }

    function handleKey(e) {
        if (e.key === 'Escape') close();
        if (imgs.length > 1) {
            if (e.key === 'ArrowLeft') update(current - 1);
            if (e.key === 'ArrowRight') update(current + 1);
        }
    }
}

function renderCard() {
    const d = SITE_DATA.card;

    document.getElementById('card-name').textContent = d.name;
    document.getElementById('card-titles').innerHTML = d.titles.join('<br>');
    const badgeEl = document.getElementById('card-badge');
    if (badgeEl) badgeEl.innerHTML = d.badge;
    document.getElementById('card-footer').innerHTML = d.footer;

    const serviceGrid = document.getElementById('card-services');
    serviceGrid.innerHTML = d.services.map(s => `<div class="service-item">${s}</div>`).join('');

    const advantageWrap = document.getElementById('card-advantages');
    advantageWrap.innerHTML = d.advantages.map(a =>
        `<div class="advantage-row"><span class="advantage-label">${a.label}</span><span class="advantage-desc">${a.desc}</span></div>`
    ).join('');

    const statsRow = document.getElementById('card-stats');
    statsRow.innerHTML = d.stats.map(s =>
        `<div class="stat-item"><div class="stat-number">${s.number}</div><div class="stat-label">${s.label}</div></div>`
    ).join('');

    const bgHtml = `<ul>${d.experienceTags.map(t => `<li>${t}</li>`).join('')}</ul>`;
    document.getElementById('card-background').innerHTML = bgHtml;
}

/* ========== 详情页逻辑 ========== */
function initDetailPage() {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');
    const id = parseInt(params.get('id'));

    let item = null;
    let typeLabel = '';

    if (type === 'prd') {
        item = SITE_DATA.prds.find(p => p.id === id);
        typeLabel = 'PRD 文档';
    } else if (type === 'portfolio') {
        item = SITE_DATA.portfolios.find(p => p.id === id);
        typeLabel = '作品集';
    }

    if (!item) {
        document.querySelector('.detail-page').innerHTML = `
            <div class="content-placeholder" style="min-height:60vh">
                <div class="placeholder-icon">😕</div>
                <p>未找到对应内容</p>
                <a href="card.html" class="detail-back">← 返回主页</a>
            </div>`;
        return;
    }

    document.getElementById('detail-type-badge').textContent = typeLabel;
    document.getElementById('detail-type-badge').classList.add(type);
    document.getElementById('detail-title').textContent = item.title;
    document.getElementById('detail-desc').textContent = item.desc;
    document.title = item.title + ' - ' + typeLabel;

    const contentArea = document.getElementById('detail-content');
    if (item.url) {
        contentArea.innerHTML = `<iframe src="${item.url}"></iframe>`;
    } else {
        contentArea.innerHTML = `
            <div class="content-placeholder">
                <div class="placeholder-icon">📄</div>
                <p>内容正在准备中</p>
            </div>`;
    }
}

/* ========== 初始化 ========== */
document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('portfolio-section')) {
        initHomePage();
    } else if (document.getElementById('detail-content')) {
        initDetailPage();
    }
});
