'use client';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function NewsList() {
    const { data, error, isLoading } = useSWR<[string, string][]>('/api/news/list', fetcher);

    if (error || !Array.isArray(data)) {
        return <p>Failed to getting news list</p>;
    }

    if (isLoading || !data) {
        return <p>Getting news list ...</p>;
    }

    return (
        <ul role="list" className="marker:text-sky-400 list-disc pl-5 space-y-1 text-slate-500">
            {data.map(([name, url]) => (
                <li key={url} className="list-item">
                    <a href={url}>
                        {name}{' '}
                        <span className="text-blue-600">{url.replaceAll(/\//g, '').replaceAll(/http(s)?:/ig, '').replaceAll(/www\./gi, '')}</span>
                    </a>
                </li>
            ))}
        </ul>
    )
}