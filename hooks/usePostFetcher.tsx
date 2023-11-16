import { useQuery } from '@tanstack/react-query';
import ky from 'ky';
import { useState, useEffect } from 'react';
import { Intent, Platform, PostResponse } from 'types/internal';

// ...other imports

export function usePostFetcher(
  intent: Intent,
  platform: Platform,
): [string | undefined, () => void, boolean] {
  const [selectedUrl, setSelectedUrl] = useState<string | undefined>(undefined);

  const localStorageKeyIndex = `currentIndex_${platform}_${intent}`;
  const localStorageKeyLength = `arrayLength_${platform}_${intent}`;

  const { data: urls, isLoading } = useQuery<string[]>({
    queryKey: ['postList', platform, intent],
    queryFn: async () => {
      const response = await ky(`/api/posts?platform=${platform}&intent=${intent}`);
      const jsonResponse: PostResponse[] = await response.json();
      return jsonResponse.map((p) => p.url);
    },
  });

  const initializeIndexAndURL = (urlList: string[] | undefined) => {
    if (urlList && urlList.length > 0) {
      const storedIndex = localStorage.getItem(localStorageKeyIndex);
      const storedLength = localStorage.getItem(localStorageKeyLength);

      let currentIndex;

      if (storedLength && Number(storedLength) !== urlList.length) {
        currentIndex = 0;
      } else if (storedIndex) {
        currentIndex = Number(storedIndex);
      } else {
        currentIndex = 0;
      }

      setSelectedUrl(urlList[currentIndex]);
      localStorage.setItem(localStorageKeyIndex, currentIndex.toString());
      localStorage.setItem(localStorageKeyLength, urlList.length.toString());
    }
  };

  useEffect(() => {
    initializeIndexAndURL(urls);
  }, [urls]);

  const selectAnotherUrl = () => {
    if (urls && urls.length > 0) {
      let storedIndex = Number(localStorage.getItem(localStorageKeyIndex) || 0);
      if (storedIndex < urls.length - 1) {
        storedIndex++;
      } else {
        storedIndex = 0; // Reset to 0 if reached the end
      }
      setSelectedUrl(urls[storedIndex]);
      localStorage.setItem(localStorageKeyIndex, storedIndex.toString());
    }
  };

  return [selectedUrl, selectAnotherUrl, isLoading];
}
