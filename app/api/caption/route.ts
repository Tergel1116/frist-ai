// import { NextResponse } from "next/server";
// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPEN_AI_KEY,
// });

// export const POST = async (req: Request) => {
//   try {
//     const { image } = await req.json();

//     const response = await openai.chat.completions.create({
//       model: "gpt-4.1-mini",
//       messages: [
//         {
//           role: "user",
//           content: [
//             {
//               type: "input_text",
//               text: "Describe this image in detail",
//             },
//             {
//               type: "input_image",
//               image_url: `data:image/jpeg:base64,${image}`,
//             },
//           ],
//         },
//       ],
//     });

//     const caption = response.choices[0]?.message?.content;

//     return NextResponse.json({ caption });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Something went wrong while generating the caption " },
//       { status: 500 },
//     );
//   }
// };

import OpenAI from "openai";
import { NextResponse } from "next/server";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const POST = async (req: Request) => {
  try {
    const { imageUrl, prompt } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt || "Монгол хэлээр тайлбарлаж бичнэ үү.",
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
      ],
      max_tokens: 500,
    });

    const caption = response.choices[0]?.message?.content;
    return NextResponse.json({ output: caption });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
};

//orgiliin analysis
// ugsun zurgiig tailbarlana
