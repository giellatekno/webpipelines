import sme from "$locales/sme";
import nob from "$locales/nob";
import eng from "$locales/eng";
// import fin from "$locales/fin";
// import rus from "$locales/rus";

import {
    addMessages,
    init,
    locale as precompile_locale,
    // t,
} from "svelte-intl-precompile";

const DEFAULT_LOCALE = "eng";

export const locale = wrap_precompile_locale();
export const locales_in_locale = {
    sme: "Davvisámegiella",
    nob: "Norsk Bokmål",
    eng: "English",
    // fin: "Suomi",
    // rus: "Русский",
};

addMessages("sme", sme);
addMessages("nob", nob);
addMessages("eng", eng);
// addMessages("fin", fin);
// addMessages("rus", rus);

init({
    fallbackLocale: DEFAULT_LOCALE,
    initialLocale: get_initial_locale(),
});

function wrap_precompile_locale() {
    const inner = precompile_locale;

    function set(value: string) {
        inner.set(value);
        window.localStorage.setItem("locale", value);
    }

    return {
        subscribe: inner.subscribe,
        set,
    };
}

function get_initial_locale() {
    if (typeof window === "undefined") {
        // SSR
        return DEFAULT_LOCALE;
    } else {
        // hydration, or client side rendering
        const saved_locale = window.localStorage.getItem("locale");
        return saved_locale ?? DEFAULT_LOCALE;
    }
}

// let $t;
// const unsub_$t = t.subscribe((fn) => ($t = fn));
// export function get_langspecific_key(key, lang) {
//     const specific_key = `${key}.lang.${lang}`;
//     const specific_value = $t(specific_key);
//     if (specific_value !== specific_key) return specific_value;
//     const langagnostic_value = $t(key);
//     if (langagnostic_value !== key) return langagnostic_value;
//     return "";
// }
