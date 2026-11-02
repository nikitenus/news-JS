export interface INewsApiArticleSource {
    id: string | null;
    name: string;
}

export interface INewsApiArticle {
    source: INewsApiArticleSource;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface INewsApiSource {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface INewsApiSourcesResponse {
    status: 'ok';
    sources: INewsApiSource[];
}

export interface INewsApiArticlesResponse {
    status: 'ok';
    totalResults: number;
    articles: INewsApiArticle[];
}
