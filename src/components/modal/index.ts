import './index.less';

const attributes = {
    modalBgColor: 'data-modal-bg-color',
    modalContent: 'data-modal-content',
};

const classes = {
    component: 'modal',
    content: 'modal__content',
    close: 'modal__close',
};

export const initModal = () => {
    const elements: Record<string, Element> = {
        modal: null,
        close: null,
        content: null,
        modals: null,
    };

    const handleOpen = (event: MouseEvent) => {
        const { target } = event;
        if (!(target instanceof HTMLElement)) {
            return;
        }

        const element = target.closest(`[${attributes.modalContent}]`);

        if (!element) {
            return;
        }

        const modalColor = element.getAttribute(attributes.modalBgColor);
        const modalContentQuery = element.getAttribute(attributes.modalContent);

        const modalContent = document.body.querySelector(modalContentQuery);

        if (!modalContent) {
            return;
        }

        if (!(modalContent instanceof HTMLElement)) {
            return;
        }

        elements.modals = modalContent.parentElement;
        elements.content = modalContent;

        const modal = document.createElement('div');
        modal.classList.add(classes.component);
        modal.style.backgroundColor = modalColor;

        const content = document.createElement('div');
        content.classList.add(classes.content);
        modal.appendChild(content);

        const close = document.createElement('div');
        close.classList.add(classes.close);
        content.appendChild(close);

        content.appendChild(modalContent);

        document.body.appendChild(modal);

        elements.modal = modal;
        elements.close = close;
    };

    const handleClose = (event: MouseEvent) => {
        const { target } = event;
        if (!(target instanceof HTMLElement)) {
            return;
        }

        if (target !== elements.close) {
            return;
        }
        // Возвращаем контент модалки на место.
        elements.modals.appendChild(elements.content);
        elements.modal.remove();
    };

    document.body.addEventListener('click', handleOpen);

    document.body.addEventListener('click', handleClose);
};
