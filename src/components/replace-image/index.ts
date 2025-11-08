const attributes = {
    bgImage: 'data-replace-bg-image-src',
    bgTarget: 'data-replace-bg-target',
};

/**
 * Инициализация событий для замены изображений.
 *
 * При клике на элемент с атрибутом data-replace-bg-image-src заменяет фоновое изображение
 * элемента с атрибутом data-replace-bg-target на изображение из атрибута data-replace-bg-image-src.
 */
export const initReplaceImageListeners = () => {
    const handleReplace = (event: MouseEvent) => {
        const { target } = event;
        if (!(target instanceof HTMLElement)) {
            return;
        }

        // Элемент с атрибутами, в которых содержится информация о заменяемой картинке.
        const element = target.closest(`[${attributes.bgImage}]`);

        if (!element) {
            return;
        }

        // Ссылка на картинку.
        const imageSrc = element.getAttribute(attributes.bgImage);

        // Квери селектор элемента, у которого надо заменить фоновое изображение.
        const imageTargetQuery = element.getAttribute(attributes.bgTarget);

        // Элемент, у которого надо заменить фоновое изображение.
        const imageWithBackground = document.body.querySelector(imageTargetQuery);

        if (!imageWithBackground) {
            return;
        }

        if (!(imageWithBackground instanceof HTMLElement)) {
            return;
        }


        imageWithBackground.style.backgroundImage = `url('${imageSrc}')`;
    };

    document.body.addEventListener('click', handleReplace);
};
