"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var SEARCH_FORM = document.querySelector("form[name=search_form]");
var SEARCH_RESULT_WRAPPER = document.querySelector("div.search-results-wrapper");
var SEARCH_INPUT = document.querySelector("input[type=search][name=products_search]");
var FAMILY_SELECT = document.querySelector("select[name=search_families]");
var FAMILY_LINES = Array.from(document.querySelectorAll("div[data-family]"));
var RECIPES_LINE = document.querySelector("div[data-recipes]");
var FAMILIES_WRAPPER = document.querySelector("div.popin-search-recommandation");
var MESSAGE_EMPTY_RESULT = document.querySelector("div.search-message-empty-result");
if (SEARCH_FORM === null) {
    throw new Error("Unable to find products search form in search modal.");
}
SEARCH_FORM.reset();
var ERASE_BUTTON = SEARCH_FORM.querySelector("div.erase");
if (ERASE_BUTTON === null) {
    throw new Error("Unable to find products search erase button in search modal.");
}
if (SEARCH_RESULT_WRAPPER === null) {
    throw new Error("Unable to find products search results wrapper in search modal.");
}
if (SEARCH_INPUT === null) {
    throw new Error("Unable to find products search input in search modal.");
}
if (FAMILY_SELECT === null) {
    throw new Error("Unable to find families filtering select in search modal.");
}
if (RECIPES_LINE === null) {
    throw new Error("Unable to find recipes results line in search modal.");
}
if (FAMILIES_WRAPPER === null) {
    throw new Error("Unable to find families wrapper in search modal.");
}
if (MESSAGE_EMPTY_RESULT === null) {
    throw new Error("Unable to find 'no result' message in search modal.");
}
function search(query) {
    return __awaiter(this, void 0, void 0, function () {
        var RESPONSE, RESULT_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (SEARCH_RESULT_WRAPPER === null) {
                        throw new Error("Unable to find products search results wrapper in search modal.");
                    }
                    return [4, fetch("/ajax/product-search", {
                            method: "POST",
                            mode: "cors",
                            cache: "no-cache",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(query)
                        })];
                case 1:
                    RESPONSE = _a.sent();
                    if (!RESPONSE.ok) {
                        throw new Error("HTTP Response Code " + RESPONSE.status + ": " + RESPONSE.statusText);
                    }
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4, RESPONSE.json()];
                case 3:
                    RESULT_1 = _a.sent();
                    return [2, new Promise(function (resolve) {
                            resolve(RESULT_1);
                        })];
                case 4:
                    error_1 = _a.sent();
                    throw new Error("A problem occured with the search request.");
                case 5: return [2];
            }
        });
    });
}
function searchRecipe(query) {
    return __awaiter(this, void 0, void 0, function () {
        var RESPONSE, RESULT_2, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (SEARCH_RESULT_WRAPPER === null) {
                        throw new Error("Unable to find products search results wrapper in search modal.");
                    }
                    return [4, fetch("/ajax/recipe-search", {
                            method: "POST",
                            mode: "cors",
                            cache: "no-cache",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(query)
                        })];
                case 1:
                    RESPONSE = _a.sent();
                    if (!RESPONSE.ok) {
                        throw new Error("HTTP Response Code " + RESPONSE.status + ": " + RESPONSE.statusText);
                    }
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4, RESPONSE.json()];
                case 3:
                    RESULT_2 = _a.sent();
                    return [2, new Promise(function (resolve) {
                            resolve(RESULT_2);
                        })];
                case 4:
                    error_2 = _a.sent();
                    throw new Error("A problem occured with the search request.");
                case 5: return [2];
            }
        });
    });
}
function initSearchSliders() {
    var SLIDER_OPTIONS = {
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
    var SLIDER_CONTAINERS = document.querySelectorAll("div.search-container");
    SLIDER_CONTAINERS.forEach(function (slider_container) {
        new Swiper(slider_container, SLIDER_OPTIONS);
    });
}
function processProductResponse(line) {
    return __awaiter(this, void 0, void 0, function () {
        var QUERY, SLIDES_CONTAINER, LOADER, LOADER_CONTENT, result, RESULT_SPAN, LOAD_MORE, SLIDE;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (SEARCH_INPUT === null) {
                        throw new Error("Unable to find search input in search modal.");
                    }
                    line.hidden = true;
                    if (FAMILY_SELECT === null) {
                        throw new Error("Unable to find families filtering select in search modal.");
                    }
                    if (line.dataset.family === undefined) {
                        throw new Error("Missing family dataset on line.");
                    }
                    if (["", line.dataset.family].indexOf(FAMILY_SELECT.value) === -1) {
                        return [2];
                    }
                    QUERY = {
                        terms: SEARCH_INPUT.value,
                        family: line.dataset.family,
                        page: 1
                    };
                    SLIDES_CONTAINER = line.querySelector("div.swiper-wrapper");
                    if (SLIDES_CONTAINER === null) {
                        throw new Error("Impossible to find slider container for family " + line.dataset.family);
                    }
                    while (SLIDES_CONTAINER.firstChild) {
                        SLIDES_CONTAINER.firstChild.remove();
                    }
                    LOADER = document.createElement("loader-block");
                    LOADER_CONTENT = document.createElement("div");
                    LOADER.appendChild(LOADER_CONTENT);
                    SLIDES_CONTAINER.appendChild(LOADER);
                    return [4, search(QUERY)];
                case 1:
                    result = _a.sent();
                    RESULT_SPAN = line.querySelector("span[data-amount]");
                    if (RESULT_SPAN === null) {
                        throw new Error("Impossible to find the span holding the number of results found.");
                    }
                    while (RESULT_SPAN.firstChild) {
                        RESULT_SPAN.firstChild.remove();
                    }
                    while (SLIDES_CONTAINER.firstChild !== null) {
                        SLIDES_CONTAINER.firstChild.remove();
                    }
                    RESULT_SPAN.appendChild(document.createTextNode(result.total.toString()));
                    result.hits.forEach(function (payload) {
                        line.hidden = false;
                        var PRODUCT = new Product(payload._source);
                        if (payload.highlight !== undefined) {
                            PRODUCT.setName(payload.highlight.name);
                        }
                        var CARD = PRODUCT.build("search");
                        var SLIDE = document.createElement("div");
                        SLIDE.classList.add("swiper-slide");
                        SLIDE.appendChild(CARD);
                        SLIDES_CONTAINER.appendChild(SLIDE);
                    });
                    if (result.total > result.hits.length) {
                        LOAD_MORE = document.createElement("button");
                        LOAD_MORE.classList.add("card-more");
                        LOAD_MORE.appendChild(document.createTextNode("+"));
                        SLIDE = document.createElement("div");
                        SLIDE.classList.add("swiper-slide");
                        SLIDE.appendChild(LOAD_MORE);
                        SLIDES_CONTAINER.appendChild(SLIDE);
                    }
                    return [2];
            }
        });
    });
}
function processRecipeResponse() {
    return __awaiter(this, void 0, void 0, function () {
        var QUERY, SLIDES_CONTAINER, LOADER, LOADER_CONTENT, result, RESULT_SPAN;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (SEARCH_INPUT === null) {
                        throw new Error("Unable to find search input in search modal.");
                    }
                    if (RECIPES_LINE === null) {
                        throw new Error("Unable to find recipes container in search modal.");
                    }
                    RECIPES_LINE.hidden = true;
                    QUERY = {
                        terms: SEARCH_INPUT.value,
                        page: 1
                    };
                    SLIDES_CONTAINER = RECIPES_LINE.querySelector("div.swiper-wrapper");
                    if (SLIDES_CONTAINER === null) {
                        throw new Error("Impossible to find slider container for recipes results.");
                    }
                    while (SLIDES_CONTAINER.firstChild) {
                        SLIDES_CONTAINER.firstChild.remove();
                    }
                    LOADER = document.createElement("loader-block");
                    LOADER_CONTENT = document.createElement("div");
                    LOADER.appendChild(LOADER_CONTENT);
                    SLIDES_CONTAINER.appendChild(LOADER);
                    return [4, searchRecipe(QUERY)];
                case 1:
                    result = _a.sent();
                    RESULT_SPAN = RECIPES_LINE.querySelector("span[data-amount]");
                    if (RESULT_SPAN === null) {
                        throw new Error("Impossible to find the span holding the number of results found.");
                    }
                    while (RESULT_SPAN.firstChild) {
                        RESULT_SPAN.firstChild.remove();
                    }
                    while (SLIDES_CONTAINER.firstChild) {
                        SLIDES_CONTAINER.firstChild.remove();
                    }
                    RESULT_SPAN.appendChild(document.createTextNode(result.total.toString()));
                    result.hits.forEach(function (payload) {
                        RECIPES_LINE.hidden = false;
                        var RECIPE = new Recipe(payload._source);
                        RECIPE.setName(payload.highlight.name);
                        var CARD = RECIPE.build("search");
                        var SLIDE = document.createElement("div");
                        SLIDE.classList.add("swiper-slide");
                        SLIDE.appendChild(CARD);
                        SLIDES_CONTAINER.appendChild(SLIDE);
                    });
                    return [2];
            }
        });
    });
}
FAMILY_SELECT.addEventListener("change", function () {
    FAMILY_LINES.forEach(function (line) {
        line.hidden = (["", line.dataset.family].indexOf(FAMILY_SELECT.value) === -1);
    });
});
debounce_event(SEARCH_INPUT, "input", 500);
SEARCH_INPUT.addEventListener("debounced_input", function () { return __awaiter(void 0, void 0, void 0, function () {
    var process_list, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                SEARCH_RESULT_WRAPPER.hidden = true;
                MESSAGE_EMPTY_RESULT.hidden = true;
                if (SEARCH_INPUT.value.length < 3) {
                    FAMILIES_WRAPPER.hidden = false;
                    return [2];
                }
                FAMILIES_WRAPPER.hidden = true;
                process_list = FAMILY_LINES.map(processProductResponse);
                process_list.push(processRecipeResponse());
                return [4, Promise.all(process_list)];
            case 1:
                _a.sent();
                if (SEARCH_RESULT_WRAPPER.querySelector("div.search-results-section:not([hidden])") !== null) {
                    SEARCH_RESULT_WRAPPER.hidden = false;
                    initSearchSliders();
                }
                else {
                    FAMILIES_WRAPPER.hidden = false;
                    MESSAGE_EMPTY_RESULT.hidden = false;
                }
                return [3, 3];
            case 2:
                error_3 = _a.sent();
                console.log(error_3);
                return [3, 3];
            case 3: return [2];
        }
    });
}); });
SEARCH_FORM.addEventListener("submit", function (event) {
    event.preventDefault();
});
ERASE_BUTTON.addEventListener("click", function () {
    SEARCH_INPUT.value = "";
    var INPUT_EVENT = new CustomEvent("input");
    SEARCH_INPUT.dispatchEvent(INPUT_EVENT);
});
SEARCH_RESULT_WRAPPER.addEventListener("click", function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var LINE_1, LINE_SLIDER_CONTAINER_1, CURRENT_PAGE, QUERY, result, RESULT_SPAN, LOAD_MORE;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(event.target instanceof Element)) {
                    return [2];
                }
                if (!(event.target.closest(".card-more") !== null)) return [3, 2];
                LINE_1 = event.target.closest("div[data-family]");
                if (LINE_1 === null || LINE_1.dataset.family === undefined) {
                    return [2];
                }
                LINE_SLIDER_CONTAINER_1 = LINE_1.querySelector("div.swiper-wrapper");
                if (LINE_SLIDER_CONTAINER_1 === null) {
                    return [2];
                }
                CURRENT_PAGE = Math.floor(LINE_SLIDER_CONTAINER_1.childElementCount / 12);
                QUERY = {
                    terms: SEARCH_INPUT.value,
                    family: LINE_1.dataset.family,
                    page: CURRENT_PAGE + 1
                };
                event.target.closest(".swiper-slide").remove();
                return [4, search(QUERY)];
            case 1:
                result = _a.sent();
                RESULT_SPAN = LINE_1.querySelector("span[data-amount]");
                if (RESULT_SPAN === null) {
                    throw new Error("Impossible to find the span holding the number of results found.");
                }
                while (RESULT_SPAN.firstChild) {
                    RESULT_SPAN.firstChild.remove();
                }
                RESULT_SPAN.appendChild(document.createTextNode(result.total.toString()));
                result.hits.forEach(function (payload) {
                    LINE_1.hidden = false;
                    var PRODUCT = new Product(payload._source);
                    if (payload.highlight !== undefined) {
                        PRODUCT.setName(payload.highlight.name);
                    }
                    var CARD = PRODUCT.build("search");
                    var SLIDE = document.createElement("div");
                    SLIDE.classList.add("swiper-slide");
                    SLIDE.appendChild(CARD);
                    LINE_SLIDER_CONTAINER_1.appendChild(SLIDE);
                    SEARCH_RESULT_WRAPPER.hidden = false;
                });
                if (result.total > LINE_SLIDER_CONTAINER_1.childElementCount) {
                    LOAD_MORE = document.createElement("button");
                    LOAD_MORE.classList.add("card-more");
                    LOAD_MORE.appendChild(document.createTextNode("+"));
                    LINE_SLIDER_CONTAINER_1.appendChild(LOAD_MORE);
                }
                _a.label = 2;
            case 2: return [2];
        }
    });
}); });
