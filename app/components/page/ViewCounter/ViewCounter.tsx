import { getAnalyticsData } from '@/app/lib/analytic';

export default async function ViewCounter() {
    const analytics = await getAnalyticsData();

    return (
        <p>This website has been watched {analytics.pageviewCount || '😳'} times ✨</p>
    )
}