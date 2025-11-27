import { Language } from './types';

export const translations = {
  en: {
    nav: {
      docs: 'Documentation',
      enterprise: 'Enterprise',
      pricing: 'Pricing',
      about: 'About Us',
      login: 'Login',
      home: 'Hub'
    },
    hero: {
      tag: 'Enterprise Agent Ecosystem',
      title: 'Next-Gen Intelligence for Every Industry',
      subtitle: 'Discover specialized autonomous agents designed to elevate your business operations. From finance to creative, find the perfect digital workforce.',
    },
    search: {
      placeholder: "Chat with Nexus AI or search for agents...",
      button: 'Send',
      poweredBy: 'Powered by Gemini 2.5 Flash',
      clear: 'Clear Conversation',
      suggestion: 'AI Response',
      thinking: 'Nexus AI is thinking...'
    },
    common: {
      users: 'Active',
      launch: 'Launch',
      noResults: 'No agents found',
      tryAdjusting: 'Try adjusting your filters or ask the chatbot for help.'
    },
    industries: {
      'All': 'All',
      'Finance': 'Finance',
      'Healthcare': 'Healthcare',
      'Retail': 'Retail',
      'Legal': 'Legal',
      'Manufacturing': 'Manufacturing',
      'Creative': 'Creative',
      'Data': 'Data',
      'Sales': 'Sales'
    },
    pricing: {
      title: 'Simple, Transparent Pricing',
      subtitle: 'Choose the perfect plan for your intelligent workforce.',
      free: {
        title: 'Starter',
        price: '$0',
        desc: 'Perfect for exploring agent capabilities.',
        features: ['Access to 3 Agents', 'Standard Support', 'Community Access']
      },
      pro: {
        title: 'Professional',
        price: '$49',
        desc: 'For growing teams needing specialized tools.',
        features: ['Unlimited Agents', 'Priority Support', 'API Access', 'Custom Workflows']
      },
      enterprise: {
        title: 'Enterprise',
        price: 'Custom',
        desc: 'Full-scale automation for large organizations.',
        features: ['Dedicated Account Manager', 'SSO & Audit Logs', 'Private Cloud Deployment', 'SLA Guarantee']
      },
      cta: 'Get Started'
    },
    enterprise: {
      title: 'Enterprise-Grade AI Infrastructure',
      subtitle: 'Secure, scalable, and compliant agent orchestration for the Fortune 500.',
      features: [
        { title: 'Security First', desc: 'SOC2 Type II compliant with end-to-end encryption for all agent interactions.' },
        { title: 'Seamless Integration', desc: 'Connect agents directly to your ERP, CRM, and internal databases via secure API gateways.' },
        { title: 'Global Scale', desc: 'Deployed on edge networks ensuring low-latency agent responses anywhere in the world.' }
      ],
      trustedBy: 'Trusted by industry leaders'
    },
    about: {
      title: 'Empowering the Future of Work',
      subtitle: 'Nexus Agent Hub is the world\'s premier marketplace for enterprise-grade autonomous agents.',
      missionTitle: 'Our Mission',
      missionDesc: 'To democratize access to advanced artificial intelligence, enabling businesses of all sizes to automate complex workflows and unlock new levels of productivity.',
      teamTitle: 'Our Team',
      teamDesc: 'We are a diverse group of AI researchers, engineers, and industry veterans passionate about building the next generation of software.',
      historyTitle: 'Our History',
      historyDesc: 'Founded in 2024, Nexus began with a simple idea: AI agents should be as easy to deploy as installing an app.'
    }
  },
  zh: {
    nav: {
      docs: '文档',
      enterprise: '企业版',
      pricing: '定价',
      about: '关于我们',
      login: '登录',
      home: '中枢'
    },
    hero: {
      tag: '企业级智能体生态',
      title: '赋能全行业的下一代智能中枢',
      subtitle: '探索专为提升业务运营而设计的自动化智能体。从金融到创意领域，为您找到完美的数字员工。',
    },
    search: {
      placeholder: "与 Nexus AI 聊天或搜索智能体...",
      button: '发送',
      poweredBy: '由 Gemini 2.5 Flash 驱动',
      clear: '清除对话',
      suggestion: 'AI 回复',
      thinking: 'Nexus AI 正在思考...'
    },
    common: {
      users: '活跃用户',
      launch: '启动',
      noResults: '未找到智能体',
      tryAdjusting: '请尝试调整筛选条件或向聊天机器人寻求帮助。'
    },
    industries: {
      'All': '全部',
      'Finance': '金融',
      'Healthcare': '医疗',
      'Retail': '零售',
      'Legal': '法律',
      'Manufacturing': '制造',
      'Creative': '创意',
      'Data': '数据',
      'Sales': '销售'
    },
    pricing: {
      title: '简单透明的定价',
      subtitle: '为您挑选最合适的智能体方案。',
      free: {
        title: '入门版',
        price: '¥0',
        desc: '适合探索智能体能力。',
        features: ['访问 3 个智能体', '标准支持', '社区访问']
      },
      pro: {
        title: '专业版',
        price: '¥399',
        desc: '适合需要专业工具的成长型团队。',
        features: ['无限制访问智能体', '优先支持', 'API 访问', '自定义工作流']
      },
      enterprise: {
        title: '企业版',
        price: '定制',
        desc: '面向大型组织的全规模自动化方案。',
        features: ['专属客户经理', 'SSO & 审计日志', '私有云部署', 'SLA 保障']
      },
      cta: '立即开始'
    },
    enterprise: {
      title: '企业级 AI 基础设施',
      subtitle: '为财富 500 强企业打造的安全、可扩展、合规的智能体编排系统。',
      features: [
        { title: '安全至上', desc: '符合 SOC2 Type II 标准，对所有智能体交互进行端到端加密。' },
        { title: '无缝集成', desc: '通过安全网关将智能体直接连接到您的 ERP、CRM 和内部数据库。' },
        { title: '全球规模', desc: '部署在边缘网络上，确保全球范围内智能体响应的低延迟。' }
      ],
      trustedBy: '深受行业领袖信赖'
    },
    about: {
      title: '赋能未来的工作方式',
      subtitle: 'Nexus Agent Hub 是全球领先的企业级自主智能体市场。',
      missionTitle: '我们的使命',
      missionDesc: '致力于让先进的人工智能触手可及，帮助各种规模的企业实现复杂工作流的自动化，解锁全新的生产力水平。',
      teamTitle: '我们的团队',
      teamDesc: '我们由一群多元化的 AI 研究员、工程师和行业资深人士组成，热衷于构建下一代软件基础设施。',
      historyTitle: '发展历程',
      historyDesc: 'Nexus 成立于 2024 年，始于一个简单的理念：部署 AI 智能体应该像安装 App 一样简单。'
    }
  }
};
