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

export interface INewsApiBaseResponse {
    status: string;
}

export interface INewsApiSourcesResponse extends INewsApiBaseResponse {
    status: 'ok';
    sources: INewsApiSource[];
}

export interface INewsApiArticlesResponse extends INewsApiBaseResponse {
    status: 'ok';
    totalResults: number;
    articles: INewsApiArticle[];
}

export interface INewsApiErrorResponse extends INewsApiBaseResponse {
    status: 'error';
    code: string;
    message: string;
}

export type TNewsApiResponse = INewsApiSourcesResponse | INewsApiArticlesResponse | INewsApiErrorResponse;
