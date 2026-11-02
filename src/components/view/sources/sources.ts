import './sources.css';
import type { INewsApiSource } from '../../../types/news-api';
import { cloneTemplate, getElement } from '../../../utils/dom';

class Sources {
    public draw(data: readonly INewsApiSource[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement = getElement<HTMLTemplateElement>(document, '#sourceItemTemp');

        data.forEach((item: INewsApiSource): void => {
            const sourceClone: DocumentFragment = cloneTemplate(sourceItemTemp);

            getElement<HTMLElement>(sourceClone, '.source__item-name').textContent = item.name;
            getElement<HTMLElement>(sourceClone, '.source__item').setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        getElement<HTMLElement>(document, '.sources').append(fragment);
    }
}

export default Sources;
