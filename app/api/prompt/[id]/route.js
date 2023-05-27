import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

// GET (read)

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id)
    if (!prompt) {
      return new Response("Prompt not found", {status: 404})
    }
    return new Response(JSON.stringify(prompt), {status: 200});

  } catch (err) {
    return new Response('Failed to fetch all prompts', { status: 500});
  }
}

//PATCH (edit)

export const PATCH = async (req, {params}) => {
  const { prompt, tag } = await req.json();

  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) {
      return new Response("Prompt not found", {status: 404});
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    return new Response(JSON.stringify(existingPrompt), {status: 200});
  } catch (err) {
    return new Response(err);
  }
}

export const DELETE = async (req, {params}) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndRemove(params.id);

    return new Response("Prompt delete successfully", { status: 200 })
  } catch (err) {
    return new Response(err, {status: 500});
  }
}
