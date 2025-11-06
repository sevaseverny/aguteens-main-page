import './common/normalize.less';
import './common/fonts.less';

import './components/html';
import './components/page';
import './components/noise';
import './components/block-main';
import './components/block-links';
import './components/block-offer';
import './components/block-welcome';
import './components/block-faq';
import './components/block-cases';
import './components/block-teachers';
import './components/block-tickets';
import './components/ticket';
import './components/block-reviews';
import './components/block-partners';
import './components/block-video';
import './components/footer';
import './components/buy-button';
import './components/block-bottom';

import { initList } from './components/list';
import { slowInfiniteScroll } from './components/horizontal-scroll';
import { initHeader } from './components/header';
import { initReplaceImages } from './components/replace-image';
import { initModal } from './components/modal';

(() => {
    initHeader();
})();

(() => {
    initReplaceImages();
})();
(() => {
    initModal();
})();

(() => {
    const first = document.querySelector('#first-faq');

    if (!first) {
        return;
    }
    if (!(first instanceof HTMLDivElement)) {
        return;
    }

    initList(first, 0);
})();

(() => {
    const scrollableCases = document.querySelector('.block-cases__cards');
    if (!scrollableCases) {
        return;
    }
    if (!(scrollableCases instanceof HTMLDivElement)) {
        return;
    }
    slowInfiniteScroll(
        scrollableCases,
        {
            direction: 'left',
            infinite: true,
            controls: true,
        }
    );
})();

(() => {
    const scrollableCases = document.querySelector('.block-teachers__cards');
    if (!scrollableCases) {
        return;
    }
    if (!(scrollableCases instanceof HTMLDivElement)) {
        return;
    }
    slowInfiniteScroll(
        scrollableCases,
        {
            direction: 'left',
            infinite: true,
            controls: true,
        }
    );
})();

(() => {
    const scrollableCases = document.querySelector('.block-review__cards');
    if (!scrollableCases) {
        return;
    }
    if (!(scrollableCases instanceof HTMLDivElement)) {
        return;
    }
    slowInfiniteScroll(
        scrollableCases,
        {
            direction: 'left',
            infinite: true,
            controls: true,
        }
    );
})();

(() => {
    const partnersFaqBlock = document.querySelector('.block-partners__faq-list');

    if (!partnersFaqBlock) {
        return;
    }
    if (!(partnersFaqBlock instanceof HTMLDivElement)) {
        return;
    }

    initList(partnersFaqBlock, 1);
})();

(() => {
    const scrollableTopVideos = document.querySelector('.block-video__top .block-video__cards');
    if (!scrollableTopVideos) {
        return;
    }
    if (!(scrollableTopVideos instanceof HTMLDivElement)) {
        return;
    }
    const scrollController = slowInfiniteScroll(
        scrollableTopVideos,
        {
            direction: 'left',
            infinite: true,
        }
    );
    scrollController.start();
})();

(() => {
    const scrollableBottom = document.querySelector('.block-video__bottom .block-video__cards');
    if (!scrollableBottom) {
        return;
    }
    if (!(scrollableBottom instanceof HTMLDivElement)) {
        return;
    }
    const scrollController = slowInfiniteScroll(
        scrollableBottom,
        {
            direction: 'right',
            infinite: true,
        }
    );

    scrollController.start();
})();
