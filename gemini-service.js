// ============================================================
// Gemini AI 智能搜索服务
// ============================================================

// 从可选外部配置获取 API Key
// 注意：直接在前端硬编码 API Key 会被公网访客看到并盗用。
// 强烈建议通过后端代理 / 登录系统下发密钥；留空则智能搜索自动降级为本地过滤。
let GEMINI_API_KEY = '';
if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
  GEMINI_API_KEY = process.env.API_KEY;
} else if (typeof window !== 'undefined' && window.GEMINI_API_KEY) {
  GEMINI_API_KEY = window.GEMINI_API_KEY;
}

/**
 * 使用 Gemini 2.5 Flash 分析用户查询，推荐最匹配的 Agent
 * @param {string} query - 用户输入的查询
 * @returns {Promise<{chatResponse: string, recommendedAgentIds: string[]} | null>}
 */
async function findMatchingAgents(query) {
  if (!GEMINI_API_KEY) {
    console.warn('API Key is missing. Returning null.');
    return null;
  }

  try {
    // 构造 Agent 上下文
    const agentsContext = JSON.stringify(AGENTS.map(a => ({
      id: a.id,
      name: a.name.en,
      description: a.description.en,
      capabilities: a.capabilities.map(c => c.en),
      industry: a.industry
    })));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `User Query: "${query}"

Available Agents Database: ${agentsContext}

Task: Act as a helpful "Concierge" for the Nexus Agent Hub.
1. Analyze the user's query. If it's a greeting or general chat, reply naturally.
2. If the user asks for help or tools, identify the top 1-3 most relevant agents from the database.

Return a JSON object with:
- 'chatResponse' (string): A helpful, conversational response to the user. If recommending agents, mention why they fit briefly. Answer in the SAME language as the User Query (Chinese or English).
- 'recommendedAgentIds' (array of strings): List of matching agent IDs. Empty if none relevant.`
            }]
          }],
          generationConfig: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: 'OBJECT',
              properties: {
                recommendedAgentIds: { type: 'ARRAY', items: { type: 'STRING' }, description: 'List of matching agent IDs' },
                chatResponse: { type: 'STRING', description: 'Conversational response in the user\'s language' }
              },
              required: ['recommendedAgentIds', 'chatResponse']
            }
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (text) {
      return JSON.parse(text);
    }
    return null;
  } catch (error) {
    console.error('Gemini Search Error:', error);
    return null;
  }
}

// 导出到全局
window.findMatchingAgents = findMatchingAgents;
