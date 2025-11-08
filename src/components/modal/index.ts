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
export const initModalListeners = () => {
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

    /**
     * Состояние компонента.
     */
    let state = {
        // Признак, что он открыт.
        isOpen: false,

        // Цвет задника.
        backgroundColor: '',

        // Квери селектор модального окна.
        contentQuery: '',

        // Индекс контента модального окна в коллекции окон.
        index: 0,
    };

    /**
     * Изменение состояния компонента.
     * @param newState
     */
    const setState = (newState: Partial<typeof state>) => {
        const updatedState: typeof state = {
            ...state,
            ...newState,
        };

        if (JSON.stringify(updatedState) !== JSON.stringify(state)) {
            if (!state.isOpen && newState.isOpen) {
                state = updatedState;
                render();
            } else {
                state = updatedState;
                rerender();
            }
        }
    };

    /**
     * Первичная отрисовка компонента.
     */
    const render = () => {
        // Если открыли модалку.
        const modalContent = document.body.querySelector(state.contentQuery);

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
        modal.style.backgroundColor = state.backgroundColor;

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

    /**
     * Перерисовка компонента.
     */
    const rerender = () => {
        // Если закрыли модалку
        if (!state.isOpen) {
            // Возвращаем контент модалки на место.
            elements.modalsContainer.innerHTML = '';
            elements.modals.forEach((modalContent) => elements.modalsContainer.appendChild(modalContent));
            elements.modal.remove();
            return;
        }

        elements.dialog.removeChild(elements.content);

        elements.content = elements.modals[state.index];
        elements.dialog.appendChild(elements.content);
    };

    /**
     * Обработчик открытия модального окна.
     * @param event
     */
    const handleOpen = (event: MouseEvent) => {
        const { target } = event;
        if (!(target instanceof HTMLElement)) {
            return;
        }

        // Элемент, в котором содержится контент модального окна.
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

        // Позиция контента среди родственных элементов.
        const currentModalContentIndex = Array
            .from(modalContent.parentElement.children)
            .findIndex((child) => child === modalContent);

        if (modalColor && modalContentQuery) {
            setState({
                isOpen: true,
                backgroundColor: modalColor,
                contentQuery: modalContentQuery,
                index: currentModalContentIndex,
            });
        }
    };

    /**
     * Обработчик закрытия модального окна.
     * @param event
     */
    const handleClose = (event: MouseEvent) => {
        const { target } = event;
        if (!(target instanceof HTMLElement)) {
            return;
        }

        if (target !== elements.close) {
            return;
        }

        setState({ isOpen: false });
    };

    /**
     * Обработчик клика по кнопке "ранее".
     * @param event
     */
    const handleClickPrev = (event: MouseEvent) =>{
        const { target } = event;
        if( !(target instanceof HTMLElement)) {
            return;
        }

        if (!target.closest(`.${classes.controlLeft}`)) {
            return;
        }


        const prevModalIndex = state.index === 0
            ? elements.modals.length - 1
            : state.index - 1;

        setState({index: prevModalIndex});
    };

    /**
     * Обработчик клика по кнопке "далее".
     * @param event
     */
    const handleClickNext = (event: MouseEvent) => {
        const { target } = event;
        if(!(target instanceof HTMLElement)) {
            return;
        }

        if (!target.closest(`.${classes.controlRight}`)) {
            return;
        }

        const nextModalIndex = state.index === elements.modals.length - 1
            ? 0
            : state.index + 1;

        setState({ index: nextModalIndex });
    };

    document.body.addEventListener('click', handleOpen);

    document.body.addEventListener('click', handleClose);

    document.body.addEventListener('click', handleClickPrev);

    document.body.addEventListener('click', handleClickNext);
};
