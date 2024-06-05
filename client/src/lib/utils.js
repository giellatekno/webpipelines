export function only_on_enter(fn) {
    return function (ev) {
        if (ev.key !== "Enter") return;
        fn();
    }
}

export function only_on(keys) {
    if (!Array.isArray(keys)) {
        throw new TypeError("only_on(): argument `keys` must be an array of strings");
    }

    for (let k of keys) {
        if (typeof k !== "string") {
            throw new TypeError("only_on(): argument `keys` must be an array of strings");
        }
    }

    return (fn) => {
        return (ev) => {
            const k = ev.key;
            for (let key of keys) {
                if (k === key) {
                    fn();
                    return;
                }
            }
        };
    };
}
