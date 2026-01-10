// ==UserScript==
// @name         LMArena Manager
// @namespace    http://tampermonkey.net/
// @version      4.1.0
// @description  智能管理 LMArena 模型显示 - 支持多Arena模式、分类筛选、自定义排序
// @author       LMArena Manager Team
// @match        https://lmarena.ai/*
// @match        https://web.lmarena.ai/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    const STORAGE_KEY = 'lmarena_manager_v4';
    const VERSION = '4.1.0';

    // ==================== 选择器 ====================
    const SELECTORS = {
        modelOption: '[cmdk-item][role="option"]',
        modelName: 'span.truncate',
        companyIcon: 'svg title',
        dropdown: '[cmdk-list]',
    };

    // ==================== 公司配置 ====================
    const DEFAULT_COMPANY_ORDER = [
        // LLM
        'Google', 'OpenAI', 'Anthropic', 'xAI', 'DeepSeek', 'Qwen', 'MoonshotAI',
        'Zhipu', 'Baidu', 'MistralAI', 'LongCat', 'Xiaomi', 'Tencent', 'Minimax',
        'Amazon', 'PrimeIntellect', 'IBM', 'Cohere', 'AntGroup', 'Stepfun',
        'Meta', 'Nvidia', 'AllenAI', 'Inception',
        // Search
        'Perplexity', 'Diffbot',
        // Image
        'Bytedance', 'ShengShu', 'MicrosoftAI', 'Flux', 'Recraft', 'Luma',
        'Ideogram', 'Reve', 'LeonardoAI',
        // Code
        'Kwai'
    ];

    const COMPANY_RULES = [
        // LLM 主要公司
        { patterns: [/^gemini/i, /^gemma/i, /^imagen/i], company: 'Google', icon: '🔵' },
        { patterns: [/^gpt/i, /^o3/i, /^o4/i, /^chatgpt/i, /^dall-e/i], company: 'OpenAI', icon: '🟢' },
        { patterns: [/^claude/i], company: 'Anthropic', icon: '🟤' },
        { patterns: [/^grok/i], company: 'xAI', icon: '⚫' },
        { patterns: [/^deepseek/i], company: 'DeepSeek', icon: '🐋' },
        { patterns: [/^qwen/i, /^qwq/i, /^wan/i], company: 'Qwen', icon: '🟣' },
        { patterns: [/^kimi/i], company: 'MoonshotAI', icon: '🌙' },
        { patterns: [/^glm/i], company: 'Zhipu', icon: '🔮' },
        { patterns: [/^ernie/i], company: 'Baidu', icon: '🔴' },
        { patterns: [/^mistral/i, /^magistral/i, /^devstral/i], company: 'MistralAI', icon: '🟠' },
        { patterns: [/^longcat/i], company: 'LongCat', icon: '🐱' },
        { patterns: [/^mimo/i], company: 'Xiaomi', icon: '🍊' },
        { patterns: [/^hunyuan/i], company: 'Tencent', icon: '🐧' },
        { patterns: [/^minimax/i], company: 'Minimax', icon: '🎯' },
        { patterns: [/^nova/i, /^amazon/i], company: 'Amazon', icon: '📦' },
        { patterns: [/^intellect/i], company: 'PrimeIntellect', icon: '🧠' },
        { patterns: [/^ibm/i, /^granite/i], company: 'IBM', icon: '💠' },
        { patterns: [/^command/i], company: 'Cohere', icon: '🟡' },
        { patterns: [/^ling/i, /^ring/i], company: 'AntGroup', icon: '🐜' },
        { patterns: [/^step/i], company: 'Stepfun', icon: '👣' },
        { patterns: [/^llama/i], company: 'Meta', icon: '🔷' },
        { patterns: [/^nvidia/i, /^nemotron/i], company: 'Nvidia', icon: '💚' },
        { patterns: [/^olmo/i], company: 'AllenAI', icon: '🔬' },
        { patterns: [/^mercury/i], company: 'Inception', icon: '☿️' },
        // Search
        { patterns: [/^ppl/i, /^perplexity/i, /^sonar/i], company: 'Perplexity', icon: '❓' },
        { patterns: [/^diffbot/i], company: 'Diffbot', icon: '🤖' },
        // Image
        { patterns: [/^seedream/i], company: 'Bytedance', icon: '🎵' },
        { patterns: [/^vidu/i], company: 'ShengShu', icon: '🎬' },
        { patterns: [/^mai-/i], company: 'MicrosoftAI', icon: '🪟' },
        { patterns: [/^flux/i], company: 'Flux', icon: '🌊' },
        { patterns: [/^recraft/i], company: 'Recraft', icon: '🎨' },
        { patterns: [/^photon/i], company: 'Luma', icon: '💡' },
        { patterns: [/^ideogram/i], company: 'Ideogram', icon: '✏️' },
        { patterns: [/^reve/i], company: 'Reve', icon: '💭' },
        { patterns: [/^lucid/i], company: 'LeonardoAI', icon: '🖼️' },
        // Code
        { patterns: [/^kat/i], company: 'Kwai', icon: '🎥' },
    ];

    // ==================== Arena模式识别 ====================
    // 顺序：Search → Image → Code → Video → 默认LLM
    const ARENA_MODE_RULES = [
        // Search
        {
            mode: 'search',
            patterns: [/search/i, /grounding/i, /^ppl/i, /^diffbot/i, /sonar/i]
        },
        // Image
        {
            mode: 'image',
            patterns: [
                /image/i, /^dall-e/i, /^gpt-image/i, /^imagen/i, /^flux/i,
                /^recraft/i, /^photon/i, /^ideogram/i, /^reve/i, /^lucid/i,
                /^seedream/i, /^vidu/i, /^mai-image/i, /^wan/i, /qwen-image/i,
                /nano-banana/i
            ]
        },
        // Code（仅 Code 专属模型）
        {
            mode: 'code',
            patterns: [
                /codex/i,           // gpt-5.1-codex-xxx
                /[\-_]coder/i,      // KAT-Coder, qwen3-coder
                /[\-_]code[\-_]/i,  // grok-code-fast-1
                /^devstral/i,       // devstral-medium-2507
            ]
        },
        // Video
        {
            mode: 'video',
            patterns: [/video/i]
        },
    ];

    // ==================== 类型识别 ====================
    const CATEGORY_RULES = [
        { category: 'speed', patterns: [/flash/i, /lite(?!ct)/i, /fast/i, /haiku/i, /instant/i, /turbo/i], label: '⚡ 快速' },
        { category: 'thinking', patterns: [/thinking/i, /reasoner/i, /[\-_]r1/i, /^o[34]/i, /^qwq/i, /[\-_]think/i], label: '🧠 思考' },
        { category: 'pro', patterns: [/[\-_]pro/i, /[\-_]max/i, /[\-_]ultra/i, /[\-_]large/i, /[\-_]high/i], label: '👑 旗舰' },
        { category: 'mini', patterns: [/[\-_]mini/i, /[\-_]nano/i, /[\-_]small/i, /[\-_]tiny/i], label: '📱 轻量' },
    ];

    // 开源模型前缀
    const OSS_PATTERNS = [
        /^llama/i, /^qwen/i, /^glm/i, /^olmo/i, /^gemma/i, /^mistral/i,
        /^mixtral/i, /^falcon/i, /^yi-/i, /^deepseek/i, /^baichuan/i,
        /^internlm/i, /^phi-/i, /^mimo/i, /gpt-oss/i
    ];

    // ==================== 数据管理 ====================
    class DataManager {
        constructor() {
            this.data = this.load();
            this.ensureDefaults();
        }

        ensureDefaults() {
            if (!this.data.models) this.data.models = {};
            if (!this.data.companyOrder) this.data.companyOrder = [...DEFAULT_COMPANY_ORDER];
            if (!this.data.settings) this.data.settings = { showNewAlert: true, defaultVisible: true };
        }

        load() {
            try {
                const saved = GM_getValue(STORAGE_KEY);
                if (saved) return JSON.parse(saved);
            } catch (e) {
                console.error('[LMM] 加载失败:', e);
            }
            return {};
        }

        save() {
            GM_setValue(STORAGE_KEY, JSON.stringify(this.data));
        }

        getModel(name) {
            return this.data.models[name];
        }

        setModel(name, data) {
            this.data.models[name] = { ...this.data.models[name], ...data };
            this.save();
        }

        getAllModels() {
            return Object.entries(this.data.models).map(([name, data]) => ({ name, ...data }));
        }

        isVisible(name) {
            const m = this.data.models[name];
            return m ? m.visible !== false : this.data.settings.defaultVisible;
        }

        setVisibility(name, visible) {
            if (!this.data.models[name]) {
                this.data.models[name] = this.analyze(name, null);
            }
            this.data.models[name].visible = visible;
            this.data.models[name].isNew = false;
            this.save();
        }

        analyze(name, svgCompany) {
            // 公司识别
            let company = 'Other', icon = '❔';

            if (svgCompany && svgCompany !== '') {
                company = svgCompany;
                for (const rule of COMPANY_RULES) {
                    if (rule.company.toLowerCase() === svgCompany.toLowerCase()) {
                        icon = rule.icon;
                        break;
                    }
                }
            } else {
                for (const rule of COMPANY_RULES) {
                    if (rule.patterns.some(p => p.test(name))) {
                        company = rule.company;
                        icon = rule.icon;
                        break;
                    }
                }
            }

            // Arena模式识别（顺序：Search → Image → Code → Video → LLM）
            let arenaMode = 'llm';
            for (const rule of ARENA_MODE_RULES) {
                if (rule.patterns.some(p => p.test(name))) {
                    arenaMode = rule.mode;
                    break;
                }
            }

            // 类型识别
            const categories = [];
            for (const rule of CATEGORY_RULES) {
                if (rule.patterns.some(p => p.test(name))) {
                    categories.push(rule.category);
                }
            }
            if (OSS_PATTERNS.some(p => p.test(name))) {
                categories.push('oss');
            }

            return {
                visible: this.data.settings.defaultVisible,
                company,
                icon,
                companyManual: false,
                arenaMode,
                arenaModeManual: false,
                categories,
                categoriesManual: false,
                isNew: true,
                addedAt: Date.now()
            };
        }

        updateModel(name, updates) {
            if (!this.data.models[name]) return;
            Object.assign(this.data.models[name], updates);
            this.save();
        }

        clearAll() {
            this.data.models = {};
            this.save();
        }

        clearByMode(mode) {
            Object.keys(this.data.models).forEach(k => {
                if (this.data.models[k].arenaMode === mode) {
                    delete this.data.models[k];
                }
            });
            this.save();
        }

        clearNewFlags() {
            Object.keys(this.data.models).forEach(k => {
                this.data.models[k].isNew = false;
            });
            this.save();
        }

        getCompanyOrder() {
            return this.data.companyOrder || DEFAULT_COMPANY_ORDER;
        }

        setCompanyOrder(order) {
            this.data.companyOrder = order;
            this.save();
        }

        resetCompanyOrder() {
            this.data.companyOrder = [...DEFAULT_COMPANY_ORDER];
            this.save();
        }

        export() {
            return JSON.stringify(this.data, null, 2);
        }

        import(json) {
            try {
                const imported = JSON.parse(json);
                this.data = imported;
                this.ensureDefaults();
                this.save();
                return true;
            } catch { return false; }
        }
    }

    // ==================== 扫描器 ====================
    class Scanner {
        constructor(dm) {
            this.dm = dm;
        }

        extractInfo(el) {
            const nameEl = el.querySelector(SELECTORS.modelName);
            const name = nameEl?.textContent?.trim();
            if (!name || name.length < 2) return null;

            const titleEl = el.querySelector(SELECTORS.companyIcon);
            const svgCompany = titleEl?.textContent?.trim() || null;

            return { name, svgCompany };
        }

        scan() {
            const options = document.querySelectorAll(SELECTORS.modelOption);
            const found = new Map();
            const newModels = [];

            options.forEach(el => {
                const info = this.extractInfo(el);
                if (!info) return;

                found.set(info.name, el);

                if (!this.dm.getModel(info.name)) {
                    const data = this.dm.analyze(info.name, info.svgCompany);
                    this.dm.setModel(info.name, data);
                    newModels.push(info.name);
                }
            });

            if (newModels.length > 0 && this.dm.data.settings.showNewAlert) {
                const msg = newModels.length <= 3
                    ? `发现新模型: ${newModels.slice(0, 3).join(', ')}`
                    : `发现 ${newModels.length} 个新模型`;
                this.toast(msg);
            }

            console.log(`[LMM] 扫描: ${found.size} 个, 新增 ${newModels.length} 个`);
            return found;
        }

        applyFilters() {
            const options = document.querySelectorAll(SELECTORS.modelOption);
            options.forEach(el => {
                const info = this.extractInfo(el);
                if (!info) return;
                const visible = this.dm.isVisible(info.name);
                el.style.display = visible ? '' : 'none';
            });
        }

        toast(msg, type = 'info') {
            document.querySelectorAll('.lmm-toast').forEach(t => t.remove());
            const t = document.createElement('div');
            t.className = `lmm-toast lmm-toast-${type}`;
            t.innerHTML = `
                <span>${type === 'success' ? '✅' : type === 'warning' ? '⚠️' : 'ℹ️'}</span>
                <span>${msg}</span>
                <button class="lmm-toast-x">×</button>
            `;
            document.body.appendChild(t);
            t.querySelector('.lmm-toast-x').onclick = () => t.remove();
            setTimeout(() => t.remove(), 4000);
        }

        startObserving() {
            let timer = null;
            const observer = new MutationObserver(() => {
                const dropdown = document.querySelector(SELECTORS.dropdown);
                if (dropdown && dropdown.children.length > 0) {
                    clearTimeout(timer);
                    timer = setTimeout(() => {
                        this.scan();
                        this.applyFilters();
                    }, 150);
                }
            });
            observer.observe(document.body, { childList: true, subtree: true });
        }
    }

    // ==================== UI ====================
    class UI {
        constructor(dm, scanner) {
            this.dm = dm;
            this.scanner = scanner;
            this.isOpen = false;
            this.isSortMode = false;
            this.editingModel = null;
            this.filter = { search: '', company: 'all', arenaMode: 'all', category: 'all', visibility: 'all' };
            this.sort = { by: 'name', order: 'asc' };
        }

        init() {
            this.injectStyles();
            this.createFab();
            this.createPanel();
            this.createEditModal();
            this.createConfirmModal();
            this.bindShortcuts();
        }

        injectStyles() {
            GM_addStyle(`
                :root {
                    --lmm-primary: #6366f1;
                    --lmm-primary-dark: #4f46e5;
                    --lmm-success: #22c55e;
                    --lmm-warning: #f59e0b;
                    --lmm-danger: #ef4444;
                    --lmm-bg: #fff;
                    --lmm-bg2: #f8fafc;
                    --lmm-bg3: #f1f5f9;
                    --lmm-text: #1e293b;
                    --lmm-text2: #64748b;
                    --lmm-border: #e2e8f0;
                }
                @media (prefers-color-scheme: dark) {
                    :root {
                        --lmm-bg: #1a1a2e;
                        --lmm-bg2: #252540;
                        --lmm-bg3: #2f2f4a;
                        --lmm-text: #e2e8f0;
                        --lmm-text2: #94a3b8;
                        --lmm-border: #3f3f5a;
                    }
                }

                .lmm-fab {
                    position: fixed; top: 12px; right: 12px;
                    width: 40px; height: 40px; border-radius: 10px;
                    background: linear-gradient(135deg, var(--lmm-primary), var(--lmm-primary-dark));
                    color: #fff; border: none; cursor: pointer; z-index: 99990;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 18px; box-shadow: 0 2px 10px rgba(99,102,241,0.3);
                    transition: transform 0.15s;
                }
                .lmm-fab:hover { transform: scale(1.08); }
                .lmm-fab.has-new::after {
                    content: ''; position: absolute; top: -3px; right: -3px;
                    width: 12px; height: 12px; background: var(--lmm-danger);
                    border-radius: 50%; border: 2px solid var(--lmm-bg);
                }

                .lmm-overlay {
                    position: fixed; inset: 0; background: rgba(0,0,0,0.5);
                    backdrop-filter: blur(3px); z-index: 99995;
                    opacity: 0; visibility: hidden; transition: all 0.2s;
                }
                .lmm-overlay.open { opacity: 1; visibility: visible; }

                .lmm-panel {
                    position: fixed; top: 50%; left: 50%;
                    transform: translate(-50%, -50%) scale(0.95);
                    width: 94vw; max-width: 960px; height: 88vh; max-height: 720px;
                    background: var(--lmm-bg); border-radius: 12px; z-index: 99999;
                    display: flex; flex-direction: column;
                    opacity: 0; visibility: hidden; transition: all 0.2s;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    font-size: 13px; color: var(--lmm-text);
                    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
                }
                .lmm-panel.open { opacity: 1; visibility: visible; transform: translate(-50%, -50%) scale(1); }

                .lmm-header {
                    display: flex; align-items: center; justify-content: space-between;
                    padding: 10px 14px; border-bottom: 1px solid var(--lmm-border);
                    background: var(--lmm-bg2); border-radius: 12px 12px 0 0;
                }
                .lmm-title { display: flex; align-items: center; gap: 8px; font-weight: 600; font-size: 15px; }
                .lmm-header-btns { display: flex; gap: 5px; align-items: center; flex-wrap: wrap; }

                .lmm-btn {
                    padding: 5px 10px; border-radius: 6px; border: 1px solid var(--lmm-border);
                    background: var(--lmm-bg); color: var(--lmm-text); cursor: pointer;
                    font-size: 12px; display: inline-flex; align-items: center; gap: 4px;
                    transition: all 0.15s; white-space: nowrap;
                }
                .lmm-btn:hover { background: var(--lmm-bg3); border-color: var(--lmm-primary); }
                .lmm-btn-primary { background: var(--lmm-primary); color: #fff; border-color: var(--lmm-primary); }
                .lmm-btn-primary:hover { background: var(--lmm-primary-dark); }
                .lmm-btn-danger { background: var(--lmm-danger); color: #fff; border-color: var(--lmm-danger); }
                .lmm-btn-danger:hover { background: #dc2626; }

                .lmm-close {
                    width: 28px; height: 28px; border: none; background: none;
                    font-size: 20px; cursor: pointer; color: var(--lmm-text2); border-radius: 6px;
                    display: flex; align-items: center; justify-content: center;
                }
                .lmm-close:hover { background: var(--lmm-bg3); color: var(--lmm-danger); }

                .lmm-presets {
                    display: flex; gap: 5px; padding: 8px 14px;
                    border-bottom: 1px solid var(--lmm-border);
                    overflow-x: auto; flex-shrink: 0;
                }
                .lmm-preset {
                    padding: 4px 10px; border-radius: 12px; border: 1px solid var(--lmm-border);
                    background: var(--lmm-bg); font-size: 11px; cursor: pointer;
                    white-space: nowrap; transition: all 0.15s;
                }
                .lmm-preset:hover { border-color: var(--lmm-primary); color: var(--lmm-primary); }
                .lmm-preset.active { background: var(--lmm-primary); border-color: var(--lmm-primary); color: #fff; }

                .lmm-toolbar {
                    display: flex; gap: 8px; padding: 8px 14px;
                    border-bottom: 1px solid var(--lmm-border);
                    flex-wrap: wrap; align-items: center;
                }
                .lmm-search { flex: 1; min-width: 140px; position: relative; }
                .lmm-search-icon {
                    position: absolute; left: 8px; top: 50%; transform: translateY(-50%);
                    color: var(--lmm-text2); font-size: 12px;
                }
                .lmm-search input {
                    width: 100%; padding: 6px 8px 6px 28px; border: 1px solid var(--lmm-border);
                    border-radius: 6px; font-size: 12px; background: var(--lmm-bg); color: var(--lmm-text);
                }
                .lmm-search input:focus { outline: none; border-color: var(--lmm-primary); }

                .lmm-select {
                    padding: 6px 22px 6px 8px; border: 1px solid var(--lmm-border);
                    border-radius: 6px; background: var(--lmm-bg); color: var(--lmm-text);
                    font-size: 11px; cursor: pointer; appearance: none;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10'%3E%3Cpath fill='%2364748b' d='M1 3l4 4 4-4'/%3E%3C/svg%3E");
                    background-repeat: no-repeat; background-position: right 6px center;
                }

                .lmm-content { display: flex; flex: 1; overflow: hidden; }

                .lmm-sidebar {
                    width: 170px; border-right: 1px solid var(--lmm-border);
                    background: var(--lmm-bg2); overflow-y: auto; padding: 8px 6px; flex-shrink: 0;
                }
                .lmm-sidebar-header {
                    display: flex; justify-content: space-between; align-items: center;
                    padding: 0 6px; margin: 6px 0 4px;
                }
                .lmm-sidebar-title {
                    font-size: 10px; font-weight: 600; text-transform: uppercase;
                    color: var(--lmm-text2); letter-spacing: 0.3px;
                }
                .lmm-sidebar-btn {
                    font-size: 10px; color: var(--lmm-primary); cursor: pointer;
                    background: none; border: none; padding: 2px 4px;
                }
                .lmm-sidebar-btn:hover { text-decoration: underline; }
                .lmm-sidebar-btn.active { color: var(--lmm-success); font-weight: 600; }

                .lmm-sidebar-item {
                    display: flex; align-items: center; gap: 5px;
                    padding: 5px 8px; border-radius: 5px; cursor: pointer;
                    font-size: 11px; transition: all 0.1s; user-select: none;
                }
                .lmm-sidebar-item:hover { background: var(--lmm-bg3); }
                .lmm-sidebar-item.active { background: var(--lmm-primary); color: #fff; }
                .lmm-sidebar-item .cnt {
                    margin-left: auto; font-size: 10px; background: var(--lmm-bg);
                    padding: 1px 5px; border-radius: 6px; color: var(--lmm-text2);
                }
                .lmm-sidebar-item.active .cnt { background: rgba(255,255,255,0.2); color: #fff; }

                .lmm-sidebar-item.sort-mode { cursor: grab; background: var(--lmm-bg3); }
                .lmm-sidebar-item.sort-mode:active { cursor: grabbing; }
                .lmm-sidebar-item.dragging { opacity: 0.5; background: var(--lmm-primary); color: #fff; }
                .lmm-drag-handle { cursor: grab; color: var(--lmm-text2); font-size: 12px; margin-right: 2px; }

                .lmm-list { flex: 1; overflow-y: auto; padding: 10px; }
                .lmm-list-header {
                    display: flex; justify-content: space-between; align-items: center;
                    margin-bottom: 8px; flex-wrap: wrap; gap: 6px;
                }
                .lmm-count { color: var(--lmm-text2); font-size: 12px; }
                .lmm-batch { display: flex; gap: 5px; flex-wrap: wrap; }

                .lmm-grid {
                    display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 8px;
                }

                .lmm-card {
                    display: flex; align-items: flex-start; gap: 8px;
                    padding: 9px; border: 1px solid var(--lmm-border); border-radius: 8px;
                    background: var(--lmm-bg); cursor: pointer; transition: all 0.15s;
                    position: relative;
                }
                .lmm-card:hover { border-color: var(--lmm-primary); }
                .lmm-card.hidden { opacity: 0.5; background: var(--lmm-bg3); }
                .lmm-card.new { border-color: var(--lmm-success); }

                .lmm-check {
                    width: 15px; height: 15px; border: 2px solid var(--lmm-border);
                    border-radius: 3px; display: flex; align-items: center; justify-content: center;
                    flex-shrink: 0; font-size: 9px; margin-top: 2px;
                }
                .lmm-check.on { background: var(--lmm-primary); border-color: var(--lmm-primary); color: #fff; }

                .lmm-card-info { flex: 1; min-width: 0; }
                .lmm-card-name {
                    font-weight: 500; font-size: 11px; display: flex;
                    align-items: center; gap: 4px; margin-bottom: 3px;
                }
                .lmm-card-name .n { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
                .lmm-tags { display: flex; flex-wrap: wrap; gap: 2px; }
                .lmm-tag {
                    padding: 1px 4px; border-radius: 3px; font-size: 9px;
                    background: var(--lmm-bg3); color: var(--lmm-text2);
                }
                .lmm-tag.company { background: #e0e7ff; color: #4338ca; }
                .lmm-tag.mode { background: #fef3c7; color: #92400e; }
                .lmm-tag.new { background: #dcfce7; color: #166534; }
                .lmm-tag.oss { background: #dbeafe; color: #1e40af; }
                @media (prefers-color-scheme: dark) {
                    .lmm-tag.company { background: #3730a3; color: #c7d2fe; }
                    .lmm-tag.mode { background: #78350f; color: #fef3c7; }
                    .lmm-tag.new { background: #166534; color: #bbf7d0; }
                    .lmm-tag.oss { background: #1e40af; color: #bfdbfe; }
                }

                .lmm-card-edit {
                    position: absolute; top: 4px; right: 4px; font-size: 12px;
                    opacity: 0; transition: opacity 0.15s; background: var(--lmm-bg2);
                    border: 1px solid var(--lmm-border); border-radius: 4px;
                    padding: 2px 5px; cursor: pointer;
                }
                .lmm-card:hover .lmm-card-edit { opacity: 1; }
                .lmm-card-edit:hover { background: var(--lmm-primary); color: #fff; border-color: var(--lmm-primary); }

                .lmm-footer {
                    display: flex; justify-content: space-between; align-items: center;
                    padding: 8px 14px; border-top: 1px solid var(--lmm-border);
                    background: var(--lmm-bg2); border-radius: 0 0 12px 12px;
                    font-size: 11px; color: var(--lmm-text2); flex-wrap: wrap; gap: 6px;
                }
                .lmm-stats { display: flex; gap: 12px; }
                .lmm-stat b { color: var(--lmm-text); }

                .lmm-empty { text-align: center; padding: 30px 20px; color: var(--lmm-text2); }
                .lmm-empty-icon { font-size: 32px; margin-bottom: 8px; opacity: 0.5; }

                .lmm-toast {
                    position: fixed; top: 60px; right: 12px;
                    display: flex; align-items: center; gap: 8px;
                    padding: 10px 14px; background: var(--lmm-bg); border-radius: 8px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.15); z-index: 100001;
                    animation: lmm-in 0.25s ease; border-left: 3px solid var(--lmm-primary);
                    font-size: 13px;
                }
                .lmm-toast-success { border-left-color: var(--lmm-success); }
                .lmm-toast-warning { border-left-color: var(--lmm-warning); }
                @keyframes lmm-in { from { transform: translateX(100%); opacity: 0; } }
                .lmm-toast-x { background: none; border: none; font-size: 16px; cursor: pointer; color: var(--lmm-text2); }

                .lmm-modal {
                    position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(0.95);
                    background: var(--lmm-bg); border-radius: 10px; padding: 16px;
                    z-index: 100002; min-width: 320px; max-width: 90vw;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
                    opacity: 0; visibility: hidden; transition: all 0.2s;
                }
                .lmm-modal.open { opacity: 1; visibility: visible; transform: translate(-50%, -50%) scale(1); }
                .lmm-modal-overlay {
                    position: fixed; inset: 0; background: rgba(0,0,0,0.4);
                    z-index: 100001; opacity: 0; visibility: hidden; transition: all 0.2s;
                }
                .lmm-modal-overlay.open { opacity: 1; visibility: visible; }

                .lmm-modal-title { font-size: 15px; font-weight: 600; margin-bottom: 12px; }
                .lmm-modal-body { margin-bottom: 14px; }
                .lmm-modal-footer { display: flex; justify-content: flex-end; gap: 8px; }

                .lmm-form-group { margin-bottom: 12px; }
                .lmm-form-label { display: block; font-size: 11px; font-weight: 500; margin-bottom: 4px; color: var(--lmm-text2); }
                .lmm-form-input {
                    width: 100%; padding: 7px 10px; border: 1px solid var(--lmm-border);
                    border-radius: 6px; font-size: 13px; background: var(--lmm-bg); color: var(--lmm-text);
                }
                .lmm-form-input:focus { outline: none; border-color: var(--lmm-primary); }
                .lmm-form-select {
                    width: 100%; padding: 7px 10px; border: 1px solid var(--lmm-border);
                    border-radius: 6px; font-size: 13px; background: var(--lmm-bg); color: var(--lmm-text);
                }

                .lmm-checkbox-group { display: flex; flex-wrap: wrap; gap: 6px; }
                .lmm-checkbox-item {
                    display: flex; align-items: center; gap: 4px; padding: 4px 8px;
                    border: 1px solid var(--lmm-border); border-radius: 5px;
                    font-size: 11px; cursor: pointer; transition: all 0.15s;
                }
                .lmm-checkbox-item:hover { border-color: var(--lmm-primary); }
                .lmm-checkbox-item.checked { background: var(--lmm-primary); color: #fff; border-color: var(--lmm-primary); }

                @media (max-width: 600px) {
                    .lmm-panel { width: 100vw; height: 100vh; max-width: none; max-height: none; border-radius: 0; }
                    .lmm-sidebar { display: none; }
                    .lmm-grid { grid-template-columns: 1fr; }
                }
            `);
        }

        createFab() {
            const fab = document.createElement('button');
            fab.className = 'lmm-fab';
            fab.innerHTML = '🎛️';
            fab.title = 'LMArena Manager (Ctrl+Shift+M)';
            fab.onclick = () => this.toggle();
            document.body.appendChild(fab);
            this.fab = fab;
            this.updateFabBadge();
        }

        updateFabBadge() {
            const hasNew = this.dm.getAllModels().some(m => m.isNew);
            this.fab?.classList.toggle('has-new', hasNew);
        }

        createPanel() {
            const overlay = document.createElement('div');
            overlay.className = 'lmm-overlay';
            overlay.onclick = () => this.close();
            document.body.appendChild(overlay);
            this.overlay = overlay;

            const panel = document.createElement('div');
            panel.className = 'lmm-panel';
            panel.innerHTML = `
                <div class="lmm-header">
                    <div class="lmm-title"><span>🎛️</span> LMArena Manager <span style="font-size:10px;color:var(--lmm-text2)">v${VERSION}</span></div>
                    <div class="lmm-header-btns">
                        <button class="lmm-btn" id="lmm-scan">🔄 扫描</button>
                        <button class="lmm-btn" id="lmm-clear">🗑️ 清空</button>
                        <button class="lmm-btn" id="lmm-export">📤 导出</button>
                        <button class="lmm-btn" id="lmm-import">📥 导入</button>
                        <button class="lmm-btn" id="lmm-clear-new">✨ 清除标记</button>
                        <button class="lmm-close" id="lmm-close">×</button>
                    </div>
                </div>
                <div class="lmm-presets">
                    <button class="lmm-preset active" data-p="all">📋 全部</button>
                    <button class="lmm-preset" data-p="llm">💬 LLM</button>
                    <button class="lmm-preset" data-p="search">🔍 Search</button>
                    <button class="lmm-preset" data-p="image">🎨 Image</button>
                    <button class="lmm-preset" data-p="code">💻 Code</button>
                    <button class="lmm-preset" data-p="video">🎬 Video</button>
                    <span style="border-left:1px solid var(--lmm-border);margin:0 4px"></span>
                    <button class="lmm-preset" data-p="visible">👁️ 已启用</button>
                    <button class="lmm-preset" data-p="hidden">🙈 已隐藏</button>
                    <button class="lmm-preset" data-p="new">✨ 新发现</button>
                </div>
                <div class="lmm-toolbar">
                    <div class="lmm-search">
                        <span class="lmm-search-icon">🔍</span>
                        <input type="text" placeholder="搜索模型..." id="lmm-search">
                    </div>
                    <select class="lmm-select" id="lmm-company"><option value="all">所有公司</option></select>
                    <select class="lmm-select" id="lmm-category">
                        <option value="all">所有类型</option>
                        <option value="speed">⚡ 快速</option>
                        <option value="thinking">🧠 思考</option>
                        <option value="pro">👑 旗舰</option>
                        <option value="mini">📱 轻量</option>
                        <option value="oss">🔓 开源</option>
                    </select>
                    <select class="lmm-select" id="lmm-sort">
                        <option value="name-asc">名称 A-Z</option>
                        <option value="name-desc">名称 Z-A</option>
                        <option value="company-asc">按公司</option>
                        <option value="date-desc">最新添加</option>
                    </select>
                </div>
                <div class="lmm-content">
                    <div class="lmm-sidebar">
                        <div class="lmm-sidebar-header">
                            <span class="lmm-sidebar-title">按大类</span>
                        </div>
                        <div id="lmm-mode-list"></div>

                        <div class="lmm-sidebar-header" style="margin-top:12px">
                            <span class="lmm-sidebar-title">按公司</span>
                            <button class="lmm-sidebar-btn" id="lmm-sort-btn">排序</button>
                        </div>
                        <div id="lmm-company-list"></div>

                        <div class="lmm-sidebar-header" style="margin-top:12px">
                            <span class="lmm-sidebar-title">按类型</span>
                        </div>
                        <div id="lmm-category-list"></div>
                    </div>
                    <div class="lmm-list">
                        <div class="lmm-list-header">
                            <span class="lmm-count" id="lmm-count">0 个模型</span>
                            <div class="lmm-batch">
                                <button class="lmm-btn" id="lmm-all-show">全部显示</button>
                                <button class="lmm-btn" id="lmm-all-hide">全部隐藏</button>
                                <button class="lmm-btn lmm-btn-primary" id="lmm-apply">✓ 应用</button>
                            </div>
                        </div>
                        <div class="lmm-grid" id="lmm-grid"></div>
                    </div>
                </div>
                <div class="lmm-footer">
                    <div class="lmm-stats">
                        <span class="lmm-stat">显示: <b id="lmm-v">0</b></span>
                        <span class="lmm-stat">隐藏: <b id="lmm-h">0</b></span>
                        <span class="lmm-stat">总计: <b id="lmm-t">0</b></span>
                    </div>
                    <span>Ctrl+Shift+M 打开 | 双击卡片编辑</span>
                </div>
            `;
            document.body.appendChild(panel);
            this.panel = panel;
            this.bindEvents();
        }

        createEditModal() {
            const modalOverlay = document.createElement('div');
            modalOverlay.className = 'lmm-modal-overlay';
            modalOverlay.onclick = () => this.closeEditModal();
            document.body.appendChild(modalOverlay);
            this.editModalOverlay = modalOverlay;

            const modal = document.createElement('div');
            modal.className = 'lmm-modal';
            modal.innerHTML = `
                <div class="lmm-modal-title">✏️ 编辑模型</div>
                <div class="lmm-modal-body">
                    <div class="lmm-form-group">
                        <label class="lmm-form-label">模型名称</label>
                        <input type="text" class="lmm-form-input" id="lmm-edit-name" readonly>
                    </div>
                    <div class="lmm-form-group">
                        <label class="lmm-form-label">所属公司</label>
                        <input type="text" class="lmm-form-input" id="lmm-edit-company" placeholder="输入公司名">
                    </div>
                    <div class="lmm-form-group">
                        <label class="lmm-form-label">Arena 模式</label>
                        <select class="lmm-form-select" id="lmm-edit-mode">
                            <option value="llm">💬 LLM</option>
                            <option value="search">🔍 Search</option>
                            <option value="image">🎨 Image</option>
                            <option value="code">💻 Code</option>
                            <option value="video">🎬 Video</option>
                        </select>
                    </div>
                    <div class="lmm-form-group">
                        <label class="lmm-form-label">类型标签</label>
                        <div class="lmm-checkbox-group" id="lmm-edit-categories">
                            <div class="lmm-checkbox-item" data-cat="speed">⚡ 快速</div>
                            <div class="lmm-checkbox-item" data-cat="thinking">🧠 思考</div>
                            <div class="lmm-checkbox-item" data-cat="pro">👑 旗舰</div>
                            <div class="lmm-checkbox-item" data-cat="mini">📱 轻量</div>
                            <div class="lmm-checkbox-item" data-cat="oss">🔓 开源</div>
                        </div>
                    </div>
                </div>
                <div class="lmm-modal-footer">
                    <button class="lmm-btn" id="lmm-edit-cancel">取消</button>
                    <button class="lmm-btn lmm-btn-primary" id="lmm-edit-save">保存</button>
                </div>
            `;
            document.body.appendChild(modal);
            this.editModal = modal;

            modal.querySelectorAll('.lmm-checkbox-item').forEach(item => {
                item.onclick = () => item.classList.toggle('checked');
            });

            modal.querySelector('#lmm-edit-cancel').onclick = () => this.closeEditModal();
            modal.querySelector('#lmm-edit-save').onclick = () => this.saveEdit();
        }

        createConfirmModal() {
            const modalOverlay = document.createElement('div');
            modalOverlay.className = 'lmm-modal-overlay';
            document.body.appendChild(modalOverlay);
            this.confirmModalOverlay = modalOverlay;

            const modal = document.createElement('div');
            modal.className = 'lmm-modal';
            modal.innerHTML = `
                <div class="lmm-modal-title" id="lmm-confirm-title">确认操作</div>
                <div class="lmm-modal-body">
                    <p id="lmm-confirm-msg">确定要执行此操作吗？</p>
                </div>
                <div class="lmm-modal-footer">
                    <button class="lmm-btn" id="lmm-confirm-no">取消</button>
                    <button class="lmm-btn lmm-btn-danger" id="lmm-confirm-yes">确认</button>
                </div>
            `;
            document.body.appendChild(modal);
            this.confirmModal = modal;
        }

        showConfirm(title, msg, onConfirm) {
            this.confirmModal.querySelector('#lmm-confirm-title').textContent = title;
            this.confirmModal.querySelector('#lmm-confirm-msg').textContent = msg;
            this.confirmModalOverlay.classList.add('open');
            this.confirmModal.classList.add('open');

            const closeConfirm = () => {
                this.confirmModalOverlay.classList.remove('open');
                this.confirmModal.classList.remove('open');
            };

            this.confirmModal.querySelector('#lmm-confirm-yes').onclick = () => { closeConfirm(); onConfirm(); };
            this.confirmModal.querySelector('#lmm-confirm-no').onclick = closeConfirm;
            this.confirmModalOverlay.onclick = closeConfirm;
        }

        $(sel) { return this.panel.querySelector(sel); }
        $$(sel) { return this.panel.querySelectorAll(sel); }

        bindEvents() {
            this.$('#lmm-close').onclick = () => this.close();

            this.$('#lmm-scan').onclick = () => {
                this.scanner.scan();
                this.refresh();
                this.updateSidebar();
                this.scanner.toast('扫描完成', 'success');
            };

            this.$('#lmm-clear').onclick = () => {
                this.showConfirm(
                    '🗑️ 清空模型列表',
                    '确定要清空所有模型数据吗？此操作不可撤销。清空后请重新扫描。',
                    () => {
                        this.dm.clearAll();
                        this.refresh();
                        this.updateSidebar();
                        this.scanner.toast('已清空', 'success');
                    }
                );
            };

            this.$('#lmm-export').onclick = () => {
                const blob = new Blob([this.dm.export()], { type: 'application/json' });
                const a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = `lmarena-manager-${new Date().toISOString().slice(0,10)}.json`;
                a.click();
                this.scanner.toast('已导出', 'success');
            };

            this.$('#lmm-import').onclick = () => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.json';
                input.onchange = e => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = ev => {
                        if (this.dm.import(ev.target.result)) {
                            this.refresh();
                            this.updateSidebar();
                            this.scanner.toast('导入成功', 'success');
                        } else {
                            this.scanner.toast('导入失败', 'warning');
                        }
                    };
                    reader.readAsText(file);
                };
                input.click();
            };

            this.$('#lmm-clear-new').onclick = () => {
                this.dm.clearNewFlags();
                this.refresh();
                this.updateFabBadge();
                this.scanner.toast('已清除标记', 'success');
            };

            this.$('#lmm-search').oninput = e => {
                this.filter.search = e.target.value.toLowerCase();
                this.refresh();
            };

            this.$('#lmm-company').onchange = e => {
                this.filter.company = e.target.value;
                this.refresh();
            };

            this.$('#lmm-category').onchange = e => {
                this.filter.category = e.target.value;
                this.refresh();
            };

            this.$('#lmm-sort').onchange = e => {
                const [by, order] = e.target.value.split('-');
                this.sort = { by, order: order || 'asc' };
                this.refresh();
            };

            this.$$('.lmm-preset').forEach(btn => {
                btn.onclick = () => {
                    this.$$('.lmm-preset').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.applyPreset(btn.dataset.p);
                };
            });

            this.$('#lmm-all-show').onclick = () => this.batchSet(true);
            this.$('#lmm-all-hide').onclick = () => this.batchSet(false);
            this.$('#lmm-apply').onclick = () => {
                this.scanner.applyFilters();
                this.scanner.toast('已应用', 'success');
            };

            this.$('#lmm-sort-btn').onclick = () => this.toggleSortMode();
        }

        bindShortcuts() {
            document.addEventListener('keydown', e => {
                if (e.ctrlKey && e.shiftKey && (e.key === 'M' || e.key === 'm')) {
                    e.preventDefault();
                    this.toggle();
                }
                if (e.key === 'Escape') {
                    if (this.editModal.classList.contains('open')) {
                        this.closeEditModal();
                    } else if (this.confirmModal.classList.contains('open')) {
                        this.confirmModalOverlay.classList.remove('open');
                        this.confirmModal.classList.remove('open');
                    } else if (this.isOpen) {
                        this.close();
                    }
                }
            });
        }

        toggle() { this.isOpen ? this.close() : this.open(); }

        open() {
            this.isOpen = true;
            this.panel.classList.add('open');
            this.overlay.classList.add('open');
            this.refresh();
            this.updateSidebar();
        }

        close() {
            this.isOpen = false;
            this.isSortMode = false;
            this.panel.classList.remove('open');
            this.overlay.classList.remove('open');
        }

        applyPreset(p) {
            this.filter = { search: '', company: 'all', arenaMode: 'all', category: 'all', visibility: 'all' };
            this.$('#lmm-search').value = '';
            this.$('#lmm-company').value = 'all';
            this.$('#lmm-category').value = 'all';
            this.$$('.lmm-sidebar-item').forEach(i => i.classList.remove('active'));

            switch (p) {
                case 'llm':
                case 'search':
                case 'image':
                case 'code':
                case 'video':
                    this.filter.arenaMode = p;
                    break;
                case 'visible':
                    this.filter.visibility = 'visible';
                    break;
                case 'hidden':
                    this.filter.visibility = 'hidden';
                    break;
                case 'new':
                    this.filter.visibility = 'new';
                    break;
            }
            this.refresh();
        }

        getFiltered() {
            let models = this.dm.getAllModels();

            if (this.filter.search) {
                const s = this.filter.search;
                models = models.filter(m =>
                    m.name.toLowerCase().includes(s) ||
                    m.company?.toLowerCase().includes(s)
                );
            }
            if (this.filter.arenaMode !== 'all') {
                models = models.filter(m => m.arenaMode === this.filter.arenaMode);
            }
            if (this.filter.company !== 'all') {
                models = models.filter(m => m.company === this.filter.company);
            }
            if (this.filter.category !== 'all') {
                models = models.filter(m => m.categories?.includes(this.filter.category));
            }
            switch (this.filter.visibility) {
                case 'visible': models = models.filter(m => m.visible !== false); break;
                case 'hidden': models = models.filter(m => m.visible === false); break;
                case 'new': models = models.filter(m => m.isNew); break;
            }

            const companyOrder = this.dm.getCompanyOrder();
            models.sort((a, b) => {
                let c = 0;
                if (this.sort.by === 'name') {
                    c = a.name.localeCompare(b.name);
                } else if (this.sort.by === 'company') {
                    const ai = companyOrder.indexOf(a.company);
                    const bi = companyOrder.indexOf(b.company);
                    const aIdx = ai === -1 ? 999 : ai;
                    const bIdx = bi === -1 ? 999 : bi;
                    c = aIdx - bIdx || a.name.localeCompare(b.name);
                } else if (this.sort.by === 'date') {
                    c = (a.addedAt || 0) - (b.addedAt || 0);
                }
                return this.sort.order === 'desc' ? -c : c;
            });

            return models;
        }

        esc(s) {
            if (!s) return '';
            return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
        }

        getModeIcon(mode) {
            const icons = { llm: '💬', search: '🔍', image: '🎨', code: '💻', video: '🎬' };
            return icons[mode] || '❓';
        }

        getCategoryLabel(cat) {
            const labels = { speed: '⚡', thinking: '🧠', pro: '👑', mini: '📱', oss: '🔓' };
            return labels[cat] || cat;
        }

        refresh() {
            const grid = this.$('#lmm-grid');
            const models = this.getFiltered();

            if (models.length === 0) {
                grid.innerHTML = `<div class="lmm-empty" style="grid-column:1/-1">
                    <div class="lmm-empty-icon">📭</div>
                    <div>没有匹配的模型<br><br>打开模型下拉框后点击「扫描」</div>
                </div>`;
            } else {
                grid.innerHTML = models.map(m => {
                    const vis = m.visible !== false;
                    const catTags = (m.categories || []).slice(0, 3).map(c =>
                        `<span class="lmm-tag">${this.getCategoryLabel(c)}</span>`
                    ).join('');

                    return `
                        <div class="lmm-card ${vis ? '' : 'hidden'} ${m.isNew ? 'new' : ''}" data-name="${this.esc(m.name)}">
                            <div class="lmm-check ${vis ? 'on' : ''}">${vis ? '✓' : ''}</div>
                            <div class="lmm-card-info">
                                <div class="lmm-card-name">
                                    <span>${m.icon || '❔'}</span>
                                    <span class="n" title="${this.esc(m.name)}">${this.esc(m.name)}</span>
                                </div>
                                <div class="lmm-tags">
                                    <span class="lmm-tag company">${this.esc(m.company || 'Other')}</span>
                                    <span class="lmm-tag mode">${this.getModeIcon(m.arenaMode)}</span>
                                    ${m.isNew ? '<span class="lmm-tag new">新</span>' : ''}
                                    ${catTags}
                                </div>
                            </div>
                            <button class="lmm-card-edit" title="编辑">✏️</button>
                        </div>
                    `;
                }).join('');

                grid.querySelectorAll('.lmm-card').forEach(card => {
                    const name = card.dataset.name;

                    card.onclick = (e) => {
                        if (e.target.classList.contains('lmm-card-edit')) return;
                        const newVis = !this.dm.isVisible(name);
                        this.dm.setVisibility(name, newVis);
                        card.classList.toggle('hidden', !newVis);
                        card.classList.remove('new');
                        const chk = card.querySelector('.lmm-check');
                        chk.classList.toggle('on', newVis);
                        chk.textContent = newVis ? '✓' : '';
                        this.updateStats();
                        this.updateFabBadge();
                    };

                    card.ondblclick = () => this.openEditModal(name);
                    card.querySelector('.lmm-card-edit').onclick = (e) => {
                        e.stopPropagation();
                        this.openEditModal(name);
                    };
                });
            }

            this.$('#lmm-count').textContent = `${models.length} 个模型`;
            this.updateStats();
            this.updateCompanyFilter();
        }

        updateSidebar() {
            const models = this.dm.getAllModels();
            const companyOrder = this.dm.getCompanyOrder();

            // 按大类
            const modes = { llm: 0, search: 0, image: 0, code: 0, video: 0 };
            models.forEach(m => {
                if (modes[m.arenaMode] !== undefined) modes[m.arenaMode]++;
            });

            this.$('#lmm-mode-list').innerHTML = Object.entries(modes)
                .filter(([_, cnt]) => cnt > 0)
                .map(([mode, cnt]) => `
                    <div class="lmm-sidebar-item" data-mode="${mode}">
                        <span>${this.getModeIcon(mode)}</span>
                        <span>${mode.toUpperCase()}</span>
                        <span class="cnt">${cnt}</span>
                    </div>
                `).join('');

            this.$('#lmm-mode-list').querySelectorAll('.lmm-sidebar-item').forEach(item => {
                item.onclick = () => {
                    if (this.isSortMode) return;
                    this.$$('.lmm-sidebar-item').forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                    this.filter.arenaMode = item.dataset.mode;
                    this.$$('.lmm-preset').forEach(b => b.classList.remove('active'));
                    this.refresh();
                };
            });

            // 按公司
            const companies = {};
            models.forEach(m => {
                const c = m.company || 'Other';
                if (!companies[c]) companies[c] = { cnt: 0, icon: m.icon || '❔' };
                companies[c].cnt++;
            });

            const sortedCompanies = Object.entries(companies).sort((a, b) => {
                if (a[0] === 'Other') return 1;
                if (b[0] === 'Other') return -1;
                const ai = companyOrder.indexOf(a[0]);
                const bi = companyOrder.indexOf(b[0]);
                return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
            });

            this.renderCompanyList(sortedCompanies);

            // 按类型
            const cats = { speed: 0, thinking: 0, pro: 0, mini: 0, oss: 0 };
            models.forEach(m => {
                (m.categories || []).forEach(c => {
                    if (cats[c] !== undefined) cats[c]++;
                });
            });

            const catLabels = {
                speed: '⚡ 快速',
                thinking: '🧠 思考',
                pro: '👑 旗舰',
                mini: '📱 轻量',
                oss: '🔓 开源'
            };

            this.$('#lmm-category-list').innerHTML = Object.entries(cats)
                .filter(([_, cnt]) => cnt > 0)
                .map(([cat, cnt]) => `
                    <div class="lmm-sidebar-item" data-cat="${cat}">
                        <span>${catLabels[cat]}</span>
                        <span class="cnt">${cnt}</span>
                    </div>
                `).join('');

            this.$('#lmm-category-list').querySelectorAll('.lmm-sidebar-item').forEach(item => {
                item.onclick = () => {
                    if (this.isSortMode) return;
                    this.$$('.lmm-sidebar-item').forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                    this.filter.category = item.dataset.cat;
                    this.$$('.lmm-preset').forEach(b => b.classList.remove('active'));
                    this.refresh();
                };
            });
        }

        renderCompanyList(sortedCompanies) {
            const list = this.$('#lmm-company-list');

            list.innerHTML = sortedCompanies.map(([name, data]) => `
                <div class="lmm-sidebar-item ${this.isSortMode ? 'sort-mode' : ''}"
                     data-company="${this.esc(name)}" draggable="${this.isSortMode}">
                    ${this.isSortMode ? '<span class="lmm-drag-handle">⠿</span>' : ''}
                    <span>${data.icon}</span>
                    <span style="flex:1;overflow:hidden;text-overflow:ellipsis">${this.esc(name)}</span>
                    <span class="cnt">${data.cnt}</span>
                </div>
            `).join('');

            list.querySelectorAll('.lmm-sidebar-item').forEach(item => {
                if (this.isSortMode) {
                    this.bindDragEvents(item);
                } else {
                    item.onclick = () => {
                        this.$$('.lmm-sidebar-item').forEach(i => i.classList.remove('active'));
                        item.classList.add('active');
                        this.filter.company = item.dataset.company;
                        this.$$('.lmm-preset').forEach(b => b.classList.remove('active'));
                        this.refresh();
                    };
                }
            });
        }

        toggleSortMode() {
            this.isSortMode = !this.isSortMode;
            const btn = this.$('#lmm-sort-btn');

            if (this.isSortMode) {
                btn.textContent = '完成';
                btn.classList.add('active');
            } else {
                btn.textContent = '排序';
                btn.classList.remove('active');
                const items = this.$('#lmm-company-list').querySelectorAll('.lmm-sidebar-item');
                const newOrder = [...items].map(i => i.dataset.company);
                this.dm.setCompanyOrder(newOrder);
            }

            this.updateSidebar();
        }

        bindDragEvents(item) {
            item.ondragstart = (e) => {
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/plain', item.dataset.company);
                item.classList.add('dragging');
            };

            item.ondragend = () => {
                item.classList.remove('dragging');
            };

            item.ondragover = (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
            };

            item.ondrop = (e) => {
                e.preventDefault();
                const draggedCompany = e.dataTransfer.getData('text/plain');
                const targetCompany = item.dataset.company;

                if (draggedCompany !== targetCompany) {
                    const list = this.$('#lmm-company-list');
                    const items = [...list.querySelectorAll('.lmm-sidebar-item')];
                    const companies = items.map(i => i.dataset.company);

                    const fromIdx = companies.indexOf(draggedCompany);
                    const toIdx = companies.indexOf(targetCompany);

                    companies.splice(fromIdx, 1);
                    companies.splice(toIdx, 0, draggedCompany);

                    this.dm.setCompanyOrder(companies);
                    this.updateSidebar();
                }
            };
        }

        updateCompanyFilter() {
            const models = this.dm.getAllModels();
            const companyOrder = this.dm.getCompanyOrder();
            const companies = [...new Set(models.map(m => m.company).filter(Boolean))];

            companies.sort((a, b) => {
                if (a === 'Other') return 1;
                if (b === 'Other') return -1;
                const ai = companyOrder.indexOf(a);
                const bi = companyOrder.indexOf(b);
                return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
            });

            const sel = this.$('#lmm-company');
            const val = sel.value;
            sel.innerHTML = '<option value="all">所有公司</option>' +
                companies.map(c => `<option value="${this.esc(c)}">${this.esc(c)}</option>`).join('');
            sel.value = val;
        }

        updateStats() {
            const models = this.dm.getAllModels();
            const v = models.filter(m => m.visible !== false).length;
            this.$('#lmm-v').textContent = v;
            this.$('#lmm-h').textContent = models.length - v;
            this.$('#lmm-t').textContent = models.length;
        }

        batchSet(vis) {
            this.getFiltered().forEach(m => this.dm.setVisibility(m.name, vis));
            this.refresh();
        }

        openEditModal(name) {
            const model = this.dm.getModel(name);
            if (!model) return;

            this.editingModel = name;

            this.editModal.querySelector('#lmm-edit-name').value = name;
            this.editModal.querySelector('#lmm-edit-company').value = model.company || '';
            this.editModal.querySelector('#lmm-edit-mode').value = model.arenaMode || 'llm';

            this.editModal.querySelectorAll('.lmm-checkbox-item').forEach(item => {
                const cat = item.dataset.cat;
                item.classList.toggle('checked', model.categories?.includes(cat));
            });

            this.editModalOverlay.classList.add('open');
            this.editModal.classList.add('open');
        }

        closeEditModal() {
            this.editingModel = null;
            this.editModalOverlay.classList.remove('open');
            this.editModal.classList.remove('open');
        }

        saveEdit() {
            if (!this.editingModel) return;

            const company = this.editModal.querySelector('#lmm-edit-company').value.trim();
            const arenaMode = this.editModal.querySelector('#lmm-edit-mode').value;
            const categories = [];

            this.editModal.querySelectorAll('.lmm-checkbox-item.checked').forEach(item => {
                categories.push(item.dataset.cat);
            });

            this.dm.updateModel(this.editingModel, {
                company: company || 'Other',
                companyManual: true,
                arenaMode,
                arenaModeManual: true,
                categories,
                categoriesManual: true
            });

            this.closeEditModal();
            this.refresh();
            this.updateSidebar();
            this.scanner.toast('已保存', 'success');
        }
    }

    // ==================== 初始化 ====================
    function init() {
        console.log(`[LMM] LMArena Manager v${VERSION} 启动`);

        const dm = new DataManager();
        const scanner = new Scanner(dm);
        const ui = new UI(dm, scanner);

        ui.init();
        scanner.startObserving();

        setTimeout(() => scanner.scan(), 2000);

        console.log(`[LMM] 初始化完成`);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();