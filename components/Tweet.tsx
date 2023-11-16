import React from 'react';
import { Skeleton } from './Skeleton';
import { extractTweetId } from 'utils/extracttwitterId';
import { Tweet } from 'react-tweet';

type TwitterEmbedProps = {
  url: string;
};

declare global {
  interface Window {
    twttr: any;
  }
}

const TwitterEmbed: React.FC<TwitterEmbedProps> = ({ url }) => {
  const id = extractTweetId(url);

  return <Tweet fallback={<TweetMock />} apiUrl={id && `/api/tweet?tweetId=${id}`} />;
};

const TweetMock = () => {
  return (
    <div
      dir='ltr'
      className='flex h-[348px] w-full max-w-[548px] flex-col rounded-xl bg-white p-4 shadow-md'
    >
      <div className='flex'>
        <Skeleton className='h-9 w-9 overflow-hidden rounded-full' />
        <div className='ml-4 flex flex-col justify-around'>
          <Skeleton className='h-4 w-24 rounded' />
          <Skeleton className='h-2 w-20 rounded' />
        </div>
      </div>
      <Skeleton className='mt-4 h-full w-full rounded-xl' />
    </div>
  );
};

export { TweetMock, TwitterEmbed };
