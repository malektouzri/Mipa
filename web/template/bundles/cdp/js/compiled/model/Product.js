"use strict";
var Product = (function () {
    function Product(parameters) {
        this.name = parameters.name;
        this.new = parameters.new;
        this.pictures = parameters.pictures;
        this.bestSeller = parameters.bestSeller;
        this.href = parameters.href;
        this.implementationStep = parameters.implementationStep;
        this.implementationSteps = parameters.implementationSteps;
        this.reference = parameters.reference;
        this.liked = parameters.liked;
    }
    Product.prototype.setName = function (value) {
        this.name = value;
    };
    Product.prototype.build = function (template) {
        if (["search", "listing"].includes(template)) {
            return this.buildSmallTemplate(template);
        }
        if (template === "selection") {
            return this.buildSelectionTemplate();
        }
        throw new Error("Product.build => Invalid template.");
    };
    Product.prototype.buildSmallTemplate = function (model) {
        var WRAPPER = document.createElement("div");
        WRAPPER.classList.add("card--s");
        WRAPPER.dataset.product = String(this.reference);
        if (this.new) {
            WRAPPER.classList.add("is-new");
        }
        var PICTURE = document.createElement("div");
        PICTURE.classList.add("card-img");
        if (this.pictures.length > 0) {
            PICTURE.style.backgroundImage = "url('" + this.pictures[0].CDP_cover_center_200_200.src + "')";
        }
        WRAPPER.appendChild(PICTURE);
        var CONTAINER = document.createElement("div");
        CONTAINER.classList.add("card-content");
        if (this.bestSeller) {
            var BEST_SELLER_CONTAINER = document.createElement("div");
            BEST_SELLER_CONTAINER.classList.add("card-best-seller");
            var SVG_THUMBS_UP = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            SVG_THUMBS_UP.setAttribute("class", "icon-pouce");
            var SVG_THUMBS_UP_USE = document.createElementNS("http://www.w3.org/2000/svg", "use");
            SVG_THUMBS_UP_USE.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "/bundles/cdp/images/sprite.svg#icon-pouce");
            SVG_THUMBS_UP.appendChild(SVG_THUMBS_UP_USE);
            BEST_SELLER_CONTAINER.appendChild(SVG_THUMBS_UP);
            PICTURE.appendChild(BEST_SELLER_CONTAINER);
        }
        if (model === "search") {
            var REFERENCE_CONTAINER = document.createElement("div");
            var REFERENCE = document.createTextNode(this.reference.toString());
            REFERENCE_CONTAINER.appendChild(REFERENCE);
            CONTAINER.appendChild(REFERENCE_CONTAINER);
        }
        var TITLE_CONTAINER = document.createElement("div");
        TITLE_CONTAINER.classList.add("card-main");
        var REF_ITEM = document.createElement("div");
        REF_ITEM.classList.add("card-ref");
        REF_ITEM.textContent = "Réf. " + String(this.reference);
        var TITLE_HOLDER = document.createElement("div");
        TITLE_HOLDER.classList.add("card-title");
        var TITLE_ANCHOR = document.createElement("a");
        TITLE_ANCHOR.href = this.href;
        TITLE_ANCHOR.innerHTML = this.name;
        TITLE_HOLDER.appendChild(TITLE_ANCHOR);
        TITLE_CONTAINER.appendChild(REF_ITEM);
        TITLE_CONTAINER.appendChild(TITLE_HOLDER);
        CONTAINER.appendChild(TITLE_CONTAINER);
        var FOOTER_CONTAINER = document.createElement("div");
        FOOTER_CONTAINER.classList.add("card-footer");
        var TAGS_CONTAINER = document.createElement("div");
        TAGS_CONTAINER.classList.add("card-tags");
        if (this.implementationStep.value !== null) {
            var IMPLEMENTATION_STEP_TAG = document.createElement("div");
            IMPLEMENTATION_STEP_TAG.classList.add("tag");
            var color = "";
            switch (this.implementationStep.value) {
                case "frozen":
                    color = "#ed9993";
                    break;
                case "frozenCooked":
                    color = "#c22c25";
                    break;
                case "frozenPrecooked":
                    color = "#f5be4d";
                    break;
                case "frozenRaw":
                    color = " #6ac5eb";
                    break;
                case "frozenReadyToBake":
                    color = "#b9d785";
                    break;
            }
            IMPLEMENTATION_STEP_TAG.style.backgroundColor = color;
            IMPLEMENTATION_STEP_TAG.setAttribute("data-tooltip-content", this.implementationStep.options[this.implementationStep.value]);
            TAGS_CONTAINER.appendChild(IMPLEMENTATION_STEP_TAG);
        }
        this.implementationSteps.forEach(function (step) {
            var STEP_TAG = document.createElement("div");
            STEP_TAG.classList.add("tag");
            STEP_TAG.setAttribute("data-tooltip-content", step.name);
            var STEP_TAG_IMG = document.createElement("img");
            STEP_TAG_IMG.src = "/bundles/cdp/images/implementation_step/" + step.identifier + ".svg";
            STEP_TAG.appendChild(STEP_TAG_IMG);
            TAGS_CONTAINER.appendChild(STEP_TAG);
        });
        FOOTER_CONTAINER.appendChild(TAGS_CONTAINER);
        var LIKE_BUTTON = document.createElement("button");
        LIKE_BUTTON.dataset.reference = String(this.reference);
        LIKE_BUTTON.classList.add("card-fav");
        if (this.liked) {
            LIKE_BUTTON.classList.add("is-active");
        }
        var HEART_SVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        HEART_SVG.setAttribute("class", "icon-heart");
        var HEART_USE = document.createElementNS("http://www.w3.org/2000/svg", "use");
        HEART_USE.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "/bundles/cdp/images/sprite.svg#icon-heart");
        HEART_SVG.appendChild(HEART_USE);
        LIKE_BUTTON.appendChild(HEART_SVG);
        FOOTER_CONTAINER.appendChild(LIKE_BUTTON);
        CONTAINER.appendChild(FOOTER_CONTAINER);
        WRAPPER.appendChild(CONTAINER);
        if (this.new) {
            var NEW_BADGE = document.createElement("div");
            NEW_BADGE.classList.add("badge-new");
            var NEW_TEXT = document.createTextNode("Nouveau");
            NEW_BADGE.appendChild(NEW_TEXT);
            WRAPPER.appendChild(NEW_BADGE);
        }
        return WRAPPER;
    };
    Product.prototype.buildSelectionTemplate = function () {
        var CARD = document.createElement("div");
        CARD.classList.add("card-landing");
        CARD.dataset.reference = this.reference.toString();
        var CARD_IMG = document.createElement("div");
        CARD_IMG.classList.add("card-img");
        CARD_IMG.style.backgroundImage = "url('" + this.pictures[0].CDP_cover_center_200_200.src + "')";
        CARD.appendChild(CARD_IMG);
        var CARD_MAIN = document.createElement("div");
        CARD_MAIN.classList.add("card-main");
        var CARD_REFERENCE = document.createElement("div");
        CARD_REFERENCE.classList.add("card-ref");
        CARD_REFERENCE.textContent = "Ref. " + this.reference;
        CARD_MAIN.appendChild(CARD_REFERENCE);
        var CARD_TITLE = document.createElement("div");
        CARD_TITLE.classList.add("card-title");
        CARD_TITLE.textContent = this.name;
        CARD_MAIN.appendChild(CARD_TITLE);
        var CARD_SVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        CARD_SVG.setAttribute("class", "icon-close");
        var CARD_USE = document.createElementNS("http://www.w3.org/2000/svg", "use");
        CARD_USE.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "/bundles/cdp/images/sprite.svg#icon-close");
        CARD_SVG.appendChild(CARD_USE);
        CARD_MAIN.appendChild(CARD_SVG);
        CARD.appendChild(CARD_MAIN);
        return CARD;
    };
    return Product;
}());
