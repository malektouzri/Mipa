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
var LIKE_CONTAINER = document.querySelector("div.like-count");
var PILL_NUMBER = document.querySelector("div.pill-number");
var SELECTION_CARDS_CONTAINER = document.querySelector("div[data-selection-container]");
var SELECTION_CLEAR = document.querySelector("div[data-empty-selection]");
var SELECTION_FORM = document.querySelector("form[data-selection-form]");
if (LIKE_CONTAINER === null) {
    throw new Error("Unable to find the like count in DOM.");
}
if (SELECTION_CARDS_CONTAINER === null) {
    throw new Error("Unable to find the selection cards container in DOM.");
}
if (SELECTION_FORM === null) {
    throw new Error("Unable to find the selection form in DOM.");
}
if (SELECTION_CLEAR === null) {
    throw new Error("Unable to find the selection clear div in DOM.");
}
function addToSelection(reference) {
    return __awaiter(this, void 0, void 0, function () {
        var RESPONSE, RESULT, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, fetch("/ajax/add-to-selection", {
                        method: "POST",
                        mode: "cors",
                        cache: "no-cache",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ reference: reference })
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
                    RESULT = _a.sent();
                    return [2, RESULT];
                case 4:
                    error_1 = _a.sent();
                    throw new Error("A problem occured with the search request.");
                case 5: return [2];
            }
        });
    });
}
function removeFromSelection(reference) {
    return __awaiter(this, void 0, void 0, function () {
        var RESPONSE, RESULT, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, fetch("/ajax/remove-from-selection", {
                        method: "POST",
                        mode: "cors",
                        cache: "no-cache",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ reference: reference })
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
                    RESULT = _a.sent();
                    return [2, RESULT];
                case 4:
                    error_2 = _a.sent();
                    throw new Error("A problem occured with the search request.");
                case 5: return [2];
            }
        });
    });
}
function clearSelection() {
    return __awaiter(this, void 0, void 0, function () {
        var RESPONSE, RESULT, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, fetch("/ajax/clear-selection", {
                        method: "DELETE",
                        mode: "cors",
                        cache: "no-cache",
                        headers: {
                            "Content-Type": "application/json"
                        }
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
                    RESULT = _a.sent();
                    return [2, RESULT];
                case 4:
                    error_3 = _a.sent();
                    throw new Error("A problem occured with the search request.");
                case 5: return [2];
            }
        });
    });
}
function sendSelection(email, department, type) {
    return __awaiter(this, void 0, void 0, function () {
        var token, RESPONSE, RESULT, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, ReCaptcha({ action: "send_selection" })];
                case 1:
                    token = _a.sent();
                    return [4, fetch("/ajax/send-selection", {
                            method: "POST",
                            mode: "cors",
                            cache: "no-cache",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                email: email,
                                department: department,
                                type: type,
                                recaptcha: token
                            })
                        })];
                case 2:
                    RESPONSE = _a.sent();
                    if (!RESPONSE.ok) {
                        throw new Error("HTTP Response Code " + RESPONSE.status + ": " + RESPONSE.statusText);
                    }
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4, RESPONSE.json()];
                case 4:
                    RESULT = _a.sent();
                    return [2, RESULT];
                case 5:
                    error_4 = _a.sent();
                    throw new Error("A problem occured with the search request.");
                case 6: return [2];
            }
        });
    });
}
document.addEventListener("click", function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var BUTTON, CARD, RESULT, TO_REMOVE, RESULT, PRODUCT, TO_ACTIVATE, CARD_TO_REMOVE, RESULT, TO_DEACTIVATE, DETAILS_SIDE_BUTTON, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(event.target instanceof Element)) {
                    return [2];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 9, , 10]);
                BUTTON = event.target.closest("button.card-fav");
                if (!(BUTTON !== null && !BUTTON.classList.contains("is-ignored"))) return [3, 6];
                BUTTON.classList.add("is-ignored");
                CARD = event.target.closest(".card--s, .card--l, .sticky-item");
                if (!(CARD !== null && (CARD instanceof HTMLElement) && CARD.dataset.product !== undefined)) return [3, 5];
                if (!BUTTON.classList.contains("is-active")) return [3, 3];
                BUTTON.classList.remove("is-active");
                return [4, removeFromSelection(+CARD.dataset.product)];
            case 2:
                RESULT = _a.sent();
                if (RESULT.success) {
                    LIKE_CONTAINER.textContent = RESULT.data.total.toString();
                    if (PILL_NUMBER instanceof HTMLElement) {
                        PILL_NUMBER.textContent = LIKE_CONTAINER.textContent;
                    }
                    TO_REMOVE = SELECTION_CARDS_CONTAINER.querySelector("div[data-reference=\"" + RESULT.data.product.reference + "\"]");
                    if (TO_REMOVE !== null) {
                        TO_REMOVE.remove();
                    }
                }
                else {
                    BUTTON.classList.add("is-active");
                }
                return [3, 5];
            case 3:
                BUTTON.classList.add("is-active");
                return [4, addToSelection(+CARD.dataset.product)];
            case 4:
                RESULT = _a.sent();
                if (RESULT.success) {
                    LIKE_CONTAINER.textContent = RESULT.data.total.toString();
                    if (PILL_NUMBER instanceof HTMLElement) {
                        PILL_NUMBER.textContent = LIKE_CONTAINER.textContent;
                    }
                    PRODUCT = new Product(RESULT.data.product);
                    TO_ACTIVATE = document.querySelectorAll("button.card-fav[data-reference=\"" + RESULT.data.product.reference + "\"]");
                    Array.from(TO_ACTIVATE).forEach(function (button) {
                        button.classList.add("is-active");
                    });
                    SELECTION_CARDS_CONTAINER.appendChild(PRODUCT.build("selection"));
                }
                else {
                    BUTTON.classList.remove("is-active");
                }
                _a.label = 5;
            case 5:
                BUTTON.classList.remove("is-ignored");
                _a.label = 6;
            case 6:
                if (!(event.target.closest(".icon-close") !== null)) return [3, 8];
                CARD_TO_REMOVE = event.target.closest("div.card-landing[data-reference]");
                if (!(CARD_TO_REMOVE !== null && CARD_TO_REMOVE.dataset.reference !== undefined)) return [3, 8];
                return [4, removeFromSelection(+CARD_TO_REMOVE.dataset.reference)];
            case 7:
                RESULT = _a.sent();
                if (RESULT.success) {
                    CARD_TO_REMOVE.remove();
                    LIKE_CONTAINER.textContent = RESULT.data.total.toString();
                    if (PILL_NUMBER instanceof HTMLElement) {
                        PILL_NUMBER.textContent = LIKE_CONTAINER.textContent;
                    }
                    TO_DEACTIVATE = document.querySelectorAll("div[data-product=\"" + RESULT.data.product.reference + "\"] button.card-fav");
                    if (TO_DEACTIVATE !== null) {
                        Array.from(TO_DEACTIVATE).forEach(function (card) {
                            card.classList.remove("is-active");
                        });
                    }
                    DETAILS_SIDE_BUTTON = document.querySelector("button.sticky-item.card-fav");
                    if (DETAILS_SIDE_BUTTON !== null) {
                        DETAILS_SIDE_BUTTON.classList.remove("is-active");
                    }
                }
                _a.label = 8;
            case 8: return [3, 10];
            case 9:
                error_5 = _a.sent();
                console.log(error_5);
                return [3, 10];
            case 10: return [2];
        }
    });
}); }, true);
SELECTION_CLEAR.addEventListener("click", function () { return __awaiter(void 0, void 0, void 0, function () {
    var RESULT, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4, clearSelection()];
            case 1:
                RESULT = _a.sent();
                if (RESULT.success) {
                    while (SELECTION_CARDS_CONTAINER.firstChild) {
                        SELECTION_CARDS_CONTAINER.firstChild.remove();
                    }
                    document.querySelectorAll("button.card-fav.is-active").forEach(function (button) {
                        button.classList.remove("is-active");
                    });
                    LIKE_CONTAINER.textContent = RESULT.data.total.toString();
                    if (PILL_NUMBER instanceof HTMLElement) {
                        PILL_NUMBER.textContent = LIKE_CONTAINER.textContent;
                    }
                }
                return [3, 3];
            case 2:
                error_6 = _a.sent();
                console.log(error_6);
                return [3, 3];
            case 3: return [2];
        }
    });
}); });
