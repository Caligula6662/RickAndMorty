/**
 * Entzerrt die Abfragen mit einem Timeout, um doppelte Aufrufe zu verhindern
 * @param func - mitgegebene Function für den debounce
 * @param wait - zeit die zu warten ist
 * @param immediate
 * @returns {function(): void}
 */


const helper = {
    debounce(func, wait, immediate) {
        let timeout;
        return function () {
            let context = this, args = arguments;
            let later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            let callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    },
    statusInfo(status) {
        if (status === "Dead") {
            return "bg-danger"
        }
        if (status === "unknown") {
            return "bg-secondary"
        }
        return "bg-success";
    }
}


for (let key in helper) {
    exports[key] = helper[key];
}
