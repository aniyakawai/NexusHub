import { Language } from './types';

export const translations = {
  en: {
    nav: {
      docs: 'Documentation',
      enterprise: 'Enterprise',
      pricing: 'Pricing',
      login: 'Login',
      home: 'Hub'
    },
    hero: {
      tag: 'Enterprise Agent Ecosystem',
      title: 'Next-Gen Intelligence for Every Industry',
      subtitle: 'Discover specialized autonomous agents designed to elevate your business operations. From finance to creative, find the perfect digital workforce.',
    },
    search: {
      placeholder: "Ask AI: 'I need an agent for tax audits...'",
      button: 'Search',
      poweredBy: 'Powered by Gemini 2.5 Flash',
      clear: 'Clear Search',
      suggestion: 'AI Suggestion'
    },
    common: {
      users: 'Active',
      launch: 'Launch',
      noResults: 'No agents found',
      tryAdjusting: 'Try adjusting your filters or search query.'
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
    }
  },
  zh: {
    nav: {
      docs: '文档',
      enterprise: '企业版',
      pricing: '定价',
      login: '登录',
      home: '中枢'
    },
    hero: {
      tag: '企业级智能体生态',
      title: '赋能全行业的下一代智能中枢',
      subtitle: '探索专为提升业务运营而设计的自动化智能体。从金融到创意领域，为您找到完美的数字员工。',
    },
    search: {
      placeholder: "询问AI：'我需要一个帮我处理税务审计的智能体...'",
      button: '搜索',
      poweredBy: '由 Gemini 2.5 Flash 驱动',
      clear: '清除搜索',
      suggestion: 'AI 推荐理由'
    },
    common: {
      users: '活跃用户',
      launch: '启动',
      noResults: '未找到智能体',
      tryAdjusting: '请尝试调整筛选条件或搜索关键词。'
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
    }
  }
};
