import { useQuery } from '@tanstack/react-query';

const CORS_PROXY = 'https://corsproxy.io/?';
const LEETCODE_API = `${CORS_PROXY}${encodeURIComponent('https://leetcode-stats-api.herokuapp.com/navaneethan_2005')}`;
const CODECHEF_API = `${CORS_PROXY}${encodeURIComponent('https://codechef-api.vercel.app/handle/navaneethan_07')}`;

export function useCodingStats() {
  return useQuery({
    queryKey: ['codingStats'],
    queryFn: async () => {
        // Temporarily mocking network requests to prevent browser 402/503 console logs
        // Wait until APIs are restored before re-enabling actual fetch calls.
        const lcRes = { status: 'rejected' } as any;
        const ccRes = { status: 'rejected' } as any;
        // const [lcRes, ccRes] = await Promise.allSettled([
        //   fetch(LEETCODE_API).then(r => r.json()),
        //   fetch(CODECHEF_API).then(r => r.json())
        // ]);
        
        let lcSolved = 0;
        let ccSolved = 0;

        if (lcRes.status === 'fulfilled' && lcRes.value.status === 'success') {
          lcSolved = lcRes.value.totalSolved || 0;
        }
        
        if (ccRes.status === 'fulfilled' && ccRes.value.success !== false) {
          // Both `fullySolved` count or standard `stars` mapping exist depending on Vercel un-official API structure.
          ccSolved = ccRes.value.fullySolved?.count ?? (ccRes.value.ratingData?.length ? ccRes.value.ratingData.length : 0);
        }

        const total = lcSolved + ccSolved;
        return total > 0 ? total : 1000; // Fallback to 1000 if both endpoints fail
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export function useLinkedInStats() {
  return useQuery({
    queryKey: ['linkedinStats'],
    queryFn: async () => {
      // LinkedIn completely blocks public unauthenticated fetching from web clients.
      // Fetching LinkedIn followers will require a dedicated backend/proxy.
      // This is a placeholder hook mapped out perfectly to receive that proxy endpoint.
      // TODO: Replace with `return fetch('YOUR_PROXY_URL').then(r => r.json())`
      return new Promise<number>((resolve) => {
        setTimeout(() => resolve(3000), 500); 
      });
    },
    staleTime: 1000 * 60 * 60,
  });
}
