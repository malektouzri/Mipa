"use strict";
function debounce_event(target, event_name, delay) {
    if (delay === void 0) { delay = 300; }
    var id = 0;
    var detail = undefined;
    function completed() {
        target.dispatchEvent(new CustomEvent("debounced_" + event_name, {
            cancelable: true,
            bubbles: true,
            detail: detail
        }));
    }
    target.addEventListener(event_name, function (event) {
        clearTimeout(id);
        if (event instanceof CustomEvent) {
            detail = event.detail;
        }
        id = setTimeout(completed, delay);
    });
}
