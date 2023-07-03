import { NextResponse } from 'next/server';

const lists: [string, string][] = [
    ['BDM', 'https://www.blogdumoderateur.com'],
    ['The Verge', 'https://www.theverge.com']
]

export function GET() {
    return NextResponse.json<[string, string][]>(lists);
}