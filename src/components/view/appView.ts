import News from './news/news';
import Sources from './sources/sources';
import type { INewsApiArticlesResponse, INewsApiSourcesResponse } from '../../types/news-api';

export class AppView {
    private readonly news: News;
    private readonly sources: Sources;

    public constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: INewsApiArticlesResponse): void {
        this.news.draw(data.articles ?? []);
    }

    public drawSources(data: INewsApiSourcesResponse): void {
        this.sources.draw(data.sources ?? []);
    }
}

export default AppView;
