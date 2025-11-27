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
    // Flatten the localized object to English for the AI context
    const agentsContext = JSON.stringify(AGENTS.map(a => ({
      id: a.id,
      name: a.name.en,
      description: a.description.en,
      capabilities: a.capabilities.map(c => c.en),
      industry: a.industry
    })));

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are Nexus AI, an intelligent concierge for an Enterprise Agent Hub.
      
      User Query: "${query}"
      
      Available Agents Database: ${agentsContext}
      
      Task: 
      1. Act as a helpful chatbot. Answer the user's question naturally in the SAME language they used (English or Chinese).
      2. If the user is asking for a specific tool, solution, or capability, look through the Agents Database.
      3. Return a JSON object containing a 'chatResponse' (your conversational reply) and 'recommendedAgentIds' (list of matching IDs).
      
      Rules:
      - If the user just says "Hi" or asks a general question (e.g., "What is AI?"), answer politely in 'chatResponse' and return an empty 'recommendedAgentIds' array.
      - If the user asks for "finance tools" or "help with contracts", provide a helpful intro in 'chatResponse' (e.g., "I found some agents that can help with legal contracts...") and list the IDs.
      - Keep 'chatResponse' concise but friendly.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedAgentIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of matching agent IDs if relevant, otherwise empty"
            },
            chatResponse: {
              type: Type.STRING,
              description: "The conversational answer to the user"
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
