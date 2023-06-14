'use client';
import useSWR from 'swr';
import type { News } from '@/types/api';
import Image from 'next/image';
import styles from './Articles.module.css'
import Link from 'next/link';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Articles() {
    const { data, error, isLoading } = useSWR<News[]>('/api/news', fetcher, {
        refreshInterval: 1000 * 60 * 60
    });

    if (error) {
        return <span style={{color: 'red'}}>failed to load</span>
    }
    if (isLoading || !data) return (
        <>
            <ArticleSkeleton />
            <ArticleSkeleton />
            <ArticleSkeleton />
            <ArticleSkeleton />
        </>
    )

    const sortedData = data.sort((a,b) => new Date(b.published).getTime() - new Date(a.published).getTime());

    return (
        <>{
            sortedData.map((article: News) => <Article key={article.id} article={article} />)
        }</>
    );
}

const classAnimated = (className: string): string => `${className} ${styles.animated_background}`;

function ArticleSkeleton() {

    return (
        <article className={styles.article}>
            <div className={styles.img_container}>
                <div className={classAnimated(styles.img_skeleton)} />
            </div>
            <div className={styles.info_container_skeleton}>
                <div className={styles.info}>
                    <div className={classAnimated(styles.from_skeleton)}/>
                    <div className={classAnimated(styles.date_skeleton)} />
                </div>
                <div className={classAnimated(styles.title_skeleton)} />
                <div className={classAnimated(styles.author_skeleton)} />
            </div>
        </article>
    )
}

function Article({ article }: { article: News }) {
    return (
        <Link href={article.link} target='_blank'>
            <article className={styles.article}>
                <div className={styles.img_container}>
                    <Image
                        decoding='async'
                        fetchPriority='low'
                        src={article.img}
                        alt={article.alt}
                        width={article.width}
                        height={article.height}
                        className={styles.img}
                    />
                </div>
                <div className={styles.info_container}>
                    <div className={styles.info}>
                        <span className={styles.from}>{article.from}</span>
                        {new Date(article.published).toDateString()}
                    </div>
                    <p className={styles.title}>{article.title}</p>
                    <p>{article.author}</p>
                </div>
            </article>
        </Link>
    )
}