import 'server-only';
 
type Project = {
    timestamp: string;
    projectName: string;
    projectId: string;
    count: number;
    eventCount: number;
    pageviewCount: number;
}

export async function getAnalyticsData() {
  const res = await fetch('https://vercel.com/api/v1/usage/analytics?from=2023-05-15T00%3A00%3A00.000Z&to=2023-06-14T23%3A59%3A59.999Z', {
    headers: {
      authorization: `Bearer ${process.env.VERCEL_API_KEY as string}`,
    },
  })
 
  return res.json().then((projects) => {
    if (!projects || !Array.isArray(projects)) {
        return {};
    }
    return projects.find((pr: Project) => pr.projectId == process.env.VERCEL_PROJECT_ID)
  });
}