import { NextResponse } from 'next/server';
import type { Project } from '@/types/api';

const weakData: [string, number] | [] = [];

function getPastYearFromDate(date: string): Date {
    const parseDate = new Date(date);
    const year = parseDate.getFullYear();
    return new Date(year - 1, parseDate.getMonth() + 1, parseDate.getDate());
}

export function GET() {
    const actualDate = new Date(new Date().toDateString()).toJSON();
    const pasteYearDate = getPastYearFromDate(actualDate).toJSON();

    if (weakData[0] == actualDate) {
        console.log('Get data from cache');
        
        return NextResponse.json({
            result: weakData[1] ?? 'unknown'
        })
    };

    return fetch(`https://vercel.com/api/v1/usage/analytics?from=${pasteYearDate}&to=${actualDate}`, {
        headers: {
            authorization: `Bearer ${process.env.VERCEL_API_KEY as string}`,
        }
    })
        .then(async (res) => await res.json())
        .then((projects) => {
            if (!projects || projects.error) {
                return NextResponse.json({
                    result: 'unknown'
                });
            }

            const project = projects
                .find((pr: Project) => pr.projectId == process.env.VERCEL_PROJECT_ID);

            if (!project) {
                return NextResponse.json({
                    result: 'unknown'
                }); 
            }

            return NextResponse.json({
                result: project.pageviewCount ?? 'unknown'
            }, {
                headers: {
                    'cache-control': 'Cache-Control: max-age=86400'
                }
            })
        })
        .catch((err) => {
            console.error(err);
            return NextResponse.json({
                result: 'unknown'
            });
        })
}