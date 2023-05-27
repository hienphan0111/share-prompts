import { connectToDB } from '@utils/database';
import User from '@models/prompt';

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const prompts = await User.find({
      creator: params.find
    }).populate('creator');

    return new Response(JSON.stringify(prompts), {status: 200});

  } catch (err) {
    return new Response('Failed to fetch all prompts', { status: 500});
  }
}
