export interface News {
    id: string;
    from: string;
    published: string;
    title: string;
    img: string;
    alt: string;
    width: number;
    height: number;
    link: string;
    author: string;
};

export interface Project {
    timestamp: string;
    projectName: string;
    projectId: string;
    count: number;
    eventCount: number;
    pageviewCount: number;
}   
