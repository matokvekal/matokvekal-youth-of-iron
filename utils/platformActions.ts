import sample from 'lodash.sample';
import { extractTweetId } from './extracttwitterId';
import replyMessageContents from 'constants/replyContent.json';
import { REPLY_HASHTAGS } from 'constants/index';
import { openURL } from './device';

export const replyToTwitterPost = (url: string | undefined) => {
  const toReplyLink = (tweetId: string) =>
    `https://twitter.com/intent/tweet?in_reply_to=${tweetId}`;

  if (url) {
    const tweetId = extractTweetId(url);

    if (tweetId) {
      const replyLink = toReplyLink(tweetId);
      openURL(replyLink);
    }
  }
};

export const getReplyMessageContent = () => sample(replyMessageContents) as string;

export const twitterReplyToPostLink = (tweetId: string, message: string) =>
  `https://twitter.com/intent/tweet?in_reply_to=${tweetId}&text=${encodeURIComponent(
    message + ' ' + REPLY_HASHTAGS,
  )}`;
