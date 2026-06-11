import { GoogleGenAI, Type } from "@google/genai";
import { Tribe, QuizResult } from "../types";
import { TRIBE_DESCRIPTIONS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function analyzeQuizResults(scores: Record<string, number>, answersText: string[]): Promise<QuizResult> {
  // Extract Animus score and remove it from tribe calculations
  const animusScore = scores['Animus'] || 0;
  const tribeScores = { ...scores };
  delete tribeScores['Animus'];

  // Find top two scores to determine if it's a hybrid
  const sortedScores = Object.entries(tribeScores).sort(([, a], [, b]) => b - a);
  const primary = sortedScores[0][0] as Tribe;
  const secondary = sortedScores[1][0] as Tribe;
  
  // Define hybrid threshold: if secondary is within 30% of primary
  const isHybrid = sortedScores[1][1] > (sortedScores[0][1] * 0.7);
  
  // Animus logic: 
  // 1. Score-based: High points (24+) is 100%, Medium (16-23) is 20%.
  // 2. Wildcard: 3% baseline chance for ANYONE, even with 0 points.
  const scoreBasedAnimus = animusScore > 24 || (animusScore > 15 && Math.random() < 0.2);
  const wildcardAnimus = Math.random() < 0.03; // 3% chance "Miracle" bloodline
  
  const isAnimus = scoreBasedAnimus || wildcardAnimus;

  const prompt = `
    Based on the Wings of Fire dragon series, analyze these quiz answers: "${answersText.join(' ')}".
    The calculated primary tribe is ${primary}${isHybrid ? ` and secondary tribe is ${secondary}` : ''}.
    
    ${isAnimus ? `
    STATUS: ANIMUS DRAGON. 
    This dragon possesses rare, soul-altering Animus magic. 
    ${wildcardAnimus && !scoreBasedAnimus ? "NOTE: This dragon's power is an unexpected miracle—a dormant bloodline suddenly awakening." : ""}
    In your analysis and abilities list, emphasize that this is a unique, god-like power separate from their natural tribe abilities (like fire or venom).
    Include examples of what they can do with this magic, such as:
    - Enchanting inanimate objects to move or perform tasks (e.g., a spear that never misses, a cup that fills itself).
    - Creating powerful illusions or protective shields.
    - Casting spells that alter the physical world or other dragons (with a warning about the cost to their soul).
    ` : "STATUS: NON-ANIMUS. This dragon relies purely on their natural tribal instincts and physical abilities."}
    
    Provide a personality analysis, a unique dragon name, and a list of 3 specific abilities.
    
    CRITICAL NAMING INSTRUCTIONS:
    Generate a NEW name that follows the tribe's naming convention but is NOT a character already in the books.
    - MudWings: Swamp, earth, or brown-colored things (e.g., Fen, Sediment, Sepia).
    - SandWings: Desert animals, plants, or weather (e.g., Gila, Arid, Duststorm).
    - SkyWings: Birds, flight terms, or red/orange things (e.g., Falcon, Zenith, Ember).
    - SeaWings: Ocean life, water features (e.g., Current, Abyss, Manta).
    - RainWings: Rainforest animals, fruit, or colors (e.g., Toucan, Mango, Iridescent).
    - IceWings: Cold things, polar animals, or white/blue shades (e.g., Permafrost, Petrel, Argent).
    - NightWings: Compound words about traits or the sky (e.g., Truthfinder, Starseeker, Shadowflight).
    - SilkWings: Butterfly or moth names (e.g., Admiral, Morpho, Cinnabar).
    - HiveWings: Insects (other than butterflies/moths) or hive words (e.g., Hornet, Mantis, Colony).
    - LeafWings: Trees or plants (e.g., Sequoia, Hemlock, Fern).
    - Hybrids: A mix of the two conventions.

    Return the response in JSON format.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          personalityAnalysis: { type: Type.STRING },
          nameSuggestion: { type: Type.STRING },
          abilities: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["personalityAnalysis", "nameSuggestion", "abilities"]
      }
    }
  });

  const data = JSON.parse(response.text);

  return {
    primaryTribe: primary,
    secondaryTribe: isHybrid ? secondary : undefined,
    isHybrid,
    isAnimus,
    ...data
  };
}

export async function generateDragonImage(result: QuizResult): Promise<string | null> {
  const tribeInfo = result.isHybrid 
    ? `A hybrid dragon between ${result.primaryTribe} and ${result.secondaryTribe}.`
    : `A ${result.primaryTribe} dragon.`;
    
  const appearanceDetails = result.isHybrid
    ? `Combine physical traits of both: ${TRIBE_DESCRIPTIONS[result.primaryTribe]} and ${TRIBE_DESCRIPTIONS[result.secondaryTribe!]}.`
    : TRIBE_DESCRIPTIONS[result.primaryTribe];

  // Tribe-specific visual traits based on reference images
  let tribeSpecifics = "";
  
  if (result.primaryTribe === Tribe.LeafWing || result.secondaryTribe === Tribe.LeafWing) {
    tribeSpecifics += `
      LEAFWING VISUALS: 
      - Wings MUST look like large, green, serrated leaves with distinct, vein-like patterns (like plant chlorophyll veins).
      - Slender body with leaf-like jagged ridges along the spine.
      - A thin, prehensile-looking curled tail.
    `;
  }

  if (result.primaryTribe === Tribe.SilkWing || result.secondaryTribe === Tribe.SilkWing) {
    tribeSpecifics += `
      SILKWING VISUALS: 
      - The dragon MUST have four butterfly-like wings (two pairs).
      - Wings should have beautiful, colorful patterns exactly like a butterfly or moth.
      - Long, thin, and elegantly curved antennae on the head.
      - Shimmering, iridescent scales with vibrant colors like blues, purples, and pinks.
      - Very slender and graceful body build.
    `;
  }

  // Animus magic visuals
  if (result.isAnimus) {
    tribeSpecifics += `
      ANIMUS MAGIC VISUALS:
      - The dragon has a faint, mystical shimmering aura around its talons.
      - Its eyes should have a subtle, magical glow (pale blue, white, or purple).
      - Small floating magical sparks or ethereal wisps nearby to indicate immense power.
      - Perhaps holding or wearing a simple enchanted object like a glowing slate or a jeweled armband.
    `;
  }

  const prompt = `
    A detailed digital illustration of a dragon from the Wings of Fire book series. 
    Tribe: ${tribeInfo}
    Physical details: ${appearanceDetails}
    ${tribeSpecifics}
    MANDATORY REQUIREMENT: The dragon MUST have large, majestic, and clearly visible wings. This is essential regardless of tribe. If it's a SilkWing, ensure there are four wings.
    Style: Inspired exactly by the Wings of Fire graphic novel illustrations by Mike Holmes. Clean line art, vibrant colors, expressive eyes, full body view, dynamic pose on a white background or subtle natural environment.
    Environment: A background matching its natural habitat (e.g., the Hive for HiveWings, the Poison Jungle for LeafWings, the Pantalan Savannah for SilkWings).
    NO text, NO watermarks. Professional quality fantasy art.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image generation failed:", error);
    return null;
  }
}
