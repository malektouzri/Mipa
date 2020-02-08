"use strict";
window.addEventListener("load", function () {
    var SORTING_SELECT = document.querySelector("select[name=news_listing_order]");
    if (SORTING_SELECT === null) {
        throw new Error("News sorting select does not exist.");
    }
    SORTING_SELECT.addEventListener("change", function () {
        window.location.assign(window.location.pathname + "?page=1&news_listing_order=" + SORTING_SELECT.value);
    });
});
