import { NextResponse } from 'next/server';
import type { News } from '@/types/api';
import Parser from 'rss-parser';

const myFieldRSS = [
    theVergeRSSParser(),
    bdmRSSParser()
]

export function GET() {
    return Promise.all(myFieldRSS)
        .then((feeds) => {
            return NextResponse.json<News[]>(feeds.flat());
        })
}

async function theVergeRSSParser(): Promise<News[]> {
    const parser = new Parser<{items: (News & {pubDate: string; content: string})[]}>();
    const feed = await parser.parseURL('https://www.theverge.com/rss/full.xml');
    const news: News[] = feed.items.map((item): News => {
        const title = item.title ?? '';
        const author = item.author;
        const published= item.pubDate;
        const link = item.link;
        const id = item.id;
        const content = item.content ?? '';

       const [alt, img] = [...content.matchAll(/alt="(.*)" src="(.+)"/gim)].map((c) => [c[1], c[2]]).flat();
       const [width, height] = [...img.matchAll(/\/\d+x\d+:\d+x\d+\/(\d+)x(\d+)/gim)].map((c) => [c[1], c[2]]).flat();

       return {from: 'The Verge', title, author, published, link, id, img, alt, width: parseInt(width), height: parseInt(height)};
    });

    return news;
}

async function bdmRSSParser(): Promise<News[]> {
    const parser = new Parser<{items: (News & {creator: string; content: string; pubDate: string; guid: string})[]}>();
    const feed = await parser.parseURL('https://www.blogdumoderateur.com/feed/');

    const news = feed.items.map((item): News => {
        const title = item.title;
        const link = item.link;
        const author = item.creator;
        const published =  item.pubDate;
        const id = item.guid;
        const content = item.content ?? '';

        const [img, alt] = [...content.matchAll(/src="(.+)" alt="(.+)" /gim)].map((c) => [c[1], c[2]]).flat();
        const [width, height] = [...img.matchAll(/-(\d+)x(\d+)./gim)].map((c) => [c[1], c[2]]).flat();

        return {from: 'BDM', title, link, author, published, id, img, alt, width: parseInt(width), height: parseInt(height)};
    });

    return news
}