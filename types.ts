
export enum Industry {
  ALL = 'All',
  // --- 旧分类 (暂时隐藏) ---
  {/*
  FINANCE = 'Finance',
  HEALTHCARE = 'Healthcare',
  RETAIL = 'Retail',
  LEGAL = 'Legal',
  MANUFACTURING = 'Manufacturing',
  CREATIVE = 'Creative',
  DATA = 'Data',
  SALES = 'Sales',
  */}
// --- 新分类 (新增) ---
  SMART_QA = 'smart_qa',           // 智能问答
  SMART_DATA = 'smart_data',       // 智能问数
  SMART_AUDIT = 'smart_audit',     // 智能审核
  SMART_GEN = 'smart_gen',         // 智能生成
}

export interface LocalizedString {
  en: string;
  zh: string;
}

export interface Agent {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  industry: Industry;
  capabilities: LocalizedString[];
  imageUrl: string;
  redirectUrl: string;
  stats: {
    users: string;
    rating: number;
  };
}

export interface SearchResponse {
  recommendedAgentIds: string[];
  chatResponse: string; // New conversational response
}

export type Language = 'en' | 'zh';
export type Theme = 'light' | 'dark';
export type View = 'home' | 'enterprise' | 'pricing' | 'about' | 'chat';
