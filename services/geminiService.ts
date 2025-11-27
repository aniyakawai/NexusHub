import { GoogleGenAI, Type } from "@google/genai";
import { AGENTS } from "../constants";
import { SearchResponse } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const findMatchingAgents = async (query: string): Promise<SearchResponse | null> => {
  if (!apiKey) {
    console.warn("API Key is missing. Returning default mock response.");
    return null;
  }

  try {
    // Flatten the localized object to English for the AI context to save tokens and maintain consistency
    // The AI can understand the Chinese query and map it to English descriptions easily.
    const agentsContext = JSON.stringify(AGENTS.map(a => ({
      id: a.id,
      name: a.name.en,
      description: a.description.en,
      capabilities: a.capabilities.map(c => c.en),
      industry: a.industry
    })));

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `User Query: "${query}"
      
      Available Agents Database: ${agentsContext}
      
      Task: Analyze the user's query and identify the top 1-3 most relevant agents from the database. 
      Return a JSON object with 'recommendedAgentIds' (array of strings) and a short 'reasoning' (string) explaining why these were chosen.
      If no agents are relevant, return an empty array.
      
      Important: The reasoning should be in the same language as the User Query (if Chinese, reply in Chinese).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedAgentIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of matching agent IDs"
            },
            reasoning: {
              type: Type.STRING,
              description: "Brief explanation of the recommendation in the user's language"
            }
          },
          required: ["recommendedAgentIds", "reasoning"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as SearchResponse;
    }
    return null;

  } catch (error) {
    console.error("Gemini Search Error:", error);
    return null;
  }
};
