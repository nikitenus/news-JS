import AppLoader from './appLoader';
import { Endpoint } from '../../types/enums';
import type { ResponseCallback } from '../../types/app';
import type { INewsApiArticlesResponse, INewsApiSourcesResponse } from '../../types/news-api';

class AppController extends AppLoader {
    public getSources(callback: ResponseCallback<INewsApiSourcesResponse>): void {
        super.getResp<INewsApiSourcesResponse>(
            {
                endpoint: Endpoint.Sources,
            },
            callback
        );
    }

    public getNews(event: MouseEvent, callback: ResponseCallback<INewsApiArticlesResponse>): void {
        const newsContainer: EventTarget | null = event.currentTarget;

        if (!(newsContainer instanceof Element)) {
            return;
        }

        let target: EventTarget | null = event.target;

        while (target instanceof Element && target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId: string | null = target.getAttribute('data-source-id');

                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp<INewsApiArticlesResponse>(
                        {
                            endpoint: Endpoint.Everything,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }

                return;
            }

            target = target.parentElement;
        }
    }
}

export default AppController;
