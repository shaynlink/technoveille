'use client';
import useSWR from 'swr';
import type { News } from '@/types/api';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Articles.module.css';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Articles() {
    const { data, error, isLoading } = useSWR<News[]>('/api/news', fetcher, {
        refreshInterval: 1000 * 60 * 60,
        refreshWhenHidden: true,
    });

    if (error) {
        return <span style={{color: 'red'}}>failed to load</span>
    }
    if (isLoading || !data) return <ArticleSkeleton />;

    const sortedData = data.sort((a,b) => new Date(b.published).getTime() - new Date(a.published).getTime());

    return (
        <>{
            sortedData.map((article: News) => <Article key={article.id} article={article} />)
        }</>
    );
}

function ArticleSkeleton() {
    return (
        <svg className={styles.spinner} x={40} y={40} viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="18" />
        </svg>
    )
}

function Article({ article }: { article: News }) {
    return (
        <Link href={article.link} target='_blank'>
            <article className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <div className="md:flex">
                    <div className="md:shrink-0">
                        <Image
                            decoding='async'
                            fetchPriority='low'
                            src={article.img}
                            alt={article.alt}
                            width={article.width}
                            height={article.height}
                            className="h-48 w-full object-cover md:h-full md:w-48"
                        />
                    </div>
                    <div className="p-8">
                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold flex gap-4">
                            <span className="text-pink-600">{article.from}</span>
                            {new Date(article.published).toDateString()}
                        </div>
                        <p className="bleck mt-1 text-lg leading-tight font-medium text-black hover:underline">{article.title}</p>
                        <p className="mt-2 text-slate-500">{article.author}</p>
                    </div>
                </div>
            </article>
        </Link>
    )
}