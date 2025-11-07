import './index.less';

const attributes = {
    modalBgColor: 'data-modal-bg-color',
    modalContent: 'data-modal-content',
};

const classes = {
    component: 'modal',
    wrapper: 'modal__wrapper',
    dialog: 'modal__dialog',
    close: 'modal__close',
    control: 'modal__control',
    controlLeft: 'modal__control_left',
    controlRight: 'modal__control_right',
};

/**
 * Инициализация модальных окон.
 */
export const initModal = () => {
    const elements: {
        /**
         * Элемент модального окна.
         */
        modal: Element;

        /**
         * Кнопка закрытия модального окна.
         */
        close: Element;


        /**
         * Диалог модального окна.
         */
        dialog: Element;

        /**
         * Контент модального окна.
         */
        content: Element;

        /**
         * Контейнер всех модальных окон блока.
         */
        modalsContainer: Element;

        /**
         * Массив всех модальных окон для блока. Нужен для сохранения порядка следования окон.
         */
        modals: Element[];
    } = {
        modal: null,
        close: null,
        content: null,
        dialog: null,
        modalsContainer: null,
        modals:[],
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

        elements.modalsContainer = modalContent.parentElement;
        elements.modals = Array.from(modalContent.parentElement.children);
        elements.content = modalContent;

        const modal = document.createElement('div');
        modal.classList.add(classes.component);
        modal.style.backgroundColor = modalColor;

        const wrapper = document.createElement('div');
        wrapper.classList.add(classes.wrapper);
        modal.appendChild(wrapper);

        const close = document.createElement('div');
        close.classList.add(classes.close);
        wrapper.appendChild(close);

        if (elements.modals.length > 1) {
            const prevButton = document.createElement('div');
            prevButton.classList.add(classes.control, classes.controlLeft);

            const nextButton = document.createElement('div');
            nextButton.classList.add(classes.control, classes.controlRight);

            wrapper.appendChild(prevButton);
            wrapper.appendChild(nextButton);
        }

        const dialog = document.createElement('div');
        elements.dialog = dialog;
        dialog.classList.add(classes.dialog);
        wrapper.appendChild(dialog);

        dialog.appendChild(modalContent);

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
        elements.modalsContainer.innerHTML = '';
        elements.modals.forEach((modalContent) => elements.modalsContainer.appendChild(modalContent));
        elements.modal.remove();
    };

    const handleClickPrev = (event: MouseEvent) =>{
        const { target } = event;
        if( !(target instanceof HTMLElement)) {
            return;
        }

        if (!target.closest(`.${classes.controlLeft}`)) {
            return;
        }

        const currentModalContentIndex = elements.modals.findIndex((modalContent) => modalContent === elements.content);
        const prevModalIndex = currentModalContentIndex === 0
            ? elements.modals.length - 1
            : currentModalContentIndex - 1;

        elements.dialog.removeChild(elements.content);

        elements.content = elements.modals[prevModalIndex];
        elements.dialog.appendChild(elements.content);


    };

    const handleClickNext = (event: MouseEvent) => {
        const { target } = event;
        if(!(target instanceof HTMLElement)) {
            return;
        }

        if (!target.closest(`.${classes.controlRight}`)) {
            return;
        }

        const currentModalContentIndex = elements.modals.findIndex((modalContent) => modalContent === elements.content);
        const nextModalIndex = currentModalContentIndex === elements.modals.length - 1
            ? 0
            : currentModalContentIndex + 1;

        elements.dialog.removeChild(elements.content);

        elements.content = elements.modals[nextModalIndex];
        elements.dialog.appendChild(elements.content);
    };

    document.body.addEventListener('click', handleOpen);

    document.body.addEventListener('click', handleClose);

    document.body.addEventListener('click', handleClickPrev);

    document.body.addEventListener('click', handleClickNext);
};
