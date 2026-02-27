// import { NextResponse } from "next/server";
// import openaiTextToImage from "@/lib/openai";

// export const POST = async (req: Request) => {
//   const { prompt } = await req.json();

//   const buffer = await openaiTextToImage(prompt);
//   if (!buffer) {
//     return NextResponse.json(
//       { error: "Failed to generate image" },
//       { status: 500 },
//     );
//   }

//   const base64Image = buffer.toString("base64");
//   return NextResponse.json({ image: `data:image/png;base64,${base64Image}` });
// };

import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    if (!response.data || response.data.length === 0) {
      throw new Error("Error fetching image");
    }

    const imageUrl = response.data[0].url;

    return NextResponse.json({ url: imageUrl });
  } catch (error) {
    console.error("Error generating the image", error);

    return NextResponse.json({ error: error || "Failed" }, { status: 500 });
  }
}

//orgiliin extract

//prompt ughud zurag generate hiine
