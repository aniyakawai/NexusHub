
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
      
      Task: Act as a helpful "Concierge" for the Nexus Agent Hub. 
      1. Analyze the user's query. If it's a greeting or general chat, reply naturally.
      2. If the user asks for help or tools, identify the top 1-3 most relevant agents from the database.
      
      Return a JSON object with:
      - 'chatResponse' (string): A helpful, conversational response to the user. If recommending agents, mention why they fit briefly. Answer in the SAME language as the User Query (Chinese or English).
      - 'recommendedAgentIds' (array of strings): List of matching agent IDs. Empty if none relevant.
      `,
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
            chatResponse: {
              type: Type.STRING,
              description: "Conversational response in the user's language"
            }
          },
          required: ["recommendedAgentIds", "chatResponse"]
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
