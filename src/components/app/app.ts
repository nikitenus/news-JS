import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import type { INewsApiArticlesResponse, INewsApiSourcesResponse } from '../../types/news-api';
import { getElement } from '../../utils/dom';

class App {
    private readonly controller: AppController;
    private readonly view: AppView;

    public constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sourcesContainer: HTMLElement = getElement<HTMLElement>(document, '.sources');

        sourcesContainer.addEventListener('click', (event: MouseEvent): void => {
            this.controller.getNews(event, (data: INewsApiArticlesResponse): void => {
                this.view.drawNews(data);
            });
        });

        this.controller.getSources((data: INewsApiSourcesResponse): void => {
            this.view.drawSources(data);
        });
    }
}

export default App;
