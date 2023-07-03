'use client';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ViewCounter() {
    const { data, error, isLoading } = useSWR<{result?: number | string}>('/api/analytics', fetcher);

    if (error || data?.result === 'unknown') {
        return <p>Failed to getting watched count</p>
    }

    if (isLoading || !data) {
        return <p>Getting watched count view ...</p>
    }

    return <p>This website has been watched {data.result} times ✨</p>
}