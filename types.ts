
export enum Industry {
  ALL = 'All',
  FINANCE = 'Finance',
  HEALTHCARE = 'Healthcare',
  RETAIL = 'Retail',
  LEGAL = 'Legal',
  MANUFACTURING = 'Manufacturing',
  CREATIVE = 'Creative',
  DATA = 'Data',
  SALES = 'Sales',
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
