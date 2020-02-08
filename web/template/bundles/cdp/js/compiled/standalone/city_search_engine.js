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
window.addEventListener("load", function () {
    document.querySelectorAll("#marketing-contact-form, #modal_contact_form").forEach(function (FORM) {
        FORM.reset();
        var COUNTRY_SELECT = FORM.querySelector("select[name=\"country\"]");
        if (COUNTRY_SELECT === null) {
            throw new Error("Unable to locate country select.");
        }
        var CITIES_ROW = FORM.querySelector("div.form-row[data-cities]");
        if (CITIES_ROW === null) {
            throw new Error("Unable to locate cities form row.");
        }
        var SEARCH_INPUT = CITIES_ROW.querySelector("input[name=\"city_search\"]");
        if (SEARCH_INPUT === null) {
            throw new Error("Unable to locate city search input.");
        }
        SEARCH_INPUT.disabled = true;
        var CITY_CODE_INPUT = CITIES_ROW.querySelector("input[name=\"city_code\"]");
        if (CITY_CODE_INPUT === null) {
            throw new Error("Unable to locate city code input.");
        }
        var CITY_ZIP_CODE_INPUT = CITIES_ROW.querySelector("input[name=\"city_zip_code\"]");
        if (CITY_ZIP_CODE_INPUT === null) {
            throw new Error("Unable to locate city zip code input.");
        }
        var CITIES_SELECT = CITIES_ROW.querySelector("ul[data-cities-select]");
        if (CITIES_SELECT === null) {
            throw new Error("Unable to locate cities select.");
        }
        SEARCH_INPUT.addEventListener("focus", function () {
            CITIES_SELECT.classList.toggle("inactive", (SEARCH_INPUT.value === "" || CITY_CODE_INPUT.value !== ""));
            CITIES_ROW.classList.add("unfolded");
        });
        SEARCH_INPUT.addEventListener("blur", function () {
            if (SEARCH_INPUT.value === "") {
                CITIES_SELECT.classList.add("inactive");
                CITIES_ROW.classList.remove("unfolded");
            }
        });
        COUNTRY_SELECT.addEventListener("change", function () {
            var is_france = COUNTRY_SELECT.value === "france";
            if (is_france) {
                CITIES_ROW.classList.remove("disabled");
            }
            else {
                SEARCH_INPUT.value = "";
                CITY_CODE_INPUT.value = "";
                CITY_ZIP_CODE_INPUT.value = "";
                CITIES_ROW.classList.add("disabled");
            }
            SEARCH_INPUT.disabled = !is_france;
            SEARCH_INPUT.required = is_france;
            CITY_CODE_INPUT.required = is_france;
        });
        debounce_event(SEARCH_INPUT, "input", 500);
        SEARCH_INPUT.addEventListener("debounced_input", function () { return __awaiter(void 0, void 0, void 0, function () {
            var DEFAULT_OPTION, SEARCH_QUERY, numeric_value, RESULTS, EMPTY_OPTION;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Array.from(CITIES_SELECT.children).forEach(function (child) {
                            child.remove();
                        });
                        CITY_CODE_INPUT.value = "";
                        CITY_ZIP_CODE_INPUT.value = "";
                        if (SEARCH_INPUT.value === "") {
                            DEFAULT_OPTION = document.createElement("li");
                            DEFAULT_OPTION.classList.add("inactive");
                            DEFAULT_OPTION.textContent = "Renseignez un code postal ou un nom de ville pour afficher les résultats";
                            CITIES_SELECT.append(DEFAULT_OPTION);
                            CITIES_SELECT.classList.add("inactive");
                            return [2];
                        }
                        SEARCH_QUERY = {
                            name: "",
                            code: ""
                        };
                        numeric_value = parseInt(SEARCH_INPUT.value, 10);
                        if (isNaN(numeric_value) || numeric_value === 0) {
                            SEARCH_QUERY.name = SEARCH_INPUT.value;
                        }
                        else {
                            SEARCH_QUERY.code = SEARCH_INPUT.value;
                        }
                        return [4, Geo.search(SEARCH_QUERY)];
                    case 1:
                        RESULTS = _a.sent();
                        if (RESULTS.data.length > 0) {
                            CITIES_SELECT.classList.remove("inactive");
                            RESULTS.data.forEach(function (result) {
                                var result_list_element = document.createElement("li");
                                result_list_element.textContent = result.name;
                                result_list_element.dataset.value = result.code;
                                result_list_element.dataset.zipCode = result.zipCode;
                                CITIES_SELECT.appendChild(result_list_element);
                            });
                        }
                        else {
                            EMPTY_OPTION = document.createElement("li");
                            EMPTY_OPTION.classList.add("inactive");
                            EMPTY_OPTION.textContent = "Aucun résultat ne correspond à votre recherche.";
                            CITIES_SELECT.append(EMPTY_OPTION);
                            CITIES_SELECT.classList.add("inactive");
                        }
                        return [2];
                }
            });
        }); });
        document.addEventListener("click", function (event) {
            var TARGET = event.target;
            if (TARGET === null || !(TARGET instanceof HTMLElement)) {
                CITIES_ROW.classList.remove("unfolded");
                CITIES_SELECT.classList.remove("inactive");
                return;
            }
            if (TARGET === SEARCH_INPUT) {
                return;
            }
            var PARENT = TARGET.closest("ul[data-cities-select]");
            if (!(PARENT instanceof HTMLElement)) {
                CITIES_ROW.classList.remove("unfolded");
                CITIES_SELECT.classList.remove("inactive");
                return;
            }
            if (PARENT !== CITIES_SELECT) {
                return;
            }
            if (TARGET.dataset.value !== undefined && TARGET.dataset.zipCode !== undefined) {
                SEARCH_INPUT.value = TARGET.textContent || "";
                CITY_CODE_INPUT.value = TARGET.dataset.value;
                CITY_ZIP_CODE_INPUT.value = TARGET.dataset.zipCode;
                CITIES_ROW.classList.remove("unfolded");
                CITIES_SELECT.classList.remove("inactive");
                Array.from(CITIES_SELECT.children).forEach(function (child) {
                    child.remove();
                });
                var DEFAULT_OPTION = document.createElement("li");
                DEFAULT_OPTION.classList.add("inactive");
                DEFAULT_OPTION.textContent = "Renseignez un code postal ou un nom de ville pour afficher les résultats";
                CITIES_SELECT.classList.add("inactive");
                CITIES_SELECT.append(DEFAULT_OPTION);
            }
            SEARCH_INPUT.dispatchEvent(new CustomEvent("change"));
        });
    });
});
