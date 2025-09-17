
import { GoogleGenAI, Modality } from "@google/genai";

// Ensure the API key is available in the environment variables
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Restores an old photo using the Gemini API.
 * @param base64ImageData The base64 encoded string of the image to restore.
 * @param mimeType The MIME type of the image.
 * @returns A promise that resolves with the base64 string of the restored image.
 */
export const restorePhoto = async (base64ImageData: string, mimeType: string): Promise<string | null> => {
  const model = 'gemini-2.5-flash-image-preview';

  const prompt = 'Restore this old photograph. Perform color recovery and enhancement, increase sharpness and clarity, and fix minor damage like scratches or fading. Do not add, remove, or change any objects or people in the original image. Return only the enhanced image.';

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        // Must include both Modality.IMAGE and Modality.TEXT for this model
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    // Find the image part in the response
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }
    
    // If no image part is found, check for a text response which might indicate an error or refusal
    const textResponse = response.text?.trim();
    if(textResponse) {
        throw new Error(`AI returned a text response instead of an image: "${textResponse}"`);
    }

    return null; // No image part found

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error("An unknown error occurred during the API call.");
  }
};
