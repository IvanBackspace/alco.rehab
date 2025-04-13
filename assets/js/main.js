Fancybox.bind("[data-fancybox]", {
    // Your custom options
});

// animation 
const animationItems = document.querySelectorAll('.animation-item');
if (animationItems.length > 0) {
    function onEntry(e) {
        e.forEach(e => {
            e.isIntersecting && e.target.classList.add("animation-active")
        }
        )
    }
    let options = {
        threshold: [.5]
    }, observer = new IntersectionObserver(onEntry, options)
    for (let e of animationItems)
        observer.observe(e);
}
// end animation

/* hide header */
let scrollWidthFunc = () => {
    let scrollWidth = window.innerWidth - document.body.clientWidth;
    document.querySelector('html').style.paddingRight = scrollWidth + 'px';
    console.log(window.innerWidth)
    // document.querySelector('header').style.paddingRight = scrollWidth + 'px';
}
const scrollTop = document.querySelector('.scroll-top');
if (scrollTop)
    scrollTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

['load', 'resize'].forEach((event) => {
    window.addEventListener(event, function () {
        let headerHeight = header.clientHeight;
        const plashka = header.querySelector('.header__plashka');
        const headerTop = header.querySelector('.header__top');
        if (plashka) {
            var originalHeightPlashka = plashka.offsetHeight;
            var originalHeightHeaderTop = headerTop.offsetHeight;
        }
        window.onscroll = function (e) {
            if (window.scrollY > headerHeight) {
                if (!plashka.classList.contains('hide')) {
                    // plashka.classList.add('hide');
                    // plashka.style.height = '0px';
                    // plashka.style.opacity = '0';
                    // plashka.style.overflow = 'hidden';

                    if (window.innerWidth > 1260) {
                        // headerTop.classList.add('hide');
                        // headerTop.style.height = '0px';
                        // headerTop.style.opacity = '0';
                        // headerTop.style.overflow = 'hidden';
                    }
                }
            }
            else {
                plashka.style.height = originalHeightPlashka + 'px';
                plashka.classList.remove('hide');
                plashka.style.opacity = '1';

                headerTop.style.height = originalHeightHeaderTop + 'px';
                headerTop.classList.remove('hide');
                headerTop.style.opacity = '1';
                headerTop.style.overflow = 'visible';
            }
        };
    })
})
/* hide header */


document.addEventListener("DOMContentLoaded", function () {
    /* burger menu */
    const burgerMenu = document.querySelector('.burger__menu');
    if (burgerMenu) {
        const headerMobile = document.querySelector('.header__menu');
        const header = document.querySelector('.header');
        const plashka = document.querySelector('.header__plashka');
        burgerMenu.addEventListener("click", () => {
            if (burgerMenu.classList.contains('burger__menu--active')) {
                if (plashka) {
                    plashka.style.display = 'block';
                }
                document.body.classList.remove('burger-lock');
            }
            else {

                document.body.classList.add('burger-lock');
            }
            headerMobile.classList.toggle("header__menu--active");
            burgerMenu.classList.toggle("burger__menu--active");
            header.classList.toggle("header--active");

            document.querySelector('html').classList.toggle('burger-lock');
        });
    }
    /* end burger menu */


    /* close header__discount */
    const discountBlockButton = document.querySelector('.header__discount_close');
    const discountBlock = document.querySelector('.plashka.header__discount');
    const mainContent = document.querySelector('main');
    if (discountBlockButton) {
        discountBlockButton.addEventListener('click', function () {
            discountBlock.classList.add('hidden');
            mainContent.classList.add('shifted');
        });
    }
    /* end close header__discount */


    /*  open menu  */
    const headerNavList = document.querySelectorAll('.hide-item>button');

    function closeHeaderNav(item) {
        document.body.classList.remove('lock');
        document.querySelector('html').classList.remove('burger-lock');
        document.querySelector('html').removeAttribute('style');
        document.querySelector('header').removeAttribute('style');
        item.closest('.hide-item').classList.remove('hide-item--active');
    }

    headerNavList.forEach(item => {
        item.addEventListener('click', (e) => {
            document.querySelector('html').addEventListener('click', function (e) {
                if (!e.target.closest('.header__nav_list')) {
                    closeHeaderNav(item)
                    return;
                }
            })

            if (!item.closest('.hide-item').classList.contains('hide-item--active')) {
                headerNavList.forEach(item => item.closest('.hide-item').classList.remove('hide-item--active'));
                item.closest('.hide-item').classList.add('hide-item--active');
                scrollWidthFunc();
                document.body.classList.add('lock');
                document.querySelector('html').classList.add('burger-lock');
            }
            else {
                closeHeaderNav(item)
            }
        });
    });
    /*  end menu  */


    /* open more subsubmenu  */
    function updateHeaderMoreButtons() {
        const maxHeightSubmenu = 140;
        requestAnimationFrame(() => {
            if (document.querySelectorAll('.header__submenu_more-btn')) {
                document.querySelectorAll('.header__submenu_more-btn').forEach(button => {
                    const sublist = button.previousElementSibling;
                    if (sublist.scrollHeight <= maxHeightSubmenu) {
                        button.style.display = 'none';
                    } else {
                        button.style.display = 'block';
                    }
                });
            }
        });
    }
    // document.querySelector('.hide-item_service').addEventListener('click', (button) => {
    //     if (button) {
    //         updateHeaderMoreButtons();
    //     }
    // });
    document.querySelectorAll('.header__submenu_more-btn').forEach(button => {
        if (button) {
            button.addEventListener('click', function (event) {
                event.stopPropagation();
                const sublist = this.previousElementSibling;
                if (sublist && sublist.classList.contains('header__submenu_tab-content_item')) {
                    sublist.classList.toggle('open');

                    if (sublist.classList.contains('open')) {
                        this.textContent = 'Скрыть';
                    } else {
                        this.textContent = 'Еще';
                    }
                }
            });
        }
    });
    /* end open more submenu  */


    /* header tabs */
    const headerSubmenuBtns = document.querySelectorAll('.header__submenu_tab-btn');
    const headerSubmenuContents = document.querySelectorAll('.header__submenu_tab-content');
    for (let i = 0; i < headerSubmenuBtns.length; i++) {
        headerSubmenuBtns[i].style.order = 2 * i + 1;
    }
    for (let i = 0; i < headerSubmenuContents.length; i++) {
        headerSubmenuContents[i].style.order = 2 * i + 2;
    }
    if (headerSubmenuBtns.length > 0) {
        for (let i = 0; i < headerSubmenuBtns.length; i++) {
            headerSubmenuBtns[i].addEventListener('click', () => {
                if (!headerSubmenuBtns[i].classList.contains('active')) {
                    headerSubmenuContents.forEach(elem => {
                        elem.classList.remove('active');
                    })
                    headerSubmenuBtns.forEach(elem => {
                        elem.classList.remove('active');
                    })
                    headerSubmenuBtns[i].classList.add('active');
                    headerSubmenuContents[i].classList.add('active');
                    updateHeaderMoreButtons();
                }
            })
        }
    }
    if (headerSubmenuBtns.length > 0) {
        headerSubmenuBtns[0].click();
    }
    /* end header tabs */


    /* new tabs */
    const tabs = document.querySelectorAll('.tabs');
    for (let i = 0; i < tabs.length; i++) {
        const tabBtns = tabs[i].querySelectorAll('.tab-btn');
        const tabContents = tabs[i].querySelectorAll('.tab-content');
        for (let i = 0; i < tabBtns.length; i++) {
            tabBtns[i].style.order = 2 * i + 1;
        }
        for (let i = 0; i < tabContents.length; i++) {
            tabBtns[i].style.order = 2 * i + 2;
        }
        if (tabBtns.length > 0) {
            for (let i = 0; i < tabBtns.length; i++) {
                tabBtns[i].addEventListener('click', () => {
                    if (!tabBtns[i].classList.contains('active')) {
                        tabContents.forEach(elem => {
                            elem.classList.remove('active');
                        })
                        tabBtns.forEach(elem => {
                            elem.classList.remove('active');
                        })
                        tabBtns[i].classList.add('active');
                        tabContents[i].classList.add('active');
                    }
                    quantityElem();
                })
            }
        }
        if (tabBtns.length > 0) {
            tabBtns[0].click();
        }
    }
    /* end new tabs */


    /* discount time */
    const counterStocks = document.querySelector('.stock-date-js');
    const currentCounterStocks = document.querySelector('.stock-future-js');
    if (counterStocks && currentCounterStocks) {
        function timeStocks(countDownDate) {
            let now = new Date().getTime();
            let distance = countDownDate - now;
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            counterStocks.innerHTML = days + "д: " + hours + "ч: " +
                minutes + " мин: " + seconds + " сек ";
        }
        let date = new Date();
        date.setDate(date.getDate() + 5);
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const monthNamesRus = ["января", "февраля", "марта", "апреля", "мая", "июня",
            "июля", "августа", "сентября", "октября", "ноября", "декабря"
        ];
        let monthNumber = date.getMonth();
        const month = monthNames[monthNumber];
        currentCounterStocks.innerHTML = date.getDate() + ' ' + monthNamesRus[monthNumber];
        const countDownDate = new Date(month + ' ' + date.getDate() + ', ' + date.getFullYear() + ' 00:00:00').getTime();
        timeStocks(countDownDate);
        const x = setInterval(function () {
            timeStocks(countDownDate);
        }, 1000);

    }
    /* end discount time */


    // Popups
    function popupClose(popupActive) {
        popupActive.classList.remove('open');
        setTimeout(() => {
            if (!popupActive.classList.contains('open')) {
                popupActive.classList.remove('active');
            }
        }, 400);
        document.body.classList.remove('lock');
        document.querySelector('html').style.paddingRight = 0;
        document.querySelector('html').classList.remove('lock');
        document.querySelector('header').removeAttribute('style');


    }
    const popupOpenBtns = document.querySelectorAll('.popup-btn');
    const popups = document.querySelectorAll('.popup');
    const originalTitlePopup2 = document.querySelector('.original-title').innerHTML;
    const closePopupBtns = document.querySelectorAll('.close-popup-btn');
    closePopupBtns.forEach(function (el) {
        el.addEventListener('click', function (e) {
            popupClose(e.target.closest('.popup'));
        });
    });
    popupOpenBtns.forEach(function (el) {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            const path = e.currentTarget.dataset.path;
            const currentPopup = document.querySelector(`[data-target="${path}"]`);
            if (currentPopup) {
                popups.forEach(function (popup) {
                    popupClose(popup);
                    popup.addEventListener('click', function (e) {
                        if (!e.target.closest('.popup__content')) {
                            popupClose(e.target.closest('.popup'));
                        }
                    });
                });
                currentPopup.classList.add('active');
                setTimeout(() => {
                    currentPopup.classList.add('open');
                }, 10);
                if (currentPopup.getAttribute('data-target') == 'popup-change') {

                    let originaTitle = currentPopup.querySelector('.original-title');
                    if (el.classList.contains('change-item__btn')) {

                        if (el.classList.contains('doctor__btn-js')) {
                            let currentItem = el.closest('.change-item');
                            let currentTitile = currentItem.querySelector('.change-item__title');
                            originaTitle.innerHTML = 'Записаться на приём к врачу: ' + currentTitile.innerHTML
                        }
                        else {
                            if (el.classList.contains('change-item__btn_current')) {
                                originaTitle.textContent = el.textContent;
                            }
                            else {
                                let currentItem = el.closest('.change-item');
                                let currentTitile = currentItem.querySelector('.change-item__title');
                                originaTitle.innerHTML = currentTitile.innerHTML
                            }
                        }
                    }
                    else {
                        originaTitle.innerHTML = originalTitlePopup2;
                    }
                }

                if (currentPopup.getAttribute('data-target') == 'popup-jobs') {
                    let currentItems = el.closest('.jobs__items')
                    let originalText = currentPopup.querySelector('.jobs__inner_original');
                    if (originalText && currentItems.querySelector('.jobs__inner')) {
                        originalText.innerHTML = currentItems.querySelector('.jobs__inner').innerHTML;
                    }
                }
                e.stopPropagation();
                scrollWidthFunc();
                document.querySelector('html').classList.add('lock');
            }
        });
    });
    // end popups



    /* yandex map */
    const mapPlaceholder = document.getElementById('map-placeholder');
    if (mapPlaceholder) {
        mapPlaceholder.addEventListener('mouseenter', loadMap, { once: true });
        mapPlaceholder.addEventListener('click', loadMap, { once: true });
    }

    function loadMap() {
        if (!document.querySelector('[src="https://api-maps.yandex.ru/2.1/?lang=ru_RU"]')) {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
            script.onload = initMap;
            document.head.appendChild(script);
        } else {
            initMap();
        }
    }

    function initMap() {
        const mapPlaceholder = document.getElementById('map-placeholder');
        if (mapPlaceholder) {
            mapPlaceholder.remove();
        }

        ymaps.ready(function () {
            const myMap = new ymaps.Map('map', {
                center: [47.231129, 39.728721],
                zoom: 13,
                controls: []
            });

            const myPlacemark = new ymaps.Placemark(
                [47.231129, 39.728721],
                {
                    hintContent: 'Ростов-на-Дону, ул. Красноармейская, д. 227',
                    balloonContent: 'Ростов-на-Дону, ул. Красноармейская, д. 227'
                },
                {
                    iconLayout: 'default#image',
                    iconImageHref: 'assets/img/icons/map-pin.png',  //заменить на свою иконку
                    iconImageSize: [21, 26],
                    iconImageOffset: [-15, -31],
                }
            );

            myMap.geoObjects.add(myPlacemark);
            myMap.behaviors.disable(['scrollZoom']);
        });
    }
    /* end yandex map */

    let filterPlacemark;
    /* yandex map-filials */
    const blockMap = document.getElementById('map-filials');
    if (blockMap) {
        if (!document.querySelector('[src="https://api-maps.yandex.ru/2.1/?lang=ru_RU"]')) {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
            document.head.appendChild(script);
        }
        setTimeout(function () {
            ymaps.ready(init);
            function init() {
                const map = document.querySelector('#map-filials');
                const selectedFilialCard = document.querySelector(`.filter-card`);
                const lat = selectedFilialCard.getAttribute('data-lat');
                const lng = selectedFilialCard.getAttribute('data-lng');

                if (map) {
                    var myMap = new ymaps.Map("map-filials", {
                        center: [lat, lng],
                        zoom: 13,
                    });

                    filterPlacemark = new ymaps.Placemark(
                        [lat, lng],
                        {
                            hintContent: 'Ростов-на-Дону, ул. Красноармейская, д. 227',
                            balloonContent: 'Ростов-на-Дону, ул. Красноармейская, д. 227'
                        },
                        {
                            iconLayout: 'default#image',
                            iconImageHref: 'assets/img/icons/map-pin.png',  //заменить на свою иконку
                            iconImageSize: [21, 26],
                            iconImageOffset: [-15, -31],
                        }
                    );

                    myMap.geoObjects.add(filterPlacemark);
                    myMap.behaviors.disable(['scrollZoom']);
                }
            }
        }, 500)
    }
    /* end yandex map-filials */

    // Функция для обновления карты
    function updateMap(lat, lng) {
        if (filterPlacemark) {
            filterPlacemark.geometry.setCoordinates([parseFloat(lat), parseFloat(lng)]);
        } else {
            filterPlacemark = new ymaps.Placemark([parseFloat(lat), parseFloat(lng)], {}, {
                preset: 'islands#icon',
                iconColor: '#0095b6'
            });
            map.geoObjects.add(filterPlacemark);
        }
        //map.setCenter([parseFloat(lat), parseFloat(lng)], 12); // Центрируем карту на новых координатах
    }

    // Функция для получения координат филиала по его id
    function getCoordinatesByFilialId(filialId) {
        const selectedFilialCard = document.querySelector(`.filter-card[data-filials="${filialId}"]`);
        if (selectedFilialCard) {
            const lat = selectedFilialCard.getAttribute('data-lat');
            const lng = selectedFilialCard.getAttribute('data-lng');
            return { lat, lng };
        } else {
            console.error('Филиал с указанным id не найден');
            return null;
        }
    }

    // Вызов функции передачи координат
    function sendCoordinatesToMap(filialId) {
        const coordinates = getCoordinatesByFilialId(filialId);
        if (coordinates) {
            updateMap(coordinates.lat, coordinates.lng)
        }
    }
    if (document.getElementById('select-filials')) {
        document.getElementById('select-filials').addEventListener('change', function () {
            const selectedFilialId = this.value;
            sendCoordinatesToMap(selectedFilialId);
        });
    }


    // close cookie 
    const cookieBtn = document.querySelector('.popup-cookie__btn')
    if (cookieBtn) {
        cookieBtn.addEventListener('click', () => {
            document.querySelector('.popup-cookie').style.display = 'none';
        })
    }


    /*  search */
    const inputSearch = document.querySelectorAll('input[type=search]')
    if (inputSearch.length > 0) {
        inputSearch.forEach(elem => {
            const wrapper = elem.closest('.search-wrapper')
            if (wrapper) {
                const searchResultBlock = wrapper.querySelector('.popup__search-result')
                const popularCitiesBlock = wrapper.querySelector('.popup__search')
                const noResultsMessage = searchResultBlock.querySelector('.no-results-message')

                function search() {
                    let filter = elem.value.toUpperCase()
                    let ul = wrapper.querySelectorAll('.search-list')
                    let totalResults = 0

                    ul.forEach(item => {
                        let li = item.getElementsByTagName('li')
                        for (let i = 0; i < li.length; i++) {
                            let a = li[i].querySelector('.search-name')
                            if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                                li[i].classList.remove('none')
                                totalResults++
                            } else {
                                li[i].classList.add('none')
                            }
                        }
                    })
                    noResultsMessage.classList.toggle('none', totalResults > 0);

                    if (elem.value.trim() === '') {
                        searchResultBlock.classList.add('none')
                        popularCitiesBlock.classList.remove('none')
                    } else {
                        searchResultBlock.classList.remove('none')
                        popularCitiesBlock.classList.add('none')
                    }
                }
                elem.addEventListener('input', search)

                document.addEventListener('click', (event) => {
                    if (!wrapper.contains(event.target)) {
                        searchResultBlock.classList.add('none')
                    }
                })
            }
        })
    }
    /*  end search  */


    /*  open faq  */
    document.querySelectorAll('.faq__button').forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('active');
        });
    });

    const faqTabBtns = document.querySelectorAll('.tab__btns-acc')
    faqTabBtns.forEach(faqTabBtns => {
        if (faqTabBtns) {
            faqTabBtns.querySelectorAll('.tab__btn-acc').forEach(button => {
                if (button) {
                    button.addEventListener('click', () => {
                        faqTabBtns.classList.toggle('active');
                    });
                }
            });
        }
    });


    /*  accordion  */
    const acc = document.getElementsByClassName('accordion')
    for (let i = 0; i < acc.length; i++) {
        if (acc[i]) {
            acc[i].addEventListener('click', function () {
                const accContent = this.querySelector('.accordion__content') || this.parentElement.querySelector('.accordion__content')
                if (accContent.classList.contains('accordion__content--active')) {
                    accContent.classList.remove('accordion__content--active');
                    this.classList.remove('accordion--active');
                    accContent.style.maxHeight = '0';
                } else {
                    accContent.classList.add('accordion__content--active');
                    this.classList.add('accordion--active');

                    const contentHeight = accContent.scrollHeight;
                    accContent.style.maxHeight = `${contentHeight}px`;
                }
            })
        }
    }

    const doctorPageAccordion = document.querySelector('.doctor-page__accordion');
    if (doctorPageAccordion) {
        const headerAccordion = doctorPageAccordion.querySelector('span');
        const contentAccordion = doctorPageAccordion.querySelector('.doctor-page__accordion-content');
        const arrowAccordion = doctorPageAccordion.querySelector('svg');
        if (headerAccordion && contentAccordion && arrowAccordion ) {
            headerAccordion.addEventListener('click', () => {
                const isOpen = contentAccordion.style.maxHeight;

                if (isOpen) {
                    contentAccordion.style.maxHeight = null;
                    arrowAccordion.style.transform = 'rotate(0deg)';
                } else {
                    contentAccordion.style.maxHeight = contentAccordion.scrollHeight + 'px';
                    arrowAccordion.style.transform = 'rotate(180deg)';
                }
            });
        }

    }


    /*  end accordion   */


    /*  tab  */
    const showTab = elTabBtn => {
        const elTab = elTabBtn.closest('.tab');
        if (elTabBtn.classList.contains('tab__btn--active')) {
            return;
        }
        const targetId = elTabBtn.dataset.id;
        const elTabPanes = elTab.querySelectorAll(`.tabcontent[data-id="${targetId}"]`);

        const elTabBtnActive = elTab.querySelector('.tab__btn--active');
        if (elTabBtnActive) {
            elTabBtnActive.classList.remove('tab__btn--active');
        }

        const elTabPaneShow = elTab.querySelectorAll('.tabcontent--active');
        elTabPaneShow.forEach(pane => pane.classList.remove('tabcontent--active'));

        elTabBtn.classList.add('tab__btn--active');
        elTabPanes.forEach(pane => pane.classList.add('tabcontent--active'));
    };

    const tabButtons = document.querySelectorAll('.tab__btn')
    tabButtons.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function (e) {
                showTab(this);
                quantityElem();
            });
        }
    });
    /*  end tab */


    /*  filter element by checkbox */
    document.querySelectorAll('.sort__item input[type="checkbox"]').forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            filterItems('.sort__card', '.sort__block', '.sort__quantity span');
        });
    });
    filterItems('.sort__card', '.sort_block', '.sort__quantity span');

    function filterItems(itemSelector, filterGroupSelector, quantitySelector) {
        const filterGroups = Array.from(document.querySelectorAll(filterGroupSelector)).map(group => {
            return Array.from(group.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.id);
        });

        document.querySelectorAll(itemSelector).forEach(function (item) {
            const itemCategories = item.dataset.categories ? item.dataset.categories.split(' ') : [];
            const matchesFilter = filterGroups.every(filters => {
                if (filters.length === 0) return true;
                return filters.some(filter => itemCategories.includes(filter));
            });
            if (matchesFilter) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });

        const visibleItems = document.querySelectorAll(`${itemSelector}:not([style*="display: none"])`).length;
        const quantityElement = document.querySelector(quantitySelector);
        if (quantityElement) {
            quantityElement.textContent = visibleItems;
        }
        checkAndHideBlocksIfEmpty();
    }
    /*  end filter element by checkbox  */



    /* filter element by select */
    const filterBlocks = document.querySelectorAll('[data-filter-block]');

    filterBlocks.forEach(block => {
        const selects = block.querySelectorAll('.filter-select');
        const cards = block.querySelectorAll('.filter-card');
        const quantity = block.querySelector('.quantity span');

        function filterCards() {
            let visibleCount = 0;

            cards.forEach(card => {
                let isVisible = true;
                selects.forEach(select => {
                    const filterType = select.getAttribute('data-filter-type');
                    const selectedValue = select.value;
                    const cardValue = card.getAttribute(`data-${filterType}`);
                    if (selectedValue !== 'all' && selectedValue !== cardValue) {
                        isVisible = false;
                    }
                });
                card.style.display = isVisible ? '' : 'none';
                if (isVisible) visibleCount++;
            });
            if (quantity) {
                quantity.textContent = visibleCount;
            }
        }
        selects.forEach(select => {
            select.addEventListener('change', filterCards);
        });
        filterCards();
    });
    /* end filter element by select */



    /* filter reviews by rating */
    const highRatingCheckbox = document.getElementById('high-rating');
    const lowRatingCheckbox = document.getElementById('low-rating');
    const reviewCards = document.querySelectorAll('.page-reviews__card');

    function filterRatingReviews() {
        reviewCards.forEach(card => {
            const activeStars = card.querySelectorAll('.page-reviews__card_star-active').length;

            if (highRatingCheckbox.checked && activeStars >= 4) {
                card.style.display = '';
            } else if (lowRatingCheckbox.checked && activeStars <= 3) {
                card.style.display = '';
            } else if (!highRatingCheckbox.checked && !lowRatingCheckbox.checked) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
        quantityElem();
    }

    if (highRatingCheckbox) {
        highRatingCheckbox.addEventListener('change', filterRatingReviews);
    }
    if (lowRatingCheckbox) {
        lowRatingCheckbox.addEventListener('change', filterRatingReviews);
    }

    /* end filter reviews by rating */



    /* filter reviews by date */
    if (document.getElementById('reviews-new')) {
        document.getElementById('reviews-new').addEventListener('change', function () {
            const reviews = document.querySelectorAll('.page-reviews__card');
            const isChecked = this.checked;

            reviews.forEach(review => {
                const dateText = review.querySelector('.page-reviews__card_publication span').textContent.trim();
                const reviewDate = parseDate(dateText);
                const currentDate = new Date();

                const timeDifference = currentDate - reviewDate;
                const daysDifference = timeDifference / (1000 * 3600 * 24);

                if (isChecked && daysDifference > 30) {
                    review.style.display = 'none';
                } else {
                    review.style.display = 'block';
                }
            });
            quantityElem();
        });
    }

    // Функция для преобразования текстовой даты в объект Date
    function parseDate(dateText) {
        const months = {
            'января': 0, 'февраля': 1, 'марта': 2, 'апреля': 3,
            'мая': 4, 'июня': 5, 'июля': 6, 'августа': 7,
            'сентября': 8, 'октября': 9, 'ноября': 10, 'декабря': 11
        };

        const [day, monthName, year] = dateText.split(' ');
        const month = months[monthName.toLowerCase()];
        return new Date(year, month, parseInt(day));
    }
    /* end filter reviews by date */



    // quantity-card
    function quantityElem() {
        const quantityCards = document.querySelectorAll('.quantity-card');
        const quantityElement = document.querySelector('.quantity span');
        if (quantityElement) {
            let visibleCards = 0;
            quantityCards.forEach(card => {
                if (card.offsetParent !== null) {
                    visibleCards++;
                }
            });
            quantityElement.textContent = visibleCards;
        }
    }
    setTimeout(quantityElem, 100);


    /* search in page */
    const searchInput = document.getElementById('searchInput')
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const searchValue = this.value.toLowerCase();
            const rows = document.querySelectorAll('.search-page-item');

            rows.forEach(function (row) {
                const serviceName = row.querySelector('.search-page-name').textContent.toLowerCase();

                if (serviceName.includes(searchValue)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
            quantityElem();
            checkAndHideBlocksIfEmpty();
        });
    }


    /*  btn more  */
    const moreBtns = document.querySelectorAll('.btn-more');
    moreBtns.forEach(moreBtn => {
        if (moreBtn) {
            const moreContent = moreBtn.previousElementSibling;

            if (moreContent.scrollHeight <= moreContent.clientHeight) {
                moreBtn.style.display = 'none';
            } else {
                const textBtn = moreBtn.innerHTML;
                moreBtn.addEventListener('click', function () {
                    const heightMoreContent = moreContent.style.maxHeight;
                    this.classList.toggle('active');

                    if (moreContent.style.maxHeight) {
                        moreContent.style.maxHeight = null;
                        this.textContent = textBtn;
                    } else {
                        moreContent.style.maxHeight = moreContent.scrollHeight + "px";
                        this.textContent = 'Свернуть';
                    }
                });
            }
        }
    });
    /*  end btn more  */


    /* footer Nav Accordeon */
    const footerNavAccordeon = document.querySelectorAll('.footer__nav_acc');
    footerNavAccordeon.forEach(footerBtn => {
        if (footerBtn) {
            footerBtn.addEventListener('click', function () {
                const footerContent = footerBtn.nextElementSibling;
                footerContent.classList.toggle('active');
                this.classList.toggle('active');
            });
        }
    });

    /*   scrollTop  */
    const buttonsUp = document.querySelectorAll('.is-scroll-up')
    buttonsUp.forEach(buttonUp => {
        if (buttonUp) {
            buttonUp.addEventListener('click', function () {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                })
            })
        }
    });
    /*   end scrollTop  */




    /* select for page-reviews */
    // Собираем услуги и врачей из карточек
    const servicesSet = new Set();
    const doctorsSet = new Set();

    document.querySelectorAll('.filter-review-card').forEach(card => {
        const serviceElement = card.querySelector('.select_service span');
        const doctorElement = card.querySelector('.select_doctor span');

        if (serviceElement) {
            const service = serviceElement.textContent.trim();
            servicesSet.add(service);
        }
        if (doctorElement) {
            const doctor = doctorElement.textContent.trim();
            doctorsSet.add(doctor);
        }
    });

    function populateSelect(selectId, options) {
        const selectElement = document.getElementById(selectId);
        if (selectElement) {
            selectElement.innerHTML = '<option value="all" selected>Выбрать</option>';
            options.forEach(optionValue => {
                const option = document.createElement('option');
                option.value = optionValue;
                option.textContent = optionValue;
                selectElement.appendChild(option);
            });
        }
    }

    const servicesSelect = document.getElementById('reviews-service');
    const doctorsSelect = document.getElementById('reviews-doctor');
    populateSelect('reviews-service', Array.from(servicesSet));
    populateSelect('reviews-doctor', Array.from(doctorsSet));

    // Функция фильтрации
    function filterCards() {
        const selectedService = servicesSelect.value;
        const selectedDoctor = doctorsSelect.value;

        document.querySelectorAll('.filter-review-card').forEach(card => {
            const serviceElement = card.querySelector('.select_service span');
            const doctorElement = card.querySelector('.select_doctor span');

            if (serviceElement && doctorElement) {
                const service = serviceElement.textContent.trim();
                const matchesService = selectedService === 'all' || service === selectedService;

                const doctor = doctorElement.textContent.trim();
                const matchesDoctor = selectedDoctor === 'all' || doctor === selectedDoctor;

                if (matchesService && matchesDoctor) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
                quantityElem();
            }
        });
    }

    if (servicesSelect) { servicesSelect.addEventListener('change', filterCards); }
    if (doctorsSelect) { doctorsSelect.addEventListener('change', filterCards); }
    /* end select for page-reviews */



    /* tabs for jobs-3 */
    const job = document.querySelector('.jobs-3-js');
    if (job) {
        const jobItems = job.querySelectorAll('.jobs__item_name');
        const tabContainer = job.querySelector('.jobs__tab_btns');
        const jobListItems = job.querySelectorAll('.jobs__item');

        jobItems.forEach((item, index) => {
            const button = document.createElement('button');
            button.className = 'jobs__tab_btn';
            button.textContent = item.textContent;
            if (index === 0) {
                button.classList.add('tab-active');
            }

            if (button) {
                button.addEventListener('click', () => {
                    document.querySelectorAll('.jobs__tab_btn').forEach(btn => btn.classList.remove('tab-active'));
                    button.classList.add('tab-active');
                    jobListItems.forEach(li => li.style.display = 'none');
                    jobListItems.forEach(li => {
                        if (li.querySelector('.jobs__item_name').textContent === button.textContent) {
                            li.style.display = 'block';
                        }
                    });
                });
            }
            tabContainer.appendChild(button);
        });

        if (jobListItems) {
            jobListItems.forEach(li => li.style.display = 'none');
            if (jobListItems[0]) {
                jobListItems[0].style.display = 'block';
            }
        }
    }
    /* end tabs for jobs-3 */




    /* calculator-range */
    const calculatorSliders = document.querySelectorAll(".calculator__slider");

    calculatorSliders.forEach(calculatorSlider => {
        const calculatorRange = calculatorSlider.querySelector(".calculator-range");
        const calculatorOutput = calculatorSlider.querySelector(".calculator-output");

        function getYearWord(year) {
            if (year % 10 === 1 && year % 100 !== 11) {
                return "год";
            } else if ([2, 3, 4].includes(year % 10) && ![12, 13, 14].includes(year % 100)) {
                return "года";
            } else {
                return "лет";
            }
        }
        function updateOutput() {
            calculatorOutput.innerHTML = `${calculatorRange.value} ${getYearWord(calculatorRange.value)}`;
        }
        updateOutput();
        calculatorRange.oninput = updateOutput;
    });
    /* end calculator-range */


    /* scroll to the letter in medicines */
    const medicamentBlocks = document.querySelectorAll(".medicament__block");
    const lettersContainer = document.querySelector(".medicament__letters");

    medicamentBlocks.forEach((block) => {
        const letter = block.querySelector("p").textContent.trim();

        const letterButton = document.createElement("button");
        letterButton.textContent = letter;
        letterButton.classList.add("letter-button");

        letterButton.addEventListener("click", () => {
            const offset = document.getElementById('header').offsetHeight - document.querySelector('.header__plashka').offsetHeight + 10;
            const blockPosition = block.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({
                top: blockPosition,
                behavior: "smooth"
            });
        });

        lettersContainer.appendChild(letterButton);
    });
    /* end scroll to the letter in medicines */



    /* hide empty block medicines */
    function checkAndHideBlocksIfEmpty() {
        const medicamentBlocks = document.querySelectorAll(".medicament__block");
        if (medicamentBlocks) {
            medicamentBlocks.forEach(block => {
                const ulElement = block.querySelector("ul");
                const visibleItems = Array.from(ulElement.children).some(item => item.style.display !== "none");
                if (!visibleItems) {
                    block.style.display = "none";
                }
                else {
                    block.style.display = "";
                }
            });
        }
    }
    checkAndHideBlocksIfEmpty();
    /* end hide empty block medicines */


})



/* navigation */

const articleNavigation = document.querySelector(".navigation");
if (articleNavigation) {
    const jsScrollBlockList = document.querySelectorAll(
        ".text-block h1, .text-block h2, .text-block h3, .text-block h4, .text-block h5"
    );

    if (jsScrollBlockList.length > 0) {
        for (let i = 0; i < jsScrollBlockList.length; i += 1) {
            const jsScrollBlock = jsScrollBlockList[i];
            const titleBlock = jsScrollBlock.textContent;
            const articleNavigationList =
                document.querySelector(".navigation__list");
            const articleNavigationItem = document.createElement("li");
            const articleNavigationLink = document.createElement("a");
            if (jsScrollBlock.tagName == "H1") {
                articleNavigationItem.classList.add("nav-title-h1");
            }
            articleNavigationItem.classList.add("navigation__item");
            if (jsScrollBlock.tagName == "H2") {
                articleNavigationItem.classList.add("nav-title-h2");
            } else if (jsScrollBlock.tagName == "H3") {
                articleNavigationItem.classList.add("nav-title-h3");
            } else if (jsScrollBlock.tagName == "H4") {
                articleNavigationItem.classList.add("nav-title-h4");
            } else if (jsScrollBlock.tagName == "H5") {
                articleNavigationItem.classList.add("nav-title-h5");
            } else if (jsScrollBlock.tagName == "H6") {
                articleNavigationItem.classList.add("nav-title-h6");
            }
            articleNavigationLink.classList.add("navigation__link");
            jsScrollBlock.setAttribute("id", `${i}`);
            articleNavigationLink.setAttribute("href", `$${i}`);
            articleNavigationLink.textContent = " " + titleBlock;
            articleNavigationItem.append(articleNavigationLink);
            articleNavigationList.append(articleNavigationItem);
        }
        document.querySelectorAll('a[href^="$"').forEach((link) => {
            link.addEventListener("click", function (e) {
                e.preventDefault();
                let href = this.getAttribute("href").substring(1);
                const scrollTarget = document.getElementById(href);
                const topOffset = 280;
                const elementPosition = scrollTarget.getBoundingClientRect().top;
                const offsetPosition = elementPosition - topOffset;
                window.scrollBy({
                    top: offsetPosition,
                    behavior: "smooth",
                });
            });
        });
    } else {
        if (articleNavigation.querySelector(".navigation")) {
            articleNavigation.querySelector(".navigation").remove();
        }
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const headers = document.querySelectorAll('.nav-title-h2');

});


/* end navigation */

document.addEventListener("DOMContentLoaded", function () {
    const aboutItem = document.querySelector(".about__item--3");
    const readMoreBtn = document.querySelector(".about__item-btn");

    readMoreBtn.addEventListener("click", function () {
        aboutItem.classList.toggle("expanded");
        readMoreBtn.classList.toggle("expanded");
        if (aboutItem.classList.contains("expanded")) {
            readMoreBtn.textContent = "Скрыть";
        } else {
            readMoreBtn.textContent = "Читать полностью";
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".stages-treatment__card");

    cards.forEach(card => {
        const aboutItem = card.querySelector(".stages-treatment__card_info");
        const readMoreBtn = card.querySelector(".stages-treatment__card-btn");

        if (aboutItem && readMoreBtn) {
            // Определяем предельную высоту в зависимости от размера экрана
            const maxHeight = window.innerWidth < 600 ? 170 : 190;

            // Проверяем высоту контента
            if (aboutItem.scrollHeight <= maxHeight) {
                readMoreBtn.style.display = "none";
            }

            readMoreBtn.addEventListener("click", function () {
                aboutItem.classList.toggle("expanded");
                readMoreBtn.classList.toggle("expanded");
                readMoreBtn.textContent = aboutItem.classList.contains("expanded") ? "Скрыть" : "Читать полностью";
            });
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".we-help__card");

    cards.forEach(card => {
        const aboutItem = card.querySelector(".we-help__card_info");
        const readMoreBtn = card.querySelector(".we-help__card-btn");

        if (aboutItem && readMoreBtn) {
            // Определяем предельную высоту в зависимости от размера экрана
            const maxHeight = window.innerWidth < 600 ? 157 : 157;

            // Проверяем высоту контента
            if (aboutItem.scrollHeight <= maxHeight) {
                readMoreBtn.style.display = "none";
            }

            readMoreBtn.addEventListener("click", function () {
                aboutItem.classList.toggle("expanded");
                readMoreBtn.classList.toggle("expanded");
                readMoreBtn.textContent = aboutItem.classList.contains("expanded") ? "Скрыть" : "Читать полностью";
            });
        }
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const servicesSection = document.querySelector('.section__inner--services');
    if (servicesSection) {
        servicesSection.querySelectorAll('.price__item .price__name').forEach(function (nameCell) {
            nameCell.addEventListener('click', function () {
                const row = nameCell.closest('.price__item');
                row.classList.toggle('active');
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const wrapper = document.querySelector('.custom-select-wrapper');
    const select = wrapper ? wrapper.querySelector('.custom-select') : null;
    const options = wrapper ? wrapper.querySelector('.custom-options') : null;
    const selected = wrapper ? wrapper.querySelector('.selected-option') : null;
    const itemsContainer = document.querySelector('.toggle-all__items');
    const items = itemsContainer ? Array.from(itemsContainer.querySelectorAll('.toggle-all__item')) : [];

    if (!select || !options || !selected || !itemsContainer) {
        return;
    }

    // Открытие/закрытие кастомного селекта
    select.addEventListener('click', () => {
        if (wrapper.classList.contains('open')) {
            wrapper.classList.remove('open');
        } else {
            wrapper.classList.add('open');
        }
    });

    // Обработка выбора сортировки
    options.querySelectorAll('li').forEach(option => {
        option.addEventListener('click', () => {
            if (selected) {
                selected.textContent = option.textContent;
            }
            wrapper.classList.remove('open');

            const sortValue = option.dataset.value;
            sortItems(sortValue);
        });
    });

    // Клик вне селекта для закрытия
    document.addEventListener('click', e => {
        if (wrapper && !wrapper.contains(e.target)) {
            wrapper.classList.remove('open');
        }
    });

    // Сортировка элементов
    function sortItems(sortValue) {
        items.sort((a, b) => {
            const dateA = new Date(a.querySelector('.articles-addictions__card-date').textContent.trim().split('.').reverse().join('-'));
            const dateB = new Date(b.querySelector('.articles-addictions__card-date').textContent.trim().split('.').reverse().join('-'));
            const viewsA = parseInt(a.querySelector('.articles-addictions__card-views').textContent.trim());
            const viewsB = parseInt(b.querySelector('.articles-addictions__card-views').textContent.trim());

            switch (sortValue) {
                case 'date-desc': return dateB - dateA;
                case 'date-asc': return dateA - dateB;
                case 'views-desc': return viewsB - viewsA;
                case 'views-asc': return viewsA - viewsB;
                default: return 0;
            }
        });

        items.forEach(item => itemsContainer.appendChild(item)); // Переставляем элементы в DOM
    }
});


const toggleBtn = document.querySelector('.toggle-all__button');
const toggleText = toggleBtn ? toggleBtn.querySelector('.toggle-all__text') : null;
const container = document.querySelector('.toggle-all__items');
const arrow = toggleBtn ? toggleBtn.querySelector('.toggle-all__arrow') : null;
let isOpen = false;

function updateExtras() {
    if (!container) return;

    const items = container.querySelectorAll('.toggle-all__item');
    items.forEach(item => item.classList.remove('extra', 'show'));

    if (items.length < 5) {
        if (toggleBtn) toggleBtn.style.display = 'none'; // Скрыть кнопку, если элементов меньше 5
        return;
    }

    if (window.innerWidth <= 800) {
        items.forEach((item, index) => {
            if (index >= 4) {
                item.classList.add('extra');
                if (isOpen) item.classList.add('show');
            }
        });
    }
}

if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        isOpen = !isOpen;

        const extras = container.querySelectorAll('.toggle-all__item.extra');
        extras.forEach(item => {
            item.classList.toggle('show', isOpen);
        });

        if (arrow) arrow.classList.toggle('open', isOpen);
        if (toggleBtn) toggleBtn.classList.toggle('open', isOpen);
        if (toggleText) toggleText.textContent = isOpen ? 'Скрыть' : 'Показать ещё';
    });
}

window.addEventListener('load', updateExtras);
window.addEventListener('resize', () => {
    isOpen = false;
    updateExtras();
    if (arrow) arrow.classList.remove('open');
    if (toggleText) toggleText.textContent = 'Показать ещё';
});
const toggleButton = document.querySelector('.toggle-button');
const subtitle = document.querySelector('.subtitle-toggle__span');
const toggBtnText = document.querySelector('.toggle-button__text');

if (toggleButton && subtitle && toggBtnText) {
    toggleButton.addEventListener('click', function () {
        subtitle.classList.toggle('expanded');
        toggleButton.classList.toggle('active'); // Добавляем/удаляем класс active

        // Проверка, добавлен ли класс после клика
        if (subtitle.classList.contains('expanded')) {
            toggBtnText.textContent = 'Скрыть';
        } else {
            toggBtnText.textContent = 'Читать полностью';
        }
    });
}