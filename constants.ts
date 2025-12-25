
import { Agent, Industry } from './types';

export const AGENTS: Agent[] = [
  {
    id: 'prod-01',
    name: { en: 'Product Q&A Assistant', zh: '产品问答助手' },
    description: { 
      en: 'Instant answers regarding product specs, usage, and troubleshooting.', 
      zh: '快速回答关于产品规格、使用方法和故障排除的问题。' 
    },
    //industry: Industry.RETAIL,
    industry: Industry.SMART_QA,             // 智能问答    
    capabilities: [
      { en: 'Spec Lookup', zh: '规格查询' }, 
      { en: 'Usage Guide', zh: '使用指南' }, 
      { en: 'Q&A', zh: '智能问答' }
    ],
    imageUrl: '/NexusHub/agents/01.jpg',   //https://picsum.photos/400/300?random=1
    redirectUrl: 'http://183.131.197.246:8080/chat/bbc13cf6aec47f00',
    stats: { users: '12k+', rating: 4.8 },
  },
  {
    id: 'maint-02',
    name: { en: 'Maintenance Expert', zh: '维修问答专家' },
    description: { 
      en: 'Guidance for equipment repair, maintenance schedules, and error code analysis.', 
      zh: '提供设备维修指导、维护计划建议及错误代码分析。' 
    },
    //industry: Industry.MANUFACTURING,
    industry: Industry.SMART_QA,             // 智能问答
    capabilities: [
      { en: 'Diagnostics', zh: '故障诊断' }, 
      { en: 'Manuals', zh: '维修手册' }, 
      { en: 'Safety', zh: '安全规范' }
    ],
    imageUrl: '/NexusHub/agents/02.jpg',
    redirectUrl: 'http://183.131.197.246:8080/chat/ada723f8dc1a946b',
    stats: { users: '5k+', rating: 4.9 },
  },
  {
    id: 'boss-03',
    name: { en: 'Chairman Avatar', zh: '董事长分身' },
    description: { 
      en: 'Digital twin of company leadership for strategic communication and culture dissemination.', 
      zh: '公司领导层的数字分身，用于战略沟通和企业文化传播。' 
    },
    //industry: Industry.ALL,
    industry: Industry.SMART_QA,             // 智能问答
    capabilities: [
      { en: 'Strategy', zh: '战略解读' }, 
      { en: 'Culture', zh: '文化传播' }, 
      { en: 'Simulation', zh: '对话模拟' }
    ],
    imageUrl: '/NexusHub/agents/03.jpg',
    redirectUrl: 'http://183.131.197.246:8080/chat/c05dbca46dcafa22',
    stats: { users: '20k+', rating: 5.0 },
  },
  {
    id: 'data-04',
    name: { en: 'Comprehensive Data Report', zh: '长数据汇报生成' },
    description: { 
      en: 'Generates deep-dive analytical reports from massive datasets automatically.', 
      zh: '自动从海量数据集中生成深度的分析汇报文档。' 
    },
    //industry: Industry.DATA,
    industry: Industry.SMART_DATA,           // 智能问数
    capabilities: [
      { en: 'Deep Analysis', zh: '深度分析' }, 
      { en: 'Reporting', zh: '报告生成' }, 
      { en: 'Trending', zh: '趋势预测' }
    ],
    imageUrl: '/NexusHub/agents/04.jpg',
    redirectUrl: 'http://183.131.197.246:8080/chat/467569644ba7e2e8', 
    stats: { users: '26k+', rating: 4.8 },  //Waiting
  },
  {
    id: 'data-05',
    name: { en: 'Daily Data Brief', zh: '每日数据汇报' },
    description: { 
      en: 'Automated daily business intelligence summaries pushed directly to stakeholders.', 
      zh: '自动化的每日商业智能摘要，直接推送给相关负责人。' 
    },
    //industry: Industry.DATA,
    industry: Industry.SMART_DATA,           // 智能问数
    capabilities: [
      { en: 'BI Summary', zh: 'BI摘要' }, 
      { en: 'KPI Tracking', zh: 'KPI追踪' }, 
      { en: 'Automation', zh: '自动化' }
    ],
    imageUrl: '/NexusHub/agents/05.jpg',
    redirectUrl: 'http://183.131.197.246:8080/chat/0a07a9e2814c358e?is_at_all=',
    stats: { users: '8k+', rating: 4.7 },
  },
  {
    id: 'data-06',
    name: { en: 'Instant Data Query', zh: '即时问数' },
    description: { 
      en: 'Real-time natural language interface for database querying.', 
      zh: '基于自然语言的实时数据库查询接口，即问即答。' 
    },
    //industry: Industry.DATA,
    industry: Industry.SMART_DATA,           // 智能问数
    capabilities: [
      { en: 'SQL Gen', zh: 'SQL生成' }, 
      { en: 'Real-time', zh: '实时查询' }, 
      { en: 'Visualization', zh: '可视化' }
    ],
    imageUrl: '/NexusHub/agents/06.jpg',
    redirectUrl: 'http://183.131.197.246:8080/chat/a746e2517c2c1945', // Not online yet
    stats: { users: '10k+', rating: 4.8 },
  },
  {
    id: 'legal-07',
    name: { en: 'Contract Reviewer', zh: '合同审核助手' },
    description: { 
      en: 'AI-powered risk assessment and clause analysis for legal contracts.', 
      zh: 'AI驱动的合同风险评估和条款分析助手。' 
    },
    //industry: Industry.LEGAL,
    industry: Industry.SMART_AUDIT,          // 智能审核
    capabilities: [
      { en: 'Risk Check', zh: '风险排查' }, 
      { en: 'Clause Analysis', zh: '条款分析' }, 
      { en: 'Compliance', zh: '合规检查' }
    ],
    imageUrl: '/NexusHub/agents/07.jpg',
    redirectUrl: 'http://183.131.197.246:8080/chat/4fc872b48f7ee4ab',
    stats: { users: '3k+', rating: 4.9 },
  },
  {
    id: 'trade-08',
    name: { en: 'Trade Doc Analyzer', zh: '外贸单据阅读' },
    description: { 
      en: 'Intelligent extraction and verification of foreign trade documentation.', 
      zh: '对外贸单据进行智能提取、校验和归档。' 
    },
    //industry: Industry.FINANCE, // Or Sales/Trade
    industry: Industry.SMART_AUDIT,          // 智能审核
    capabilities: [
      { en: 'OCR', zh: '单据识别' }, 
      { en: 'Verification', zh: '数据校验' }, 
      { en: 'Cross-border', zh: '跨境贸易' }
    ],
    imageUrl: '/NexusHub/agents/08.jpg',
    redirectUrl: 'http://183.131.197.246:8080/chat/dc345ca060fd0132',
    stats: { users: '6k+', rating: 4.6 },
  },
  {
    id: 'create-09',
    name: { en: 'Tech & Market Gen', zh: '技术营销方案生成' },
    description: { 
      en: 'Multimodal generation for technical proposals and marketing strategies.', 
      zh: '用于技术方案和营销策略的多模态内容生成与策划。' 
    },
    //industry: Industry.CREATIVE,
    industry: Industry.SMART_GEN,            // 智能生成
    capabilities: [
      { en: 'Proposal Gen', zh: '方案撰写' }, 
      { en: 'Multimodal', zh: '多模态' }, 
      { en: 'Marketing', zh: '营销策划' }
    ],
    imageUrl: '/NexusHub/agents/09.jpg',
    redirectUrl: 'http://183.131.197.246:8080/chat/30bdefbd6cf90cce',
    stats: { users: '15k+', rating: 4.8 },
  },
  {
    id: 'data-10',
    name: { en: 'Web Data Analyst', zh: '网上数据收集分析' },
    description: { 
      en: 'Automated crawler and analyzer for public web data and market intelligence.', 
      zh: '针对公开网络数据和市场情报的自动采集与分析工具。' 
    },
    //industry: Industry.DATA,
    industry: Industry.SMART_GEN,            // 智能生成
    capabilities: [
      { en: 'Crawling', zh: '数据采集' }, 
      { en: 'Analysis', zh: '情报分析' }, 
      { en: 'Monitoring', zh: '舆情监控' }
    ],
    imageUrl: '/NexusHub/agents/10.jpg',
    redirectUrl: 'http://183.131.197.246:8080/chat/83d82ab124d51794',
    stats: { users: '9k+', rating: 4.7 },
  },
  {
    id: 'chat-test-11',
    name: { en: 'Chat Interface Test', zh: '对话页面测试智能体' },
    description: { 
      en: 'Internal test agent for next-gen conversational interface with voice and image support.', 
      zh: '下一代对话界面测试智能体，支持语音输入和图片上传功能测试。' 
    },
    industry: Industry.ALL,
    capabilities: [
      { en: 'Voice', zh: '语音输入' }, 
      { en: 'Vision', zh: '图片分析' }, 
      { en: 'Chat', zh: '多轮对话' }
    ],
    imageUrl: '/NexusHub/agents/10.jpg',
    redirectUrl: '?view=chat', // URL Param routing for new tab
    stats: { users: 'Beta', rating: 5.0 },
  },
];
