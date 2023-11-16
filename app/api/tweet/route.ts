import { NextRequest } from 'next/server';
import { Tweet, getTweet } from 'react-tweet/api';

type ExtendedTweet =
  | (Tweet & {
      tombstone?: any;
    })
  | undefined;

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const tweetId = searchParams.get('tweetId');

  if (!tweetId || typeof tweetId !== 'string') {
    return Response.json({ error: 'Bad Request.' }, { status: 400 });
  }

  try {
    const tweet: ExtendedTweet = await getTweet(tweetId);

    // see https://github.com/vercel/react-tweet/issues/135
    if (tweet?.tombstone) {
      return Response.json({ error: 'Bad Request.' }, { status: 404 });
    }

    return Response.json({ data: tweet ?? null }, { status: tweet ? 200 : 404 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Bad request.' }, { status: 400 });
  }
}
