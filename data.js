// ============================================================
// 数据层 - Agent 常量、翻译文本、类型定义
// ============================================================

// --- 行业枚举 ---
const Industry = {
  ALL: 'ALL',
  SMART_QA: 'SMART_QA',      // 智能问答
  SMART_DATA: 'SMART_DATA',    // 智能问数
  SMART_AUDIT: 'SMART_AUDIT',  // 智能审核
  SMART_GEN: 'SMART_GEN'       // 智能生成
};

// --- 语言 & 视图 ---
const Language = { ZH: 'zh', EN: 'en' };
const Theme = { DARK: 'dark', LIGHT: 'light' };

// --- 11 个 AI Agent 配置数据 ---
const AGENTS = [
  {
    id: 'product-qa',
    name: { zh: '产品问答助手', en: 'Product QA Assistant' },
    description: { zh: '基于产品知识库，快速回答客户关于产品功能、规格、使用方法的疑问。支持多轮对话与上下文理解。', en: 'Quickly answers customer questions about product features, specs, and usage. Supports multi-turn context-aware conversations.' },
    capabilities: [
      { zh: '产品知识库问答', en: 'Product Knowledge Q&A' },
      { zh: '多轮对话', en: 'Multi-turn Chat' },
      { zh: '上下文理解', en: 'Context Awareness' }
    ],
    industry: Industry.SMART_QA,
    image: 'public/agents/01.jpg',
    users: 1280,
    rating: 4.9,
    visibility: 'public',
    departments: [],
    link: 'http://183.131.197.246:8080/chat?kb_id=a4b8c3d2-1e5f-4a7b-8c9d-0e1f2a3b4c5d'
  },
  {
    id: 'repair-qa',
    name: { zh: '维修问答专家', en: 'Repair QA Expert' },
    description: { zh: '针对设备维修场景，提供故障诊断步骤、维修方案建议和备件查询服务。大幅缩短维修响应时间。', en: 'Provides fault diagnosis steps, repair suggestions, and spare parts lookup for device maintenance scenarios.' },
    capabilities: [
      { zh: '故障诊断', en: 'Fault Diagnosis' },
      { zh: '维修方案推荐', en: 'Repair Recommendations' },
      { zh: '备件查询', en: 'Spare Parts Lookup' }
    ],
    industry: Industry.SMART_QA,
    image: 'public/agents/02.jpg',
    users: 850,
    rating: 4.7,
    visibility: 'department',
    departments: ['service', 'technology'],
    link: 'http://183.131.197.246:8080/chat?kb_id=b5c9d4e3-2f6a-5b8c-9d0e-1f2a3b4c5d6e'
  },
  {
    id: 'chairman-avatar',
    name: { zh: '董事长分身', en: 'Chairman Avatar' },
    description: { zh: '基于企业决策者的思维模式和过往决策案例训练，辅助管理层进行战略分析和决策推演。', en: 'Trained on decision-maker thinking patterns and past cases to assist management in strategic analysis and decision simulation.' },
    capabilities: [
      { zh: '战略分析', en: 'Strategic Analysis' },
      { zh: '决策推演', en: 'Decision Simulation' },
      { zh: '管理思维', en: 'Management Thinking' }
    ],
    industry: Industry.SMART_QA,
    image: 'public/agents/03.jpg',
    users: 320,
    rating: 4.8,
    visibility: 'admin',
    departments: ['management'],
    link: 'http://183.131.197.246:8080/chat?kb_id=c6d0e5f4-3a7b-6c9d-0e1f-2a3b4c5d6e7f'
  },
  {
    id: 'long-report',
    name: { zh: '长数据汇报生成', en: 'Long Report Generator' },
    description: { zh: '从多个数据源聚合信息，自动生成结构化的长篇数据分析汇报。适用于周报、月报及专项分析场景。', en: 'Aggregates data from multiple sources to generate structured long-form analysis reports for weekly/monthly reports.' },
    capabilities: [
      { zh: '多源数据聚合', en: 'Multi-source Aggregation' },
      { zh: '结构化报告', en: 'Structured Reports' },
      { zh: '趋势分析', en: 'Trend Analysis' }
    ],
    industry: Industry.SMART_DATA,
    image: 'public/agents/04.jpg',
    users: 2100,
    rating: 4.9,
    visibility: 'company',
    departments: [],
    link: 'http://183.131.197.246:8080/chat?kb_id=d7e1f6a5-4b8c-7d0e-1f2a3b4c5d6e7f'
  },
  {
    id: 'daily-briefing',
    name: { zh: '每日数据汇报', en: 'Daily Data Briefing' },
    description: { zh: '每日自动汇总关键业务指标，生成简洁的数据简报推送至相关决策者。支持自定义指标模板。', en: 'Auto-summarizes key business metrics daily and generates concise briefings for decision-makers with custom templates.' },
    capabilities: [
      { zh: '每日自动汇总', en: 'Daily Auto-summary' },
      { zh: '关键指标追踪', en: 'KPI Tracking' },
      { zh: '自定义模板', en: 'Custom Templates' }
    ],
    industry: Industry.SMART_DATA,
    image: 'public/agents/05.jpg',
    users: 1560,
    rating: 4.8,
    visibility: 'department',
    departments: ['sales', 'management'],
    link: 'http://183.131.197.246:8080/chat?kb_id=e8f2a7b6-5c9d-8e1f-2a3b4c5d6e7f0a'
  },
  {
    id: 'instant-query',
    name: { zh: '即时问数', en: 'Instant Data Query' },
    description: { zh: '用自然语言提问即可获取实时数据查询结果。将复杂的 SQL 查询转化为简单对话。', en: 'Get real-time query results using natural language. Converts complex SQL queries into simple conversations.' },
    capabilities: [
      { zh: '自然语言查询', en: 'NL Query' },
      { zh: '实时数据获取', en: 'Real-time Data' },
      { zh: 'SQL 转化', en: 'SQL Translation' }
    ],
    industry: Industry.SMART_DATA,
    image: 'public/agents/06.jpg',
    users: 1890,
    rating: 4.9,
    visibility: 'department',
    departments: ['sales', 'finance', 'management'],
    link: 'http://183.131.197.246:8080/chat?kb_id=f9a3b8c7-6d0e-9f2a-3b4c5d6e7f0a1b'
  },
  {
    id: 'contract-audit',
    name: { zh: '合同审核助手', en: 'Contract Audit Assistant' },
    description: { zh: '智能审核合同条款，识别风险点和不合规内容。支持多种合同类型，输出结构化审核报告。', en: 'Intelligently reviews contract terms, identifies risks and non-compliance. Supports multiple contract types.' },
    capabilities: [
      { zh: '条款风险识别', en: 'Clause Risk Detection' },
      { zh: '合规检查', en: 'Compliance Check' },
      { zh: '多类型支持', en: 'Multi-type Support' }
    ],
    industry: Industry.SMART_AUDIT,
    image: 'public/agents/07.jpg',
    users: 960,
    rating: 4.7,
    visibility: 'department',
    departments: ['legal', 'finance', 'management'],
    link: 'http://183.131.197.246:8080/chat?kb_id=0ab4c9d8-7e1f-0a3b-4c5d6e7f0a1b2c'
  },
  {
    id: 'trade-docs',
    name: { zh: '外贸单据阅读', en: 'Trade Document Reader' },
    description: { zh: '自动解析外贸单据（发票、提单、报关单等），提取关键字段并做合规性校验。减少人工录入错误。', en: 'Auto-parses trade documents (invoices, B/L, customs declarations) and extracts key fields for compliance validation.' },
    capabilities: [
      { zh: '单据自动解析', en: 'Auto Document Parsing' },
      { zh: '字段提取', en: 'Field Extraction' },
      { zh: '合规校验', en: 'Compliance Validation' }
    ],
    industry: Industry.SMART_AUDIT,
    image: 'public/agents/08.jpg',
    users: 720,
    rating: 4.6,
    visibility: 'department',
    departments: ['sales', 'finance'],
    link: 'http://183.131.197.246:8080/chat?kb_id=1bc5d0e9-8f2a-1b4c-5d6e7f0a1b2c3d'
  },
  {
    id: 'marketing-gen',
    name: { zh: '技术营销方案生成', en: 'Marketing Plan Generator' },
    description: { zh: '根据产品特性和目标市场，自动生成技术营销方案。包含竞品分析、卖点提炼和推广策略建议。', en: 'Auto-generates tech marketing plans based on product features and target markets including competitive analysis.' },
    capabilities: [
      { zh: '竞品分析', en: 'Competitor Analysis' },
      { zh: '卖点提炼', en: 'USP Extraction' },
      { zh: '策略生成', en: 'Strategy Generation' }
    ],
    industry: Industry.SMART_GEN,
    image: 'public/agents/09.jpg',
    users: 1340,
    rating: 4.8,
    visibility: 'department',
    departments: ['sales', 'marketing'],
    link: 'http://183.131.197.246:8080/chat?kb_id=2cd6e1fa-9a3b-2c5d-6e7f0a1b2c3d4e'
  },
  {
    id: 'data-collector',
    name: { zh: '网上数据收集分析', en: 'Web Data Collector' },
    description: { zh: '自动从互联网收集指定主题的市场信息、行业动态和竞争对手情报，并生成分析摘要报告。', en: 'Auto-collects market info, industry updates, and competitor intelligence from the web with summary reports.' },
    capabilities: [
      { zh: '网络爬取', en: 'Web Scraping' },
      { zh: '情报汇总', en: 'Intelligence Summary' },
      { zh: '定时采集', en: 'Scheduled Collection' }
    ],
    industry: Industry.SMART_GEN,
    image: 'public/agents/10.jpg',
    users: 1100,
    rating: 4.7,
    visibility: 'company',
    departments: [],
    link: 'http://183.131.197.246:8080/chat?kb_id=3de7f2ab-0a4c-3d6e-7f0a1b2c3d4e5f'
  },
  {
    id: 'custom-agent',
    name: { zh: '定制您的专属Agent', en: 'Build Your Custom Agent' },
    description: { zh: '没有找到合适的 Agent？告诉我们您的需求，我们将为您定制开发符合业务场景的专属智能体。', en: "Can't find the right agent? Tell us your needs and we'll build a custom intelligent agent tailored to your business." },
    capabilities: [
      { zh: '需求评估', en: 'Needs Assessment' },
      { zh: '定制开发', en: 'Custom Development' },
      { zh: '持续优化', en: 'Continuous Optimization' }
    ],
    industry: Industry.SMART_GEN,
    image: 'public/agents/11.jpg',
    users: null,
    rating: null,
    visibility: 'admin',
    departments: [],
    link: '#contact',
    isCustom: true
  }
];

// --- 演示账号（公开演示用，登录弹窗中列出供切换身份） ---
const DEMO_ACCOUNTS = [
  {
    id: 'u-sales-01',
    name: '销售员工',
    role: 'employee',
    roles: ['employee'],
    departmentId: 'sales',
    departmentName: '销售部'
  },
  {
    id: 'u-service-01',
    name: '服务员工',
    role: 'employee',
    roles: ['employee'],
    departmentId: 'service',
    departmentName: '服务部'
  },
  {
    id: 'u-legal-01',
    name: '法务员工',
    role: 'employee',
    roles: ['employee'],
    departmentId: 'legal',
    departmentName: '法务部'
  },
  {
    id: 'u-mgmt-01',
    name: '管理层',
    role: 'employee',
    roles: ['employee'],
    departmentId: 'management',
    departmentName: '管理层'
  },
  {
    id: 'u-admin-01',
    name: '系统管理员',
    role: 'admin',
    roles: ['admin', 'super_admin'],
    departmentId: 'management',
    departmentName: '管理部门'
  }
];

// --- 翻译文案 (中英文) ---
const translations = {
  zh: {
    nav: {
      home: '首页', workspace: '我的工作台', help: '帮助', login: '登录'
    },
    hero: {
      tag: '企业智能体中枢',
      title: '一个入口\n找到企业智能体',
      subtitle: '按分类、搜索或最近使用快速打开企业内部智能体，保持统一入口、权限可控和使用高效。'
    },
    search: {
      placeholder: '搜索智能体名称、场景或标签…',
      hint: '例如："合同审核"、"销售数据"、"方案生成"',
      searching: '正在搜索匹配的智能体…',
      resultTitle: '搜索结果',
      noResult: '未找到匹配的智能体'
    },
    industries: {
      [Industry.ALL]: '全部',
      [Industry.SMART_QA]: '智能问答',
      [Industry.SMART_DATA]: '智能问数',
      [Industry.SMART_AUDIT]: '智能审核',
      [Industry.SMART_GEN]: '智能生成'
    },
    common: {
      noResults: '没有找到匹配的 Agent',
      tryAdjusting: '请尝试调整搜索条件或筛选分类',
      tryIt: '立即试用',
      users: '用户',
      learnMore: '了解更多'
    },
    pricing: {
      title: '选择适合您的方案',
      subtitle: '灵活定价，按需扩展',
      free: {
        name: '免费版', price: '¥0', period: '/月',
        desc: '适合个人体验和小规模试用',
        features: ['访问基础 Agent', '每月 100 次 API 调用', '社区支持']
      },
      pro: {
        name: '专业版', price: '¥299', period: '/月',
        desc: '适合成长型团队和企业用户',
        features: ['访问所有 Agent', '每月 10,000 次 API 调用', '优先技术支持', '自定义工作流', '团队协作功能']
      },
      enterprise: {
        name: '企业版', price: '定制', period: '',
        desc: '适合大型企业和特殊需求',
        features: ['无限制 API 调用', '私有部署选项', '定制 Agent 开发', '专属客户经理', 'SLA 保障']
      }
    },
    enterprise: {
      badge: '企业级解决方案',
      title: '为您的企业量身打造 AI 基础设施',
      subtitle: '我们提供完整的私有化部署、定制开发和集成服务，确保 AI 能力与您的业务系统无缝融合。',
      features: [
        { icon: 'shield', title: '私有化部署', desc: '数据不出域，完全符合安全合规要求' },
        { icon: 'code', title: '系统集成', desc: '与企业现有 OA、ERP、CRM 系统无缝对接' },
        { icon: 'users', title: '定制开发', desc: '基于您的业务流程和数据定制专属 AI Agent' },
        { icon: 'headset', title: '专属支持', desc: '7×24 小时专属技术支持和 SLA 服务保障' }
      ],
      cta: '联系销售团队'
    },
    about: {
      badge: '关于 NexusHub',
      title: '连接人与 AI 的桥梁',
      content: 'NexusHub 是一个企业级 AI Agent 集成平台，致力于让每一家企业都能便捷地接入和使用人工智能能力。\n\n我们相信，AI 不应该是少数技术专家的专利。通过 NexusHub，任何业务人员都可以通过自然语言与专业的 AI Agent 协作，完成从数据分析、文档审核到营销策划等各类任务。\n\n平台目前整合了四大类共 10+ 个专业领域的 AI Agent，覆盖智能问答、数据处理、内容审核和方案生成等核心业务场景。',
      stats: { agents: '10+', users: '5000+', satisfaction: '99%' }
    },
    login: {
      title: '登录 NexusHub',
      subtitle: '选择演示账号即可快速体验不同权限',
      tabVerify: '验证码', tabPassword: '密码', tabWechat: '微信',
      phone: '手机号', code: '验证码', sendCode: '获取验证码',
      account: '手机号 / 账号', password: '密码', forgot: '忘记密码？',
      btn: '登录',
      wechatHint: '使用微信扫一扫登录（演示）', wechatLogin: '微信扫码登录',
      demoDivider: '或选择演示账号',
      demoLabel: '快速体验不同角色权限', demoRole: '演示角色',
      noAccount: '没有账号？', register: '立即注册'
    },
    chat: {
      placeholder: '输入消息...',
      newChat: '新对话',
      history: '历史记录',
      welcome: '你好！我是 NexusHub AI 助手，有什么可以帮你的？'
    },
    footer: {
      copyright: '© 2024 Nexus Intelligent Systems. All rights reserved.',
      privacy: '隐私政策', terms: '服务条款', contact: '联系我们'
    }
  },
  en: {
    nav: {
      home: 'Home', workspace: 'Workspace', help: 'Help', login: 'Login'
    },
    hero: {
      tag: 'Enterprise Agent Hub',
      title: 'One portal\nfor enterprise agents',
      subtitle: 'Find and open internal enterprise agents through categories, search, and recent usage with clear permissions and simple workflows.'
    },
    search: {
      placeholder: 'Search by agent name, scenario, or tag…',
      hint: 'E.g.: "contract review", "sales data", "proposal generation"',
      searching: 'Searching matching agents…',
      resultTitle: 'Search results',
      noResult: 'No matching agents found'
    },
    industries: {
      [Industry.ALL]: 'All',
      [Industry.SMART_QA]: 'Smart QA',
      [Industry.SMART_DATA]: 'Smart Data',
      [Industry.SMART_AUDIT]: 'Smart Audit',
      [Industry.SMART_GEN]: 'Smart Gen'
    },
    common: {
      noResults: 'No matching agents found',
      tryAdjusting: 'Try adjusting your search or filter criteria',
      tryIt: 'Try Now',
      users: 'Users',
      learnMore: 'Learn More'
    },
    pricing: {
      title: 'Choose Your Plan',
      subtitle: 'Flexible pricing, scale as you grow',
      free: {
        name: 'Free', price: '$0', period: '/mo',
        desc: 'Perfect for individuals and small-scale trials',
        features: ['Access basic agents', '100 API calls/mo', 'Community support']
      },
      pro: {
        name: 'Pro', price: '$49', period: '/mo',
        desc: 'Ideal for growing teams and businesses',
        features: ['Access all agents', '10,000 API calls/mo', 'Priority support', 'Custom workflows', 'Team collaboration']
      },
      enterprise: {
        name: 'Enterprise', price: 'Custom', period: '',
        desc: 'For large organizations with special needs',
        features: ['Unlimited API calls', 'Private deployment', 'Custom agent dev', 'Dedicated manager', 'SLA guarantee']
      }
    },
    enterprise: {
      badge: 'Enterprise Solutions',
      title: 'Tailored AI Infrastructure for Your Enterprise',
      subtitle: 'We offer complete private deployment, custom development, and integration services.',
      features: [
        { icon: 'shield', title: 'Private Deployment', desc: 'Data stays on-premise, fully compliant' },
        { icon: 'code', title: 'System Integration', desc: 'Seamlessly connect with OA, ERP, CRM systems' },
        { icon: 'users', title: 'Custom Development', desc: 'Build exclusive AI Agents for your workflows' },
        { icon: 'headset', title: 'Dedicated Support', desc: '7×24 technical support with SLA guarantee' }
      ],
      cta: 'Contact Sales'
    },
    about: {
      badge: 'About NexusHub',
      title: 'Bridging People and AI',
      content: 'NexusHub is an enterprise-grade AI Agent integration platform dedicated to making AI accessible to every business.\n\nWe believe AI should not be the exclusive domain of technical experts. Through NexusHub, any business professional can collaborate with specialized AI Agents using natural language.\nThe platform currently integrates 10+ professional AI Agents across four categories covering smart Q&A, data processing, content audit, and solution generation.',
      stats: { agents: '10+', users: '5000+', satisfaction: '99%' }
    },
    login: {
      title: 'Login to NexusHub',
      subtitle: 'Pick a demo account to experience different permissions',
      tabVerify: 'SMS Code', tabPassword: 'Password', tabWechat: 'WeChat',
      phone: 'Phone Number', code: 'Verification Code', sendCode: 'Get Code',
      account: 'Phone / Account', password: 'Password', forgot: 'Forgot password?',
      btn: 'Sign In',
      wechatHint: 'Scan with WeChat to sign in (demo)', wechatLogin: 'WeChat Sign In',
      demoDivider: 'Or choose a demo account',
      demoLabel: 'Quickly try different role permissions', demoRole: 'Demo Role',
      noAccount: "Don't have an account?", register: 'Sign up now'
    },
    chat: {
      placeholder: 'Type a message...',
      newChat: 'New Chat',
      history: 'History',
      welcome: 'Hello! I\'m NexusHub AI Assistant. How can I help you?'
    },
    footer: {
      copyright: '\u00a9 2024 Nexus Intelligent Systems. All rights reserved.',
      privacy: 'Privacy', terms: 'Terms', contact: 'Contact'
    }
  }
};
