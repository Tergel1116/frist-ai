import OpenAI from "openai";

// export const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

export default async function openaiTextToImage(prompt: string) {
  const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
  });
  const response = await openai.images.generate({
    model: "gpt-4.1-mini",
    prompt: prompt,
    n: 1,
    size: "1024x1024",
    response_format: "b64_json",
  });
  const imageData = response?.data?.[0]?.b64_json;
  if (!imageData) {
    console.error("No image data found");
    return;
  }

  const buffer = Buffer.from(imageData, "base64");
  return buffer;
}