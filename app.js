// ============================================================
// NexusHub - 主应用逻辑 (app.js)
// 纯 Vanilla JS，替代 React/TypeScript
// ============================================================

(function () {
  'use strict';

  // ========== 应用状态 ==========
  const state = {
    theme: 'dark',          // dark | light
    lang: 'zh',             // zh | en
    currentView: 'home',    // home | workspace | help | admin | chat
    searchQuery: '',
    selectedIndustry: Industry.ALL,
    currentUser: DEMO_ACCOUNTS[0],  // 默认演示账号（销售员工）
    isLoginOpen: false,
    searchResults: null     // 本地搜索结果缓存
  };

  // ========== DOM 引用缓存 ==========
  const dom = {};

  function cacheDom() {
    // 导航栏
    dom.navbar = document.getElementById('navbar');
    dom.navLinks = document.getElementById('navLinks');
    dom.langToggleBtn = document.getElementById('langToggleBtn');
    dom.themeToggleBtn = document.getElementById('themeToggleBtn');
    dom.themeIconLight = document.getElementById('themeIconLight');
    dom.themeIconDark = document.getElementById('themeIconDark');
    dom.navLoginBtn = document.getElementById('navLoginBtn');
    dom.userMenuWrapper = document.getElementById('userMenuWrapper');
    dom.userMenuBtn = document.getElementById('userMenuBtn');
    dom.userMenu = document.getElementById('userMenu');
    dom.mobileMenuBtn = document.getElementById('mobileMenuBtn');

    // 登录弹窗
    dom.loginModal = document.getElementById('loginModal');
    dom.loginCloseBtn = document.getElementById('loginCloseBtn');

    // 回到顶部
    dom.backToTopBtn = document.getElementById('backToTopBtn');

    // 页脚
    dom.appFooter = document.getElementById('appFooter');

    // 首页元素
    dom.heroTag = document.getElementById('heroTag');
    dom.heroTitle = document.getElementById('heroTitle');
    dom.heroSubtitle = document.getElementById('heroSubtitle');
    dom.searchInput = document.getElementById('searchInput');
    dom.searchHint = document.getElementById('searchHint');
    dom.searchResultsPanel = document.getElementById('searchResultsPanel');
    dom.searchResultHeader = document.getElementById('searchResultHeader');
    dom.searchChatResponse = document.getElementById('searchChatResponse');
    dom.searchRecommendedGrid = document.getElementById('searchRecommendedGrid');
    dom.industryTabs = document.getElementById('industryTabs');
    dom.agentsGrid = document.getElementById('agentsGrid');
    dom.recentGrid = document.getElementById('recentGrid');
    dom.workspaceRecentGrid = document.getElementById('workspaceRecentGrid');
    dom.workspaceAgentsGrid = document.getElementById('workspaceAgentsGrid');
    dom.workspaceRecentCount = document.getElementById('workspaceRecentCount');
    dom.workspaceAvailableCount = document.getElementById('workspaceAvailableCount');
    dom.workspaceUserRole = document.getElementById('workspaceUserRole');
    dom.adminAgentRows = document.getElementById('adminAgentRows');
    dom.noResultsArea = document.getElementById('noResultsArea');
    dom.noResultsText = document.getElementById('noResultsText');
    dom.noResultsSubtext = document.getElementById('noResultsSubtext');

    // 页面视图容器
    dom.viewHome = document.getElementById('viewHome');
    dom.viewPricing = document.getElementById('viewPricing');
    dom.viewEnterprise = document.getElementById('viewEnterprise');
    dom.viewAbout = document.getElementById('viewAbout');
    dom.viewWorkspace = document.getElementById('viewWorkspace');
    dom.viewHelp = document.getElementById('viewHelp');
    dom.viewAdmin = document.getElementById('viewAdmin');
    dom.viewChat = document.getElementById('viewChat');

    // 定价页面
    dom.pricingTitle = document.getElementById('pricingTitle');
    dom.pricingSubtitle = document.getElementById('pricingSubtitle');
    dom.pricingGrid = document.getElementById('pricingGrid');

    // 企业版页面
    dom.enterpriseBadge = document.getElementById('enterpriseBadge');
    dom.enterpriseTitle = document.getElementById('enterpriseTitle');
    dom.enterpriseSubtitle = document.getElementById('enterpriseSubtitle');
    dom.enterpriseGrid = document.getElementById('enterpriseGrid');
    dom.enterpriseCtaBtn = document.getElementById('enterpriseCtaBtn');

    // 关于页面
    dom.aboutBadge = document.getElementById('aboutBadge');
    dom.aboutTitle = document.getElementById('aboutTitle');
    dom.aboutContent = document.getElementById('aboutContent');
    dom.aboutStats = document.getElementById('aboutStats');

    // 聊天界面
    dom.chatSidebar = document.getElementById('chatSidebar');
    dom.chatNewBtn = document.getElementById('chatNewBtn');
    dom.chatHistoryList = document.getElementById('chatHistoryList');
    dom.chatMessagesArea = document.getElementById('chatMessagesArea');
    dom.chatTextarea = document.getElementById('chatTextarea');
    dom.chatSendBtn = document.getElementById('chatSendBtn');
    dom.chatMobileToggle = document.getElementById('chatMobileToggle');
    dom.chatWelcomeText = document.getElementById('chatWelcomeText');

    // 登录弹窗文案
    dom.loginTitle = document.getElementById('loginTitle');
    dom.loginSubtitle = document.getElementById('loginSubtitle');
    dom.loginPhoneLabel = document.getElementById('loginPhoneLabel');
    dom.loginCodeLabel = document.getElementById('loginCodeLabel');
    dom.loginAccountLabel = document.getElementById('loginAccountLabel');
    dom.loginPasswordLabel = document.getElementById('loginPasswordLabel');
    dom.loginForgotLink = document.getElementById('loginForgotLink');
    dom.loginSubmitBtn = document.getElementById('loginSubmitBtn');
    dom.loginDividerOr = document.getElementById('loginDividerOr');
    dom.loginFooterText = document.getElementById('loginFooterText');
    dom.demoAccountLabel = document.getElementById('demoAccountLabel');

    // 登录 Tabs 与演示账号
    dom.loginTabs = document.getElementById('loginTabs');
    dom.demoAccountList = document.getElementById('demoAccountList');
    dom.sendCodeBtn = document.getElementById('sendCodeBtn');
    dom.passwordLoginBtn = document.getElementById('passwordLoginBtn');
    dom.wechatLoginBtn = document.getElementById('wechatLoginBtn');
    dom.wechatQrDemo = document.getElementById('wechatQrDemo');
    dom.wechatHint = document.getElementById('wechatHint');
    dom.phoneInput = document.getElementById('phoneInput');
    dom.codeInput = document.getElementById('codeInput');

    // 页脚文案
    dom.footerCopyright = document.getElementById('footerCopyright');
    dom.footerPrivacy = document.getElementById('footerPrivacy');
    dom.footerTerms = document.getElementById('footerTerms');
    dom.footerContact = document.getElementById('footerContact');

    // 主内容区
    dom.mainContent = document.getElementById('mainContent');
  }

  // ========== 初始化 ==========
  function init() {
    // 标记 JS 已启动：无 JS 时元素保持可见（避免崩溃导致整页空白）
    document.documentElement.classList.remove('no-js');
    document.documentElement.classList.add('js');

    cacheDom();
    applyTheme(state.theme);
    bindEvents();

    // 检查 URL 参数 ?view=chat
    var params = new URLSearchParams(window.location.search);
    if (params.get('view') === 'chat') {
      state.currentView = 'chat';
      renderView();
    }

    // 渲染初始内容
    renderAllI18n();
    renderUserState();
    renderIndustryTabs();
    renderAgents();
    renderRecentAgents();
    renderWorkspacePage();
    renderAdminPage();
    renderPricingPage();
    renderEnterprisePage();
    renderAboutPage();

    // 启动高级动画系统
    initStaggeredCards();
    initScrollReveal();
    initNavbarScrollEffect();
    initStatsCounter();
  }

  // ========== 主题管理 ==========
  function applyTheme(theme) {
    state.theme = theme;
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      if (dom.themeIconLight) dom.themeIconLight.style.display = '';
      if (dom.themeIconDark) dom.themeIconDark.style.display = 'none';
    } else {
      document.documentElement.classList.remove('dark');
      if (dom.themeIconLight) dom.themeIconLight.style.display = 'none';
      if (dom.themeIconDark) dom.themeIconLight && (dom.themeIconDark.style.display = '');
    }
  }

  function toggleTheme() {
    applyTheme(state.theme === 'dark' ? 'light' : 'dark');
  }

  // ========== 语言切换 ==========
  function toggleLang() {
    state.lang = state.lang === 'en' ? 'zh' : 'en';
    renderAllI18n();
    renderIndustryTabs();
    renderAgents();           // 重新渲染卡片（语言变化后名称/描述更新）
    renderRecentAgents();
    renderWorkspacePage();
    renderAdminPage();
    renderPricingPage();
    renderEnterprisePage();
    renderAboutPage();
    renderLoginI18n();
    renderFooterI18n();
    renderChatI18n();
    updateNavActiveLink();
  }

  function t(keyPath) {
    // 支持 "nav.home" 这样的点分路径
    var keys = keyPath.split('.');
    var obj = translations[state.lang];
    for (var i = 0; i < keys.length; i++) {
      if (obj && typeof obj[keys[i]] !== 'undefined') {
        obj = obj[keys[i]];
      } else {
        return keyPath;
      }
    }
    return typeof obj === 'string' ? obj : keyPath;
  }

  // 渲染所有静态文本（i18n）
  function renderAllI18n() {
    var l = state.lang;

    // Navbar
    var navItems = dom.navLinks.querySelectorAll('.navbar-link');
    if (navItems[0]) navItems[0].textContent = t('nav.home');
    if (navItems[1]) navItems[1].textContent = t('nav.workspace');
    if (navItems[2]) navItems[2].textContent = t('nav.help');
    dom.navLoginBtn.textContent = state.currentUser ? state.currentUser.name : t('nav.login');

    // Hero
    dom.heroTag.textContent = t('hero.tag');
    dom.heroTitle.innerHTML = t('hero.title').replace('\n', '<br/>');
    dom.heroSubtitle.textContent = t('hero.subtitle');

    // Search
    dom.searchInput.placeholder = t('search.placeholder');
    dom.searchHint.textContent = t('search.hint');
    dom.searchResultHeader.textContent = t('search.resultTitle');

    // No results
    dom.noResultsText.textContent = t('common.noResults');
    dom.noResultsSubtext.textContent = t('common.tryAdjusting');

    // Chat welcome
    dom.chatWelcomeText.textContent = t('chat.welcome');
    dom.chatTextarea.placeholder = t('chat.placeholder');
    dom.chatNewBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> ' + t('chat.newChat');

    renderLoginI18n();
    renderFooterI18n();
    renderChatI18n();
  }

  function renderLoginI18n() {
    dom.loginTitle.textContent = t('login.title');
    dom.loginSubtitle.textContent = t('login.subtitle');
    dom.loginForgotLink.textContent = t('login.forgot');
    dom.loginSubmitBtn.textContent = t('login.btn');
    dom.loginDividerOr.textContent = t('login.demoDivider');
    dom.loginFooterText.innerHTML = t('login.noAccount') + ' <a href="#">' + t('login.register') + '</a>';

    // 登录方式 Tabs
    if (dom.loginTabs) {
      var tabLabels = { verify: t('login.tabVerify'), password: t('login.tabPassword'), wechat: t('login.tabWechat') };
      dom.loginTabs.querySelectorAll('.login-tab').forEach(function (tb) {
        if (tabLabels[tb.dataset.tab]) tb.textContent = tabLabels[tb.dataset.tab];
      });
    }
    // 表单标签与按钮
    if (dom.loginPhoneLabel) dom.loginPhoneLabel.textContent = t('login.phone');
    if (dom.loginCodeLabel) dom.loginCodeLabel.textContent = t('login.code');
    if (dom.loginAccountLabel) dom.loginAccountLabel.textContent = t('login.account');
    if (dom.sendCodeBtn) dom.sendCodeBtn.textContent = t('login.sendCode');
    if (dom.passwordLoginBtn) dom.passwordLoginBtn.textContent = t('login.btn');
    if (dom.demoAccountLabel) dom.demoAccountLabel.textContent = t('login.demoLabel');
    if (dom.wechatHint) dom.wechatHint.textContent = t('login.wechatHint');
    if (dom.wechatLoginBtn && dom.wechatLoginBtn.lastChild) {
      dom.wechatLoginBtn.lastChild.textContent = ' ' + t('login.wechatLogin');
    }
  }

  function renderFooterI18n() {
    dom.footerCopyright.textContent = t('footer.copyright');
    dom.footerPrivacy.textContent = t('footer.privacy');
    dom.footerTerms.textContent = t('footer.terms');
    dom.footerContact.textContent = t('footer.contact');
  }

  function renderChatI18n() {
    dom.chatWelcomeText.textContent = t('chat.welcome');
    dom.chatTextarea.placeholder = t('chat.placeholder');
  }

  // ========== 视图路由 ==========
  function navigateTo(view) {
    if (view === '/chat' || view === 'chat') {
      state.currentView = 'chat';
    } else {
      state.currentView = view;
    }
    renderView();
  }

  function renderView() {
    var isChat = state.currentView === 'chat';

    // 显示/隐藏导航栏和页脚
    dom.navbar.style.display = isChat ? 'none' : '';
    dom.appFooter.style.display = isChat ? 'none' : '';

    // 主内容区域样式调整
    if (isChat) {
      dom.mainContent.className = 'h-screen overflow-hidden';
    } else {
      dom.mainContent.className = 'pb-20';
    }

    // 切换视图显示
    dom.viewHome.classList.toggle('active', !isChat && state.currentView === 'home');
    if (dom.viewPricing) dom.viewPricing.classList.toggle('active', !isChat && state.currentView === 'pricing');
    if (dom.viewEnterprise) dom.viewEnterprise.classList.toggle('active', !isChat && state.currentView === 'enterprise');
    if (dom.viewAbout) dom.viewAbout.classList.toggle('active', !isChat && state.currentView === 'about');
    if (dom.viewWorkspace) dom.viewWorkspace.classList.toggle('active', !isChat && state.currentView === 'workspace');
    if (dom.viewHelp) dom.viewHelp.classList.toggle('active', !isChat && state.currentView === 'help');
    if (dom.viewAdmin) dom.viewAdmin.classList.toggle('active', !isChat && state.currentView === 'admin');
    dom.viewChat.classList.toggle('active', isChat);

    if (dom.navLinks) {
      var homeItem = dom.navLinks.querySelector('[data-view="home"]');
      var workspaceItem = dom.navLinks.querySelector('[data-view="workspace"]');
      var helpItem = dom.navLinks.querySelector('[data-view="help"]');
      if (homeItem) homeItem.classList.toggle('active', state.currentView === 'home');
      if (workspaceItem) workspaceItem.classList.toggle('active', state.currentView === 'workspace');
      if (helpItem) helpItem.classList.toggle('active', state.currentView === 'help');
    }

    if (!isChat) {
      renderRecentAgents();
      renderWorkspacePage();
      renderAdminPage();
      renderUserState();
    }

    // 更新导航激活状态
    updateNavActiveLink();
  }

  function updateNavActiveLink() {
    var links = dom.navLinks.querySelectorAll('.navbar-link');
    links.forEach(function (link) {
      var v = link.dataset.view || link.dataset.nav;
      link.classList.remove('active');
      if ((v === state.currentView) || (state.currentView === 'chat' && v === 'chat')) {
        link.classList.add('active');
      }
    });
  }

  // ========== 行业筛选 Tabs ==========
  function getIndustrySvg(type) {
    var svgs = {};
    svgs[Industry.ALL] = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>';
    svgs[Industry.SMART_QA] = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>';
    svgs[Industry.SMART_DATA] = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>';
    svgs[Industry.SMART_AUDIT] = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';
    svgs[Industry.SMART_GEN] = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>';
    return svgs[type] || svgs[Industry.ALL];
  }

  function renderIndustryTabs() {
    var html = '';
    var industries = [Industry.ALL, Industry.SMART_QA, Industry.SMART_DATA, Industry.SMART_AUDIT, Industry.SMART_GEN];
    var indT = translations[state.lang].industries;

    industries.forEach(function (ind) {
      var label = indT[ind] || ind;
      var isActive = state.selectedIndustry === ind ? ' active' : '';
      html += '<button class="industry-tab' + isActive + '" data-industry="' + ind + '">' +
        getIndustrySvg(ind) + '<span>' + label + '</span></button>';
    });
    dom.industryTabs.innerHTML = html;

    // 绑定点击事件
    dom.industryTabs.querySelectorAll('.industry-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        state.selectedIndustry = this.dataset.industry;
        // 更新激活状态
        dom.industryTabs.querySelectorAll('.industry-tab').forEach(function (t) { t.classList.remove('active'); });
        this.classList.add('active');
        renderAgents();
        renderWorkspacePage();
      });
    });
  }

  // ========== 权限与可见性 ==========
  function isAdminUser() {
    var user = state.currentUser;
    return !!(user && user.roles && (user.roles.indexOf('admin') !== -1 || user.roles.indexOf('super_admin') !== -1));
  }

  function canViewAgent(agent) {
    var visibility = agent.visibility || 'company';
    var user = state.currentUser;

    if (isAdminUser()) return true;  // 管理员可见全部智能体

    if (visibility === 'public') return true;
    if (!user) return false;
    if (visibility === 'company') return true;
    if (visibility === 'department') {
      return Array.isArray(agent.departments) && agent.departments.indexOf(user.departmentId) !== -1;
    }
    if (visibility === 'admin') return isAdminUser();
    if (visibility === 'private') {
      return Array.isArray(agent.allowedUserIds) && agent.allowedUserIds.indexOf(user.id) !== -1;
    }
    return false;
  }

  function getVisibleAgents() {
    return AGENTS.filter(canViewAgent);
  }

  function getVisibilityLabel(agent) {
    var labels = {
      public: state.lang === 'zh' ? '公开' : 'Public',
      company: state.lang === 'zh' ? '全公司' : 'Company',
      department: state.lang === 'zh' ? '部门可见' : 'Department',
      admin: state.lang === 'zh' ? '管理员' : 'Admin',
      private: state.lang === 'zh' ? '指定人员' : 'Private'
    };
    return labels[agent.visibility || 'company'] || labels.company;
  }

  function getRecentAgents() {
    var preferred = ['instant-query', 'marketing-gen', 'daily-briefing', 'product-qa'];
    var visible = getVisibleAgents();
    return preferred.map(function (id) {
      return visible.find(function (a) { return a.id === id; });
    }).filter(Boolean).slice(0, 4);
  }

  // ========== Agent 卡片渲染 ==========
  function getFilteredAgents() {
    var agents = getVisibleAgents();

    // 搜索过滤
    if (state.searchQuery.trim()) {
      var q = state.searchQuery.toLowerCase();
      agents = agents.filter(function (a) {
        return a.name[state.lang].toLowerCase().indexOf(q) !== -1 ||
               a.description[state.lang].toLowerCase().indexOf(q) !== -1 ||
               a.capabilities.some(function (c) { return c[state.lang].toLowerCase().indexOf(q) !== -1; });
      });
    }

    // 行业过滤
    if (state.selectedIndustry !== Industry.ALL) {
      agents = agents.filter(function (a) { return a.industry === state.selectedIndustry; });
    }

    return agents;
  }

  function renderAgents() {
    var filtered = getFilteredAgents();

    if (filtered.length > 0) {
      dom.agentsGrid.style.display = '';
      dom.noResultsArea.classList.add('hidden');
      dom.agentsGrid.innerHTML = filtered.map(function (agent) { return buildAgentCard(agent); }).join('');
    } else {
      dom.agentsGrid.style.display = 'none';
      dom.noResultsArea.classList.remove('hidden');
    }
  }

  function buildAgentCard(agent) {
    var customClass = agent.isCustom ? ' is-custom' : '';

    // 评分星星
    var ratingHtml = agent.rating ?
      '<div class="agent-card-rating">' +
        '<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>' +
        '<span style="margin-left:2px;color:var(--text-muted);font-weight:500;">' + agent.rating + '</span></div>' : '';

    // 用户数
    var usersHtml = agent.users ?
      '<div class="agent-card-users">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>' +
        '<span>' + formatNumber(agent.users) + ' <span data-i18n="users">' + t('common.users') + '</span></span></div>' : '';

    // 能力标签
    var tagsHtml = '<span class="agent-tag visibility-tag">' + getVisibilityLabel(agent) + '</span>' + agent.capabilities.map(function (cap) {
      return '<span class="agent-tag">' + cap[state.lang] + '</span>';
    }).join('');

    // CTA 文案
    var ctaText = agent.isCustom ? t('common.learnMore') : t('common.tryIt');

    return '<a href="' + agent.link + '" target="_blank" rel="noopener noreferrer" class="agent-card' + customClass + '">' +
      '<div class="agent-card-image-container">' +
        '<img src="' + agent.image + '" alt="' + agent.name[state.lang] + '" class="agent-card-image" loading="lazy"/>' +
      '</div>' +
      '<div class="agent-card-body">' +
        '<div class="agent-card-header">' +
          '<h3 class="agent-card-title">' + agent.name[state.lang] + '</h3>' +
          ratingHtml +
        '</div>' +
        '<p class="agent-card-desc">' + agent.description[state.lang] + '</p>' +
        '<div class="agent-card-tags">' + tagsHtml + '</div>' +
        '<div class="agent-card-footer">' +
          usersHtml +
          '<span class="agent-card-cta">' + ctaText +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>' +
          '</span>' +
        '</div>' +
      '</div>' +
    '</a>';
  }

  function formatNumber(num) {
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k+';
    return num.toString();
  }

  function buildRecentCard(agent) {
    return '<a href="' + agent.link + '" target="_blank" rel="noopener noreferrer" class="recent-card">' +
      '<img src="' + agent.image + '" alt="' + agent.name[state.lang] + '" />' +
      '<div class="recent-card-body">' +
        '<strong>' + agent.name[state.lang] + '</strong>' +
        '<span>' + getVisibilityLabel(agent) + '</span>' +
      '</div>' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>' +
    '</a>';
  }

  function renderRecentAgents() {
    if (!dom.recentGrid) return;
    var recent = getRecentAgents();
    dom.recentGrid.innerHTML = recent.map(buildRecentCard).join('');
  }

  function renderWorkspacePage() {
    if (!dom.workspaceAgentsGrid) return;
    var visible = getVisibleAgents();
    var recent = getRecentAgents();
    dom.workspaceRecentCount.textContent = recent.length;
    dom.workspaceAvailableCount.textContent = visible.length;
    dom.workspaceUserRole.textContent = state.currentUser ? state.currentUser.departmentName : '游客';
    dom.workspaceRecentGrid.innerHTML = recent.map(buildRecentCard).join('');
    dom.workspaceAgentsGrid.innerHTML = visible.slice(0, 8).map(buildAgentCard).join('');
  }

  function renderAdminPage() {
    if (!dom.adminAgentRows) return;
    if (!isAdminUser()) {
      dom.adminAgentRows.innerHTML = '<div class="admin-empty">当前账号无管理权限</div>';
      return;
    }
    dom.adminAgentRows.innerHTML = AGENTS.map(function (agent) {
      return '<div class="admin-table-row">' +
        '<span>' + agent.name[state.lang] + '</span>' +
        '<span>' + getVisibilityLabel(agent) + '</span>' +
        '<span>可用</span>' +
        '<span><button class="admin-text-btn">编辑</button></span>' +
      '</div>';
    }).join('');
  }

  function renderUserState() {
    if (!dom.userMenuWrapper || !dom.navLoginBtn) return;
    if (state.currentUser) {
      dom.navLoginBtn.style.display = 'none';
      dom.userMenuWrapper.style.display = 'block';
      var nameEl = dom.userMenuWrapper.querySelector('.user-name');
      var avatarEl = dom.userMenuWrapper.querySelector('.user-avatar');
      if (nameEl) nameEl.textContent = state.currentUser.name;
      if (avatarEl) avatarEl.textContent = state.currentUser.name.charAt(0);
      var adminItem = dom.userMenuWrapper.querySelector('[data-view="admin"]');
      if (adminItem) adminItem.style.display = isAdminUser() ? '' : 'none';
    } else {
      dom.navLoginBtn.textContent = t('nav.login');
      dom.navLoginBtn.style.display = '';
      dom.userMenuWrapper.style.display = 'none';
    }
  }

  // ========== 搜索功能（本地卡片过滤 + Gemini 智能推荐） ==========
  var searchTimeout = null;

  function renderRecommendedAgents(ids) {
    if (!dom.searchRecommendedGrid) return;
    if (!ids || !ids.length) {
      dom.searchRecommendedGrid.innerHTML = '';
      return;
    }
    var matched = AGENTS.filter(function (a) {
      return ids.indexOf(a.id) !== -1;
    });
    dom.searchRecommendedGrid.innerHTML = matched.map(buildAgentCard).join('');
    applyCardDelays('search-recommended-grid');
  }

  function performSearch(query) {
    state.searchQuery = query;
    state.searchResults = null;

    // 空输入时隐藏 AI 推荐面板
    if (dom.searchResultsPanel) {
      dom.searchResultsPanel.classList.add('hidden');
      dom.searchChatResponse.textContent = '';
      renderRecommendedAgents(null);
    }

    renderAgents();
    renderRecentAgents();
    renderWorkspacePage();

    // 仅在非空查询时调用 Gemini 智能推荐
    if (query.trim()) {
      findMatchingAgents(query.trim()).then(function (result) {
        // 结果可能晚于下一次输入，检查当前 query 是否仍匹配
        if (state.searchQuery !== query.trim()) return;
        if (!result || !dom.searchResultsPanel) return;

        dom.searchChatResponse.textContent = result.chatResponse || '';
        renderRecommendedAgents(result.recommendedAgentIds || []);

        // 有内容才显示面板
        var hasResponse = (result.chatResponse && result.chatResponse.length > 0) ||
                          (result.recommendedAgentIds && result.recommendedAgentIds.length > 0);
        dom.searchResultsPanel.classList.toggle('hidden', !hasResponse);
      });
    }
  }

  // ========== 定价页面 ==========
  function renderPricingPage() {
    var pt = translations[state.lang].pricing;
    dom.pricingTitle.textContent = pt.title;
    dom.pricingSubtitle.textContent = pt.subtitle;

    dom.pricingGrid.innerHTML =
      buildPricingCard(pt.free, false) +
      buildPricingCard(pt.pro, true) +
      buildPricingCard(pt.enterprise, false);
  }

  function buildPricingCard(plan, isPopular) {
    var popularBadge = isPopular ? '<div class="pricing-popular-badge">Most Popular</div>' : '';
    var featuresHtml = plan.features.map(function (f) {
      return '<li>' + f + '</li>';
    }).join('');

    var popularClass = isPopular ? ' popular' : '';
    var priceHtml = plan.price === 'Custom' || plan.price === '定制'
      ? '<span style="font-size:1.5rem;font-weight:800;">' + plan.price + '</span>'
      : '<span class="pricing-price">' + plan.price + '</span><small>' + plan.period + '</small>';

    return '<div class="pricing-card' + popularClass + '">' +
      popularBadge +
      '<h3 class="pricing-name">' + plan.name + '</h3>' +
      '<p class="pricing-desc">' + plan.desc + '</p>' +
      priceHtml +
      '<ul class="pricing-features">' + featuresHtml + '</ul>' +
      '<a href="#" class="pricing-btn" onclick="return false;">Get Started</a>' +
    '</div>';
  }

  // ========== 企业版页面 ==========
  function renderEnterprisePage() {
    var et = translations[state.lang].enterprise;
    dom.enterpriseBadge.textContent = et.badge;
    dom.enterpriseTitle.textContent = et.title;
    dom.enterpriseSubtitle.textContent = et.subtitle;
    dom.enterpriseCtaBtn.childNodes[0].textContent = ' ' + et.cta;

    var featureIcons = {
      shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
      code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
      users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>',
      headset: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/></svg>'
    };

    dom.enterpriseGrid.innerHTML = et.features.map(function (f) {
      return '<div class="enterprise-feature-card">' +
        '<div class="enterprise-feature-icon">' + (featureIcons[f.icon] || featureIcons.shield) + '</div>' +
        '<h3 class="enterprise-feature-title">' + f.title + '</h3>' +
        '<p class="enterprise-feature-desc">' + f.desc + '</p>' +
      '</div>';
    }).join('');
  }

  // ========== 关于页面 ==========
  function renderAboutPage() {
    var at = translations[state.lang].about;
    dom.aboutBadge.textContent = at.badge;
    dom.aboutTitle.textContent = at.title;
    dom.aboutContent.textContent = at.content;

    var stats = [
      { num: at.stats.agents, label: 'AI Agents' },
      { num: at.stats.users, label: 'Active Users' },
      { num: at.stats.satisfaction, label: 'Satisfaction' }
    ];

    dom.aboutStats.innerHTML = stats.map(function (s) {
      return '<div class="about-stat-item">' +
        '<div class="about-stat-number">' + s.num + '</div>' +
        '<div class="about-stat-label">' + s.label + '</div>' +
      '</div>';
    }).join('');
  }

  // ========== 登录弹窗 ==========
  function switchLoginTab(tabName) {
    var tabs = dom.loginTabs ? dom.loginTabs.querySelectorAll('.login-tab') : [];
    tabs.forEach(function (t) {
      t.classList.toggle('active', t.dataset.tab === tabName);
    });
    ['panelVerifyCode', 'panelPassword', 'panelWechat'].forEach(function (id, i) {
      var el = document.getElementById(id);
      var names = ['verify', 'password', 'wechat'];
      if (el) el.classList.toggle('active', names[i] === tabName);
    });
  }

  function openLogin() {
    state.isLoginOpen = true;
    dom.loginModal.classList.add('open');
    renderDemoAccounts();
    switchLoginTab('verify');
  }

  function closeLogin() {
    state.isLoginOpen = false;
    dom.loginModal.classList.remove('open');
  }

  function renderDemoAccounts() {
    if (!dom.demoAccountList) return;
    dom.demoAccountList.innerHTML = DEMO_ACCOUNTS.map(function (acc) {
      var adminClass = (acc.roles && acc.roles.indexOf('admin') !== -1) ? ' admin' : '';
      var arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
      return '<button class="demo-account-btn' + adminClass + '" data-id="' + acc.id + '">' +
        '<span class="demo-account-avatar">' + acc.name.charAt(0) + '</span>' +
        '<span class="demo-account-info"><strong>' + acc.name + '</strong>' +
        '<span>' + t('login.demoRole') + ' · ' + acc.departmentName + '</span></span>' +
        '<span class="demo-account-arrow">' + arrow + '</span>' +
      '</button>';
    }).join('');

    dom.demoAccountList.querySelectorAll('.demo-account-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.dataset.id;
        var acc = DEMO_ACCOUNTS.find(function (a) { return a.id === id; });
        if (acc) loginAs(acc);
      });
    });
  }

  function loginAs(account) {
    if (!account) return;
    state.currentUser = account;
    closeLogin();
    renderUserState();
    renderAgents();
    renderRecentAgents();
    renderWorkspacePage();
    renderView();
  }

  // ========== 聊天功能 ==========
  function sendMessage() {
    var text = dom.chatTextarea.value.trim();
    if (!text) return;

    // 添加用户消息气泡
    addChatBubble(text, 'user');
    dom.chatTextarea.value = '';
    autoResizeTextarea(dom.chatTextarea);

    // 移除欢迎消息
    var welcome = dom.chatMessagesArea.querySelector('.chat-welcome');
    if (welcome) welcome.style.display = 'none';

    // 模拟 AI 回复（原项目也是模拟回复）
    setTimeout(function () {
      var replies = {
        zh: [
          '好的，我已经理解了您的需求。请问还有其他需要帮助的吗？',
          '这是一个很好的问题！让我为您详细解答。',
          '根据我的分析，建议您可以尝试以下方案…',
          '感谢您的提问。我可以为您提供更多相关信息。'
        ],
        en: [
          "Got it! I've understood your need. Is there anything else I can help you with?",
          "That's a great question! Let me explain in detail.",
          "Based on my analysis, I'd suggest trying the following approach...",
          "Thanks for asking! I can provide more related information."
        ]
      };
      var replyPool = replies[state.lang] || replies.zh;
      var reply = replyPool[Math.floor(Math.random() * replyPool.length)];
      addChatBubble(reply, 'ai');
    }, 600 + Math.random() * 1000);
  }

  function addChatBubble(text, type) {
    var div = document.createElement('div');
    div.className = 'chat-msg-bubble chat-msg-' + type;
    div.textContent = text;
    dom.chatMessagesArea.appendChild(div);
    dom.chatMessagesArea.scrollTop = dom.chatMessagesArea.scrollHeight;
  }

  function autoResizeTextarea(el) {
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 150) + 'px';
  }

  // ========== 回到顶部 ==========
  function handleScroll() {
    if (window.scrollY > 400) {
      dom.backToTopBtn.classList.add('visible');
    } else {
      dom.backToTopBtn.classList.remove('visible');
    }
  }

  // ========== 高级动画系统 ==========

  // --- 卡片错落入场动画 ---
  function initStaggeredCards() {
    applyCardDelays('agents-grid');
    applyCardDelays('workspaceAgentsGrid');
    applyCardDelays('recentGrid');
    applyCardDelays('workspaceRecentGrid');
    applyCardDelays('pricing-grid');
    applyCardDelays('enterprise-grid');
    applyCardDelays('search-recommended-grid');
    applyCardDelays('about-stats');
  }

  function applyCardDelays(containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;
    var cards = container.querySelectorAll('.agent-card, .recent-card, .pricing-card, .enterprise-feature-card, .about-stat-item');
    cards.forEach(function (card, i) {
      card.style.setProperty('--delay', (i * 70) + 'ms');
    });
  }

  // 每次重新渲染后重新应用延迟
  var _origRenderAgents = renderAgents;
  renderAgents = function () {
    _origRenderAgents();
    setTimeout(applyCardDelays, 10, 'agents-grid');
  };

  // --- 滚动视差显现 (IntersectionObserver) ---
  function initScrollReveal() {
    if (typeof IntersectionObserver === 'undefined') return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    // 为需要滚动显现的元素添加 class
    var revealTargets = document.querySelectorAll(
      '.pricing-card, .enterprise-feature-card, .about-stat-item'
    );
    revealTargets.forEach(function (el) {
      el.classList.add('scroll-reveal');
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1)';
      observer.observe(el);
    });
  }

  // 滚动后移除隐藏样式
  document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
      var style = document.createElement('style');
      style.textContent =
        '.scroll-reveal.revealed { opacity: 1 !important; transform: translateY(0) !important; }';
      document.head.appendChild(style);
    }, 100);
  });

  // --- 导航栏滚动收缩效果 ---
  function initNavbarScrollEffect() {
    var lastScroll = 0;
    var ticking = false;

    window.addEventListener('scroll', function () {
      lastScroll = window.scrollY;
      if (!ticking) {
        requestAnimationFrame(function () {
          updateNavbarState(lastScroll);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  function updateNavbarState(scrollY) {
    if (!dom.navbar) return;
    if (scrollY > 60) {
      dom.navbar.classList.add('navbar-scrolled');
    } else {
      dom.navbar.classList.remove('navbar-scrolled');
    }
  }

  // --- 统计数字递增动画 ---
  function initStatsCounter() {
    if (typeof IntersectionObserver === 'undefined') return;

    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !entry.dataset.counted) {
          entry.dataset.counted = 'true';
          animateCounter(entry);
        }
      });
    }, { threshold: 0.5 });

    var statNumbers = document.querySelectorAll('.about-stat-number');
    statNumbers.forEach(function (el) { counterObserver.observe(el); });
  }

  function animateCounter(el) {
    var text = el.textContent.trim();
    var match = text.match(/(\d+)/);
    if (!match) return;

    var target = parseInt(match[1], 10);
    var duration = 1200;
    var start = performance.now();

    function step(now) {
      var progress = Math.min((now - start) / duration, 1);
      // easeOutExpo
      var eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      var current = Math.round(eased * target);
      el.textContent = text.replace(/\d+/, current + '+');
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }
  function bindEvents() {
    // 主题切换
    dom.themeToggleBtn.addEventListener('click', toggleTheme);

    // 语言切换
    dom.langToggleBtn.addEventListener('click', toggleLang);

    // 导航链接点击
    dom.navLinks.addEventListener('click', function (e) {
      var target = e.target.closest('.navbar-link');
      if (!target) return;
      e.preventDefault();
      var v = target.dataset.view;
      if (target.dataset.nav === 'chat') {
        navigateTo('chat');
      } else if (v) {
        navigateTo(v);
      }
      // 关闭移动端菜单
      dom.navLinks.classList.remove('open');
    });

    // 登录按钮 —— 打开弹窗
    dom.navLoginBtn.addEventListener('click', openLogin);

    // Tabs 切换（验证码/密码/微信，纯展示 UI）
    if (dom.loginTabs) {
      dom.loginTabs.addEventListener('click', function (e) {
        var tab = e.target.closest('.login-tab');
        if (!tab) return;
        switchLoginTab(tab.dataset.tab);
      });
    }

    // 获取验证码 / 登录（纯展示，不真正对接服务）
    if (dom.sendCodeBtn) {
      dom.sendCodeBtn.addEventListener('click', function () {
        var phone = dom.phoneInput && dom.phoneInput.value.trim();
        if (!phone) { alert('请输入手机号'); return; }
        alert('验证码已发送到 ' + phone + '（演示，未真实发送）');
      });
    }
    if (dom.loginSubmitBtn) {
      dom.loginSubmitBtn.addEventListener('click', function () {
        alert('演示环境仅支持通过下方“演示账号”登录切换角色。');
      });
    }
    if (dom.passwordLoginBtn) {
      dom.passwordLoginBtn.addEventListener('click', function () {
        alert('演示环境仅支持通过下方“演示账号”登录切换角色。');
      });
    }
    if (dom.wechatLoginBtn) {
      dom.wechatLoginBtn.addEventListener('click', function () {
        alert('微信登录为演示功能，请使用下方“演示账号”快速体验。');
      });
    }

    // 通用页面跳转按钮
    document.addEventListener('click', function (e) {
      var jumpTarget = e.target.closest('[data-view]:not(.navbar-link):not(.user-menu-item)');
      if (!jumpTarget) return;
      e.preventDefault();
      navigateTo(jumpTarget.dataset.view);
    });
    if (dom.userMenuBtn) {
      dom.userMenuBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        dom.userMenuWrapper.classList.toggle('open');
      });
    }
    if (dom.userMenu) {
      dom.userMenu.addEventListener('click', function (e) {
        var item = e.target.closest('.user-menu-item');
        if (!item) return;
        if (item.dataset.view === 'admin') {
          if (isAdminUser()) navigateTo('admin');
          else openLogin();
        }
        if (item.dataset.action === 'logout') {
          state.currentUser = null;
          state.currentView = 'home';
          renderUserState();
          renderAgents();
          renderRecentAgents();
          renderWorkspacePage();
          renderView();
        }
        dom.userMenuWrapper.classList.remove('open');
      });
    }
    document.addEventListener('click', function () {
      if (dom.userMenuWrapper) dom.userMenuWrapper.classList.remove('open');
    });

    // 登录弹窗关闭
    dom.loginCloseBtn.addEventListener('click', closeLogin);
    dom.loginModal.addEventListener('click', function (e) {
      if (e.target === dom.loginModal) closeLogin();
    });

    // 移动端菜单
    dom.mobileMenuBtn.addEventListener('click', function () {
      dom.navLinks.classList.toggle('open');
    });

    // 搜索输入（防抖）
    dom.searchInput.addEventListener('input', function () {
      clearTimeout(searchTimeout);
      var val = this.value;
      searchTimeout = setTimeout(function () { performSearch(val); }, 160);
    });

    // 回到顶部
    dom.backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    window.addEventListener('scroll', handleScroll);

    // 聊天功能
    dom.chatSendBtn.addEventListener('click', sendMessage);
    dom.chatTextarea.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
    dom.chatTextarea.addEventListener('input', function () {
      autoResizeTextarea(this);
    });

    // 新对话按钮
    dom.chatNewBtn.addEventListener('click', function () {
      dom.chatMessagesArea.innerHTML =
        '<div class="chat-welcome">' +
          '<div class="chat-welcome-avatar">N</div>' +
          '<p class="chat-welcome-text">' + t('chat.welcome') + '</p>' +
        '</div>';
    });

    // 移动端聊天侧边栏开关
    dom.chatMobileToggle.addEventListener('click', function () {
      dom.chatSidebar.classList.toggle('open');
    });

    // ESC 关闭登录弹窗 / 侧边栏
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (state.isLoginOpen) closeLogin();
        dom.chatSidebar.classList.remove('open');
      }
    });
  }

  // ========== 启动 ==========
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
