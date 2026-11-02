import type { Endpoint } from './enums';
import type { INewsApiArticle } from './news-api';

export type ResponseCallback<TResponse> = (data: TResponse) => void;

export type ErrorHandler = (error: unknown) => void;

export type TArticlePreview = Pick<
    INewsApiArticle,
    'title' | 'description' | 'url' | 'urlToImage' | 'publishedAt' | 'author' | 'source'
>;

export interface IRequestOptions {
    apiKey: string;
    sources?: string;
}

export interface ILoaderConfig {
    baseLink: string;
    options: IRequestOptions;
}

export interface IGetRequestParams {
    endpoint: Endpoint;
    options?: Partial<IRequestOptions>;
}
