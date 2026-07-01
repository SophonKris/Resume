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
            '在SHEIN（全国最大跨境电商公司）设计千万级大数据智能营销系统、参与设计亿级用户量的网易云音乐小程序，熟知大规模和超大规模常见业务架构。',
            '累计上线 5款自有小程序，单项目最高日活 1万+，具备独立产品设计、开发与运营全套理论和实践能力。',
            '为10+企业或个人提供业务数字化与产品架构设计咨询，业务覆盖电商、AI agent、SaaS、小程序等。'
        ]
    },
    prds: [
        { id: 1, title: '示例PRD文档', desc: '脱敏后的产品需求文档样例', tags: ['PRD', '产品'], url: '' },
        { id: 2, title: '示例PRD文档2', desc: '另一个脱敏PRD样例', tags: ['PRD', '需求'], url: '' }
    ],
    portfolios: [
        { id: 1, title: '作品集占位', desc: '即将上线', tags: ['小程序'], url: '', status: 'coming' }
    ]
};

/* ========== 主页逻辑 ========== */
function initHomePage() {
    renderCard();
    renderList('prd-section', SITE_DATA.prds, 'prd');
    renderList('portfolio-section', SITE_DATA.portfolios, 'portfolio');
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

function renderList(containerId, items, type) {
    const grid = document.querySelector(`#${containerId} .list-grid`);
    if (!grid) return;

    grid.innerHTML = items.map(item => {
        const isComing = item.status === 'coming';
        const badgeText = isComing ? '即将上线' : (type === 'prd' ? 'PRD' : '作品');
        const cardClass = isComing ? 'list-card coming-soon' : 'list-card';
        const href = isComing ? 'javascript:void(0)' : `detail.html?type=${type}&id=${item.id}`;

        return `
            <a href="${href}" class="${cardClass}">
                <span class="card-badge">${badgeText}</span>
                <span class="card-arrow">→</span>
                <div class="card-title">${item.title}</div>
                <div class="card-desc">${item.desc}</div>
                <div class="card-tags">
                    ${item.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                </div>
            </a>
        `;
    }).join('');
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
    if (document.getElementById('prd-section')) {
        initHomePage();
    } else if (document.getElementById('detail-content')) {
        initDetailPage();
    }
});
