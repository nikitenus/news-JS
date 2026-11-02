export function getElement<T extends Element>(parent: ParentNode, selector: string): T {
    const element = parent.querySelector<T>(selector);

    if (!element) {
        throw new Error(`Element not found: ${selector}`);
    }

    return element;
}

export function cloneTemplate(template: HTMLTemplateElement): DocumentFragment {
    const clone = template.content.cloneNode(true);

    if (!(clone instanceof DocumentFragment)) {
        throw new Error('Failed to clone template content');
    }

    return clone;
}
