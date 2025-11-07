import './index.less';

const classes = {
    component: 'spoiler',
    title: 'spoiler__title',
    titleOpened: 'spoiler__title_opened',
    content: 'spoiler__content',
    contentOpened: 'spoiler__content_opened',
};

export const initSpoiler = (
    element: HTMLDivElement,
) => {
    const state = {
        isOpened: false,
    };

    const setState = (newState: Partial<typeof state>) => {
        if (newState.isOpened !== state.isOpened) {
            state.isOpened = newState.isOpened;
            rerender();
        }
    };

    const handleToggleSpoiler = (event: MouseEvent) => {
        const { target } = event;

        if (!(target instanceof HTMLDivElement)) {
            return;
        }

        const title = target.closest(`.${classes.title}`);
        if (!title) {
            return;
        }
        setState({
            isOpened: !state.isOpened,
        });
    };

    element.addEventListener('click', handleToggleSpoiler);

    const rerender = (): void => {
        const content = element.querySelector(`.${classes.content}`);
        const title = element.querySelector(`.${classes.title}`);

        if (state.isOpened) {
            content.classList.add(classes.contentOpened);
            title.classList.add(classes.titleOpened);
            return;
        }

        content.classList.remove(classes.contentOpened);
        title.classList.remove(classes.titleOpened);
    };
};
