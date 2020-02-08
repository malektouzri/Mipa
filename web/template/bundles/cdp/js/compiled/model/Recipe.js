"use strict";
var Recipe = (function () {
    function Recipe(parameters) {
        this.name = parameters.name;
        this.picture = parameters.picture;
        this.prettyUrl = parameters.prettyUrl;
        this.averageRating = parameters.averageRating;
    }
    Recipe.prototype.setName = function (value) {
        this.name = value;
    };
    Recipe.prototype.getAverageRating = function () {
        return this.averageRating;
    };
    Recipe.prototype.build = function (template) {
        if (["search", "listing"].includes(template)) {
            return this.buildSmallTemplate();
        }
        throw new Error("Recipe.build => Invalid template.");
    };
    Recipe.prototype.buildSmallTemplate = function () {
        var WRAPPER = document.createElement("div");
        WRAPPER.classList.add("card--s");
        var BACKGROUND_IMAGE = document.createElement("div");
        BACKGROUND_IMAGE.classList.add("card-img");
        if (this.picture.CDP_cover_center_200_200.src !== undefined) {
            BACKGROUND_IMAGE.style.backgroundImage = "url('" + this.picture.CDP_cover_center_200_200.src + "')";
        }
        WRAPPER.appendChild(BACKGROUND_IMAGE);
        var CONTAINER = document.createElement("div");
        CONTAINER.classList.add("card-content");
        var MAIN = document.createElement("div");
        MAIN.classList.add("card-main");
        var TITLE_CONTAINER = document.createElement("div");
        TITLE_CONTAINER.classList.add("card-title");
        var ANCHOR = document.createElement("a");
        ANCHOR.href = this.prettyUrl;
        ANCHOR.innerHTML = this.name;
        TITLE_CONTAINER.appendChild(ANCHOR);
        MAIN.appendChild(TITLE_CONTAINER);
        CONTAINER.appendChild(MAIN);
        WRAPPER.appendChild(CONTAINER);
        return WRAPPER;
    };
    return Recipe;
}());
