"use strict";
window.addEventListener("load", function () {
    var FORM = document.querySelector("#modal_contact_form");
    if (!(FORM instanceof HTMLFormElement)) {
        throw new Error("Unable to locate form.");
    }
    var JSON_PHONES_SCRIPT = document.querySelector("#json_phones");
    if (JSON_PHONES_SCRIPT === null) {
        throw new Error("Unable to locate script containing JSON for phone numbers.");
    }
    var PHONE_NUMBERS = JSON.parse(JSON_PHONES_SCRIPT.textContent || "");
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
    var PHONE_INPUT = document.querySelector("#phone_input");
    if (PHONE_INPUT === null) {
        throw new Error("Unable to locate phone_input anchor.");
    }
    function update_phone_input(key) {
        var PHONE_DATA = PHONE_NUMBERS[key];
        if (PHONE_INPUT !== null && PHONE_DATA !== undefined) {
            PHONE_INPUT.innerHTML = "Contactez-nous au <strong>" + PHONE_DATA.text + "</strong>";
            PHONE_INPUT.href = PHONE_DATA.href;
        }
    }
    ;
    COUNTRY_SELECT.addEventListener("change", function () {
        var is_france = COUNTRY_SELECT.value === "france";
        if (is_france) {
            PHONE_INPUT.innerHTML = "Renseignez votre département pour trouver votre commercial en région";
            PHONE_INPUT.removeAttribute("href");
        }
        else {
            update_phone_input(COUNTRY_SELECT.value);
        }
    });
    SEARCH_INPUT.addEventListener("change", function () {
        update_phone_input(CITY_CODE_INPUT.value.substr(0, 2));
    });
});
