"use strict";
{
	window._tmpWebApp = (function()
	{
		const CACHE = {};

		function require(name)
		{
			switch (arguments.length)
			{
				case 0 :
		
					return Promise.reject(new Error("No argument"));

				case 1 :

					if (!CACHE[name])
					{
						return Promise.reject(new Error("Missing dependency: " + name));
					}

					return CACHE[name];

				default:

					const answer = [];
					let i = 0;

					for (; i < arguments.length; ++i)
					{
						name = arguments[i];

						if (!CACHE[name])
						{
							return Promise.reject(new Error("Missing dependency: " + name));
						}

						answer.push(CACHE[name]);
					}

					return Promise.all(answer);
			}
		}

		function addModule(name, promise)
		{
			CACHE[name] = promise;
		}

		return [require, addModule];
	})();

	const require = window._tmpWebApp[0];
	const addModule = window._tmpWebApp[1];
	delete window._tmpWebApp;


	addModule(
		"app/libs/utils",
		new Promise(
			function (accept, reject)
			{
				const module = Object.defineProperties(
					{},
					{
						"accept": {
							value: accept
						},
						"reject": {
							value: reject
						},
						"exports": {
							set: function (item)
							{
								this.accept(item);
							}
						}
					}
				);

				try
				{
/* ***** Module "app/libs/utils" Start ***** */

function debounce(func, wait, immediate)
{
	let timeout = 0;

	return function ()
	{
		const context = this;
		const args = arguments;

		const later = function later()
		{
			timeout = null;

			if (!immediate)
			{
				func.apply(context, args);
			}
		};

		const callNow = immediate && !timeout;

		clearTimeout(timeout);
		timeout = setTimeout(later, wait || 200);

		if (callNow)
		{
			func.apply(context, args);
		}
	};
}

function throttle(func, wait, options)
{
	let context;
	let args;
	let result;
	let timeout = null;
	let previous = 0;

	if (!options)
	{
		options = {};
	}

	const later = function ()
	{
		previous = options.leading === false ? 0 : Date.now();
		timeout = null;
		result = func.apply(context, args);

		if (!timeout)
		{
			context = args = null;
		}
	};

	return function ()
	{
		const now = Date.now();

		if (!previous && options.leading === false)
		{
			previous = now;
		}

		let remaining = wait - (now - previous);
		context = this;
		args = arguments;

		if (remaining <= 0 || remaining > wait)
		{
			if (timeout)
			{
				clearTimeout(timeout);
				timeout = null;
			}

			previous = now;
			result = func.apply(context, args);

			if (!timeout)
			{
				context = args = null;
			}
		}
		else if (!timeout && options.trailing !== false)
		{
			timeout = setTimeout(later, remaining);
		}

		return result;
	};
}

function rand(min, max)
{
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function loadImg(imgSrc)
{
	return new Promise(function (resolve, reject)
	{
		const img = new Image();

		img.src = imgSrc;

		img.onload = function ()
		{
			resolve(img);
		};

		img.onerror = function ()
		{
			reject();
		};
	}
	);
}

function isIE()
{
	return document.documentMode;
}

function getViewportSize()
{

	return {
		width: document.documentElement.clientWidth,
		height: document.documentElement.clientHeight
	};
}


function breakPointChecker(mediaquery, ifMatches, ifDoesntMatch)
{
	if (!mediaquery)
	{
		return;
	}

	const breakpoint = window.matchMedia(mediaquery);

	trigger();
	breakpoint.addListener(trigger);

	function trigger()
	{
		if (ifMatches === undefined)
		{
			return breakpoint.matches;
		}

		if (breakpoint.matches)
		{
			ifMatches();
		}
		else
		{
			ifDoesntMatch();
		}
	}
}

function bodyBlock(bool)
{
	if (bool)
	{
		document.body.classList.add("is-blocked");
	}
	else
	{
		document.body.classList.remove("is-blocked");
	}
}


module.exports = {
	debounce: debounce,
	throttle: throttle,
	rand: rand,
	loadImg: loadImg,
	isIE: isIE,
	getViewportSize: getViewportSize,
	breakPointChecker: breakPointChecker,
	bodyBlock: bodyBlock
};

/* ***** Module "app/libs/utils" End ***** */
				}
				catch (error)
				{
					module.reject(error);
				}
			}
		)
	);

	addModule(
		"app/libs/headOff",
		new Promise(
			function (accept, reject)
			{
				const module = Object.defineProperties(
					{},
					{
						"accept": {
							value: accept
						},
						"reject": {
							value: reject
						},
						"exports": {
							set: function (item)
							{
								this.accept(item);
							}
						}
					}
				);

				try
				{
/* ***** Module "app/libs/headOff" Start ***** */

require("app/libs/utils").afterward(
	function (utils)
	{
		function headOff(element, options)
		{
			if (element === undefined || !(element instanceof HTMLElement))
			{
				return;
				//throw(new Error("DOM element must be provided"));
			}

			const tolerance = options ? options.tolerance : 70;
			const fromTop = options ? options.fromTop : element.offsetHeight;
			let lastScroll = window.pageYOffset;

			window.addEventListener("scroll", utils.throttle(headerVisibility, 150));
			headerVisibility();

			function headerVisibility()
			{
				const currentScroll = window.pageYOffset;

				if (Math.abs(currentScroll - lastScroll) < tolerance && Math.abs(currentScroll - lastScroll) > 0)
				{
					return;
				}

				if (currentScroll < lastScroll || lastScroll <= fromTop)
				{
					element.classList.add("is-visible");
				}
				else
				{
					element.classList.remove("is-visible");
				}

				lastScroll = currentScroll;
			}
		}

		module.exports = headOff;
	}
);

/* ***** Module "app/libs/headOff" End ***** */
				}
				catch (error)
				{
					module.reject(error);
				}
			}
		)
	);

	addModule(
		"app/modules/mainMargin",
		new Promise(
			function (accept, reject)
			{
				const module = Object.defineProperties(
					{},
					{
						"accept": {
							value: accept
						},
						"reject": {
							value: reject
						},
						"exports": {
							set: function (item)
							{
								this.accept(item);
							}
						}
					}
				);

				try
				{
/* ***** Module "app/modules/mainMargin" Start ***** */

require("app/libs/utils").afterward(
	function (utils)
	{
		const header = document.querySelector(".header");

		function init()
		{
			initEvents();
			setHeaderHeight();
		}

		function setHeaderHeight()
		{
			const headerHeight = header ? header.offsetHeight : 0;
			document.documentElement.style.setProperty("--headerHeight", headerHeight + "px");
		}

		function initEvents()
		{
			window.addEventListener("resize", utils.debounce(setHeaderHeight, 100));
		}

		const mainMargin = {
			init: init
		};

		module.exports = mainMargin;
	}
);

/* ***** Module "app/modules/mainMargin" End ***** */
				}
				catch (error)
				{
					module.reject(error);
				}
			}
		)
	);

	addModule(
		"app/libs/scrollIt",
		new Promise(
			function (accept, reject)
			{
				const module = Object.defineProperties(
					{},
					{
						"accept": {
							value: accept
						},
						"reject": {
							value: reject
						},
						"exports": {
							set: function (item)
							{
								this.accept(item);
							}
						}
					}
				);

				try
				{
/* ***** Module "app/libs/scrollIt" Start ***** */

"use strict";

function scrollIt(options)
{
	const destination = options.destination;
	const duration = options.duration || 600;
	const easing = options.easing || "easeOutQuad";
	const callback = options.callback;

	const easings = {
		linear: function (t)
		{
			return t;
		},
		easeInQuad: function (t)
		{
			return t * t;
		},
		easeOutQuad: function (t)
		{
			return t * (2 - t);
		},
		easeInOutQuad: function (t)
		{
			return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
		},
		easeInCubic: function (t)
		{
			return t * t * t;
		},
		easeOutCubic: function (t)
		{
			return (--t) * t * t + 1;
		},
		easeInOutCubic: function (t)
		{
			return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
		},
		easeInQuart: function (t)
		{
			return t * t * t * t;
		},
		easeOutQuart: function (t)
		{
			return 1 - (--t) * t * t * t;
		},
		easeInOutQuart: function (t)
		{
			return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
		},
		easeInQuint: function (t)
		{
			return t * t * t * t * t;
		},
		easeOutQuint: function (t)
		{
			return 1 + (--t) * t * t * t * t;
		},
		easeInOutQuint: function (t)
		{
			return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
		}
	};

	const start = window.pageYOffset;
	const startTime = "now" in window.performance ? performance.now() : new Date().getTime();

	const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
	const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName("body")[0].clientHeight;
	const destinationOffset = typeof destination === "number" ? destination : destination.offsetTop;
	const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

	if ("requestAnimationFrame" in window === false)
	{
		window.scroll(0, destinationOffsetToScroll);

		if (callback)
		{
			callback();
		}

		return;
	}

	function scroll()
	{
		const now = "now" in window.performance ? performance.now() : new Date().getTime();
		const time = Math.min(1, ((now - startTime) / duration));
		const timeFunction = easings[easing](time);
		window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));

		if (window.pageYOffset === destinationOffsetToScroll)
		{
			if (callback)
			{
				callback();
			}

			return;
		}

		requestAnimationFrame(scroll);
	}

	scroll();
}

module.exports = scrollIt;

/* ***** Module "app/libs/scrollIt" End ***** */
				}
				catch (error)
				{
					module.reject(error);
				}
			}
		)
	);

	addModule(
		"app/modules/closeModal",
		new Promise(
			function (accept, reject)
			{
				const module = Object.defineProperties(
					{},
					{
						"accept": {
							value: accept
						},
						"reject": {
							value: reject
						},
						"exports": {
							set: function (item)
							{
								this.accept(item);
							}
						}
					}
				);

				try
				{
/* ***** Module "app/modules/closeModal" Start ***** */

require("app/libs/utils").afterward(
	function (utils)
	{
		function closeModal()
		{
			document.addEventListener("click", function (e)
			{
				if (e.target.closest(".js-content-popin-close"))
				{
					e.target.closest(".content-popin").classList.remove("is-visible");
					utils.bodyBlock(false);

                    e.target.closest(".content-popin").dispatchEvent(new CustomEvent("close", {
                        bubbles: true,
                        detail: {
                            popin: e.target.closest(".content-popin")
                        }
                    }));
				}
			}
			);
		}

		module.exports = closeModal;
	}
);

/* ***** Module "app/modules/closeModal" End ***** */
				}
				catch (error)
				{
					module.reject(error);
				}
			}
		)
	);

	addModule(
		"app/modules/partnersSlider",
		new Promise(
			function (accept, reject)
			{
				const module = Object.defineProperties(
					{},
					{
						"accept": {
							value: accept
						},
						"reject": {
							value: reject
						},
						"exports": {
							set: function (item)
							{
								this.accept(item);
							}
						}
					}
				);

				try
				{
/* ***** Module "app/modules/partnersSlider" Start ***** */

require("app/libs/utils").afterward(
	function (utils)
	{
		const partnersSlidersDom = Array.from(document.querySelectorAll(".card-partner-container"));
		const partnersSliders = [];

		function init()
		{
			utils.breakPointChecker(
				"(min-width: 768px)",
				function ()
				{
					destroySliders(partnersSliders);
				},
				initSliders
			);
		}

		function initSliders()
		{
			partnersSlidersDom.forEach(
				function (element)
				{
					partnersSliders.push(
						new Swiper(
							element,
							{
								loop: true,
								pagination: {
									el: ".swiper-pagination",
									clickable: true
								},
								navigation: {
									nextEl: ".swiper-button-next",
									prevEl: ".swiper-button-prev",
								},
								centeredSlides: true,
								speed: 600,
								watchOverflow: true,
								spaceBetween: 30,
								loopedSlides: 6,
								uniqueNavElements: true,
                                //shortSwipes: false
							}
						)
					);
				}
			);
		}

		function destroySliders(sliders)
		{
			sliders.forEach(
				function (slider)
				{
					slider.destroy(true, true);
					slider = undefined;
				}
			);
		}

		const partnersSlider = {
			init: init
		}

		module.exports = partnersSlider;
	}
);

/* ***** Module "app/modules/partnersSlider" End ***** */
				}
				catch (error)
				{
					module.reject(error);
				}
			}
		)
	);

	addModule(
		"app/modules/cmsSlider",
		new Promise(
			function (accept, reject)
			{
				const module = Object.defineProperties(
					{},
					{
						"accept": {
							value: accept
						},
						"reject": {
							value: reject
						},
						"exports": {
							set: function (item)
							{
								this.accept(item);
							}
						}
					}
				);

				try
				{
/* ***** Module "app/modules/cmsSlider" Start ***** */

require("app/libs/utils").afterward(
	function (utils)
	{
		const cmsSliders1Dom = Array.from(document.querySelectorAll(".cms-slider-container-1"));
		const cmsSliders2Dom = Array.from(document.querySelectorAll(".cms-slider-container-2"));
		const cmsSliders1 = [];
		const cmsSliders2 = [];

		function init()
		{
			initSliders1();
			utils.breakPointChecker(
				"(min-width: 768px)",
				function ()
				{
					destroySliders(cmsSliders2);
				},
				initSliders2
			);
		}

		function initSliders1()
		{
			cmsSliders1Dom.forEach(
				function (element)
				{
					cmsSliders1.push(
						new Swiper(
							element,
							{
								loop: true,
								pagination: {
									el: ".cms-slider-pagination",
									clickable: true
								},
								speed: 600,
								spaceBetween: 30,
								uniqueNavElements: true,
								slidesPerSlide: "auto",
								centeredSlides: true,
                                //shortSwipes: false
							}
						)
					);
				}
			);
		}

		function initSliders2()
		{
			cmsSliders2Dom.forEach(
				function (element)
				{
					cmsSliders2.push(
						new Swiper(
							element,
							{
								loop: true,
								pagination: {
									el: ".cms-slider-pagination",
									clickable: true
								},
								speed: 600,
								spaceBetween: 30,
								uniqueNavElements: true,
								slidesPerSlide: "auto"
							}
						)
					);
				}
			);
		}

		function destroySliders(sliders)
		{
			sliders.forEach(
				function (slider)
				{
					slider.destroy(true, true);
					slider = undefined;
				}
			);
		}

		const cmsSlider = {
			init: init
		};

		module.exports = cmsSlider;
	}
);

/* ***** Module "app/modules/cmsSlider" End ***** */
				}
				catch (error)
				{
					module.reject(error);
				}
			}
		)
	);

	addModule(
		"app/modules/livretsSlider",
		new Promise(
			function (accept, reject)
			{
				const module = Object.defineProperties(
					{},
					{
						"accept": {
							value: accept
						},
						"reject": {
							value: reject
						},
						"exports": {
							set: function (item)
							{
								this.accept(item);
							}
						}
					}
				);

				try
				{
/* ***** Module "app/modules/livretsSlider" Start ***** */

require("app/libs/utils").afterward(
	function (utils)
	{
		const livretsSliderDom = Array.from(document.querySelectorAll(".livrets-slider-container"));
		const livretsSliders = [];

		function init()
		{
			utils.breakPointChecker(
				'(min-width: 768px)',
				function ()
				{
					destroySliders(livretsSliders);
				},
				initSliders
			);
		}

		function initSliders()
		{
			livretsSliderDom.forEach(function (element)
			{
				livretsSliders.push(
					new Swiper(
						element,
						{
							loop: true,
							pagination: {
								el: '.livrets-slider-pagination',
								clickable: true
							},
							speed: 600,
							spaceBetween: 30,
							uniqueNavElements: true,
							slidesPerSlide: "auto",
                            //shortSwipes: false
						}
					)
				);
			}
			);
		}

		function destroySliders(sliders)
		{
			sliders.forEach(
				function (slider)
				{
					slider.destroy(true, true);
					slider = undefined;
				}
			);
		}

		const livretsSlider = {
			init: init
		};

		module.exports = livretsSlider;
	}
);

/* ***** Module "app/modules/livretsSlider" End ***** */
				}
				catch (error)
				{
					module.reject(error);
				}
			}
		)
	);

	addModule(
		"app/modules/cardLSlider",
		new Promise(
			function (accept, reject)
			{
				const module = Object.defineProperties(
					{},
					{
						"accept": {
							value: accept
						},
						"reject": {
							value: reject
						},
						"exports": {
							set: function (item)
							{
								this.accept(item);
							}
						}
					}
				);

				try
				{
/* ***** Module "app/modules/cardLSlider" Start ***** */

const cardLContainers = document.querySelectorAll(".card--l-container");

function init()
{
	Array.from(cardLContainers).forEach(
		function (container)
		{
			new Swiper(
				container,
				{
					loop: true,
					pagination: {
						el: ".card--l-slider-pagination",
						clickable: true
					},
					navigation: {
						nextEl: ".card--l-slider-button-next",
						prevEl: ".card--l-slider-button-prev",
					},
					centeredSlides: true,
					speed: 600,
					watchOverflow: true,
					spaceBetween: 30,
					loopedSlides: 6,
					uniqueNavElements: true,
                    observe: true,
                    threshold: 50
				}
			);
		}
	);
}

const cardLSlider = {
	init: init
};

module.exports = cardLSlider;

/* ***** Module "app/modules/cardLSlider" End ***** */
				}
				catch (error)
				{
					module.reject(error);
				}
			}
		)
	);

	addModule(
		"app/modules/cardWideSlider",
		new Promise(
			function (accept, reject)
			{
				const module = Object.defineProperties(
					{},
					{
						"accept": {
							value: accept
						},
						"reject": {
							value: reject
						},
						"exports": {
							set: function (item)
							{
								this.accept(item);
							}
						}
					}
				);

				try
				{
/* ***** Module "app/modules/cardWideSlider" Start ***** */

const cardWideContainers = document.querySelectorAll(".card-wide-container");

function init() {
    Array.from(cardWideContainers).forEach(
        function (container) {
            const loopSwiper = Array.from(container.querySelectorAll(".swiper-slide")).length > 2;
            if (loopSwiper) {

                container.classList.add("is-active-slider");

                new Swiper(
                    container,
                    {
                        loop: loopSwiper,
                        pagination: {
                            el: '.card-wide-slider-pagination',
                            clickable: true
                        },
                        navigation: {
                            nextEl: '.card-wide-slider-button-next',
                            prevEl: '.card-wide-slider-button-prev',
                        },
                        centeredSlides: true,
                        speed: 600,
                        watchOverflow: true,
                        spaceBetween: 30,
                        loopedSlides: loopSwiper ? 2 : 0,
                        uniqueNavElements: true,
                        observe: true,
                        threshold: 50
                    }
                );

            }
        }
    );
}

const cardWideSlider = {
    init: init
};

module.exports = cardWideSlider;

/* ***** Module "app/modules/cardWideSlider" End ***** */
				}
				catch (error)
				{
					module.reject(error);
				}
			}
		)
	);

	addModule(
		"app/modules/searchModal",
		new Promise(
			function (accept, reject)
			{
				const module = Object.defineProperties(
					{},
					{
						"accept": {
							value: accept
						},
						"reject": {
							value: reject
						},
						"exports": {
							set: function (item)
							{
								this.accept(item);
							}
						}
					}
				);

				try
				{
/* ***** Module "app/modules/searchModal" Start ***** */

require("app/libs/utils").afterward(
	function (utils)
	{
		const searchModalTrigger = document.querySelector("[data-content-popin-trigger='search-modal']");
		const searchModalWrapper = document.querySelector("[data-content-popin-target='search-modal']");
		const searchResultsWrapper = document.querySelector(".search-results-wrapper");

		function init()
		{
			searchModalEvents();
		}

		function searchModalEvents()
		{
			if (searchModalTrigger)
			{
				searchModalTrigger.addEventListener("click", openSearchModal);
			}
		}

		function openSearchModal(event)
		{
			event.preventDefault();
            searchModalWrapper.classList.add("is-visible");
            searchModalWrapper.querySelector(".search-bar input").focus();
			utils.bodyBlock(true);
		}

		function initSearchSliders()
		{
			const sliderOptions = {
				loop: false,
				pagination: {
					el: ".search-slider-pagination",
					clickable: true
				},
				navigation: {
					nextEl: ".search-slider-button-next",
					prevEl: ".search-slider-button-prev",
				},
				speed: 600,
				watchOverflow: true,
				spaceBetween: 27,
				uniqueNavElements: true,
				breakpointsInverse: true,
				observer: true,
				breakpoints: {
					320: {
						slidesPerView: 1,
						spaceBetween: 10
					},
					600: {
						slidesPerView: 2,
						spaceBetween: 20
					},
					768: {
						slidesPerView: 3,
						spaceBetween: 30
					},
					992: {
						slidesPerView: 4,
					},
					1110: {
						slidesPerView: 5,
					}
				}
			};

			const sliderContainers = document.querySelectorAll(".search-container");
			searchResultsWrapper.hidden = false;

			sliderContainers.forEach(
				function (el)
				{

					new Swiper(el, sliderOptions);

				}
			);
		}

		const searchModal = {
			init: init,
			initSearchSliders: initSearchSliders,
		}

		module.exports = searchModal;
	}
);

/* ***** Module "app/modules/searchModal" End ***** */
				}
				catch (error)
				{
					module.reject(error);
				}
			}
		)
	);

	addModule(
		"app/modules/wishListModal",
		new Promise(
			function (accept, reject)
			{
				const module = Object.defineProperties(
					{},
					{
						"accept": {
							value: accept
						},
						"reject": {
							value: reject
						},
						"exports": {
							set: function (item)
							{
								this.accept(item);
							}
						}
					}
				);

				try
				{
/* ***** Module "app/modules/wishListModal" Start ***** */

require("app/libs/utils").afterward(
	function (utils)
	{
        const wishListModalTrigger = document.querySelector('[data-content-popin-trigger="wishlist-modal"]');
        const wishListModalWrapper = document.querySelector('[data-content-popin-target="wishlist-modal"]');


        function init() {
            if(!wishListModalWrapper || !wishListModalTrigger) return;
            wishListModalEvents();
        }

        function wishListModalEvents() {
            wishListModalTrigger.addEventListener("click", openWishListModal);
        }

        function openWishListModal(e) {
            e.preventDefault();

            wishListModalWrapper.classList.add("is-visible");
            utils.bodyBlock(true);
        }

        const wishListModal = {
            init: init
        }

		module.exports = wishListModal;
	}
);

/* ***** Module "app/modules/wishListModal" End ***** */
				}
				catch (error)
				{
					module.reject(error);
				}
			}
		)
	);

	addModule(
		"app/modules/callModal",
		new Promise(
			function (accept, reject)
			{
				const module = Object.defineProperties(
					{},
					{
						"accept": {
							value: accept
						},
						"reject": {
							value: reject
						},
						"exports": {
							set: function (item)
							{
								this.accept(item);
							}
						}
					}
				);

				try
				{
/* ***** Module "app/modules/callModal" Start ***** */

require("app/libs/utils").afterward(
	function (utils)
	{
        const callModalTrigger = document.querySelector('[data-content-popin-trigger="call-modal"]');
        const callModalWrapper = document.querySelector('[data-content-popin-target="call-modal"]');


        function init() {
            if(!callModalWrapper || !callModalTrigger) return;
            callModalEvents();
        }

        function callModalEvents() {
            callModalTrigger.addEventListener("click", openCallModal);
        }

        function openCallModal(e) {
            e.preventDefault();

            callModalWrapper.classList.add("is-visible");
            utils.bodyBlock(true);
        }

        const callModal = {
            init: init
        }

		module.exports = callModal;
	}
);

/* ***** Module "app/modules/callModal" End ***** */
				}
				catch (error)
				{
					module.reject(error);
				}
			}
		)
	);

	addModule(
		"app/modules/backToTop",
		new Promise(
			function (accept, reject)
			{
				const module = Object.defineProperties(
					{},
					{
						"accept": {
							value: accept
						},
						"reject": {
							value: reject
						},
						"exports": {
							set: function (item)
							{
								this.accept(item);
							}
						}
					}
				);

				try
				{
/* ***** Module "app/modules/backToTop" Start ***** */

function goToTop(event)
{
	event.cancel();
	document.body.scrollIntoView({
		behavior: "smooth",
		block: "start",
		inline: "nearest"
	});
}

function init()
{
	Array.from(document.querySelectorAll(".js-back-to-top")).forEach(
		function (btn)
		{
			btn.addEventListener("click", goToTop);
		}
	);
}

module.exports = init;

/* ***** Module "app/modules/backToTop" End ***** */
				}
				catch (error)
				{
					module.reject(error);
				}
			}
		)
	);

	addModule(
		"app/modules/catalogSlider",
		new Promise(
			function (accept, reject)
			{
				const module = Object.defineProperties(
					{},
					{
						"accept": {
							value: accept
						},
						"reject": {
							value: reject
						},
						"exports": {
							set: function (item)
							{
								this.accept(item);
							}
						}
					}
				);

				try
				{
/* ***** Module "app/modules/catalogSlider" Start ***** */

function init() {

    const catalogContainers = document.querySelectorAll(".catalog-container");

    if(!catalogContainers.length) return;

    Array.from(catalogContainers).forEach(function (container) {

        new Swiper(container, {
            pagination: {
                el: '.catalog-slider-pagination',
                clickable: true
            },
            speed: 600,
            watchOverflow: true,
            spaceBetween: 30,
            uniqueNavElements: true
        });
    });

}


const catalogSlider = {
    init: init
}

module.exports = catalogSlider;
/* ***** Module "app/modules/catalogSlider" End ***** */
				}
				catch (error)
				{
					module.reject(error);
				}
			}
		)
	);

	addModule(
		"app/pages/prehome",
		new Promise(
			function (accept, reject)
			{
				const module = Object.defineProperties(
					{},
					{
						"accept": {
							value: accept
						},
						"reject": {
							value: reject
						},
						"exports": {
							set: function (item)
							{
								this.accept(item);
							}
						}
					}
				);

				try
				{
/* ***** Module "app/pages/prehome" Start ***** */

require("app/libs/scrollIt").afterward(
	function (scrollIt)
	{
		const cols = document.querySelectorAll(".prehome__col");

		function prehome()
		{
			Array.from(cols).forEach(
				function (col)
				{
					col.addEventListener("click", openCol);
					col.querySelector(".js-prehome__close").addEventListener("click", closeCol);
				}
			);
		}

		function openCol(event)
		{
			if (document.documentElement.clientWidth > 876) return;
			if (event.target.closest(".js-prehome__close")) return;
			if (event.currentTarget.classList.contains("is-visible")) return;

			event.preventDefault();

			const col = event.currentTarget;

			closeAllCols();
            col.classList.add("is-visible");
			document.body.classList.add("is-blocked");

		}

		function closeCol(event)
		{
			event.preventDefault();
			event.currentTarget.closest(".prehome__col").classList.remove("is-visible");
			document.body.classList.remove("is-blocked");
		}

		function closeAllCols()
		{
			Array.from(cols).forEach(
				function (col)
				{
					if (col.classList.contains("is-visible"))
					{
						col.classList.remove("is-visible");
					}
				}
			);
			document.body.classList.remove("is-blocked");
		}

		module.exports = prehome;
	}
);

/* ***** Module "app/pages/prehome" End ***** */
				}
				catch (error)
				{
					module.reject(error);
				}
			}
		)
	);

	addModule(
		"app/libs/Slide",
		new Promise(
			function (accept, reject)
			{
				const module = Object.defineProperties(
					{},
					{
						"accept": {
							value: accept
						},
						"reject": {
							value: reject
						},
						"exports": {
							set: function (item)
							{
								this.accept(item);
							}
						}
					}
				);

				try
				{
/* ***** Module "app/libs/Slide" Start ***** */

function initElement(element)
{
	element.style.display = "none";
	element.style.overflow = "hidden";
	element.style.maxHeight = "0";
	element.style.transitionProperty = "max-height";
	element.style.transitionDuration = ".2s";
	element.style.transitionTimingFunction = "cubic-bezier(0, 1, 1, 1)";
}

function getHeight(element)
{
	element.style.display = "block";
	const maxHeight = element.scrollHeight + "px";
	element.style.display = "";
	return maxHeight;
}

function down(element, duration)
{
	return new Promise(
		function (resolve)
		{
			if (element.classList.contains("is-visible")) return;

			duration ? element.style.transitionDuration = duration + "ms" : element.style.transitionDuration = "200ms";

			const elementHeight = getHeight(element);

			element.classList.add("is-visible");
			element.style.maxHeight = elementHeight;

			window.setTimeout(
				function ()
				{
					element.style.transitionDuration = "";

					resolve(element);
				},
				duration || 200
			);
		}
	);
}

function up(element, duration)
{
	return new Promise(
		function (resolve)
		{
			if (!element.classList.contains("is-visible")) return;
			duration ? element.style.transitionDuration = duration + "ms" : element.style.transitionDuration = "200ms";
			element.style.maxHeight = getHeight(element);
			window.setTimeout(
				function ()
				{
					element.style.maxHeight = "0";
				},
				1
			);

			window.setTimeout(
				function ()
				{
					element.classList.remove("is-visible");
					element.style.transitionDuration = "";
					resolve(element);
				},
				duration || 400
			);
		}
	);
}

function toggle(element, duration)
{
	const self = this;

	return new Promise(
		function (resolve)
		{
			if (element.classList.contains("is-visible"))
			{
				self.up(element, duration).then(resolve);
			}
			else
			{
				self.down(element, duration).then(resolve);
			}
		}
	);
}

const Slide = {
	down: down,
	up: up,
	toggle: toggle,
	initElement: initElement
};

module.exports = Slide;

/* ***** Module "app/libs/Slide" End ***** */
				}
				catch (error)
				{
					module.reject(error);
				}
			}
		)
	);

	addModule(
		"app/libs/synchNav",
		new Promise(
			function (accept, reject)
			{
				const module = Object.defineProperties(
					{},
					{
						"accept": {
							value: accept
						},
						"reject": {
							value: reject
						},
						"exports": {
							set: function (item)
							{
								this.accept(item);
							}
						}
					}
				);

				try
				{
/* ***** Module "app/libs/synchNav" Start ***** */

require("app/libs/utils", "app/libs/scrollIt").afterward(
	function (utils, scrollIt)
	{
		function synchNav(links, options)
		{
			let triggerChangePosition;
			let scrollToPosition;
			let callback;

			if (options.positionTopTrigger && typeof options.positionTopTrigger === "number")
			{
				triggerChangePosition = options.positionTopTrigger;
			}
			else
			{
				triggerChangePosition = 150;
			}

			if (options.scrollToFromTrop && typeof options.scrollToFromTrop === "number")
			{
				scrollToPosition = options.scrollToFromTrop;
			}
			else
			{
				scrollToPosition = 0;
			}

			if (options.callback && typeof options.callback === "function")
			{
				callback = options.callback;
			}

			const linkList = links;
			const sections = Array.from(linkList).map(
				function (link)
				{
					const section = document.querySelector(link.getAttribute("href"));
					if (section) return section;
				}
			);

			synchLinksToSections();
			window.addEventListener("scroll", utils.throttle(synchLinksToSections, 150));

			function synchLinksToSections()
			{
				const fromTop = triggerChangePosition;
				let activeSections = sections.map(
					function (section)
					{
						if (section.getBoundingClientRect().top < fromTop) return section;
					}
				).filter(
					function (section)
					{
						return section !== undefined;
					}
				);

				const currentSection = activeSections[activeSections.length - 1];
				let currentLink;

				if (currentSection)
				{
					currentLink = document.querySelector("a[href='#" + currentSection.getAttribute("id") + "']");

					if (callback && typeof callback === "function")
					{
						callback(currentLink, currentSection, linkList);
					}
				}
			}

			Array.from(linkList).forEach(
				function (link)
				{
					link.addEventListener("click", scrollToTarget);
				}
			);

			function scrollToTarget(e)
			{
				if (scrollIt)
				{
					e.preventDefault();
					const targetTop = window.pageYOffset + document.querySelector(e.target.closest("a").getAttribute("href")).getBoundingClientRect().top + scrollToPosition;
					scrollIt({
						destination: targetTop,
						duration: 400,
						easing: "linear"
					});
				}
			}
		}

		module.exports = synchNav;
	}
);

/* ***** Module "app/libs/synchNav" End ***** */
				}
				catch (error)
				{
					module.reject(error);
				}
			}
		)
	);

	addModule(
		"app/pages/productList",
		new Promise(
			function (accept, reject)
			{
				const module = Object.defineProperties(
					{},
					{
						"accept": {
							value: accept
						},
						"reject": {
							value: reject
						},
						"exports": {
							set: function (item)
							{
								this.accept(item);
							}
						}
					}
				);

				try
				{
/* ***** Module "app/pages/productList" Start ***** */

require("app/libs/utils", "app/libs/Slide").afterward(
	function (utils, Slide)
	{
		let recommandationTrigger;
		let recommandationSection;
		let filtersTrigger;
		let filtersSection;

		function init()
		{
			recommandationTrigger = document.querySelector(".recommandation-mobile-trigger");
			recommandationSection = document.querySelector(".recommandation-section");
			filtersTrigger = document.querySelector(".filters-section-trigger");
			filtersSection = document.querySelector(".filters-section");

			filtersccordions();
			initEvents();
		}

		function initEvents()
		{
			recommandationTrigger.addEventListener("click", showRecommandation);
			filtersTrigger.addEventListener("click", showFilters);
			recommandationSection.addEventListener("click", closeProductModal);
			filtersSection.addEventListener("click", closeProductModal);
		}

		function showRecommandation()
		{
			recommandationSection.classList.add("is-visible");
		}

		function filtersccordions()
		{
			const filtersTrigger = document.querySelectorAll(".filters-accordion-trigger");

			Array.from(filtersTrigger).forEach(
				function (element)
				{
					element.addEventListener(
						"click",
						function (event)
						{
							Slide.toggle(event.currentTarget.nextElementSibling).then(
								function ()
								{
									element.classList.toggle("is-open");
								}
							);
						}
					);
				}
			);
		}

		function showFilters()
		{
			utils.breakPointChecker(
				"(min-width: 768px)",
				function ()
				{
					openFiltersDesktop(filtersSection);
				},
				function ()
				{
					//filtersSection.classList.remove("is-visible");
					filtersSection.style.maxHeight = "none";
					openFiltersMobile(filtersSection);
				}
			);
		}

		function openFiltersDesktop(filtersSection)
		{
			Slide.toggle(filtersSection, 400);
		}

		function openFiltersMobile(filtersSection)
		{
			filtersSection.classList.add("is-visible");
		}

		function closeProductModal(event)
		{
			if (event.target.closest(".product-modal-close"))
			{
				event.target.closest(".product-modal").classList.remove("is-visible");
			}
		}

		const productList = {
			init: init
		};

		module.exports = productList;
	}
);

/* ***** Module "app/pages/productList" End ***** */
				}
				catch (error)
				{
					module.reject(error);
				}
			}
		)
	);

	addModule(
		"app/pages/contact",
		new Promise(
			function (accept, reject)
			{
				const module = Object.defineProperties(
					{},
					{
						"accept": {
							value: accept
						},
						"reject": {
							value: reject
						},
						"exports": {
							set: function (item)
							{
								this.accept(item);
							}
						}
					}
				);

				try
				{
/* ***** Module "app/pages/contact" Start ***** */

function init()
{
	const wrapper = document.querySelector("mobile-select-wrapper");

	if (wrapper)
	{
		document.body.addEventListener(
			"click",
			function (event)
			{
				if (event.target.closest("mobile-select-input"))
				{
					wrapper.classList.toggle("unfolded");
				}
				else if (!event.target.closest("mobile-select-wrapper"))
				{
					wrapper.classList.remove("unfolded");
				}
			}
		);
	}
}

module.exports = init;

/* ***** Module "app/pages/contact" End ***** */
				}
				catch (error)
				{
					module.reject(error);
				}
			}
		)
	);

	addModule(
		"app/pages/newsList",
		new Promise(
			function (accept, reject)
			{
				const module = Object.defineProperties(
					{},
					{
						"accept": {
							value: accept
						},
						"reject": {
							value: reject
						},
						"exports": {
							set: function (item)
							{
								this.accept(item);
							}
						}
					}
				);

				try
				{
/* ***** Module "app/pages/newsList" Start ***** */

require("app/libs/utils").afterward(
	function (utils)
	{
        function init() {

            const newsMasonryWrapper = document.querySelector(".news-list-masonry");
            if (!newsMasonryWrapper) return;

            const newsMasonry = new EasyMasonry(newsMasonryWrapper, getMasonryColumns());

            window.addEventListener(
				"resize",
				utils.debounce(
					function()
					{
		                newsMasonry.paint(getMasonryColumns());
					}
				)
			);
        }

		function getMasonryColumns(template)
		{
            const viewportWidth = document.documentElement.clientWidth;
            let masonryColumn = 1;

			if (viewportWidth >= 768)
			{
                masonryColumn = 2;
            }

            return masonryColumn;
        }

        const newsList = {
            init: init
        };

        module.exports = newsList;
	}
);

/* ***** Module "app/pages/newsList" End ***** */
				}
				catch (error)
				{
					module.reject(error);
				}
			}
		)
	);

	addModule(
		"library/ReCaptcha",
		new Promise(
			function (accept, reject)
			{
				const module = Object.defineProperties(
					{},
					{
						"accept": {
							value: accept
						},
						"reject": {
							value: reject
						},
						"exports": {
							set: function (item)
							{
								this.accept(item);
							}
						}
					}
				);

				try
				{
/* ***** Module "library/ReCaptcha" Start ***** */

const isReCaptchaReady = new Promise(
	function (accept)
	{
		grecaptcha.ready(accept);
	}
);

function ReCaptcha(config)
{
	if (!config.action)
	{
		throw new Error("Missing mandatory field: action");
	}

	if (config.action.match(/[^A-Za-z_/]/))
	{
		throw new Error("Invalid field value: action");
	}

	return isReCaptchaReady.then(
		function ()
		{
			return grecaptcha.execute(recaptcha_key_public, config);
		}
	);
}

module.exports = ReCaptcha;

/* ***** Module "library/ReCaptcha" End ***** */
				}
				catch (error)
				{
					module.reject(error);
				}
			}
		)
	);

	addModule(
		"library/validator",
		new Promise(
			function (accept, reject)
			{
				const module = Object.defineProperties(
					{},
					{
						"accept": {
							value: accept
						},
						"reject": {
							value: reject
						},
						"exports": {
							set: function (item)
							{
								this.accept(item);
							}
						}
					}
				);

				try
				{
/* ***** Module "library/validator" Start ***** */

function get_message_key(field)
{
	const validity = field.validity;
	return (
		validity
		&&
		Object.getOwnPropertyNames(Object.getPrototypeOf(validity)).find(
			function (key)
			{
				return (validity[key] === true);
			}
		)
		||
		"unknownError"
	);
}

function get_failure_message(configuration, name, key)
{
	return (
		Object.dive(configuration, ["fields", name, "messages", key])
		||
		Object.dive(configuration, ["fields", name, "messages", "invalid"])
		||
		Object.dive(configuration, ["messages", key])
		||
		Object.dive(configuration, ["messages", "invalid"])
		||
		"Invalid field"
	);
}

function get_success_message(configuration, name)
{
	return (
		Object.dive(configuration, ["fields", name, "messages", "valid"])
		||
		Object.dive(configuration, ["messages", "valid"])
		||
		""
	);
}

function validate_field(form, name, field, configuration)
{
	let promise = Promise.resolve();

	{
		// Prevalidation hook
		// Fail validation on a rejected promise or thrown error
		const hook = Object.dive(configuration, ["fields", name, "hooks", "preValidation"]);

		if (hook)
		{
			promise = promise.then(
				function ()
				{
					return hook(field);
				}
			).catch(
				function (error)
				{
					if (error instanceof Error)
					{
						// Legitimate error
						console.log(error);
					}

					return Promise.reject("unknownError");
				}
			);
		}
	}

	promise = promise.then(
		function ()
		{
			// Native validation
			if (field instanceof RadioNodeList)
			{
				const is_valid = Array.from(field).every(
					function (input)
					{
						return input.checkValidity();
					}
				);

				if (!is_valid)
				{
					return Promise.reject("valueMissing");
				}
			}
			else
			{
				if (!field.checkValidity())
				{
					return Promise.reject(get_message_key(field));
				}
				else if (field.dataset.equalsTo)
				{
					const target = form.elements.namedItem(field.dataset.equalsTo);

					if (!(target instanceof HTMLElement) || target.value !== field.value)
					{
						return Promise.reject("valueMismatch");
					}
				}
			}
		}
	);

	{
		// Validation hook
		// Fail validation on a rejected promise or thrown error
		const hook = Object.dive(configuration, ["fields", name, "hooks", "validation"]);

		if (hook)
		{
			promise = promise.then(
				function ()
				{
					return Promise.try(
						function ()
						{
							return hook(field);
						}
					).catch(
						function (error)
						{
							if (error instanceof Error)
							{
								// Legitimate error
								console.log(error);
							}

							return Promise.reject("customError");
						}
					);
				}
			);
		}
	}

	return promise;
}

function update_field(outcome, name, field, configuration)
{
	let container = null;

	if (field instanceof RadioNodeList)
	{
		container = Node.getCommonAncestor(field[0], field[1]);

		if (!container)
		{
			container = field;
		}
	}
	else
	{
		container = field.closest("label");

		if (!container)
		{
			if (field.parentNode.querySelectorAll("input, select, textarea").length === 1)
			{
				container = field.parentNode;
			}
			else
			{
				container = field;
			}
		}
	}

	const new_style = outcome.error ? configuration.styles.invalid : configuration.styles.valid;
	const old_style = outcome.error ? configuration.styles.valid : configuration.styles.invalid;

	let messenger = null;
	let message = "";

	if (container instanceof RadioNodeList)
	{
		field.forEach(
			function (item)
			{
				item.classList.add(new_style);
				item.classList.remove(old_style);
			}
		);
	}
	else
	{
		container.classList.add(new_style);
		container.classList.remove(old_style);

		if (configuration.messenger)
		{
			messenger = container.querySelector(configuration.messenger);

			if (messenger)
			{
				if (outcome.error)
				{
					message = get_failure_message(configuration, name, outcome.data);
				}
				else
				{
					message = get_success_message(configuration, name);
				}
			}
		}
	}

	let promise = Promise.resolve();

	{
		// Postvalidation hook
		// If resolved with a string, override message
		const hook = Object.dive(configuration, ["fields", name, "hooks", "postValidation"]);

		if (hook)
		{
			promise = promise.then(
				function ()
				{
					return hook(field, outcome.error);
				}
			);

			if (messenger)
			{
				promise = promise.then(
					function (custom_message)
					{
						if (TypeCheck.isString(custom_message))
						{
							message = custom_message;
						}
					}
				);
			}

			promise = promise.catch(
				function (error)
				{
					if (error instanceof Error)
					{
						// Legitimate error
						console.log(error);
					}
				}
			);
		}
	}

	if (messenger)
	{
		promise = promise.then(
			function ()
			{
				messenger.textContent = message;
			}
		);
	}

	return promise;
}

function validate_form(form, configuration)
{
	// Radio & Checkboxes sharing the same name are processed as RadioNodeList
	// Other editables sharing the same name are processed individually
	const processed_names = [];

	let promise = Promise.all(
		form.getEditableElements().map(
			function (field)
			{
				const name = field.name;

				if (!name)
				{
					return;
				}

				if (field.type === "checkbox" || field.type === "radio")
				{
					if (processed_names.includes(name))
					{
						return;
					}

					processed_names.push(name);
					field = form.elements.namedItem(name);
				}

				const promise = validate_field(form, name, field, configuration);
				// Field specific hooks must resolve before global hooks, so we wait for resolution
				return promise.collapse(
					function (outcome)
					{
						return update_field(outcome, name, field, configuration);
					}
				)
				.then(
					function ()
					{
						return promise;
					}
				);
			}
		)
	);

	{
		// Validation hook
		// Fail validation on a rejected promise or thrown error
		const hook = Object.dive(configuration, ["hooks", "validation"]);

		if (hook)
		{
			promise = promise.then(
				function ()
				{
					return Promise.try(
						function ()
						{
							return hook(form);
						}
					).catch(
						function (error)
						{
							if (error instanceof Error)
							{
								// Legitimate error
								console.log(error);
							}

							return Promise.reject();
						}
					);
				}
			);
		}
	}

	promise = promise.collapse(
		function (outcome)
		{
			// Postvalidation hook
			const hook = Object.dive(configuration, ["hooks", "postValidation"]);

			if (hook)
			{
				return Promise.try(
					function ()
					{
						return hook(form, outcome.error);
					}
				);
			}
			else if (!outcome.error)
			{
				form.submit();
			}
		}
	);

	return promise;
}

function initialize(form, configuration)
{
	// Retrieve form element

	if (TypeCheck.isString(form))
	{
		form = document.querySelector(form);

		if (!(form instanceof HTMLFormElement))
		{
			throw new Error("No form found");
		}
	}
	else if (!(form instanceof HTMLFormElement))
	{
		throw new Error("No form given");
	}

	// Initialize configuration

	if (!configuration)
	{
		configuration = {};
	}

	if (!configuration.styles)
	{
		configuration.styles = {
			valid: "is-valid",
			invalid: "is-invalid"
		};
	}

	if (!(configuration.styles.valid && configuration.styles.invalid))
	{
		throw new Error("Missing styles classes");
	}

	// Add event listeners

	let is_processing = false;

	form.noValidate = true;

	form.addEventListener(
		"submit",
		function (event)
		{
			event.preventDefault();
			event.stopImmediatePropagation();

			if (is_processing)
			{
				return;
			}

			is_processing = true;

			let promise = Promise.resolve();

			// Prevalidation hook
			// Prevent validation on a rejected promise or thrown error
			const hook = Object.dive(configuration, ["hooks", "preValidation"]);

			if (hook)
			{
				promise = promise.then(
					function ()
					{
						return hook(form);
					}
				);
			}

			promise.then(
				function ()
				{
					return validate_form(form, configuration);
				}
			)
			.catch(
				function (error)
				{
					if (error instanceof Error)
					{
						// Legitimate error
						console.log(error);
					}
				}
			)
			.then(
				function ()
				{
					form.classList.add("is-submitted");
					is_processing = false;
				}
			);
		},
		true
	);

	form.addEventListener(
		"change",
		function (event)
		{
			let field = event.target;
			const name = field.name;

			if (name)
			{
				// Radio & Checkboxes sharing the same name are processed as RadioNodeList
				// Other editables sharing the same name are processed individually
				if (field.type === "checkbox" || field.type === "radio")
				{
					field = form.elements.namedItem(name);
				}

				validate_field(form, name, field, configuration).collapse(
					function (outcome)
					{
						return update_field(outcome, name, field, configuration);
					}
				);
			}
		},
		true
	);
}

module.exports = initialize;

/* ***** Module "library/validator" End ***** */
				}
				catch (error)
				{
					module.reject(error);
				}
			}
		)
	);

	addModule(
		"utility/reset-select",
		new Promise(
			function (accept, reject)
			{
				const module = Object.defineProperties(
					{},
					{
						"accept": {
							value: accept
						},
						"reject": {
							value: reject
						},
						"exports": {
							set: function (item)
							{
								this.accept(item);
							}
						}
					}
				);

				try
				{
/* ***** Module "utility/reset-select" Start ***** */


function reset_select(container)
{
	if (!(container instanceof HTMLElement))
	{
		return;
	}

	const select = container.querySelector("select");

	if (!(select instanceof HTMLSelectElement))
	{
		return;
	}

	const selected_option = container.querySelector("li.css_selected");
	const default_option = container.querySelector("li[hidden]:first-child");
	const title = container.querySelector("beautified-title");

	if (selected_option instanceof HTMLElement)
	{
		selected_option.classList.remove("css_selected");
	}

	if (default_option instanceof HTMLElement)
	{
		default_option.classList.remove("css_selected");
	}

	if (title instanceof HTMLElement)
	{
		title.textContent = select.dataset.placeholder || "";
	}

	select.selectedIndex = -1;
}

module.exports = reset_select;

/* ***** Module "utility/reset-select" End ***** */
				}
				catch (error)
				{
					module.reject(error);
				}
			}
		)
	);

	addModule(
		"app/modules/pageTopLarge",
		new Promise(
			function (accept, reject)
			{
				const module = Object.defineProperties(
					{},
					{
						"accept": {
							value: accept
						},
						"reject": {
							value: reject
						},
						"exports": {
							set: function (item)
							{
								this.accept(item);
							}
						}
					}
				);

				try
				{
/* ***** Module "app/modules/pageTopLarge" Start ***** */

require("app/libs/utils", "app/libs/scrollIt").afterward(
	function (utils, scrollIt)
	{
		const pageTopElement = document.querySelector(".page-top--l");
		const header = document.querySelector(".header");
		const breadcrumb = document.querySelector("breadcrumb-block");

		function pageTopInit()
		{
			if (!pageTopElement) return;

			initEvents();
			pageTopLarge();
		}

		function pageTopLarge()
		{
			const viewportWidth = utils.getViewportSize().width;

			if (!pageTopElement) return;

			if (viewportWidth < 768)
			{
				pageTopElement.style.minHeight = "0";
				return;
			}

			const viewportHeight = utils.getViewportSize().height;
			const headerHeight = header.offsetHeight;
			const breadcrumbHeight = breadcrumb ? breadcrumb.offsetHeight : 0;

			const pageTopHeight = viewportHeight - headerHeight - breadcrumbHeight;
			pageTopElement.style.minHeight = pageTopHeight + "px";

		}

		function scrollToContent(event)
		{
			event.preventDefault();
			scrollIt({
				destination: document.querySelector(".page-content").offsetTop,
				duration: 600
			});
		}

		function initEvents()
		{
			window.addEventListener("resize", pageTopLarge);
			pageTopElement.querySelector(".page-top-next").addEventListener("click", scrollToContent);
		}

		module.exports = pageTopInit;
	}
);

/* ***** Module "app/modules/pageTopLarge" End ***** */
				}
				catch (error)
				{
					module.reject(error);
				}
			}
		)
	);

	addModule(
		"app/pages/single",
		new Promise(
			function (accept, reject)
			{
				const module = Object.defineProperties(
					{},
					{
						"accept": {
							value: accept
						},
						"reject": {
							value: reject
						},
						"exports": {
							set: function (item)
							{
								this.accept(item);
							}
						}
					}
				);

				try
				{
/* ***** Module "app/pages/single" Start ***** */

require(
	"app/libs/utils",
	"app/libs/Slide",
	"app/libs/synchNav",
	"app/libs/scrollIt"
).afterward(
	function (
		utils,
		Slide,
		synchNav,
		scrollIt
	)
	{
		let singleVisual;
		let singleVisualNav;
		let singleVisualNavItems;
        let singleVisualVideoTrigger;
        let singleVisualVideoPopin;
		let singleVisualSlider;
		let singleScrollPaginationLinks;
		let singleScrollSections;
		let singleScrollPrev;
		let singleScrollNext;
		let currSection;

		function single()
		{
			singleVisual = document.querySelector(".single-visual");
			if (!singleVisual) return;
			singleVisualNav = singleVisual.querySelector(".single-visual-nav");
			singleVisualNavItems = singleVisualNav.querySelectorAll(".single-visual-nav-img");
            singleVisualVideoTrigger = document.querySelectorAll(".single-visual-video-trigger");
            singleVisualVideoPopin = document.querySelector(".single-visual-video-popin");
			singleScrollPaginationLinks = document.querySelectorAll(".single-scroll-pagination a");
			singleScrollSections = document.querySelectorAll(".single-section");
			singleScrollPrev = document.querySelector(".single-scroll-prev");
			singleScrollNext = document.querySelector(".single-scroll-next");
			singleVisualHandler();
			singleAccordions();
			singleScrollNav();
		}

		function singleScrollNav()
		{
			singleInitSynchNav();
			singleScrollEvents();
		}

		function singleInitSynchNav()
		{
			synchNav(
				singleScrollPaginationLinks,
				{
					positionTopTrigger: utils.getViewportSize().height / 3,
					scrollToFromTrop: -150,
					callback: function (currentLink, currentSection)
					{
						Array.from(singleScrollPaginationLinks).forEach(function (anchor)
						{
							if (anchor === currentLink) anchor.classList.add("is-active");
							else anchor.classList.remove("is-active");
						});

						currSection = Array.from(singleScrollSections).indexOf(currentSection);

						singleUpdateScrollNav(singleScrollSections, currSection);
					}
				}
			);
		}

		function singleScrollEvents()
		{
			if (singleScrollPrev && singleScrollNext)
			{
				singleScrollPrev.addEventListener("click", singleScrollPrevSection);
				singleScrollNext.addEventListener("click", singleScrollNextSection);
			}
		}

		function singleUpdateScrollNav(sections, currentSection)
		{
			if (currentSection - 1 >= 0)
			{
				const previousSectionTitle = sections[currentSection - 1].dataset.sectionTitle;
				singleScrollPrev.querySelector("span").innerHTML = previousSectionTitle;
				singleScrollPrev.classList.remove("is-hidden");

			}
			else
			{

				singleScrollPrev.classList.add("is-hidden");

			}

			if (currentSection + 1 < singleScrollSections.length)
			{
				const nextSectionTitle = sections[currentSection + 1].dataset.sectionTitle;
				singleScrollNext.querySelector("span").innerHTML = nextSectionTitle;
				singleScrollNext.classList.remove("is-hidden");
			}
			else
			{
				singleScrollNext.classList.add("is-hidden");
			}
		}

		function singleScrollPrevSection()
		{
			if (currSection > 0)--currSection;
			singleScrollToSection(currSection);
		}

		function singleScrollNextSection()
		{
			if (currSection < singleScrollSections.length - 1)++currSection;
			singleScrollToSection(currSection);
		}

		function singleScrollToSection(index)
		{
			const targetTop = window.pageYOffset + singleScrollSections[index].getBoundingClientRect().top - 150;
			scrollIt({
				destination: targetTop,
				duration: 400,
				easing: "linear"
			});
		}

		function singleAccordions()
		{
			const sectionTriggers = document.querySelectorAll(".single-accordion-trigger");

			Array.from(sectionTriggers).forEach(
				function (element)
				{
					element.addEventListener(
						"click",
						function (e)
						{
							Slide.toggle(e.currentTarget.nextElementSibling).then(
								function ()
								{
									element.classList.toggle("is-open");
								}
							);
						}
					);
				}
			);
		}

		function singleVisualHandler()
		{
			singleVisualMargin();
			singleVisualCarousel();
			singleVisualEvents();
		}

		function singleVisualEvents()
		{
			window.addEventListener("resize", singleVisualMargin);
			singleVisualNav.addEventListener("click", setActiveSlide);
            if(singleVisualVideoTrigger.length && singleVisualVideoPopin) {
                Array.from(singleVisualVideoTrigger).forEach(function(el) {
            
                    el.addEventListener("click", openSingleVideoModal);
        
                });
                singleVisualVideoPopin.addEventListener("close", closeSingleVideoModal);
            }
		}

		function singleVisualMargin()
		{
			if (utils.getViewportSize.width >= 768)
			{
				const headerHeight = document.querySelector(".header").offsetHeight;
				singleVisual.style.top = headerHeight + "px";
			}
			else
			{
				singleVisual.style.top = "auto";
			}
		}

		function singleVisualCarousel()
		{

			singleVisualSlider = new Swiper(
				".single-visual-container",
				{
					pagination: {
						el: ".single-visual-slider-pagination",
						clickable: true
					},
					speed: 600,
					uniqueNavElements: true,
					effect: "fade",
					on: {
						slideChangeTransitionEnd: function ()
						{
							setActiveNav(singleVisualNavItems, this.activeIndex);
						}
					},
                    //shortSwipes: false
				}
			);
		}

		function setActiveSlide(e)
		{
			e.preventDefault();

			const target = e.target.closest(".single-visual-nav-img");
			const targetIndex = Array.from(singleVisualNavItems).indexOf(target);

			if (targetIndex !== -1)
			{
				singleVisualSlider.slideTo(targetIndex);
				setActiveNav(singleVisualNavItems, targetIndex);
			}
		}

		function setActiveNav(navItems, activeIndex)
		{
			Array.from(navItems).forEach(
				function (element, index)
				{
					if (index === activeIndex)
					{
						element.classList.add("is-active");
					}
					else
					{
						element.classList.remove("is-active");
					}
				}
			);
		}

        function openSingleVideoModal(e) {
            e.preventDefault();
        
            singleVisualVideoPopin.classList.add("is-visible");
        }
        
        function closeSingleVideoModal(e) {
            const popin = e.detail.popin;
            const popinContent = e.detail.popin.querySelector(".single-visual-video-inner");
        
            while (popin.querySelector(".single-visual-video-wrapper").lastChild) {
                popin.querySelector(".single-visual-video-wrapper").removeChild(popin.querySelector(".single-visual-video-wrapper").lastChild);
            }
        
            popin.querySelector(".single-visual-video-wrapper").appendChild(popinContent);
        }

		module.exports = single;
	}
);

/* ***** Module "app/pages/single" End ***** */
				}
				catch (error)
				{
					module.reject(error);
				}
			}
		)
	);

	addModule(
		"header-modal-contact",
		new Promise(
			function (accept, reject)
			{
				const module = Object.defineProperties(
					{},
					{
						"accept": {
							value: accept
						},
						"reject": {
							value: reject
						},
						"exports": {
							set: function (item)
							{
								this.accept(item);
							}
						}
					}
				);

				try
				{
/* ***** Module "header-modal-contact" Start ***** */

require("library/ReCaptcha", "library/validator", "utility/reset-select").afterward(
	function (ReCaptcha, validator, reset_select)
	{
		/* Contact modal interactions */

		const modal_contact = document.getElementById("header-modal-contact");

		if (!(modal_contact instanceof HTMLElement))
		{
			return;
		}

		const form_contact = modal_contact.querySelector("form");

		if (!(form_contact instanceof HTMLFormElement))
		{
			return;
		}

		{
			form_contact.reset();

			const trigger_button = document.querySelector("li[data-content-popin-trigger='call-modal']");

			if (trigger_button instanceof HTMLElement)
			{
				trigger_button.addEventListener(
					"click",
					function ()
					{
						const wishlist_input = form_contact.elements.namedItem("wishlist");

						if (wishlist_input instanceof HTMLInputElement)
						{
							wishlist_input.checked = false;
						}
					}
				);
			}

			// const department = form_contact.elements.namedItem("department");
			// const phone_input = modal_contact.querySelector("a.bottom");

			// if (department instanceof HTMLSelectElement && phone_input instanceof HTMLAnchorElement)
			// {
			// 	department.addEventListener(
			// 		"change",
			// 		function ()
			// 		{
			// 			const value = department.options[department.selectedIndex];

			// 			if (value.dataset.text && value.dataset.href)
			// 			{
			// 				phone_input.innerHTML = "Contactez-nous au <strong>" + value.dataset.text + "</strong>";
			// 				phone_input.href = value.dataset.href;
			// 			}
			// 		}
			// 	);
			// }

			const message = form_contact.querySelector("form-global-message");

			let prevent_submit = false;

			validator(
				form_contact,
				{
					messenger: ".form-error-message",
					messages: {
						badInput: "La valeur de ce champ n'est pas au bon format",
						patternMismatch: "La valeur de ce champ n'est pas au bon format",
						rangeOverflow: "La valeur de ce champ dépasse le maximum autorisé",
						rangeUnderflow: "La valeur de ce champ n'atteint pas le minimum requis",
						stepMismatch: "La valeur de ce champ est entre deux valeurs autorisées",
						tooLong: "La valeur de ce champ est trop longue",
						tooShort: "La valeur de ce champ est trop courte",
						typeMismatch: "La valeur de ce champ n'est pas du bon type",
						valueMissing: "Ce champ est obligatoire",
						valueMismatch: "Les valeurs des deux champs ne correspondent pas",
						invalid: "La valeur de ce champ est invalide"
					},
					fields: {
						email: {
							messages: {
								badInput: "Le format de votre adresse courriel est incorrect",
								typeMismatch: "Le format de votre adresse courriel est incorrect",
								invalid: "Le format de votre adresse courriel est incorrect"
							}
						},
						phone: {
							messages: {
								badInput: "Le format de votre numéro de téléphone est incorrect",
								typeMismatch: "Le format de votre numéro de téléphone est incorrect",
								invalid: "Le format de votre numéro de téléphone est incorrect"
							}
						},
						firstname: {
							messages: {
								patternMismatch: "La valeur de ce champ contient des caractères interdits"
							}
						},
						lastname: {
							messages: {
								patternMismatch: "La valeur de ce champ contient des caractères interdits"
							}
						},
						company: {
							messages: {
								patternMismatch: "La valeur de ce champ contient des caractères interdits"
							}
						}
					},
					hooks: {
						preValidation: function ()
						{
							if (prevent_submit)
							{
								return Promise.reject();
							}

							prevent_submit = true;
							message.classList.remove("is-hidden", "is-error", "is-success");
							message.classList.add("is-pending");
							message.textContent = "Votre message est en cours d'envoi.";
						},
						postValidation: function (form, is_error)
						{
							if (is_error)
							{
								prevent_submit = false;
								message.textContent = "Votre message n'a pas pu être envoyé.";
								message.classList.remove("is-pending");
								message.classList.add("is-error");
							}
							else
							{
								return ReCaptcha({ action: "contact_form_header" })
								.then(
									function (token)
									{
										const form_data = new FormData(form_contact);
										form_data.append("recaptcha", token);
										let url = form_contact.action;
										const config = {
											method: form_contact.method
										};

										if (config.method === "GET")
										{
											url += (url.includes("?") ? "&" : "?") + (new URLSearchParams(form_data)).toString();
										}
										else
										{
											config.body = form_data;
										}

										return fetch(url, config);
									}
								)
								.then(
									function (response)
									{
										if (!response.ok)
										{
											throw new Error("HTTP Response Code " + response.status + ": " + response.statusText);
										}

										return response.json();
									}
								)
								.then(
									function (data)
									{
										if (!(data && data.success))
										{
											throw new Error(data.message || "An error occured");
										}

										message.textContent = "Votre message a bien été envoyé.";
										message.classList.remove("is-pending");
										message.classList.add("is-success");

										form_contact.reset();
										Array.from(form_contact.querySelectorAll("beautified-select")).forEach(
											function (container)
											{
												reset_select(container);
											}
										);
										Array.from(form_contact.querySelectorAll(".is-valid")).forEach(
											function (label)
											{
												label.classList.remove("is-valid");
											}
										);

										prevent_submit = false;
									}
								)
								.catch(
									function (error)
									{
										prevent_submit = false;
										message.textContent = "Votre message n'a pas pu être envoyé.";
										message.classList.remove("is-pending");
										message.classList.add("is-error");
										console.log(error);
									}
								);
							}
						}
					}
				}
			);
		}

		/* Wishlist modal interactions */

		const modal_wishlist = document.querySelector(".popin-wishlist");
		const form_wishlist = document.getElementById("wishlist-contact-modal-form");

		if (modal_wishlist instanceof HTMLElement && form_wishlist instanceof HTMLFormElement)
		{
			form_wishlist.reset();

			const message = form_wishlist.querySelector("form-global-message");

			let prevent_submit = false;

			validator(
				form_wishlist,
				{
					messenger: ".form-error-message",
					messages: {
						badInput: "La valeur de ce champ n'est pas au bon format",
						patternMismatch: "La valeur de ce champ n'est pas au bon format",
						rangeOverflow: "La valeur de ce champ dépasse le maximum autorisé",
						rangeUnderflow: "La valeur de ce champ n'atteint pas le minimum requis",
						stepMismatch: "La valeur de ce champ est entre deux valeurs autorisées",
						tooLong: "La valeur de ce champ est trop longue",
						tooShort: "La valeur de ce champ est trop courte",
						typeMismatch: "La valeur de ce champ n'est pas du bon type",
						valueMissing: "Ce champ est obligatoire",
						valueMismatch: "Les valeurs des deux champs ne correspondent pas",
						invalid: "La valeur de ce champ est invalide"
					},
					fields: {
						email: {
							messages: {
								badInput: "Le format de votre adresse courriel est incorrect",
								typeMismatch: "Le format de votre adresse courriel est incorrect",
								invalid: "Le format de votre adresse courriel est incorrect"
							}
						},
						phone: {
							messages: {
								badInput: "Le format de votre numéro de téléphone est incorrect",
								typeMismatch: "Le format de votre numéro de téléphone est incorrect",
								invalid: "Le format de votre numéro de téléphone est incorrect"
							}
						}
					},
					hooks: {
						preValidation: function ()
						{
							if (prevent_submit)
							{
								return Promise.reject();
							}

							const first_product = document.querySelector(".popin-wishlist div[data-selection-container] .card-landing");

							if (first_product)
							{
								prevent_submit = true;
								message.classList.remove("is-hidden", "is-error", "is-success");
								message.classList.add("is-pending");
								message.textContent = "Votre message est en cours d'envoi.";
							}
							else
							{
								message.classList.remove("is-hidden", "is-pending", "is-success");
								message.classList.add("is-error");
								message.textContent = "Veuillez sélectionner des produits pour pouvoir vous les envoyer par email.";
								return Promise.reject();
							}
						},
						postValidation: function (form, is_error)
						{
							if (is_error)
							{
								prevent_submit = false;
								message.textContent = "Votre message n'a pas pu être envoyé.";
								message.classList.remove("is-pending");
								message.classList.add("is-error");
							}
							else
							{
								return ReCaptcha({ action: "wishlist_form_header" })
								.then(
									function (token)
									{
										const form_data = new FormData(form_wishlist);
										form_data.append("recaptcha", token);
										let url = form_wishlist.action;
										const config = {
											method: form_wishlist.method
										};

										if (config.method === "GET")
										{
											url += (url.includes("?") ? "&" : "?") + (new URLSearchParams(form_data)).toString();
										}
										else
										{
											config.body = form_data;
										}

										return fetch(url, config);
									}
								)
								.then(
									function (response)
									{
										if (!response.ok)
										{
											throw new Error("HTTP Response Code " + response.status + ": " + response.statusText);
										}

										return response.json();
									}
								)
								.then(
									function (data)
									{
										if (!(data && data.success))
										{
											throw new Error(data.message || "An error occured");
										}

										message.textContent = "Votre message a bien été envoyé.";
										message.classList.remove("is-pending");
										message.classList.add("is-success");

										form_wishlist.reset();
										Array.from(form_wishlist.querySelectorAll("beautified-select")).forEach(
											function (container)
											{
												reset_select(container);
											}
										);
										Array.from(form_wishlist.querySelectorAll(".is-valid")).forEach(
											function (label)
											{
												label.classList.remove("is-valid");
											}
										);

										prevent_submit = false;
									}
								)
								.catch(
									function (error)
									{
										prevent_submit = false;
										message.textContent = "Votre message n'a pas pu être envoyé.";
										message.classList.remove("is-pending");
										message.classList.add("is-error");
										console.log(error);
									}
								);
							}
						}
					}
				}
			);

			const button = modal_wishlist.querySelector("button[data-selection-callback]");

			if (button)
			{
				button.addEventListener(
					"click",
					function (event)
					{
						event.cancel();

						const wishlist_input = form_contact.elements.namedItem("wishlist");

						if (wishlist_input instanceof HTMLInputElement)
						{
							wishlist_input.checked = true;
						}

						const email_input = form_contact.elements.namedItem("email");
						const email_source = form_wishlist.elements.namedItem("email");

						if (
							email_input instanceof HTMLInputElement
							&&
							email_source instanceof HTMLInputElement
							&&
							email_input.value !== email_source.value
						)
						{
							email_input.value = email_source.value;
							email_input.dispatchCustomEvent("change");
						}

						const department_input = form_contact.elements.namedItem("department");
						const department_source = form_wishlist.elements.namedItem("department");

						if (
							department_input instanceof HTMLSelectElement
							&&
							department_source instanceof HTMLSelectElement
							&&
							department_input.selectedIndex !== department_source.selectedIndex
						)
						{
							const department_container = department_input.parentNode;
							const index = department_source.selectedIndex;

							if (index > -1)
							{
								const option = department_container.querySelector("li.css_option:not(.css_disabled)[data-index='" + index + "']");

								if (option instanceof HTMLLIElement)
								{
									option.click();
								}
								else
								{
									reset_select(department_container);
									department_input.dispatchCustomEvent("change");
								}
							}
							else
							{
								reset_select(department_container);
								department_input.dispatchCustomEvent("change");
							}

							department_input.dispatchCustomEvent("change");
						}

						form_contact.querySelectorAll("label").forEach(
							function (item)
							{
								item.classList.remove("is-valid", "is-invalid");
							}
						);

						form_contact.querySelectorAll("div.form-error-message").forEach(
							function (item)
							{
								item.textContent = "";
							}
						);

						modal_wishlist.classList.remove("is-visible");

						// Wait for listeners of change event on department select to execute
						setTimeout(
							function ()
							{
								modal_contact.classList.add("is-visible");
							},
							10
						);
					}
				);
			}
		}
	}
);

/* ***** Module "header-modal-contact" End ***** */
				}
				catch (error)
				{
					module.reject(error);
				}
			}
		)
	);

	addModule(
		"app/script",
		new Promise(
			function (accept, reject)
			{
				const module = Object.defineProperties(
					{},
					{
						"accept": {
							value: accept
						},
						"reject": {
							value: reject
						},
						"exports": {
							set: function (item)
							{
								this.accept(item);
							}
						}
					}
				);

				try
				{
/* ***** Module "app/script" Start ***** */

require(
	"app/libs/utils",
	"app/libs/headOff",
	"app/modules/mainMargin",
	"app/modules/pageTopLarge",
	"app/modules/closeModal",
	"app/modules/partnersSlider",
	"app/modules/cmsSlider",
	"app/modules/livretsSlider",
	"app/modules/cardLSlider",
	"app/modules/cardWideSlider",
	"app/modules/searchModal",
	"app/modules/wishListModal",
	"app/modules/callModal",
	"app/modules/backToTop",
	"app/modules/catalogSlider",
	"app/pages/prehome",
	"app/pages/single",
	"app/pages/productList",
	"app/pages/contact",
	"app/pages/newsList"
).afterward(
	function (
		utils,
		headOff,
		mainMargin,
		pageTopInit,
		closeModal,
		partnersSlider,
		cmsSlider,
		livretsSlider,
		cardLSlider,
		cardWideSlider,
		searchModal,
		wishListModal,
		callModal,
        backToTopInit,
        catalogSlider,
		prehome,
		single,
		productList,
        contact,
        newsList
	)
	{
		/** Global */
		if (utils.isIE() && typeof cssVars === "function")
		{
			cssVars();
		}

		pageTopInit();
		mainMargin.init();
		backToTopInit();
		headOff(document.querySelector(".header-sticky"));
		closeModal();
		contact();

		{
			const menu = document.querySelector("header ul.menu");

			if (menu)
			{
				menu.addEventListener(
					"click",
					function (event)
					{
						const new_button = event.target.closest("button.toggle-accordion");

						if (new_button)
						{
							const old_button = menu.querySelector("button.active");
							const old_submenu = menu.querySelector("ul.unfolded-accordion");
							const new_submenu = event.target.closest("li").querySelector("ul");

							if (old_submenu && old_submenu !== new_submenu)
							{
								old_button.classList.remove("active");
								old_submenu.classList.remove("unfolded-accordion");
							}

							new_button.classList.toggle("active");
							new_submenu.classList.toggle("unfolded-accordion");
						}
					}
				);

				document.querySelector("label.menu-icon").addEventListener(
					"click",
					function (event)
					{
						event.currentTarget.classList.toggle("active");
						menu.classList.toggle("unfolded-menu");
					}
				);
			}
		}

		{
			const more = document.querySelector(".popin-search-recommandation .more-results");

			if (more)
			{
				more.addEventListener(
					"click",
					function ()
					{
						more.closest(".popin-search-recommandation").classList.remove("is-folded");
						more.classList.add("is-hidden");
					}
				);
			}
		}

		/** Pages */
		if (document.querySelector(".prehome"))
		{
			prehome();
		}

		if (document.querySelector(".page-single"))
		{
			single();
		}

		if (document.querySelector(".page-product-list"))
		{
			productList.init();
		}
		
		newsList.init();
        



		/** Modules */
		partnersSlider.init();
		cmsSlider.init();
		livretsSlider.init();
		cardLSlider.init();
		cardWideSlider.init();
		searchModal.init();
        wishListModal.init();
        callModal.init();
        catalogSlider.init();
	}
);

/* ***** Module "app/script" End ***** */
				}
				catch (error)
				{
					module.reject(error);
				}
			}
		)
	);
}
