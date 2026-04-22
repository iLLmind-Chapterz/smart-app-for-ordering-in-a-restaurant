import { GoogleGenAI, Type } from "@google/genai";
import { MenuItem } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function smartMoodSearch(query: string, items: MenuItem[]) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Given this menu: ${JSON.stringify(items.map(i => ({ id: i.id, name: i.name, description: i.description, tags: i.tags })))}, 
          return a JSON array of item IDs that best match this mood or craving: "${query}". 
          Focus on aesthetic and sensory matches. Return only the JSON array.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    return JSON.parse(response.text || "[]") as string[];
  } catch (error) {
    console.error("Mood Search Error:", error);
    return [];
  }
}

export async function getAIPairingSuggestion(item: MenuItem) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Suggest a refined drink pairing (wine, cocktail, or artisanal non-alcoholic) for this dish: 
          Name: ${item.name}
          Description: ${item.description}
          Tags: ${item.tags.join(", ")}
          
          Provide a single, sophisticated sentence explaining the pairing. Focus on flavor profiles.`,
    });

    return response.text || "Our cellar master suggests a crisp, chilled white wine to elevate these coastal notes.";
  } catch (error) {
    console.error("Pairing Error:", error);
    return "Our cellar master suggests a crisp, chilled white wine to elevate these coastal notes.";
  }
}
