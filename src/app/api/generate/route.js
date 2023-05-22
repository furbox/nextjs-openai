import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-uUgUnvwAudWorA5Z2CcqNNz5",
  apiKey: process.env.OPENAI_API_KEY,
});

if (!configuration.apiKey) {
  throw new Error(
    "No OPENAI_API_KEY found. Please add it to your environment variables."
  );
}

const openai = new OpenAIApi(configuration);

export async function POST(request) {
  const body = await request.json();
  if (!body.prompt || body.prompt.length == 0) {
    return NextResponse.error("No prompt provided", { status: 400 });
  }
  try {
    const response = await openai.createCompletion({
      prompt: `Dame un chiste para programadores enfocado en el tema: ${body.prompt}`,
      model: "text-davinci-003",
      temperature: 0.7,
      max_tokens: 60,
    });
    return NextResponse.json(response.data.choices[0].text);
  } catch (error) {
    console.error(error);
    return NextResponse.error(error, { status: 500 });
  }
}
