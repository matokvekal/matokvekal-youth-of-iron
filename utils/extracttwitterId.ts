export function extractTweetId(urlString: string): string | undefined {
  try {
    const url = new URL(urlString);

    if (
      url.hostname !== 'twitter.com' &&
      url.hostname !== 'www.twitter.com' &&
      url.hostname !== 'x.com'
    ) {
      return undefined;
    }

    const pathComponents = url.pathname.split('/');
    if (pathComponents.length < 4 || pathComponents[1] === '' || pathComponents[3] === '') {
      return undefined;
    }

    const tweetId = pathComponents[3];
    if (!/^\d+$/.test(tweetId)) {
      return undefined;
    }

    return tweetId;
  } catch {
    console.error('Failed to parse tweet URL', urlString);
    return undefined;
  }
}
