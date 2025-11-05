const attributes = {
    bgImage: 'data-replace-bg-image-src',
    bgTarget: 'data-replace-bg-target',
};

export const initReplaceImages = () => {
    const handleReplace = (event: MouseEvent) => {
        const { target } = event;
        if (!(target instanceof HTMLElement)) {
            return;
        }

        const element = target.closest(`[${attributes.bgImage}]`);

        if (!element) {
            return;
        }

        const imageSrc = element.getAttribute(attributes.bgImage);
        const imageTargetQuery = element.getAttribute(attributes.bgTarget);

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
