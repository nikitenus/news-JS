import './news.css';
import type { TArticlePreview } from '../../../types/app';
import type { INewsApiArticle } from '../../../types/news-api';
import { cloneTemplate, getElement } from '../../../utils/dom';

class News {
    public draw(data: readonly INewsApiArticle[]): void {
        const news: readonly INewsApiArticle[] = data.length >= 10 ? data.slice(0, 10) : data;
        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement = getElement<HTMLTemplateElement>(document, '#newsItemTemp');

        news.forEach((item: INewsApiArticle, idx: number): void => {
            const newsClone: DocumentFragment = this.createNewsItem(item, idx, newsItemTemp);

            fragment.append(newsClone);
        });

        const newsContainer: HTMLElement = getElement<HTMLElement>(document, '.news');

        newsContainer.innerHTML = '';
        newsContainer.appendChild(fragment);
    }

    private createNewsItem(item: TArticlePreview, idx: number, template: HTMLTemplateElement): DocumentFragment {
        const newsClone: DocumentFragment = cloneTemplate(template);

        if (idx % 2) {
            getElement<HTMLElement>(newsClone, '.news__item').classList.add('alt');
        }

        getElement<HTMLElement>(newsClone, '.news__meta-photo').style.backgroundImage = `url(${
            item.urlToImage ?? 'img/news_placeholder.jpg'
        })`;
        getElement<HTMLElement>(newsClone, '.news__meta-author').textContent = item.author ?? item.source.name;
        getElement<HTMLElement>(newsClone, '.news__meta-date').textContent = item.publishedAt
            .slice(0, 10)
            .split('-')
            .reverse()
            .join('-');

        getElement<HTMLElement>(newsClone, '.news__description-title').textContent = item.title;
        getElement<HTMLElement>(newsClone, '.news__description-source').textContent = item.source.name;
        getElement<HTMLElement>(newsClone, '.news__description-content').textContent = item.description;
        getElement<HTMLAnchorElement>(newsClone, '.news__read-more a').setAttribute('href', item.url);

        return newsClone;
    }
}

export default News;
